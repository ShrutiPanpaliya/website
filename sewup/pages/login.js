import Layout from '@/components/Layout'
import useStyles from '@/utils/Styles'
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '@/utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import {Controller, useForm } from 'react-hook-form'
import {Toast as toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getError } from '@/utils/error'


export default function Login() {
//   <ToastContainer
//   autoClose={5000}
//   hideProgressBar={true}
// />
  const {handleSubmit,control,formState:{errors}}=useForm();
   const router =useRouter();
   const {redirect}=router.query;
   const classes=useStyles();
   
   const { state, dispatch } = useContext(Store);
   const { userinfo } = state;
   useEffect(()=>
   {
    if(userinfo)
   {
    router.push("/")
   }
   },[])
   
   
   const submitHandler = async ({email,password}) => {
    
    try {
      const { data } = await axios.post('/api/users/login', {
        
        email,
        password,
      });
      
      dispatch({type:'USER_LOGIN',payload:data})
      
      Cookies.set('userinfo', JSON.stringify(data));
      router.push(redirect || '/' )    
    } catch (err) {
      
      alert(err.response.data ? err.response.data.message : err.message);
      // toast.error(err.response.data ? err.response.data.message : err.message);
      // toast.error(getError(err))
    
    }
  };
   return (
    <Layout title="login">
        <form onSubmit={handleSubmit(submitHandler)}className={classes.form}>
            <Typography component="h1" variant="h1">
                LOGIN
            </Typography>
            <List>
                <ListItem>
                <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={(errors.email)}
                
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>
                <ListItem>
                <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
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
                    >Login</Button>
                </ListItem>
                <ListItem>
                    Don't have an account? &nbsp;
                    <NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                </ListItem>
            </List>
        </form>
        
    </Layout>
    
  )
}
