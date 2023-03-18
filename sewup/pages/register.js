import Layout from '@/components/Layout'
import useStyles from '@/utils/Styles'
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '@/utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


export default function Register() {
   const router =useRouter();
   const {redirect}=router.query;
   const classes=useStyles();
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const[confirmpassword,setConfirmPassword]=useState('');
   const { state, dispatch } = useContext(Store);
   const { userinfo } = state;
   useEffect(()=>
   {
    if(userinfo)
   {
    router.push("/")
   }
   },[])
   
   const submitHandler = async (e) => {
    e.preventDefault();
    if(password!=confirmpassword)
    {
      alert("Passwords Don't match")
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });+
      
      dispatch({type:'USER_LOGIN',payload:data})
      
      Cookies.set('userinfo', JSON.stringify(data));
      router.push(redirect || '/' )    
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
   return (
    <Layout title="Register">
        <form onSubmit={submitHandler}className={classes.form}>
            <Typography component="h1" variant="h1">
                REGISTER
            </Typography>
            <List>
            <ListItem>
                    <TextField
                    variant='outlined'
                    fullWidth
                    id="Name"
                    label="Name"
                    inputProps={{type:'text'}}
                    onChange={e=>setName(e.target.value)}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    variant='outlined'
                    fullWidth
                    id="Email"
                    label="Email"
                    inputProps={{type:'email'}}
                    onChange={e=>setEmail(e.target.value)}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    variant='outlined'
                    fullWidth
                    id="Password"
                    label="Password"
                    inputProps={{type:'password'}}
                    onChange={e=>setPassword(e.target.value)}
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    variant='outlined'
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    inputProps={{type:'password'}}
                    onChange={e=>setConfirmPassword(e.target.value)}
                    ></TextField>
                </ListItem>
                
                <ListItem>
                    <Button 
                    variant='contained'
                    type="submit"
                    fullWidth 
                    color="primary"
                    >Register</Button>
                </ListItem>
                <ListItem>
                   Already have an account? &nbsp;
                    <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                </ListItem>
            </List>
        </form>
    </Layout>
    
  )
}
