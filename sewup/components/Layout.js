import React ,{useContext}from 'react'
import { AppBar,Switch, createTheme, CssBaseline, Link, ThemeProvider, Badge, Button, Menu, MenuItem } from '@material-ui/core'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Store } from '@/utils/Store'
import NextLink from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useStyles from '../utils/Styles';
import Cookies from 'js-cookie'

import PopupState,{ bindTrigger } from 'material-ui-popup-state'
import { bindMenu } from 'material-ui-popup-state/hooks'
import { useRouter } from 'next/router'
 function Layout({title,description,children}) {
    const router =useRouter();
    const { state, dispatch } = useContext(Store);
  const { darkMode,cart,userinfo } = state;
    const theme =createTheme({
        typography:{
            h1:{
                fontSize:'1.6rem',
                fontWeight:300,
                margin:'1rem 0'
            },
            h2:{
                fontSize:'1.6rem',
                fontWeight:300,
                margin:'1rem 0'
            },
            body1:{
                fontWeight:'normal'
            },
            
        },
        palette:{
            type: darkMode ? 'dark' : 'light',
            primary:{
                main:'#f0c000',
            },
        secondary:{ 
            main:'#208080'
         }   
        }
    });
    const classes = useStyles();
    const darkModeHandler=()=>{
        dispatch({type:darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'})
        const newDarkMode=!darkMode;
        Cookies.set("darkMode",newDarkMode?'ON':'OFF');
    }
    function logoutClickHandler(){
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
    }
    function loginMenuCloseHandler(redirect){
        if(redirect)
        {router.push(redirect)}
        
    }
  return (
    <div>
        <Head>
            <title>{title ?`${title}-Sewup`:'Sewup'}</title>
        {description && <meta name='description' content={description}></meta>} 
        </Head>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        
        <AppBar position='static' className={classes.navbar}>
            <Toolbar>
                <NextLink href='/' passHref>
                <Link><Typography className={classes.brand}>Sewup</Typography></Link>
                </NextLink>
                <div className={classes.grow}></div>
                    <div>
                    <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
                        <NextLink href='/cart' passHref>
                            <Link>
                            {cart.cartItems.length>0 ?(<Badge  color="secondary"badgeContent={cart.cartItems.length}> Cart  </Badge>):
                            ('Cart')}
                            
                            </Link>
                        </NextLink>
                       
                            {userinfo?
                            <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                              <React.Fragment>
                            <Button   {...bindTrigger(popupState)} className={classes.navbarButton} padding={10}> {userinfo.name}</Button>
                             <Menu {...bindMenu(popupState)}>
                             <MenuItem onClick={()=>{popupState.close(); loginMenuCloseHandler('/profile');}}>Profile</MenuItem>
                             <MenuItem onClick={()=>{popupState.close(); loginMenuCloseHandler('/order-history');}}>Order History</MenuItem>
                             <MenuItem  onClick={() => { popupState.close(); logoutClickHandler();
        }} >Logout</MenuItem>
                           </Menu>
                           </React.Fragment>)}
                           </PopupState>
                           :
                             <NextLink href='/login' passHref>
                                 <Link>Login</Link>
                        </NextLink>

                            }
                           
                    </div>
                
            </Toolbar>
        </AppBar>
        <Container className={classes.main}>
            {children}
        </Container>
        <footer className={classes.footer}>
            <Typography>All Rights Reserved.NextSewup</Typography>
        </footer>
        </ThemeProvider>
    </div>
   
    
  )
}
export default dynamic(()=>Promise.resolve(Layout),{ssr:false});

