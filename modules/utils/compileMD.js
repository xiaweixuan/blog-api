const fs = require('fs');
const funcs = require('./funcs');
const marked = require('marked');
const temRule =require('./htmlTemplate.lifeStyle.json')
/**
 * 将md文件转化为html
 */

module.exports = new function () {
  var self = this;

  this.domain = '';

  this.dbIndex = {
    filedata: [],
    // index: {}
  };

  function  trfObbj(obj){
    var str=""
    for(let i in obj){
      str+=i+":"+obj[i]+";"
    }
    // console.log(str)
    return str
  }


  this.loadData = async (dbpath) => {
    try {
      let files = fs.readdirSync(dbpath, { withFileTypes: true });
      let tmp = '';
      let data = '';
      this.dbIndex.filedata = [];
      for (let i = 0; i < files.length; i++) {
        if (/*files[i].isFile() &&*/ files[i].name.indexOf('.md') > 0) {
          try {
            tmp = `${dbpath}/${files[i].name}`;
            data = await funcs.readFile(tmp);
            data = marked(data, { breaks: true, gfm: true });
            data = data.replace(/<p>/ig, '<p style="font-size:18px;line-height: 30px;letter-spacing:5px;text-indent: 46px;text-align: left;">');
            //转化为数组
            this.dbIndex.filedata.push({
              name: files[i].name,
              data: data
            });
          } catch (err) {
            console.log(err);
            continue;
          }
        }
      }
      return this.dbIndex;
    } catch (err) {
      console.log(err);
    }
  };
  this.comOne = async (dbpath,name) => {
    try {
      tmp = dbpath+'/'+name;
      console.log(tmp)
      data = await funcs.readFile(tmp);
      data = marked(data, { breaks: true, gfm: true });
      
      for(let i in temRule){
        data=data.replace(new RegExp(`<${i}(\s+[a-zA-Z]+=".*")*>`, 'ig'), `<${i} style="${trfObbj(temRule[i])}">`)
      }
      //暂时处理无法匹配h5标签的问题
      data = data.replace(/<h5/ig, '<h5 style="font-size:22px"');
      //转化为数组
      this.dbIndex.filedata.push({
        name: name,
        data: data
      });
    } catch (err) {
      console.log(err);
    }
    return this.dbIndex;
  }

  // this.comOne("../../public/mdFile/fileArticle","新进文本文档.md")
  // console.log(temRule)



};
