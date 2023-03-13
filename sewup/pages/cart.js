import Layout from '@/components/Layout';
import { Store } from '@/utils/Store'
import dynamic from 'next/dynamic';
import { MenuItem,Card,List,Grid, Link,Select,Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, Button, ListItem } from '@material-ui/core';
import React, { useContext } from 'react'
import NextLink from 'next/link';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/router';
 function CartScreen() {
    const router=useRouter();
    const {state,dispatch}=useContext(Store)
    const {cart:{cartItems}}=state;
    const updateCartHandler=async(item,quantity)=>{
        const {data}=await axios.get(`/api/products/${item._id}`);
        if(data.countInStock<quantity){
          window.alert('Product out of Stock')
          return;
        
        }

        dispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}}) 

    }
    const removeItemHandler=(item)=>{
        dispatch({type:'CART_REMOVE_ITEM',payload:item})
    }
    const checkOutHandler=()=>{
        router.push("/shipping")
    }
    return <Layout title="Shopping Cart">
        <Typography component="h1" variant="h1"><a>Shopping Cart</a></Typography>
        {cartItems.length===0?(<div>
            Cart is Empty <NextLink href="/" passHref> <Link>Go Shopping</Link> </NextLink>

        </div>):(<Grid container spacing={1}>
            <Grid item md={9} xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>IMAGE</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell align='right'>QUANTITY</TableCell>
                                <TableCell align='right'>PRICE</TableCell>
                                <TableCell align='right'>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item)=>((
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <NextLink href={`/product/${item.slug}`} passHref>
                                            <Link>
                                            <Image src={item.image} al={item.name} width={50} height={50}></Image>
                                            </Link>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell>
                                        <NextLink href={`/product/${item.slug}`} passHref>
                                            <Link>
                                            <Typography><a>{item.name}</a></Typography>
                                            </Link>
                                        </NextLink>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Select value={item.quantity} onClick={(e)=>updateCartHandler(item,e.target.value)}>
                                            {[...Array(item.countInStock).keys()].map((x)=>(
                                                <MenuItem key={x+1} value={x+1}>
                                                    {x+1}
                                                </MenuItem>
                                        
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align='right'>
                                        ${item.price}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button variant='contained' color="secondary" onClick={()=>removeItemHandler(item)}>X</Button>
                                    </TableCell>
                                </TableRow>
                            )
                                 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid md={3} xs={12}>
                <Card>
                    <List>
                        <ListItem>
                            <Typography variant="h2">
                                Subtotal({cartItems.reduce((a,c)=>a +c.quantity ,0)}items):
                                ${cartItems.reduce((a,c)=>a+c.quantity*c.price,0)}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Button onClick={checkOutHandler} variant='contained' color="primary" fullWidth>
                                Check Out
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>)}
    </Layout>
}
export default dynamic(()=>Promise.resolve(CartScreen),{ssr:false});

  