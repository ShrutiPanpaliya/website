import Product from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect"
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import { signToken } from "@/utils/auth";
const handler =nc();
handler.post(async(req,res)=>
{
    await db.connect();
    const newuser = new User({name:req.body.name,email:req.body.email,password:bcrypt.hashSync(req.body.password),isAdmin:false});
    const user=await newuser.save();
    await db.disconnect();
    
        const token=signToken(user);
        res.send({
            _id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin,token
        });
    
   
});
export default handler;