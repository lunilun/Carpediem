const express = require('express');
const pg = require('../DB/pg.js');
const router = express.Router();

router.post("/save",(req,res)=>{
    pg.Save(req).then((data)=>{
        return res.json(data)
    });
});
router.get("/load/:cate",(req,res)=>{
    pg.Load(req).then((data) => {
        return res.json(data)
    });
});
router.get("/Download/:cate/:imgName", (req, res) => {
    pg.Download(req).then((data)=>{
        return res.json(data)
    });
});
router.post("/delete", (req, res) => {
    pg.Delete(req).then((data)=>{
        return res.json(data)
    });
});
router.post("/revise", (req, res) => {
    // pg.Download(req).then((data)=>{
    //     return res.json(data)
    // });
});
module.exports=router;