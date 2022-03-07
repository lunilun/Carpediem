const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const noCache = require('nocache');
require('dotenv').config();

var app = express();
//body-parser
app.use(express.urlencoded({limit:'50mb' ,extended: true, parameterLimit:50000}));
app.use(express.json({limit:'50mb'}));
//helmet
app.use(helmet());
app.use(helmet.hidePoweredBy()); //x-powered-by헤더 제거
// app.use(helmet.referrerPolicy({ //Referer 헤더 내부의 정보를 제어
// 	setAllHeaders: true,
// 	browserSniff: true
// }));
app.use(helmet.expectCt()); //SSL 인증서가 잘못 발급되는 것을 방지
//cors
app.use(cors());
//Cache
app.use(noCache()); // 클라이언트 측에서 캐싱사용 막기
//상황별 포트 나누기
var port = process.env.PORT || 3000; 

var router = require('./routes/route');
app.use('/',router);

//서버 시작
app.listen(port, function(){ 
    console.log(`App Listening on port `+port); 
});