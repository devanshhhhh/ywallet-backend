const express=require('express');
const { authMiddleware }=require("../middlewares/authMdw.js");
const accountContoller=require("../contollers/accountController.js");

const router=express.Router();

router.get("/balance", authMiddleware, async(req, res)=>{
    await accountContoller.getBalance(req, res)});

router.post("/add", authMiddleware, async(req, res)=>{
    await accountContoller.addBalance(req, res)});

router.post("/transfer", authMiddleware, async(req, res)=>{
    await accountContoller.transferMoney(req, res)});

module.exports=router;