import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import useStyles from '@/utils/Styles'
import { getError } from '@/utils/error'
import { Button, Card, CircularProgress, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useReducer } from 'react'
import NexLink from 'next/link'
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

  
  function Profile() {
    const { state,dispatch } = useContext(Store);
    const router = useRouter();
    const classes = useStyles();
    const { userinfo } = state;
    const {handleSubmit,control,setValue,formState:{errors}}=useForm();
  
    useEffect(()=>{
        if(!userinfo)
        {
          return  router.push('/login')
        }
        setValue('name',userinfo.name);
        setValue('email',userinfo.email);

    },[])
    
    const submitHandler = async ({email,password,name,confirmPassword}) => {
   
        if(password!=confirmPassword)
        {
          alert("Passwords Don't match")
          return;
        }
        try {
          const { data } = await axios.put('/api/users/profile', {
            name,
            email,
            password,
          },
          {
            headers:{authorization:`Bearer ${userinfo.token}`}
          });
          
          dispatch({type:'USER_LOGIN',payload:data})
          
          Cookies.set('userinfo', JSON.stringify(data));
             
        } catch (err) {
          alert(err.response.data ? err.response.data.message : err.message);
        }
      };
    return (
      <Layout title="Profile">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NexLink href="/profile" passHref>
                  <ListItem selected button component="a">
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItem>
                </NexLink>
                <NexLink href="/order-history" passHref>
                  <ListItem  button component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NexLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    Profile
                  </Typography>
                </ListItem>
                <ListItem>
                <form onSubmit={handleSubmit(submitHandler)}className={classes.form}>
            
            <List>
            <ListItem>
                <Controller
              name="name"
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
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length should be more than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>
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
                  error={Boolean(errors.email)}
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
                validate:(value)=>(value===''||value.length >5 || 'Password length is more than 5')
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
                        ? 'Password length is more than 5'
                        : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
                   
                </ListItem>
                <ListItem>
                <Controller
              name="confirmPassword"
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
                  id="confirmPassword"
                  label="Confirm Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Confirm Password length is more than 5'
                        : ' Confirm Password is required'
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
                    >Update</Button>
                </ListItem>
            </List>
        </form>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
  
  export default dynamic(() => Promise.resolve(Profile), { ssr: false });
