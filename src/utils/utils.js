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

    return `${year}${divied}${Utils.padZero(month)}${divied}${Utils.padZero(day)}`
  },

  /** 小于0-9之间的数字前面补0 */
  padZero(num){
    return Number(num) > 9 ? num : `0${num}`;
  },
};
