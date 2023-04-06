import Layout from '@/components/Layout'
import useStyles from '@/utils/Styles'
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '@/utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import CheckoutWizard from '@/components/checkoutWizard'
import {Controller, useForm } from 'react-hook-form'


export default function Shipping() {
  const {handleSubmit,control,formState:{errors},setValue,}=useForm();
   const router =useRouter();
   const {redirect}=router.query;
   const classes=useStyles();
   
   const { state, dispatch } = useContext(Store);
   const { userinfo ,cart:{shippingAddress}} = state;
   useEffect(()=>
   {
    if(!userinfo)
   {
    router.push("/login?redirect=/shipping")
   }
   setValue('fullName',shippingAddress.fullName);
   setValue('address',shippingAddress.address);
   setValue('city',shippingAddress.city);
   setValue('state',shippingAddress.state);
   setValue('country',shippingAddress.country);
   },[])
   
   const submitHandler =  ({fullName,address,city,state,country}) => {
    
      dispatch({type:'SAVE_SHIPPING_ADDRESS',payload:{fullName,address,city,state,country}})

      Cookies.set('shippingAddress', JSON.stringify({fullName ,address ,city ,state ,country }));
   
      router.push('/payment' )    
  };
   return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1}/>
        <form onSubmit={handleSubmit(submitHandler)}className={classes.form}>
            <Typography component="h1" variant="h1">
                SHIPPING
            </Typography>
            <List>
                <ListItem>
                <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:2
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length should be more than 1'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>  
                <ListItem>
                <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:2
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address length should be more than a word'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem> 
                <ListItem>
                <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:2
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City should exist'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>  
                <ListItem>
                <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:2
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="state"
                  label="State"
                  error={Boolean(errors.state)}
                  helperText={
                    errors.state
                      ? errors.state.type === 'minLength'
                        ? 'State should exist'
                        : 'State is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>  
                
                <ListItem>
                <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength:2
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country should exist'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>  
                <ListItem>
                    <Button 
                    variant='contained'
                    type="submit"
                    fullWidth 
                    color="primary"
                    >Continue</Button>
                </ListItem>
                
            </List>
        </form>
    </Layout>
    
  )
}
