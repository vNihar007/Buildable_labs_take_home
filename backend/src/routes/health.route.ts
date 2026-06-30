import { Router } from "express";

const router = Router () ;
router.get('/' ,(req,res)=>{
    return res.json({status: 'ok'}).status(200)
})
export default router ; 
