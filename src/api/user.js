import request from '@/utils/request'
export default{
    getUserAll(){
        return request({
            url:'/manage/user/all',
            method:"get",
            
        })
    },
    //获取用户列表 带分页
    //page当前页码，size每页显示的条数
    //后端通过page和size计算本期请求需要响应得数据
    getUserList(page,size){
        return request({
            url:'/manage/user/list',
            method:'post',
            data:{
                page,
                size
            }
        })
    },
    add(user) {
        return request({
            url: '/manage/user/add',
            method: 'post',
            data: user
        })
    },
    //通过id查找一条用户
    getById(_id){
        return request({
            url:`/manage/user/find?_id=${_id}`,
            method:'get'
        })
    },
    update(user)
    {
        return request({
            url:'/manage/user/update',
            method:'post',
            data:user
        })
    },
    //删除用户
    deleteById(userId){
return request({
    url:'manage/user/delete',
    method:'post',
    data:{
        userId
    }
})
    },
    checkPwd(userId,password)
    {
        return request({
            url:'/manage/user/pwd',
            method:'post',
            data:{
                userId,password
            }
        })
    },
    //修改密码
    updatePwd(userId,password)
    {
        return request({
            url:"/manage/user/pwd",
            method:'put',
            data:{
                userId,password
            }
        })
    }
  

 
    
}