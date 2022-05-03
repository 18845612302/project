import request from '@/utils/request'
export function getRoleList(){
return request({
    url:'/manage/role/list',
    method:'get'
})
}
export function addRole(name){
    return request({
url:'/manage/role/add',
method:'post',
data:{
name
}

    })
}
export function updateRole(role) {
return request({
url:'/manage/role/update',
method:'post',
data:role

})

    
  }