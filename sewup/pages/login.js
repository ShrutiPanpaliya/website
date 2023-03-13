import Layout from '@/components/Layout'
import useStyles from '@/utils/Styles'
import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import NextLink from 'next/link'

export default function Login() {
   const classes=useStyles();
    return (
    <Layout title="login">
        <form className={classes.form}>
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
                    ></TextField>
                </ListItem>
                <ListItem>
                    <TextField
                    variant='outlined'
                    fullWidth
                    id="Password"
                    label="Password"
                    inputProps={{type:'password'}}
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
