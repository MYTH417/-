<script setup>
import { onMounted, watch, ref } from 'vue'
import * as echarts from 'echarts'
import { useBills } from '../composables/useBills'
import { EXPENSE_CATEGORIES } from '../constants/categories'

const { bills } = useBills()
const pieRef = ref(null)
const barRef = ref(null)
let pie, bar

function renderPie() {
  const map = {}
  bills.value.filter(b => b.type === 'expense').forEach(b => {
    map[b.category] = (map[b.category] || 0) + b.amount
  })
  const data = Object.entries(map).map(([k, v]) => {
    const c = EXPENSE_CATEGORIES.find(x => x.value === k) || { label: k }
    return { name: c.label, value: +v.toFixed(2) }
  })
  pie.setOption({
    title: { text: '支出分类占比', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', formatter: '{b}: ¥{c} ({d}%)' },
    series: [{ type: 'pie', radius: ['35%', '65%'], center: ['50%', '55%'], data, label: { fontSize: 11 } }],
    color: ['#ff7675','#74b9ff','#fd79a8','#fdcb6e','#a29bfe','#55efc4','#b2bec3'],
  })
}

function renderBar() {
  const days = {}
  bills.value.forEach(b => {
    // 🌟 修复时区问题：使用本地时间的年月日
    const d = new Date(b.date || b.createdAt)
    // 加个判断防止无效日期
    if (isNaN(d.getTime())) return 
    
    const localDateStr = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    
    if (!days[localDateStr]) days[localDateStr] = { income: 0, expense: 0 }
    days[localDateStr][b.type] += b.amount
  })
  
  const dates = Object.keys(days).sort().slice(-7)
  
  bar.setOption({
    title: { text: '近 7 日收支', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, data: ['收入', '支出'] },
    grid: { left: 40, right: 20, top: 40, bottom: 40 },
    xAxis: { type: 'category', data: dates },
    yAxis: { type: 'value' },
    series: [
      { name: '收入', type: 'bar', data: dates.map(d => days[d].income), itemStyle: { color: '#00b894' } },
      { name: '支出', type: 'bar', data: dates.map(d => days[d].expense), itemStyle: { color: '#ff7675' } }
    ]
  })
}

onMounted(() => {
  pie = echarts.init(pieRef.value)
  bar = echarts.init(barRef.value)
  renderPie(); renderBar()
  window.addEventListener('resize', () => { pie?.resize(); bar?.resize() })
})

watch(bills, () => { renderPie(); renderBar() }, { deep: true })
</script>

<template>
  <div class="chart-card">
    <div ref="pieRef" style="height: 220px;"></div>
    <div ref="barRef" style="height: 220px; margin-top: 10px;"></div>
  </div>
</template>

<style scoped>
.chart-card { background: #fff; border-radius: 14px; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
</style>