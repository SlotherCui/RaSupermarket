<template>
  <section class="chart-container">
    <el-row style="margin-top: 5%">
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:380px;"></div>
      </el-col>
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
      chartLine: null
    }
  },

  methods: {
    drawColumnChart () {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'))
      this.chartColumn.setOption({
        title: {text: this.$t('message.top_10')},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.commodity_name,
          axisLabel: {
            interval: 0,
            rotate: -30
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
        } else {
          this.$message({message: this.$t('message.loading_fail') + res.code, type: 'fail'})
        }
      })
    },
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
          text: this.$t('message.sales_volume')
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('message.sales_volume')]
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
          data: [this.getDay(-6), this.getDay(-5), this.getDay(-4), this.getDay(-3), this.getDay(-2), this.getDay(-1), this.getDay(0)]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$t('message.sales_volume'),
            type: 'line',
            stack: this.$t('message.total'),
            data: this.sales_volume
          }
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
                name: this.$t('message.sales_volume'),
                type: 'line',
                stack: this.$t('message.total'),
                data: this.sales_volume
              }
            ]
          })
        } else {
          this.$message({message: this.$t('message.loading_fail') + res.code, type: 'fail'})
        }
      })
    },
    drawCharts () {
      this.drawColumnChart()
      this.drawLineChart()
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

  .el-col {
    padding: 30px 20px;
  }
</style>
