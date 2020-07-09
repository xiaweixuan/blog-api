const funcs=require('../utils/funcs')
const db = require('../utils/db.js');
const publicPath = "images/photoWall/"
const fs = require('fs');

var PhotosList = function(){};

PhotosList.prototype.getAll=function(cb){
    var sql = 'select * from photos';
    db.query(sql,(err,result)=>{
      if(err){
        cb(true);
        return;
      }else{
        result.filter(item=>{
          item.imgPath=publicPath+item.imgPath
          item.date=funcs.timestampToTime(item.date).replace(/\s0:0:0/,"")
        })
        // console.log(result)
        cb(false,result);
      }
    })
    

}
// var a=new LifeArticle()
// a.getAll(function(){})
module.exports =PhotosList;
