import index from '../data/data_index.js';
import index_next from '../data/data_index_next.js';
console.log(index);  
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
  return index;
}
function getNext(){
  return index_next;
}
module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
