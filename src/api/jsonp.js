import jsonp from 'jsonp'

/* 
通过jsonp请求获取天气信息 */
export function reqWeather(city){
const url=`https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=65517669&appsecret=1xW8hQn0&city=${city}`;
return new Promise((resolve,rej)=>{
jsonp(url,{param:'callback'},(err,res)=>{
if(!err&res.cityid){
    const {tem1,tem2,wea,wea_img}=res;
    
    resolve({
        tem1,
        tem2,
        wea,
        wea_img
    })

}
else{
    alert('获取天气失败')
}

})

})


}