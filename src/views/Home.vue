<template id="1a3n5s">
  <div class="container">
    <h1>Välj tabell för träning</h1>

    <p class="hint">
      Välj en tabell att öva på — tryck på en knapp för att börja!
    </p>

    <div class="grid">
      <button
        v-for="num in tables"
        :key="num"
        @click="goToTable(num)"
        class="table-btn"
        :aria-label="`Gå till ${num}:ans tabell`"
      >
        <span class="btn-icon" aria-hidden="true">🔢</span>
        <span class="btn-label">{{ num }}:ans tabell</span>
      </button>
    </div>
    <div class="tables">
      <h2>Tabeller 1–12</h2>
      <div class="tables-grid">
        <div v-for="n in tables" :key="'table-' + n" class="single-table">
          <h3>{{ n }}:ans tabell</h3>
          <table>
            <tbody>
              <tr v-for="i in 10" :key="i">
                <td>{{ n }} × {{ i }}</td>
                <td>=</td>
                <td>{{ n * i }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const tables = Array.from({ length: 12 }, (_, i) => i + 1)

const goToTable = (num) => {
  router.push(`/table/${num}`)
}
</script>

<style scoped>
.tables-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  color: black;
}

.single-table {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

td {
  width: fit-content;
  font-weight: 600;
}

tr:hover {
  background: #3b82f6;
  cursor: pointer;
}

@media (max-width: 900px) {
  .tables-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .tables-grid {
    grid-template-columns: 1fr;
  }
}

.hint {
  color: var(--muted);
  font-size: 14px;
  margin-top: 8px;
}

/* Home component styles moved from global stylesheet */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
}

.table-btn {
  font-size: 20px;
  padding: 20px 28px;
  min-width: 100%;
  border-radius: 10px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  color: black;
  font-weight: 600;
  border: 0;
  box-shadow: 0 6px 14px rgba(99, 102, 241, 0.12);
  cursor: pointer;
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.table-btn:active {
  transform: translateY(2px) scale(0.995);
}

.table-btn:focus {
  outline: 3px solid rgba(96, 165, 250, 0.25);
}

.btn-icon {
  font-size: 22px;
  line-height: 1;
  display: inline-block;
}

.btn-label {
  display: inline-block;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .table-btn {
    width: 100%;
  }
}
</style>
