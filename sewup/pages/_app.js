import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  return (
    <StoreProvider>
      <PayPalScriptProvider deferLoading={true}>
    <Component {...pageProps} />
    </PayPalScriptProvider>
    </StoreProvider>
  );
  
}
