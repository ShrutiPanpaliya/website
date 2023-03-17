import { Store } from '@/utils/Store';
import {  useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react';

export default function Shipping() {
    const router=useRouter();
    const { state, dispatch } = useContext(Store);
   const { userinfo } = state;
   if(!userinfo)
   {
    router.push("/login?redirect=/shipping")
   }
   
    
}
