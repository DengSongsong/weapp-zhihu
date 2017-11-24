import next from '../data/data_index.js';
console.log(next);  
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}




function getData(url){
  return new Promise(function(resolve,reject){
    wx.request({
      url: url,
      data: {},
      header: {},
      success: function(res){
        console.log("success");
        resolve(res);
      },
      fail: function(res){
        console.log("failed");
        reject(res);
      }
    })
  })
}

function getData2(){
  return next;
}
module.exports.getData = getData;
module.exports.getData2 = getData2;
