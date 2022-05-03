/*
权限校验
通过router路由前置钩子函数
 */
import router from "./router";
import memoryUtils from "./utils/memoryUtils";
/* 
前置路由钩子函数；
to:即将要进入的目标路由对象
form:当前导航要离开的路由对象
next:调用该方法，进入到目标路由

*/

router.beforeEach((to, from, next) => {
    const user = memoryUtils.user;

    let arr=user.role.menus;
    if (user && user._id) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            next();

        }
        if (arr.indexOf(to.path) == -1) {
            next({ path: '/home' })
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login' })
        }
    }


})