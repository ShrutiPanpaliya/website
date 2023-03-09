import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Store'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  return (
    <StoreProvider>
    <Component {...pageProps} />
    </StoreProvider>
  );
  
}
