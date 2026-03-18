<template id="r8z2qd">
  <div class="container">
    <div class="practice-card">
      <h1 class="big-title">{{ table }}:ans tabell</h1>

      <div v-if="!evaluated">
        <div class="top-actions">
          <button
            class="back-btn"
            @click="goBack"
            aria-label="Tillbaka till startsidan"
          >
            <span class="back-icon">←</span>
            <span class="back-label">Tillbaka</span>
          </button>
        </div>
        <div class="progress">
          Fråga {{ currentQuestion + 1 }} av {{ totalQuestions }}
        </div>
        <div class="mode-toggle">
          <span class="mode-label">Visa tal:</span>
          <label class="mode-option">
            <input
              type="radio"
              name="mode"
              value="ordered"
              v-model="mode"
              @change="setMode(mode)"
            />
            1→10
          </label>
          <label class="mode-option">
            <input
              type="radio"
              name="mode"
              value="random"
              v-model="mode"
              @change="setMode(mode)"
            />
            Slump
          </label>
        </div>
        <h2 class="big-mult">{{ table }} × {{ questions[currentQuestion] }}</h2>

        <div class="practice-row">
          <input
            ref="answerRef"
            type="number"
            class="answer-input"
            v-model="answers[currentQuestion]"
            placeholder="Skriv svar"
            @keyup.enter="nextQuestion"
            aria-label="Skriv ditt svar"
          />
        </div>

        <div class="card-actions">
          <button
            class="action-btn secondary"
            @click="prevQuestion"
            :disabled="currentQuestion === 0"
          >
            Föregående
          </button>
          <button class="action-btn" @click="nextOrFinish">
            {{
              currentQuestion + 1 < totalQuestions
                ? 'Nästa'
                : 'Klar — Kolla alla'
            }}
          </button>
        </div>
      </div>

      <div v-else class="summary">
        <h2>Sammanställning — Tabell {{ table }}</h2>
        <p class="summary-line">
          Du fick <strong>{{ score }}</strong> av {{ totalQuestions }} rätt.
        </p>
        <p class="summary-line">
          Procent: <strong>{{ percent }}%</strong>
        </p>

        <ul class="summary-list">
          <li v-for="(h, idx) in history" :key="idx" class="summary-item">
            <span class="idx">{{ idx + 1 }}.</span>
            <span class="expr"
              >{{ table }} × {{ h.multiplier }} = {{ h.correctAnswer }}</span
            >
            <span class="user">Du: {{ h.answer || 'inget' }}</span>
            <span class="res" :class="h.correct ? 'ok' : 'bad'">{{
              h.correct ? 'Rätt' : 'Fel'
            }}</span>
          </li>
        </ul>

        <div class="card-actions">
          <button class="action-btn" @click="startSession">Börja om</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const table = ref(Number(route.params.table) || 1)

const totalQuestions = 10
const currentQuestion = ref(0)
const questions = ref([])
const answers = ref([])
const evaluated = ref(false)
const score = ref(0)
const history = ref([])
const mode = ref('ordered')
const answerRef = ref(null)

const percent = computed(() => {
  if (totalQuestions === 0) return 0
  return Math.round((score.value / totalQuestions) * 100)
})

function generateSession() {
  // Generate multipliers based on mode: ordered 1..10 or random 1..10
  if (mode.value === 'ordered') {
    questions.value = Array.from({ length: totalQuestions }, (_, i) => i + 1)
  } else {
    questions.value = Array.from({ length: totalQuestions }, () =>
      Math.ceil(Math.random() * 10)
    )
  }
  answers.value = Array.from({ length: totalQuestions }, () => '')
  evaluated.value = false
  score.value = 0
  history.value = []
  currentQuestion.value = 0
}

function setMode(m) {
  mode.value = m
  startSession()
}

function nextQuestion() {
  if (currentQuestion.value + 1 < totalQuestions) {
    currentQuestion.value += 1
    focusInput()
  }
}

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value -= 1
    focusInput()
  }
}

function nextOrFinish() {
  if (currentQuestion.value + 1 < totalQuestions) {
    nextQuestion()
    return
  }
  evaluateAll()
}

function evaluateAll() {
  score.value = 0
  history.value = questions.value.map((m, i) => {
    const correctAnswer = table.value * m
    const userAns = answers.value[i] ? parseInt(answers.value[i]) : NaN
    const correct = userAns === correctAnswer
    if (correct) score.value += 1
    return { multiplier: m, answer: answers.value[i], correct, correctAnswer }
  })
  evaluated.value = true
}

function startSession() {
  generateSession()
  focusInput()
}

function focusInput() {
  nextTick(() => {
    const el = answerRef.value
    if (el && typeof el.focus === 'function') el.focus()
  })
}

function goBack() {
  router.push('/')
}

onMounted(() => startSession())

watch(
  () => route.params.table,
  (newVal) => {
    table.value = Number(newVal) || 1
    startSession()
  }
)
</script>
<style scoped>
/* Clean, kid-friendly practice styling */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.practice-card {
  width: 100%;
  max-width: 560px;
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
  text-align: center;
  color: #0f172a;
  position: relative;
}

.big-title {
  font-size: 34px;
  margin: 0 0 6px;
  color: var(--accent);
}

.progress {
  color: #0f172a;
  font-weight: 700;
  margin-bottom: 6px;
}

.top-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  justify-content: flex-end;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(16, 185, 129, 0.16);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    opacity 0.12s;
  font-weight: 700;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.18);
}

.back-icon {
  font-weight: 900;
}

.back-label {
  display: inline-block;
}

.mode-toggle {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  color: #0f172a;
}

.mode-option {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.03);
  color: #0f172a;
  font-weight: 600;
}

.big-mult {
  font-size: 26px;
  margin: 0 0 14px;
  color: #0f172a;
}

.practice-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
}

.answer-input {
  font-size: 20px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  width: 140px;
  text-align: center;
}

.answer-input:focus {
  outline: 3px solid rgba(16, 185, 129, 0.16);
}

/* Hide number input spinners (WebKit & Firefox) */
input.answer-input::-webkit-outer-spin-button,
input.answer-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.answer-input {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}

.action-btn {
  font-size: 18px;
  padding: 12px 18px;
  border-radius: 12px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 185, 129, 0.12);
}

.action-btn.secondary {
  background: transparent;
  color: var(--accent);
  border: 2px solid rgba(16, 185, 129, 0.12);
}

.action-btn:active {
  transform: translateY(2px);
}

.result-anim {
  font-weight: 800;
  font-size: 18px;
  margin: 12px 0;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 10px;
}

.correct.result-anim {
  background: rgba(34, 197, 94, 0.12);
  color: #059669;
}

.wrong.result-anim {
  background: rgba(239, 68, 68, 0.08);
  color: #b91c1c;
}

.summary {
  color: #0f172a;
}

.summary-line {
  color: #0f172a;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}

.summary-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.summary-item .idx {
  width: 28px;
  color: #374151;
  font-weight: 700;
}

.summary-item .expr {
  flex: 1;
  color: #374151;
}

.summary-item .user {
  width: 110px;
  color: #374151;
}

.summary-item .res {
  width: 70px;
  text-align: right;
  font-weight: 700;
}

.summary-item .res.ok {
  color: #059669;
}

.summary-item .res.bad {
  color: #b91c1c;
}

.card-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
}

@media (max-width: 520px) {
  .practice-card {
    padding: 18px;
  }

  .big-title {
    font-size: 28px;
  }

  .big-mult {
    font-size: 22px;
  }

  .answer-input {
    width: 120px;
  }
}
</style>
