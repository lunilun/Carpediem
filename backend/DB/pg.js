const Pool = require('pg').Pool;
const fs = require('fs');

var msg;

const pool = new Pool({
    user: "user Name",
    password: "user password",
    database: "database name", 
    host: "localhost",
    port: 5432
});

//세이브
exports.Save = async function(req) {
    try{
        const gtitle = req.body.title;
        const gcate = req.body.cate;
        const gdate = req.body.date;
        const gcontent = req.body.content;
        const gimg = req.body.img;
        const gtype = req.body.thema;

        const filename = req.body.img.split(".");
        fs.writeFile(`uploads/${gtype}/${filename[0]}`,`${req.body.imgUrl}`,(err)=>{ 
            if (err !== null) console.log(err.message); 
        });

        await pool.query(`insert into item(title,cate,date,contents,img,thema) values('${gtitle}','${gcate}','${gdate}','${gcontent}','${gimg}','${gtype}');`)
        msg='save';
        return msg;
    }catch(err){
        console.log(err);
    }
}
//로드
exports.Load = async function(req) {
    try{
        const gcate = req.params.cate;
        const loadItems = await pool.query(`select * from item where thema = '${gcate}'`);
        return ({data:loadItems.rows,count:loadItems.rowCount});
    }catch(err){
        console.log(err);
    }
}

//이미지 다운로드
exports.Download = async function(req) {
    const fileRoot = req.params.cate;
    const filename = req.params.imgName;

    return new Promise((resolve, reject) => {
        fs.readFile(`uploads/${fileRoot}/${filename}`, 'utf-8', (err, data)=>{
            if(err){
                reject(err.message);
            }
            else{
                resolve(data);
            }
        })
    })
}

//삭제
exports.Delete = async function(req) {
    try{
        var gno = req.body.no;
        var gImgName = req.body.name;
        var gImgRoot = req.body.roots;

        await pool.query(`delete from item where no='${gno}'`);
        if (gImgName != "none") {
            return new Promise((resolve) => {
            fs.unlink(`uploads/${gImgRoot}/${gImgName}`, (err) => {
                if (err) resolve("error");
                else resolve("delete");
                });
            })
        } else {
            return ("delete");
        }
        
    }catch(err){
        console.log(err.message);
    }
}