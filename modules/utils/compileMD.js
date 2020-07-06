const fs = require('fs');
const funcs = require('./funcs');
const marked = require('marked');
const temRule = require('./htmlTemplate.lifeStyle.json')
/**
 * 将md文件转化为html
 */

module.exports = new function () {
  var self = this;
  //指定文章的静态资源
  this.domain = 'http://api.xiawx.top/mdFile/fileArticle/';

  this.dbIndex = {
    filedata: [],
    // index: {}
  };

  function trfObbj(obj) {
    var str = ""
    for (let i in obj) {
      str += i + ":" + obj[i] + ";"
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
  this.comOne = async (dbpath, name) => {
    try {
      tmp = dbpath + '/' + name;
      data = await funcs.readFile(tmp);
      data = this.replaceImageSrc(data);
      data = marked(data, { breaks: true, gfm: true });
      for (let i in temRule) {
        data = data.replace(new RegExp(`<${i}(\s+[a-zA-Z]+=".*")*>`, 'ig'), `<${i} style="${trfObbj(temRule[i])}">`)
      }
      //暂时处理无法匹配h5\img标签的问题
      data = data.replace(/<h5/ig, '<h5 style="font-size:22px;text-align:left"');
      data = data.replace(/\<img /ig, '<img style="width:100%;display:block;border-radius: 15px;"');


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
  this.resetImgSrc = (data, imgsrc) => {
    let realsrc = '';
    if (this.domain[this.domain.length - 1] == '/') {
      this.domain = this.domain.substring(0, this.domain.length - 1);
    }
    realsrc = this.domain + '/' + imgsrc;

    let i = 0;
    while (data.indexOf(`](${imgsrc}`) >= 0 && i < 20) {
      data = data.replace(imgsrc, realsrc);
      i += 1;
    }
    return data;
  }

  this.replaceImageSrc = (data) => {
    var images = data.match(/\!\[[^\]]*\]\(.*\)/ig);

    if (!images) {
      return data;
    }
    let tmp = '';
    for (let i = 0; i < images.length; i++) {
      tmp = images[i].split('](')[1];
      data = this.resetImgSrc(data, tmp.substring(0, tmp.length - 1));
    }
    return data;
  }



};
