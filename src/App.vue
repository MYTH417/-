<script setup>
import { useBills } from './composables/useBills'
import SummaryCard from './components/SummaryCard.vue'
import BillForm from './components/BillForm.vue'
import BillList from './components/BillList.vue'
import Charts from './components/Charts.vue'

const { bills } = useBills()
</script>

<template>
  <div class="app">
    <h1 class="title">我的记账本</h1>
    
    <SummaryCard />
    <!-- 刚才就是漏了下面这一行，导致表单不见了 -->
    <BillForm />
    <Charts v-if="bills.length > 0" />
    <!-- 刚才可能这里写重复了，现在只留一个 -->
    <BillList />
  </div>
</template>

<style>
body {
  margin: 0;
  background: #f5f6fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #2d3436;
}
.app {
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.title {
  text-align: center;
  font-size: 20px;
  margin: 0 0 10px 0;
}
</style>