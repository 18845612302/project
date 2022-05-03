import store from 'store';
const USER_KEY='user_key'
/* 
stroe 兼容所有浏览器的localstorage

*/
export default{
saveUser(user){
    //localStorage只能有string，需要将对象转换诚string
    //localStorage.setItem(USER_KEY,JSON.stringify)
store.set(USER_KEY,user)//内部会自动转换
},
getUser(){
    return store.get(USER_KEY)||{}
},
removeUser(){
    store.remove(USER_KEY)
}
}