import Vue from "vue";
import Router from "vue-router";

import login from '../views/login'
import layout from '../components/layout.vue'
import home from '@/views/home/home.vue'
import role from '@/views/role/role.vue'
import user from '@/views/user/user.vue'
import student from '@/views/students/student.vue'
import majors from '@/views/students/majors.vue'
import school from '@/views/students/school.vue'
import Class from '@/views/students/class.vue'
import StudentUpdate from '@/views/students/StudentUpdate.vue';


Vue.use(Router);


export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }
    , {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/home',
    children: [{
      path: '/home',
      component: home,
      meta: { title: '首页',
      roles:["admin","user"]
     }
    }]
  },
  {
    path: '/user',
    component: layout,
    children: [{
      path: '/',
      component: user,
      meta: {
        title: '用户管理',

      }
    }]
  },
  {
    path: '/school',
    component: layout,
    children: [{
      path: '/',
      component: school,
      meta: { title: '学校管理' }
    }]
  },
  {
    path: '/role',
    component: layout,
    children: [{
      path: '/',
      component: role,
      meta: { title: '角色管理' }
    }]
  },
  {
    path: '/majors',
    component: layout,
    children: [{
      path: '/',
      component: majors,
      meta: { title: '专业管理' }
    }]
  },
  {
    path: '/class',
    component: layout,
    children: [{
      path: '/',
      component: Class,
      meta: { title: '班级管理' }
    }]
  },
  {
    path: '/student',
    component: layout,
    children: [{
      path: '/',
      component: student,
      meta: { title: '学生管理' }
    }]
  },
  {
    path: '/student/update/:_id',
    component: layout,
    children: [{
      path: '/',
      component: StudentUpdate,
      meta: { title: '学生管理' }
    }]
  }




  ]
});
