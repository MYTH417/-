<script setup>
import { ref } from 'vue'
import { useBills } from '../composables/useBills'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/categories'

const { addBill } = useBills()
const type = ref('expense')
const amount = ref('')
const category = ref('food')
const note = ref('')
const date = ref(new Date().toISOString().slice(0, 10))

const categories = () => (type.value === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES)

function onTypeChange() {
  category.value = categories()[0].value
}

function submit() {
  if (!amount.value || Number(amount.value) <= 0) {
    alert('请输入有效金额')
    return
  }
  addBill({ 
    type: type.value, 
    amount: amount.value, 
    category: category.value, 
    note: note.value.trim(),
    date: date.value 
  })
  amount.value = ''
  note.value = ''
}
</script>

<template>
  <div class="card">
    <div class="tabs">
      <button :class="{ active: type === 'expense' }" @click="type = 'expense'; onTypeChange()">支出</button>
      <button :class="{ active: type === 'income' }" @click="type = 'income'; onTypeChange()">收入</button>
    </div>
    <input v-model="amount" type="number" placeholder="金额" inputmode="decimal" />
    <div class="cat-grid">
      <button v-for="c in categories()" :key="c.value" class="cat" :class="{ selected: category === c.value }" @click="category = c.value">
        <span>{{ c.icon }}</span>{{ c.label }}
      </button>
    </div>
    <input v-model="note" placeholder="备注（可选）" />
    <input v-model="date" type="date" />
    <button class="submit" @click="submit">添加账单</button>
  </div>
</template>

<style scoped>
.card { background: #fff; border-radius: 14px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
.tabs { display: flex; gap: 8px; margin-bottom: 12px; }
.tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; background: #f1f2f6; font-size: 15px; }
.tabs button.active { background: #2d3436; color: #fff; }
input { width: 100%; padding: 12px; border: 1px solid #e1e4e8; border-radius: 8px; margin-bottom: 10px; font-size: 15px; box-sizing: border-box; }
.cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 10px; }
.cat { padding: 8px 4px; border: 1px solid #e1e4e8; border-radius: 8px; background: #fff; font-size: 12px; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.cat span { font-size: 18px; }
.cat.selected { border-color: #0984e3; background: #e8f4ff; }
.submit { width: 100%; padding: 14px; background: #0984e3; color: #fff; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; }
</style>