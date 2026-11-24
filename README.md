# OVA educativo: Redes Neuronales Artificiales (RNA)

Objeto Virtual de Aprendizaje (OVA) **100% frontend** desarrollado con **Nuxt 3, Vue 3, TypeScript (Composition API), HTML5 y CSS moderno**, orientado a estudiantes sin conocimientos previos en inteligencia artificial, programación o matemáticas avanzadas.

## Requisitos previos

- Node.js 18 o superior (probado en Node.js 24)
- npm

## Ejecución local

```bash
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000`.

### Otros comandos útiles

```bash
# Verificación estricta de TypeScript
npm run typecheck

# Compilación de producción
npm run build

# Generación estática (SSG)
npm run generate
```

## Estructura pedagógica (5 niveles progresivos)

1. **Nivel 1 · Introducción y conceptos fundamentales:** qué es la IA, qué significa aprender, inspiración en el cerebro humano y programación tradicional vs. aprendizaje automático.
2. **Nivel 2 · Estructura de una red neuronal:** neurona artificial, entradas, pesos, sesgo (*bias*), función de activación, salida y capas. Incluye simulador interactivo de neurona.
3. **Nivel 3 · Funcionamiento y aprendizaje:** propagación hacia adelante, datos de entrenamiento, errores y retropropagación, con bloques matemáticos opcionales.
4. **Nivel 4 · Arquitecturas y aplicaciones:** redes de una capa, multicapa y profundas, aprendizaje supervisado y no supervisado, y aplicaciones cotidianas.
5. **Nivel 5 · Integración y evaluación:** síntesis integradora, actividades interactivas y evaluación final calificada.

## Personalización de contenidos y Tutor RNA

- **Contenidos de referencia:** Todo el texto didáctico se encuentra desacoplado en `data/learning-path.ts`, `data/lessons.ts` y `data/activities.ts`, listo para sustituirse por material académico oficial sin modificar los componentes visuales.
- **Tutor RNA:** Funciona 100% en el navegador (sin backend ni servicios externos) a partir de la base de conocimiento modular en `data/chatbot-responses.ts` y el composable `composables/useChatbot.ts`.
- **Seguimiento del aprendizaje:** El progreso en lecciones, actividades y evaluación final se almacena localmente mediante `localStorage` en `composables/useProgress.ts`.
