import index from '../data/data_index.js';
import index_next from '../data/data_index_next.js';
import answer from '../data/data_answer.js';
import questionDetail from '../data/data_questionDetail.js';
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
function getAnswer(){
  return answer;
}
function getQuestionDetail(){
  return questionDetail;
}
module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getAnswer = getAnswer;
module.exports.getQuestionDetail = getQuestionDetail;

// export default getAnswer;
