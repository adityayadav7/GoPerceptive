


const puppeteer = require('puppeteer');
(async ()=>{
  let url="https://www.amazon.in/dp/B07W7B94HK";
  let browser =await puppeteer.launch({headless:false});
  let page = await browser.newPage();
  

  await page.goto(url,{waitUntil:'networkidle2'});

  let data= await page.evaluate(()=>{
      let price= document.querySelector('span[id="priceblock_ourprice"]').innerText;
      let mrp= document.querySelector('span[class="priceBlockStrikePriceString a-text-strike"]').innerText;
       let saving=document.querySelector('td[class="a-span12 a-color-price a-size-base priceBlockSavingsString"]').innerText;
       let stock=document.querySelector('span[class="a-size-medium a-color-success"]').innerText;
      return { price,mrp,saving,stock}
  })
  console.log(data)
//   debugger;
  await browser.close();
})();

