import useStyles from '@/utils/Styles';
import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'

export default function checkoutWizard({activeStep=0}) {
  const classes =useStyles();
  return( 
  <Stepper className={classes.transparentBackground}activeStep={activeStep} alternativeLabel>
    {['Login','ShippingAddress','Payment Method','Place Order'].map((step)=>(
            <Step key ={step}>
                <StepLabel>{step}</StepLabel>

                </Step>

        )
   )} 

  </Stepper>
  );
}
