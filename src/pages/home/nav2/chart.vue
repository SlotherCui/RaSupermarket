<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
      <!--<el-col :span="12">-->
        <!--<div id="chartBar" style="width:100%; height:400px;"></div>-->
      <!--</el-col>-->
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:380px;"></div>
      </el-col>
      <!--<el-col :span="12">-->
        <!--<div id="chartPie" style="width:100%; height:400px;"></div>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
        <!--<a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>-->
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
import echarts from 'echarts'
import {requestColumnChart, requestLineChart} from '../../../api/api'
export default {
  data () {
    return {
      commodity_name: ['', '', '', '', '', '', '', '', '', ''],
      sales_number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      sales_volume: [0, 0, 0, 0, 0, 0, 0],
      chartColumn: null,
      // chartBar: null,
      chartLine: null
      // chartPie: null
    }
  },

  methods: {
    drawColumnChart () {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'))
      this.chartColumn.setOption({
        title: {text: '销售量TOP10'},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.commodity_name,
          axisLabel: {
            interval: 0,
            rotate: -30
            // formatter: function (value) {
            //   var str = value.split('')
            //   return str.join('\n')
            // }
          }
          // 商品名称
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // name: '销量',
          type: 'bar',
          data: this.sales_number
          // 商品数目
        }]
      })
      let para = {}
      requestColumnChart(para).then((res) => {
        console.log('drawColumnChart', res)
        if (res.code === 0) {
          this.sales_number = res.data.sales_number
          this.commodity_name = res.data.commodity_name
          this.chartColumn.setOption({
            xAxis: {
              type: 'category',
              data: this.commodity_name
              // 商品名称
            },
            series: [{
              // name: '销量',
              type: 'bar',
              data: this.sales_number
              // 商品数目
            }]
          })
          // this.commodity_name = res.data.commodity_name
          // this.sales_number = res.data.sales_number
        } else {
          this.$message({message: '加载失败' + res.code, type: 'fail'})
        }
      })
    },
    // drawBarChart () {
    //   this.chartBar = echarts.init(document.getElementById('chartBar'))
    //   this.chartBar.setOption({
    //     title: {
    //       text: 'Bar Chart',
    //       subtext: '数据来自网络'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'shadow'
    //       }
    //     },
    //     legend: {
    //       data: ['2011年', '2012年']
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     xAxis: {
    //       type: 'value',
    //       boundaryGap: [0, 0.01]
    //     },
    //     yAxis: {
    //       type: 'category',
    //       data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    //     },
    //     series: [
    //       {
    //         name: '2011年',
    //         type: 'bar',
    //         data: [18203, 23489, 29034, 104970, 131744, 630230]
    //       },
    //       {
    //         name: '2012年',
    //         type: 'bar',
    //         data: [19325, 23438, 31000, 121594, 134141, 681807]
    //       }
    //     ]
    //   })
    // },
    getDay (day) {
      var today = new Date()
      var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetdayMilliseconds)
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tMonth + '-' + tDate
    },
    doHandleMonth (month) {
      var m = month
      if (month.toString().length === 1) {
        m = '0' + month
      }
      return m
    },
    drawLineChart () {
      this.chartLine = echarts.init(document.getElementById('chartLine'))
      this.chartLine.setOption({
        title: {
          text: '销售额'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['销售额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.getDay(-7), this.getDay(-6), this.getDay(-5), this.getDay(-4), this.getDay(-3), this.getDay(-2), this.getDay(-1)]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售额',
            type: 'line',
            stack: '总量',
            data: this.sales_volume
          }
          // {
          //   name: '联盟广告',
          //   type: 'line',
          //   stack: '总量',
          //   data: [220, 182, 191, 234, 290, 330, 310]
          // },
          // {
          //   name: '搜索引擎',
          //   type: 'line',
          //   stack: '总量',
          //   data: [820, 932, 901, 934, 1290, 1330, 1320]
          // }
        ]
      })
      let para = {}
      requestLineChart(para).then((res) => {
        console.log('drawLineChart', res)
        if (res.code === 0) {
          this.sales_volume = res.data.sales_volume.reverse()
          this.chartLine.setOption({
            series: [
              {
                name: '销售额',
                type: 'line',
                stack: '总量',
                data: this.sales_volume
              }
            ]
          })
        } else {
          this.$message({message: '加载失败' + res.code, type: 'fail'})
        }
      })
    },
    // drawPieChart () {
    //   this.chartPie = echarts.init(document.getElementById('chartPie'))
    //   this.chartPie.setOption({
    //     title: {
    //       text: 'Pie Chart',
    //       subtext: '纯属虚构',
    //       x: 'center'
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b} : {c} ({d}%)'
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       left: 'left',
    //       data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //     },
    //     series: [
    //       {
    //         name: '访问来源',
    //         type: 'pie',
    //         radius: '55%',
    //         center: ['50%', '60%'],
    //         data: [
    //           { value: 335, name: '直接访问' },
    //           { value: 310, name: '邮件营销' },
    //           { value: 234, name: '联盟广告' },
    //           { value: 135, name: '视频广告' },
    //           { value: 1548, name: '搜索引擎' }
    //         ],
    //         itemStyle: {
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //           }
    //         }
    //       }
    //     ]
    //   })
    // },
    drawCharts () {
      this.drawColumnChart()
      // this.drawBarChart()
      this.drawLineChart()
      // this.drawPieChart()
    }
  },

  mounted: function () {
    this.drawCharts()
  },
  updated: function () {
    this.drawCharts()
  }
}
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  /*.chart div {
      height: 400px;
      float: left;
  }*/

  .el-col {
    padding: 30px 20px;
  }
</style>
