import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'accounting-bills-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const bills = ref(load())

watch(bills, (val) => localStorage.setItem(STORAGE_KEY, JSON.stringify(val)), { deep: true })

export function useBills() {
  const addBill = (bill) => {
    bills.value.unshift({
      id: Date.now() + Math.random(),
      ...bill, // 这里会自动包含你选择的 date
      amount: Number(bill.amount),
      createdAt: new Date().toISOString(),
    })
  }

  const removeBill = (id) => {
    bills.value = bills.value.filter((b) => b.id !== id)
  }

  const totalIncome = computed(() => bills.value.filter((b) => b.type === 'income').reduce((s, b) => s + b.amount, 0))
  const totalExpense = computed(() => bills.value.filter((b) => b.type === 'expense').reduce((s, b) => s + b.amount, 0))
  const balance = computed(() => totalIncome.value - totalExpense.value)

  return { bills, addBill, removeBill, totalIncome, totalExpense, balance }
}