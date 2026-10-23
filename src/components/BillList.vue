<script setup>
import { ref } from 'vue'
import { useBills } from '../composables/useBills'
import { getCategory } from '../constants/categories'

const { bills, removeBill } = useBills()
const fmt = (n) => '¥' + n.toFixed(2)
const fmtDate = (d) => {
  if (!d) return ''
  return d.includes('T') ? d.split('T')[0] : d
}

// 弹窗状态控制
const showDeleteModal = ref(false)
const deleteTargetId = ref(null)

// 点击删除时，打开弹窗，记下 ID
function openDeleteModal(id) {
  deleteTargetId.value = id
  showDeleteModal.value = true
}

// 点击确定删除
function confirmDelete() {
  if (deleteTargetId.value !== null) {
    removeBill(deleteTargetId.value)
    showDeleteModal.value = false
    deleteTargetId.value = null
  }
}

// 点击取消删除
function cancelDelete() {
  showDeleteModal.value = false
  deleteTargetId.value = null
}
</script>

<template>
  <div class="card">
    <h3>账单记录（{{ bills.length }}）</h3>
    <p v-if="!bills.length" class="empty">还没有账单，先添加一条吧～</p>
    <ul>
      <li v-for="b in bills" :key="b.id">
        <span class="icon" :style="{ background: getCategory(b.category).color + '22' }">
          {{ getCategory(b.category).icon }}
        </span>
        <div class="info">
          <div class="line1">
            <b>{{ getCategory(b.category).label }}</b>
            <span class="amount" :class="b.type">
              {{ b.type === 'income' ? '+' : '-' }}{{ fmt(b.amount) }}
            </span>
          </div>
          <div class="line2">
            <span>{{ fmtDate(b.date || b.createdAt) }}</span>
            <span v-if="b.note">· {{ b.note }}</span>
          </div>
        </div>
        <!-- 注意这里的点击事件 -->
        <button class="del" @click="openDeleteModal(b.id)">删除</button>
      </li>
    </ul>

    <!-- 自定义居中弹窗 -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal-content">
        <h4>确认删除</h4>
        <p>确定要删除这条账单吗？删除后无法恢复。</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancelDelete">取消</button>
          <button class="btn-confirm" @click="confirmDelete">确定删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 列表样式 */
.card { background: #fff; border-radius: 14px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,.06); position: relative; }
h3 { margin: 0 0 12px; font-size: 16px; }
.empty { color: #999; font-size: 14px; text-align: center; padding: 20px 0; }
ul { list-style: none; padding: 0; margin: 0; }
li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f1f2f6; }
li:last-child { border-bottom: none; }
.icon { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.info { flex: 1; min-width: 0; }
.line1 { display: flex; justify-content: space-between; font-size: 15px; }
.amount.income { color: #00b894; }
.amount.expense { color: #d63031; }
.line2 { font-size: 12px; color: #999; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.del { background: none; border: 1px solid #ff7675; color: #ff7675; border-radius: 6px; padding: 4px 10px; font-size: 12px; flex-shrink: 0; cursor: pointer; }

/* 居中弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  width: 80%;
  max-width: 300px;
  border-radius: 14px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  animation: popIn 0.15s ease-out;
}
.modal-content h4 { margin: 0 0 10px; font-size: 18px; color: #2d3436; }
.modal-content p { margin: 0 0 20px; font-size: 14px; color: #636e72; }
.modal-actions { display: flex; gap: 10px; }
.modal-actions button {
  flex: 1; padding: 10px; border-radius: 8px; font-size: 15px; border: none; cursor: pointer; font-weight: 500;
}
.btn-cancel { background: #f1f2f6; color: #636e72; }
.btn-confirm { background: #ff7675; color: #fff; }

@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>