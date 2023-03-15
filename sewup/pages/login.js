import Layout from '@/components/Layout'
import useStyles from '@/utils/Styles'
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'

export default function Login() {
   const classes=useStyles();
   const [email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      alert('success login');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
   return (
    <Layout title="login">
        <form onSubmit={submitHandler}className={classes.form}>
            <Typography component="h1" variant="h1">
                LOGIN
            </Typography>
            <List>
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
                    <Button 
                    variant='contained'
                    type="submit"
                    fullWidth 
                    color="primary"
                    >Login</Button>
                </ListItem>
                <ListItem>
                    Don't have an account? &nbsp;
                    <NextLink href="/register" passHref><Link>Register</Link></NextLink>
                </ListItem>
            </List>
        </form>
    </Layout>
    
  )
}
