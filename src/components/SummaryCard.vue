<script setup>
import { useBills } from '../composables/useBills'
const { totalIncome, totalExpense, balance } = useBills()
const fmt = (n) => '¥' + n.toFixed(2)
</script>

<template>
  <div class="summary">
    <div class="balance">
      <span>当前余额</span>
      <strong :class="{ neg: balance < 0 }">{{ fmt(balance) }}</strong>
    </div>
    <div class="row">
      <div class="item"><span>总收入</span><b>{{ fmt(totalIncome) }}</b></div>
      <div class="item"><span>总支出</span><b>{{ fmt(totalExpense) }}</b></div>
    </div>
  </div>
</template>

<style scoped>
.summary { background: linear-gradient(135deg, #0984e3, #6c5ce7); color: #fff; border-radius: 14px; padding: 18px; }
.balance { display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; }
.balance span { opacity: .85; font-size: 13px; }
.balance strong { font-size: 28px; }
.balance strong.neg { color: #ff7675; }
.row { display: flex; gap: 10px; }
.item { flex: 1; background: rgba(255,255,255,.15); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 2px; }
.item span { font-size: 12px; opacity: .85; }
.item b { font-size: 16px; }
</style>