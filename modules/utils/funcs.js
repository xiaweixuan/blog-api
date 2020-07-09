const fs = require('fs');

exports.readFile = async function (filename, encoding = 'utf8') {
  return new Promise((rv, rj) => {
    fs.readFile(filename, { encoding: encoding }, (err, data) => {
      if (err) {
        rj(err);
      } else {
        rv(data);
      }
    });
  });
};

exports.timestampToTime= function (timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
 // 注:时间戳转时间（ios手机NaN）
exports.getTime= function (nS) {
    var date=new Date(parseInt(nS)* 1000);
    var year=date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate();
    var hours = date.getHours();
    var minu = date.getMinutes();
    var sec = date.getSeconds();

    return year+'/'+mon+'/'+day+' '+hours+':'+minu+':'+sec;
}