 /**
  *降频函数
  *这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。
  *调用:	debounce(function() {}, 250)
  * @param {*} func回调函数
  * @param {*} wait等待时间,推荐250
  * @param {*} immediate
  * @returns
  */
 export function debounce(func, delay) {
   let timer = null;
   return function (...args) {
     if (timer) clearTimeout(timer);
     timer = setTimeout(() => {
       func.apply(this, args);
     }, delay);
   };
 }

 export function formatDate(date, fmt) {
   if (/(y+)/.test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   let o = {
     'M+': date.getMonth() + 1,
     'd+': date.getDate(),
     'h+': date.getHours(),
     'm+': date.getMinutes(),
     's+': date.getSeconds()
   };
   for (let k in o) {
     if (new RegExp(`(${k})`).test(fmt)) {
       let str = o[k] + '';
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
     }
   }
   return fmt;
 };

 function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

