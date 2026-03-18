# Multiplikation-app

En liten, barnvänlig webapp för att öva multiplikationstabeller, byggd med Vue 3 och Vite.

## Funktioner

- Välj tabell 1–12
- 10 frågor per övningssession
- Växla mellan ordning (1→10) och slumpmässig ordning
- Sammanställning med poäng och procent efter sessionen

## Förutsättningar

- Node.js 18+ och npm eller pnpm

## Installera och köra

Installera beroenden och starta utvecklingsservern:

```bash
npm install
npm run dev
```

Bygg för produktion och förhandsgranska:

```bash
npm run build
npm run preview
```

## Projektstruktur

- `src/views/Home.vue` — startsida med tabellval och översikt
- `src/views/TablePractice.vue` — övningsvy (10 frågor, utvärdering)
- `src/style.css` — globala variabler och bakgrund
- `src/shims-vue.d.ts` — TypeScript-deklaration för `.vue`-filer

## Routing

- `/` — startsida
- `/table/:table` — öva vald tabell (t.ex. `/table/7`)

## Tips och vidare arbete

- Byt till `Slump` i övningen för mixade uppgifter.
- Jag kan lägga till persistence (localStorage) för att spara användarval.
- Vill du confetti, A11Y-förbättringar eller att spara resultat i localStorage, så implementerar jag det gärna.

---

Skicka ett meddelande om du vill att jag lägger till fler instruktioner eller förbättringar i README:n.
