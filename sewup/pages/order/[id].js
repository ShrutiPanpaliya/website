import Layout from '@/components/Layout';
import { Store } from '@/utils/Store'
import dynamic from 'next/dynamic';
import {Card,List,Grid, Link,Select,Table,TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, Button, ListItem, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import NextLink from 'next/link';
import axios from 'axios';

import Image from 'next/image'
import { useRouter } from 'next/router';
import useStyles from '@/utils/Styles';
import { getError } from '@/utils/error';

import { useReducer } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
function reducer(state,action)
{
    switch(action.type)
    {
        case 'FETCH_REQUEST':
            return {...state,loading:true,error:''}
        case 'FETCH_SUCCESS':
            return {...state,loading:false,order:action.payload,error:''}
        case 'FETCH_FAIL':
            return {...state,loading:false,error:action.payload}
        case 'PAY_REQUEST':
            return {...state,loadingPay:true}
        case 'PAY_SUCCESS':
            return {...state,loadingPay:false,successPay:true};
        case 'PAY_FAIL':
            return {...state,loadingPay:false,errorPay:action.payload}
        case 'PAY_RESET':
            return {...state,loadingPay:false,successPay:false,errorPay:''}    
        default:
            state;        
    }
} 
function Order({params}) {
    const orderId=params.id;
    const [{isPending},paypalDispatch]=usePayPalScriptReducer();
    const classes =useStyles()
    const router=useRouter();
    
    const {state}=useContext(Store)
    const {userinfo,}=state;
    const [{loading ,error,order,successPay},dispatch]=useReducer(reducer,
        {
            loading:true,order:{},error:'',
        })
    const {shippingAddress,paymentMethod,orderItems,deliveredAt,paidAt,isDelivered,isPaid,itemsPrice,shippingPrice,totalPrice,taxPrice}=order;
   
    useEffect(()=>
   {
    if(!userinfo)
   {
    router.push("/login")
   }
   const fetchOrder=async()=>{try{
    dispatch({type:'FETCH_REQUEST'});
    const {data}=await axios.get(`/api/orders/${orderId}`,{
        headers:{authorization:`Bearer ${userinfo.token}`}
    });
    dispatch({type:'FETCH_SUCCESS',payload:data})
   }   
   catch(err)
   {
    dispatch({type:'FETCH_FAIL',payload:getError(err)})

   } }
   if(!order._id ||successPay || (order._id && order._id!==orderId))
   {
    fetchOrder();
    if(successPay)
    {
        dispatch({type:'PAY_RESET'})
    }
   }
   else{
    const loadPaypalScript=async ()=>
    {
        const {data: clientId}=await axios.get('/api/keys/paypal',
        {
            headers:{authorization:`Bearer ${userinfo.token}`}
        })
        paypalDispatch({type:'resetOptions',value:{
            'client-id':clientId,
            currency:'USD'
        }})
        paypalDispatch({type:'setLoadingStatus',value:'pending'})
    };
    loadPaypalScript();
   }
},[order, successPay])
function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

function onApprove(data,actions){
    console.log(data)
    return actions.order.capture().then(async function (details){
        try{
            dispatch({type:'PAY_REQUEST'});
            const { data }=await axios.put(`/api/orders/${order._id}/pay`,details,
            {
                headers:{authorization:`Bearer ${userinfo.token}`}
            })
            dispatch({type:'PAY_SUCCESS',payload:data});
            alert("Order is Paid")

        }
        catch(err){
            dispatch({type:'PAY_FAIL',payload:getError(err)});
            alert(getError(err))
 
        }
    })
}
function onError(err){
    alert(getError(err))
}
   
    
    return <Layout title={`Order ${orderId}`}>
        
        <Typography component="h1" variant="h1">Order {orderId}</Typography>
        {loading?(<CircularProgress/>):
        error?(<Typography className={classes.error}>{error}</Typography>):
        (
            <Grid container spacing={1}>
             <Grid item md={9} xs={12}>
             <Card className={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant='h2'>
                               Shipping Address
                            </Typography>
                        </ListItem>
                        <ListItem>
                        {shippingAddress.fullName},{shippingAddress.address},{''}
                        {shippingAddress.city},{''},{shippingAddress.state},{''},
                        {shippingAddress.country}
                         </ListItem>
                         <ListItem>
                            Status : {isDelivered? `Delivered at ${deliveredAt}`:'Not Delivered'}
                         </ListItem>
                        
                        </List>
                        </Card>
                        <Card className={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant='h2'>
                               Payment Method
                            </Typography>
                        </ListItem>
                        <ListItem>
                          {paymentMethod}
                         </ListItem>
                         <ListItem>
                            Status : {isPaid? `Paid at ${paidAt}`:'Not Paid'}
                         </ListItem>
                        </List>
                        </Card>
                <Card className={classes.section}>
                    <List>
                        <ListItem>
                            <Typography component="h2" variant='h2'>
                                Order Items
                            </Typography>
                        </ListItem>
                        <ListItem>
                        <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>IMAGE</TableCell>
                                <TableCell>NAME</TableCell>
                                <TableCell align='right'>QUANTITY</TableCell>
                                <TableCell align='right'>PRICE</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderItems.map((item)=>((
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
                                        <Typography>{item.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Typography>${item.price}</Typography>
                                        
                                    </TableCell>
                                    
                                </TableRow>
                            )
                                 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                        </ListItem>
                    </List>
                 </Card>
                </Grid>
            <Grid md={3} xs={12}>
                <Card className={classes.section}>
                    <List>
                        <ListItem>
                            <Typography variant="h2">
                               Order Summary
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs ={6}>
                                    <Typography>Items:</Typography>
                                    </Grid>
                                    <Grid item xs ={6}>
                                    <Typography align='right'>${itemsPrice}</Typography>
                                    </Grid>
                            </Grid>
                            
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs ={6}>
                                    <Typography>Tax:</Typography>
                                    </Grid>
                                    <Grid item xs ={6}>
                                    <Typography align='right'>${taxPrice}</Typography>
                                    </Grid>
                            </Grid>
                            
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs ={6}>
                                    <Typography>Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs ={6}>
                                    <Typography align='right'>${shippingPrice}</Typography>
                                    </Grid>
                            </Grid>
                            
                        </ListItem>
                        <ListItem>
                            <Grid container>
                                <Grid item xs ={6}>
                                    <Typography><strong>Total:</strong></Typography>
                                    </Grid>
                                    <Grid item xs ={6}>
                                    <Typography align='right'><strong>${totalPrice}</strong></Typography>
                                    </Grid>
                            </Grid>

                            
                        </ListItem>
                        {
                             
                             paymentMethod=== 'PayPal' && !isPaid && (
                                    <ListItem>
                                        {isPending?(<CircularProgress/>):
                                       
                                        (
                                            <div className={classes.fullWidth}> <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                            >
    
                                            </PayPalButtons></div>
    
                                        )}
                                    </ListItem>
                                )
                            
                        }

                       

                    </List>
                </Card>
            </Grid>
        </Grid>

        )}
        
    </Layout>
}
export async function getServerSideProps({params})
{
    return {props:{params}}
}
export default dynamic(()=>Promise.resolve(Order),{ssr:false});

  