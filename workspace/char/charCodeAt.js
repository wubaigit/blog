let str = `<svg viewBox="0 0 100 100" width="100" height="100">
  <image xlink:href="https://raw.githubusercontent.com/wubaigit/wubai-blog/master/blog/assets/07/20-owl.png"
    width="100" height="100"/>
  </svg>`;

let strBase64 = new Buffer(str).toString('base64')
console.log(strBase64)