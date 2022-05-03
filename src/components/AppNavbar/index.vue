
<script>
import memoryUtils from '@/utils/memoryUtils.js'
import menuList from "@/config/menuConfig.js";
export default {
  data() {
    return {
      menuNodes: "", //用来存储所有菜单键
    };
  },

  components: {},
  mounted() {
    this.menuNodes = this.getMenuNodes(menuList);
    // console.log(this.getMenuNodes(menuList));
  },
  methods: {
    getMenuNodes(menuList) {
      return menuList.map((item) => {
        if(this.hasAuth(item))
        {
          if (!item.children) {
          return (
            <el-menu-item index={item.index}>
              <i class={item.icon}></i>
              <span slot="title">{item.title}</span>
            </el-menu-item>
          );
        } else {
          return (
            <el-submenu index={item.index}>
              <template slot="title">
                <i class={item.icon}></i>
                <span>{item.title}</span>
              </template>
              {this.getMenuNodes(item.children)}
            </el-submenu>
          );
        }
        }
        
      });
    },
    hasAuth(item){
      const {index,isPublic}=item;
      const menus=memoryUtils.user.role.menus
      const username=memoryUtils.user.username;
      /* 如果用户是admin,全部通过
      2.如果当前item是公开的：全部通过
      3.当前用户有此item得权限：index是否在menus当中 */
      if(username=='admin' || isPublic || menus.indexOf(index)!==-1)
      {
        return true
      }else if(item.children){
       return !!item.children.find((child)=>menus.indexOf(child.index)!==-1)
      }
      return false
    }
  },
  render() {
    return (
      <div class="navbar">
        <el-menu
          router={true}
          default-active={this.$route.path}
          default-openeds={["/students"]}
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        {this.menuNodes}
        </el-menu>
      </div>
    );
  },
};
</script>

<style scoped>
.el-menu-vertical-demo{
    border:0
}
</style>