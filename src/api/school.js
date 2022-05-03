import request from "@/utils/request";
import { update } from "../../../../b0347-server/models/UserModel";
export default {
/* 获取学校列表
page当前页码,size每页显示条数
*/   getSchoolAll() {
        return request({
            url: "/manage/school/all",
            method: 'get'
        })
    },
    getSchoolList(page, size) {
        return request({
            url: '/manage/school/list',
            method: 'post',
            data: {
                page,
                size
            }
        })

    },
    add(school) {
        return request({
            url: '/manage/school/add',
            method: 'post',
            data: school
        })
    },
    getById(_id) {
        return request({
            url: `/manage/school/find?_id=${_id}`,
            method: 'get'
        })
    },
    //更新学校信息
    update(school) {
        return request({
            url: '/manage/school/update',
            method: 'post',
            data: school

        })
    },
    //删除学校
    deleteById(schoolId) {
        return request({
            url: '/manage/school/delete',
            method: 'post', data: {
                schoolId
            }
        })

    }

}