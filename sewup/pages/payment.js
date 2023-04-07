import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import useStyles from '@/utils/Styles';
import { Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@material-ui/core';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import CheckoutWizard from '@/components/CheckoutWizard'
export default function Payment() {
    const classes =useStyles();
    const { state, dispatch } = useContext(Store);
    const {cart:{shippingAddress}}=state;
    const [paymentMethod,setPaymentMethod]=useState('');
    const router =useRouter();
    useEffect(()=>{
        if(!shippingAddress.address)
        {
            router.push("/shipping")
        }
        else{
            setPaymentMethod(Cookies.get('paymentMethod')||'');

        }

    },[])
    const submitHandler=(e)=>
    {
        e.preventDefault();
        if(!paymentMethod)
        {
            alert("Payment is Required")
        }
        else
        {
            dispatch({type:"SAVE_PAYMENT_METHOD",payload:paymentMethod})
            Cookies.set("paymentMethod",paymentMethod)
            router.push('/placeorder')
        }
    }

  return <Layout title="Payment Method">
    <CheckoutWizard activeStep={2}></CheckoutWizard>
        <form  className={classes.form} onSubmit={submitHandler}>
            <Typography component="h1" variant='h1'>
                Payment Method
            </Typography>
            <List>
                <ListItem>
                    <FormControl component ="fieldset">
                        <RadioGroup aria-label='Payment Method' name='paymentMethod' value={paymentMethod} 
                        onChange={(e)=>setPaymentMethod(e.target.value)}>
                           
                        <FormControlLabel label="PayPal" value="PayPal" control={<Radio/>}>

                        </FormControlLabel>
                        <FormControlLabel label="Stripe" value="Stripe" control={<Radio/>}>

                         </FormControlLabel>
                        <FormControlLabel label="Cash" value="Cash" control={<Radio/>}>

                         </FormControlLabel>
                         </RadioGroup>
                            

                    </FormControl>
                </ListItem>
                <ListItem>
                    <Button fullWidth type="submit" variant='outlined' color="primary">
                        Continue
                    </Button>
                    </ListItem>
                    <ListItem>
                    <Button fullWidth type="button" variant='outlined' onClick={()=>router.push('/shipping')}>
                        Back
                    </Button>
                    </ListItem>
            </List>

        </form>
        

    
  </Layout>
}
