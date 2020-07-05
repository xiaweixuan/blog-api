const CompileMD = require('../utils/compileMD');
const db = require('../utils/db.js');
const publicPath = "./public/mdFile/fileArticle"


var LifeArticle = function(){};

LifeArticle.prototype.getAll=async function(cb){
    var comData=await CompileMD.loadData(publicPath)
    var sql = 'select * from lifeArticle';
    db.query(sql,(err,result)=>{
      if(err){
        cb(true);
        return;
      }else{
        var arr=[]
        for(let i=0;i<result.length;i++){
            for(let j=0;i<comData.filedata.length;i++){
                if(result[i].articlePath===comData.filedata[j].name){
                    arr.push({
                        id:result[i]['open_id'],
                        name:comData.filedata[j].name,
                        data:comData.filedata[j].data,
                        title:result[i].title,
                        synopsis:result[i].synopsis,
                        imgPath:result[i].imgPath
                    })
                    break
                }
            }
        }
        // console.log(arr)
        cb(false,arr);
      }
    })
    

}
LifeArticle.prototype.getIntroduce=function(cb){
  var sql = 'select * from lifeArticle';
  db.query(sql,(err,result)=>{
    if(err){
      cb(true);
      return;
    }else{
      cb(false,result);
    }
  })
}
LifeArticle.prototype.getDetail=function(id,cb){
  var sql = 'select * from lifeArticle where open_id='+id;

  db.query(sql,async (err,result)=>{
    if(err){
      cb(true);
      return;
    }else{
      var data=await CompileMD.comOne(publicPath,result[0].articlePath)
      cb(false,Object.assign(result[0],data.filedata[0]));
    }
  })
}
LifeArticle.prototype.selectArticle=function(cb){
}

module.exports =LifeArticle;
