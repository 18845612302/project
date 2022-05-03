<template>
  <div>
    <el-form
      :model="updataRole"
      status-icon
      :rules="rules"
      ref="updataRole"
      label-width="100px"
      label-position="right"
      class="demo-ruleForm"
      style="width: 400px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="updataRole.name"></el-input>
      </el-form-item>
    </el-form>
    <el-tree
      :data="authList"
      show-checkbox
      node-key="index"
      :default-expand-all="true"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
      ref='tree'
    >
    </el-tree>
  </div>
</template>

<script>
import menuList from "@/config/menuConfig.js";
export default {
  data() {
    return {
      updataRole: {},
      authList: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      checkedKeys: [],
    };
  },
  mounted() {
    this.updataRole = { ...this.role };
    this.authList = this.getAuthNodes(menuList);
    this.checkedKeys = this.role.menus;
  },
  watch:{
role(val){
  if(val){
    this.updataRole={...val}
    this.checkedKeys=val.menus
    this.$refs['tree'].setCheckedKeys(this.checkedKeys)
  }
}
  },
  components: {},
  props: ["role"],
  methods: {
    getAuthNodes(menuList) {
      return menuList.map((item) => {
        if (!item.children) {
          return {
            index: item.index,
            label: item.title,
          };
        } else {
          return {
            index: item.index,
            label: item.title,
            children: this.getAuthNodes(item.children),
          };
        }
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      /* 树形控件节点点击回调 
data:当前点击节点数据
checked:当前节点是否被选中,
indeterminate:当前节点中的子节点是否有选中状态

*/
      if (checked) {
        this.checkedKeys.push(data.index);
        
      } else {
        this.checkedKeys.splice(this.checkedKeys.indexOf(data.index), 1);
        
      }
    },
    getMenus() {
      this.updataRole.menus = this.checkedKeys;
      return this.updataRole;
    },
  },
};
</script>

<style scoped>
</style>