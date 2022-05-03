const menuList = [
    {
        title: '首页',//菜单标题
        index: '/home',
        icon:'el-icon-s-home',//图标
isPublic:true
    },
    {
        title:'用户管理',
        index:'/user',
        icon:'el-icon-user'//图标
    },
    {
        title:'角色管理',
        index:'/role',
        icon:'el-icon-medal'//图标
    },
    {
        title:'学员管理',
        index:'/students',
        icon:'el-icon-s-check',//图标
        children:[
            {
                title:'学校管理',
                index:'/school',
                icon:'el-icon-office-building'//图标
            },
            {
                title:'专业管理',
                index:'/majors',
                icon:'el-icon-reading'//图标
            },
            {
                title:'班级管理',
                index:'/class',
                icon:'el-icon-s-grid'//图标
            },
            {
                title:'学员管理',
                index:'/student',
                icon:'el-icon-notebook-1'//图标
            },
        ]
    },

]
export default menuList