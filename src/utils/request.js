import axios from "axios";
import memoryUtils from './memoryUtils.js'
import { Message,Loading } from 'element-ui'
import storageUtils from './storageUtils'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,//根据不同环境设置baseurl，最终发送的请求uel为：baseurl+发送请求是写的url 例如：baseurl：'/dev-api'
    timeout: 500,

})
const getMenus = () => {
    if (memoryUtils.user.role_id) {
        //获取缓存中的用户角色id和权限数组
        const roleId = memoryUtils.user.role_id
        const userMenus = memoryUtils.user.role.menus;
        //根据角色id发送请求获取最新的权限数组
        request({
            url: '/menus',
            method: 'post',
            data: { roleId }
        }).then(response => {
            const res = response.data;
           
            if (res.status == 0) {
                const menus = res.data.menus;
                 //判断权限数组长度是否相同
                if (userMenus.length === menus.length) {
                    //旁断权限数组内容是否相同
                    userMenus.forEach(item => {
                        if (menus.indexOf(item) === -1) {
                            memoryUtils.user = {}
                            storageUtils.removeUser()
                            Message({
                                message: '当前用户权限被修改,请重新登录',
                                type: 'warning'
                            });
                            window.location.href = '/login'
                        }
                    })
                } else {
                    memoryUtils.user = {}
                    storageUtils.removeUser()
                    Message({
                        message: '当前用户权限被修改,请重新登录',
                        type: 'warning'
                    });
                    window.location.href = '/login'
                }
            }
        }).catch(err=>{
            return 
        })

    }


}

//加载数据时打开和关闭特效
const loading={
    loadingInstance:null,
    open:function()
    {
        if(this.loadingInstance==null)
        {
            this.loadingInstance=Loading.service({
                text:'拼命加载中...',
                target:'.main',
                background:'rgb(0,0,0,0.5)'
            })
        }
    },
    close:function()
    {
        if(this.loadingInstance!=null)
        {
            this.loadingInstance.close()
        }
        this.loadingInstance=null
    }
}
//请求拦截器
request.interceptors.request.use(config => {
    if (config.url !== '/menus') {
        getMenus();
    }
    config.headers["token"]="aaaa"
    loading.open();
    //拦截请求
    return config
}, err => {
    loading.close()
    return Promise.reject(err)
})
//响应拦截器
request.interceptors.response.use(response => {
    //响应拦截
    //关闭加载效果
    loading.close()
    const res=response.data;
    if(res.status!==0)
    {
        Message({
            message:res.msg||'系统异常',
            type:'warning',
            duration:2*1000
        })
    }
    else{
        Message({
            message:res.msg||'获取成功',
            type:'success',
            duration:2*1000
        })
    }
    return response
}, err => {
    return Promise.reject(err)
})

export default request//导出封装后的axios