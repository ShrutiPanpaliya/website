import Product from "@/models/Product";
import db from "@/utils/db";
import nc from "next-connect"
import Data from "@/utils/Data";
const handler =nc();
handler.get(async(req,res)=>
{
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(Data.products);
    await db.disconnect();
    res.send({message:'seeded '});
});
export default handler;