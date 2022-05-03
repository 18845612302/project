import request from '@/utils/request'
export default{
getClassList(page,size,searchMap)
{
    return request({
        url:'/manage/class/list',
        method:'post',
        data:{
            page,size,
            searchMap
        }
    })
},
add(c)
{
return request({
    url:'/manage/class/add',
    method:'post',
    data:c
})
},
getById(_id){
    return request({
        url:`/manage/class/find?_id=${_id}`,
        method:'get',
    })
},
update(c){
return request({
    url:"/manage/class/update",
    method:'post',
    data:c
})
},
deleteById(classId){
    return request({
        url:"/mangae/class/delete",
        method:'post',
        data:{
            classId
        }
    })
},
getClassAll()
{
    return request({
        url:'/manage/class/all',
        method:'get'
    })
}
}