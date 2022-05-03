//导入自己封装的axios对象
import request from "@/utils/request";
//登录


function login(username, password) {
    return request({
        url: '/login',//请求地址
        method: 'post',//请求方式
        data: {//发送请求传递的参数
            username,
            password
        }
    })
}
function heihei(token) {
    return request({
        url: "/aaa",
        method: "post", 
        data: {
            token
        }
    })
}
export default { login, heihei }