export const EXPENSE_CATEGORIES = [
  { value: 'food', label: '餐饮', icon: '🍜', color: '#ff7675' },
  { value: 'transport', label: '交通', icon: '🚗', color: '#74b9ff' },
  { value: 'shopping', label: '购物', icon: '🛍️', color: '#fd79a8' },
  { value: 'housing', label: '居住', icon: '🏠', color: '#fdcb6e' },
  { value: 'entertainment', label: '娱乐', icon: '🎮', color: '#a29bfe' },
  { value: 'medical', label: '医疗', icon: '💊', color: '#55efc4' },
  { value: 'other_expense', label: '其他', icon: '📦', color: '#b2bec3' },
]

export const INCOME_CATEGORIES = [
  { value: 'salary', label: '工资', icon: '💰', color: '#00b894' },
  { value: 'bonus', label: '奖金', icon: '🎁', color: '#00cec9' },
  { value: 'investment', label: '理财', icon: '📈', color: '#0984e3' },
  { value: 'other_income', label: '其他', icon: '💵', color: '#6c5ce7' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export const getCategory = (value) =>
  ALL_CATEGORIES.find((c) => c.value === value) || { label: '未知', icon: '❓', color: '#999' }