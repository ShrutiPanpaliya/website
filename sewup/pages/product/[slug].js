import React, { useContext } from 'react'
import {useRouter} from 'next/router'
// import Data from '/utils/Data';
import dynamic from 'next/dynamic';
import db from '@/utils/db';
import Product from '@/models/Product';
import NextLink from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import {Button,Card,Grid,Link, ListItem,List, Typography } from '@material-ui/core';
import Layout from '/components/Layout';
import useStyles from '@/utils/Styles';
import { Store } from '@/utils/Store';
import { Router } from 'next/router';
function productScreen(props) {
  const {state,dispatch}=useContext(Store);
  const {product}= props;
  
   const classes=useStyles();
   const router=useRouter()
  //  const {slug}=router.query;
  // const product=Data.products.find((a)=> a.slug===slug);
 if(!product)
 {
  return <div>Product Not Found</div>
 }
 const addToCartHandler=async()=>{
  const existItem=state.cart.cartItems.find((x)=>x._id===product._id);
  const quantity=existItem?existItem.quantity+1:1;
  const {data}=await axios.get(`/api/products/${product._id}`);
  if(data.countInStock<quantity){
    window.alert('Product out of Stock')
    return;
  
  }
  dispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}}) 
  router.push('/cart')
};
 return(
  
  <Layout title={product.name} description={product.description}>
<div className={classes.section}>
  <NextLink href='/'passHref>
    <Link><a>Back to Products</a></Link>
  </NextLink>
</div>
<Grid container spacing={1}>
  <Grid item md={6} xs={12}>
    <Image src={product.image} alt={product.name} width={600} height={640} >

    </Image>
    </Grid>
    <Grid item md={3} xs={12}>
      <List>
      <ListItem><Typography component="h1" variant='h1'>{product.name}</Typography></ListItem>
        <ListItem><Typography> Category:{product.category}</Typography></ListItem>
        <ListItem><Typography> Rating:{product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
        <ListItem>
           Description:
          <Typography>{product.description}</Typography>
        </ListItem>
      </List>
    
  </Grid>
  <Grid item md={3} xs={12}>
    <Card>
      <List>
        <ListItem>
           <Grid container>
           <Grid item xs={4}>
              <Typography>Price</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography>${product.price}</Typography>

            </Grid>
           </Grid>
        </ListItem>
        <ListItem>
           <Grid container>
           <Grid item xs={4}>
              <Typography>Status</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography>{product.countInStock>0?'In Stock':'Unavailable'}</Typography>

            </Grid>
           </Grid>
        </ListItem>
        <ListItem>
          <Button fullWidth  variant="contained" color="primary"
          onClick={addToCartHandler}>
           
            Add to Cart
          </Button>
        </ListItem>
      </List>
    </Card>
  </Grid>
</Grid>

  </Layout>
 );
}
export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;
  
  await db.connect();

  const product = await Product.findOne({slug}).lean();
  
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
export default dynamic(()=>Promise.resolve(productScreen),{ssr:false});
