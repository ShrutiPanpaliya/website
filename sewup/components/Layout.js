import React ,{useContext}from 'react'
import { AppBar,Switch, createTheme, CssBaseline, Link, ThemeProvider } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Store } from '@/utils/Store'
import NextLink from 'next/link'
import Head from 'next/head'
import useStyles from '../utils/Styles';
import Cookies from 'js-cookie'
export default function ({title,description,children}) {
    const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
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
                            <Link>Cart</Link>
                        </NextLink>
                        <NextLink href='/login' passHref>
                            <Link>Login</Link>
                        </NextLink>
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
