export const Utils = {
  zipImage(fileObj, callback) {
    if ( typeof FileReader === 'undefined') { 
      return false
    } else {
      try {
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = document.createElement('img');

          image.load(function(){
            let width = 150,   // 定义画布的大小，也就是图片压缩之后的像素，可根据实际布局设定大小
                height = 180,
                canvas = document.createElement('canvas'),
                context = canvas.getContext('2d'),
                imageWidth = 0,    // 压缩图片的大小  
                imageHeight = 0,
                offsetX = 0,
                offsetY = 0,
                data = '';

            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);

            if (this.width > this.height) {
              imageWidth = Math.round(width * this.width / this.height);
              imageHeight = height;
              offsetX = - Math.round((imageWidth - width) / 2);
            } else {
              imageHeight = Math.round(height * this.height / this.width);
              imageWidth = width;
              offsetY = - Math.round((imageHeight - height) / 2);
            }

            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
            data = canvas.toDataURL('image/jpeg');
            // 压缩完成执行回调    
            callback(data);
          });
          image.attr('src', e.target.result);
        };
        reader.readAsDataURL(fileObj);
      }catch(e){
        return false;
      }
    }
  },

  /** 格式化日期 */
  formatDate(dateStr, divied = '-'){
    const oDate = new Date(dateStr);
    const year = oDate.getFullYear();
    const month = oDate.getMonth() + 1;
    const day = oDate.getDate();
    const hour = oDate.getHours();
    const minute = oDate.getMinutes();

    return `${year}${divied}${Utils.padZero(month)}${divied}${Utils.padZero(day)} ${Utils.padZero(hour)}:${Utils.padZero(minute)}`;
  },

  /** 小于0-9之间的数字前面补0 */
  padZero(num){
    return Number(num) > 9 ? num : `0${num}`;
  },

  /** 获取用户的code */
  getUserCode(){
    let code = '';
    const search = window.location.search;

    if(search && search.indexOf('code') > -1){
      const searchArr = search.split('&');

      searchArr.map((itm, idx) => {
        const res = itm.split('=');

        if(res[0] === 'code'){
          code = res[1];
        }
      });
    }

    return code;
  },

  /** 读取文件 */
  renderFile(file, callback){
    let reader=new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      const content = this.result;  // 图片的src，base64格式
      const img = new Image();

      img.src = content;
      img.onload = function (){   // 图片加载完毕
        Utils.compressImage(img, callback);
      }
    };
  },

  /** 图片压缩 */
  compressImage(img, callback){
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 图片原始尺寸
    let originWidth = img.width;
    let originHeight = img.height;

    // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
    const maxWidth = 300,
        maxHeight = 300;

    // 目标尺寸
    let targetWidth = originWidth,
        targetHeight = originHeight;

    // 图片尺寸超过300 x 300的限制
    if(originWidth > maxWidth || originHeight > maxHeight) {
      if(originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // 图片转blod格式上传
    canvas.toBlob(function (blod) {
      callback ? callback(blod) : null; // 调用回调函数
    }, 'image/jpeg', 0.7);
  },
};
