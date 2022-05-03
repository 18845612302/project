<template>
 <div class="EchartPractice">
     <button icon="el-icon-arrow-left" @click="getPreYearDate">上一年</button>
<span>{{year}}年学员数量</span>
<button @click="getNextYearDate" icon="el-icon-arrow-left">下一年<i class='el-cion-arrow-right '></i></button>

<div id="main">
</div>
做一个轮盘抽奖
 </div>
</template>

<script>
import studentApi from '@/api/student.js'
export default {
    name:'EchartPractice',
 data () {
 return {
     year:new Date().getFullYear()
 }
 },

 components: {},
mounted() {
     this. getChars();
},

 methods: {
     getPreYearDate()
    {
this.year--;
this.getChars()
    },
    getNextYearDate()
    {
this.year++;
this.getChars()
    },
     getChars()
     {
studentApi.getStudentListForMonth(this.year).then(response=>{
    const res=response.data;
    if(res.status==0)
    {
//echarts渲染的dom
var chartDom=document.getElementById("main");
var myChart=this.$echarts.init(chartDom)
var option
let dataArr=[0];
if(res.data&&res.data.length)
{
    dataArr=res.data.map(item=>{
        return item.count;
    })
}else{
    this.$message({
        message:'当前年份无数据',
        type:'warning',
        duration:2*1000
    })
}
option={
     xAxis: {
                type: "category",
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: dataArr,
                  type: "bar",
                },
              ],
}
 option && myChart.setOption(option);
    }
})
     }
 }
}

</script>

<style scoped>
div{
    text-align: center;
}
  #main {
    width: 600px;
    height:400px;
    margin: auto;
    margin-top: 100px
  }
</style>