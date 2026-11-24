import type { ChatbotKnowledgeEntry, ChatSuggestedLink } from '~/types/chatbot'

/**
 * Base de conocimiento independiente para Tutor RNA.
 * 100% local (sin backend ni conexiones a modelos externos).
 * Diseñada para ampliarse o editarse fácilmente sin tocar la interfaz ni el composable.
 */
export const TUTOR_WELCOME_MESSAGE =
  '¡Hola! Soy Tutor RNA, tu guía de estudio dentro de este OVA. Funciono con explicaciones preparadas especialmente para principiantes (sin conexión a servidores externos). Puedes preguntarme sobre neuronas artificiales, pesos, sesgo, entrenamiento, retropropagación o aplicaciones cotidianas.'

export const TUTOR_SUGGESTED_QUESTIONS: string[] = [
  '¿Qué es una red neuronal artificial?',
  '¿Para qué sirven los pesos y el sesgo?',
  '¿Qué es la función de activación?',
  '¿Cómo aprende una red neuronal?',
  '¿Qué es la retropropagación?',
  '¿Diferencia entre supervisado y no supervisado?'
]

export const TUTOR_FALLBACK_LINKS: ChatSuggestedLink[] = [
  { label: 'Explorar la Ruta de aprendizaje', to: '/learning' },
  { label: 'Ir al Nivel 1: Fundamentos', to: '/lessons/que-es-la-ia-y-aprender' },
  { label: 'Practicar en Actividades', to: '/activities' }
]

export const CHATBOT_KNOWLEDGE: ChatbotKnowledgeEntry[] = [
  {
    id: 'kb-ia',
    category: 'Nivel 1 · Fundamentos',
    levelId: 1,
    questionExample: '¿Qué es la inteligencia artificial?',
    keywords: ['inteligencia artificial', 'que es ia', 'ia', 'maquina aprende', 'aprender'],
    exactTriggers: ['inteligencia artificial', 'que es la ia'],
    answer:
      'La Inteligencia Artificial (IA) es el campo de la tecnología que crea programas capaces de hacer tareas que suelen requerir habilidades humanas, como reconocer una voz, traducir un texto o identificar objetos en una foto. Que una máquina "aprenda" no significa que tenga emociones ni conciencia, sino que analiza muchos ejemplos y ajusta sus cálculos para mejorar.',
    everydayTip:
      'Piensa en cómo un niño aprende a distinguir manzanas de mangos viendo varios ejemplos, sin memorizar un manual de medidas exactas.',
    relatedLinks: [
      { label: 'Lección 1.1: ¿Qué es la IA y qué significa aprender?', to: '/lessons/que-es-la-ia-y-aprender' }
    ]
  },
  {
    id: 'kb-rna',
    category: 'Nivel 1 · Fundamentos',
    levelId: 1,
    questionExample: '¿Qué es una red neuronal artificial?',
    keywords: ['red neuronal', 'redes neuronales', 'rna', 'que es una rna', 'definicion'],
    exactTriggers: ['red neuronal artificial', 'que es una red neuronal', 'redes neuronales'],
    answer:
      'Una Red Neuronal Artificial (RNA) es un sistema formado por muchas pequeñas unidades conectadas llamadas neuronas artificiales. Cada una recibe pistas numéricas, realiza un cálculo simple y pasa el resultado a las siguientes. Al trabajar en equipo, pueden reconocer imágenes, voces, textos o patrones complejos.',
    everydayTip:
      'Una sola neurona hace una decisión pequeñita, pero cientos o miles conectadas logran resolver tareas sorprendentes.',
    relatedLinks: [
      { label: 'Lección 1.2: ¿Qué son las redes neuronales artificiales?', to: '/lessons/redes-neuronales-y-cerebro' }
    ]
  },
  {
    id: 'kb-cerebro',
    category: 'Nivel 1 · Fundamentos',
    levelId: 1,
    questionExample: '¿Qué relación tienen con el cerebro humano?',
    keywords: ['cerebro', 'humano', 'biologico', 'biologia', 'por que se llaman', 'nombre'],
    exactTriggers: ['cerebro humano', 'por que se llaman redes neuronales'],
    answer:
      'Se llaman redes neuronales porque se inspiran en cómo las neuronas del cerebro humano se conectan y fortalecen sus vínculos al aprender. Sin embargo, no son una copia biológica exacta: funcionan con números y operaciones digitales, igual que los aviones se inspiran en las aves pero vuelan con alas rígidas y turbinas en lugar de plumas.',
    relatedLinks: [
      { label: 'Lección 1.2: Redes neuronales y cerebro humano', to: '/lessons/redes-neuronales-y-cerebro' }
    ]
  },
  {
    id: 'kb-tradicional-vs-ml',
    category: 'Nivel 1 · Fundamentos',
    levelId: 1,
    questionExample: '¿Cuál es la diferencia entre programación tradicional y aprendizaje automático?',
    keywords: ['programacion tradicional', 'tradicional', 'reglas', 'machine learning', 'aprendizaje automatico', 'diferencia'],
    exactTriggers: ['programacion tradicional', 'aprendizaje automatico'],
    answer:
      'En la programación tradicional, una persona escribe manualmente todas las reglas ("si pasa esto, haz aquello"), ideal para tareas exactas como calcular un impuesto. En el aprendizaje automático, le entregamos muchos ejemplos al sistema para que descubra por sí mismo los patrones, ideal para tareas variadas como reconocer rostros o voces.',
    relatedLinks: [
      { label: 'Lección 1.3: Programación tradicional vs. Aprendizaje automático', to: '/lessons/programacion-tradicional-vs-aprendizaje' }
    ]
  },
  {
    id: 'kb-neurona-entradas',
    category: 'Nivel 2 · Estructura',
    levelId: 2,
    questionExample: '¿Qué es una neurona artificial y qué son las entradas?',
    keywords: ['neurona artificial', 'neurona', 'entrada', 'entradas', 'input', 'inputs', 'pistas'],
    exactTriggers: ['neurona artificial', 'que son las entradas'],
    answer:
      'Una neurona artificial es la unidad básica de una red: recibe datos, los evalúa y entrega una respuesta. Sus entradas (inputs) son las pistas iniciales convertidas en números, por ejemplo: qué tan nublado está el cielo o cuál es la probabilidad de lluvia.',
    everydayTip:
      'Antes de salir de casa, tus ojos miran el cielo y el clima: esas observaciones son las entradas que usa tu decisión.',
    relatedLinks: [
      { label: 'Lección 2.1: La neurona artificial y sus entradas', to: '/lessons/la-neurona-artificial-y-entradas' }
    ]
  },
  {
    id: 'kb-pesos-sesgo',
    category: 'Nivel 2 · Estructura',
    levelId: 2,
    questionExample: '¿Para qué sirven los pesos y el sesgo (bias)?',
    keywords: ['peso', 'pesos', 'weight', 'weights', 'sesgo', 'bias', 'importancia', 'umbral'],
    exactTriggers: ['pesos y sesgo', 'que es el sesgo', 'que es el bias', 'que son los pesos'],
    answer:
      'Los pesos (weights) indican cuánta importancia tiene cada entrada: un peso alto significa que esa pista influye mucho; uno negativo significa que empuja en contra. El sesgo (bias) es un ajuste interno propio de la neurona que define qué tan fácil o exigente es que se active. ¡Cuando una red aprende, lo que ajusta principalmente son sus pesos y sesgos!',
    everydayTip:
      'En el ejemplo del paraguas, el peso es cuánto confías en el pronóstico y el sesgo es qué tan precavido eres.',
    relatedLinks: [
      { label: 'Lección 2.2 + Simulador interactivo de neurona', to: '/lessons/pesos-y-sesgo' }
    ]
  },
  {
    id: 'kb-activacion-salida-capas',
    category: 'Nivel 2 · Estructura',
    levelId: 2,
    questionExample: '¿Qué es la función de activación, la salida y las capas?',
    keywords: ['activacion', 'funcion de activacion', 'salida', 'output', 'capas', 'capa oculta', 'capas ocultas', 'conexion'],
    exactTriggers: ['funcion de activacion', 'capas ocultas', 'que es una salida'],
    answer:
      'La función de activación toma el puntaje combinado de la neurona y decide con qué intensidad debe responder (como un filtro o termostato). Esa respuesta es la salida (output). Al agrupar muchas neuronas, se forman tres zonas: capa de entrada (recibe los datos), capas ocultas (procesan patrones intermedios) y capa de salida (entrega la respuesta final).',
    relatedLinks: [
      { label: 'Lección 2.3: Activación, salida y conexiones', to: '/lessons/activacion-salida-y-conexiones' },
      { label: 'Actividad: Identifica las partes de una neurona', to: '/activities' }
    ]
  },
  {
    id: 'kb-forward',
    category: 'Nivel 3 · Aprendizaje',
    levelId: 3,
    questionExample: '¿Qué es la propagación hacia adelante?',
    keywords: ['propagacion hacia adelante', 'hacia adelante', 'forward', 'flujo', 'como procesa', 'prediccion'],
    exactTriggers: ['propagacion hacia adelante', 'forward propagation'],
    answer:
      'La propagación hacia adelante es el viaje que hacen los datos desde la capa de entrada, pasando por las capas ocultas, hasta llegar a la capa de salida. En cada paso las neuronas aplican sus pesos, sesgos y activaciones para producir una predicción o respuesta.',
    relatedLinks: [
      { label: 'Lección 3.1: Flujo de información hacia adelante', to: '/lessons/flujo-de-informacion-hacia-adelante' }
    ]
  },
  {
    id: 'kb-entrenamiento',
    category: 'Nivel 3 · Aprendizaje',
    levelId: 3,
    questionExample: '¿Cómo aprende o se entrena una red neuronal?',
    keywords: ['entrenar', 'entrenamiento', 'datos de entrenamiento', 'error', 'errores', 'como aprende', 'equivoca'],
    exactTriggers: ['como aprende', 'entrenar una red', 'datos de entrenamiento'],
    answer:
      'Al principio una red neuronal no sabe nada porque sus pesos son aleatorios. Durante el entrenamiento le mostramos muchos ejemplos (datos de entrenamiento), hace una predicción, medimos qué tanto se equivocó (el error) y ajustamos un poco sus pesos para mejorar. Repetir ese ciclo muchas veces hace que el error baje y sus aciertos aumenten.',
    everydayTip:
      'Es como aprender a encestar un balón: ves dónde cayó tu tiro y corriges un poco la fuerza en el siguiente intento.',
    relatedLinks: [
      { label: 'Lección 3.2: Entrenamiento, datos y errores', to: '/lessons/entrenamiento-datos-y-errores' }
    ]
  },
  {
    id: 'kb-backprop',
    category: 'Nivel 3 · Aprendizaje',
    levelId: 3,
    questionExample: '¿Qué es la retropropagación?',
    keywords: ['retropropagacion', 'backpropagation', 'hacia atras', 'corregir', 'ajuste', 'ajustar pesos'],
    exactTriggers: ['retropropagacion', 'backpropagation'],
    answer:
      'La retropropagación es el proceso que toma el error obtenido en la salida y envía esa corrección hacia atrás, capa por capa. Así la red descubre qué pesos influyeron más en la equivocación y los ajusta suavemente para acertar mejor la próxima vez.',
    everydayTip:
      'Como probar una sopa demasiado salada y revisar hacia atrás en la receta qué paso aportó demasiada sal.',
    relatedLinks: [
      { label: 'Lección 3.3: Corregir el rumbo (retropropagación)', to: '/lessons/corregir-el-rumbo-retropropagacion' }
    ]
  },
  {
    id: 'kb-arquitecturas',
    category: 'Nivel 4 · Arquitecturas',
    levelId: 4,
    questionExample: '¿Qué diferencia hay entre una capa, multicapa y redes profundas?',
    keywords: ['una capa', 'multicapa', 'profunda', 'profundas', 'deep learning', 'arquitectura', 'arquitecturas', 'tipos'],
    exactTriggers: ['red profunda', 'deep learning', 'una capa', 'multicapa'],
    answer:
      'Una red de una capa conecta entradas y salida directamente, útil solo para problemas simples. Una red multicapa añade capas ocultas para captar relaciones más ricas. Y una red neuronal profunda (Deep Learning) apila muchas capas ocultas que aprenden paso a paso: desde trazos simples hasta conceptos complejos como rostros o frases.',
    relatedLinks: [
      { label: 'Lección 4.1: De una capa a redes profundas', to: '/lessons/de-una-capa-a-redes-profundas' }
    ]
  },
  {
    id: 'kb-supervisado',
    category: 'Nivel 4 · Arquitecturas',
    levelId: 4,
    questionExample: '¿Cuál es la diferencia entre aprendizaje supervisado y no supervisado?',
    keywords: ['supervisado', 'no supervisado', 'etiqueta', 'etiquetas', 'label', 'agrupar'],
    exactTriggers: ['aprendizaje supervisado', 'no supervisado', 'supervisado y no supervisado'],
    answer:
      'En el aprendizaje supervisado cada ejemplo trae su respuesta correcta o etiqueta (como fotos ya marcadas como "perro" o "gato"). En el aprendizaje no supervisado los datos no llevan etiquetas y el sistema busca por sí mismo similitudes y grupos naturales.',
    relatedLinks: [
      { label: 'Lección 4.2: Supervisado y no supervisado', to: '/lessons/aprendizaje-supervisado-y-no-supervisado' }
    ]
  },
  {
    id: 'kb-aplicaciones',
    category: 'Nivel 4 · Aplicaciones',
    levelId: 4,
    questionExample: '¿Para qué se usan las redes neuronales en la vida cotidiana?',
    keywords: ['aplicaciones', 'usos', 'vida cotidiana', 'imagenes', 'voz', 'recomendaciones', 'lenguaje', 'ejemplos reales', 'para que sirven'],
    exactTriggers: ['vida cotidiana', 'para que sirven', 'aplicaciones'],
    answer:
      'Las redes neuronales se utilizan todos los días en cuatro grandes áreas: reconocimiento de imágenes (fotos, diagnóstico médico asistido), reconocimiento de voz (subtítulos y dictado), sistemas de recomendación (música, películas y cursos) y procesamiento del lenguaje (traducción y corrección contextual).',
    relatedLinks: [
      { label: 'Lección 4.3: Aplicaciones en la vida cotidiana', to: '/lessons/aplicaciones-en-la-vida-cotidiana' }
    ]
  },
  {
    id: 'kb-matematicas',
    category: 'Guía de estudio',
    levelId: 1,
    questionExample: '¿Necesito saber matemáticas avanzadas o programación para aprender esto?',
    keywords: ['matematicas', 'programar', 'programacion', 'dificil', 'requisitos', 'empezar', 'principiante'],
    exactTriggers: ['necesito matematicas', 'necesito saber programar'],
    answer:
      '¡No necesitas conocimientos previos de programación ni matemáticas avanzadas! Este OVA explica cada concepto primero con ideas y ejemplos de la vida cotidiana. En el Nivel 3 encontrarás bloques matemáticos completamente opcionales solo por si deseas curiosear.',
    relatedLinks: [
      { label: 'Comenzar desde el Nivel 1', to: '/lessons/que-es-la-ia-y-aprender' }
    ]
  },
  {
    id: 'kb-evaluacion-progreso',
    category: 'Guía del OVA',
    levelId: 5,
    questionExample: '¿Cómo funciona el progreso y la evaluación final?',
    keywords: ['evaluacion', 'examen', 'nota', 'progreso', 'localstorage', 'guardar', 'desbloquear', 'niveles'],
    exactTriggers: ['evaluacion final', 'como funciona el progreso'],
    answer:
      'Tu avance en lecciones, actividades y evaluación final se guarda automáticamente en tu navegador (mediante localStorage), sin necesidad de crear una cuenta. Los niveles se desbloquean al completar el anterior, aunque en la Ruta de aprendizaje también puedes activar el "Modo exploración libre" si quieres revisar cualquier tema.',
    relatedLinks: [
      { label: 'Ver Ruta de aprendizaje', to: '/learning' },
      { label: 'Ir a Evaluación final', to: '/evaluation' }
    ]
  },
  {
    id: 'kb-saludo',
    category: 'Guía del OVA',
    levelId: 1,
    questionExample: 'Saludo inicial',
    keywords: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'gracias', 'ayuda'],
    answer:
      '¡Hola! Me alegra acompañarte en tu aprendizaje sobre Redes Neuronales Artificiales. Puedes escribir tu duda con tus propias palabras o elegir una de las preguntas sugeridas para empezar.',
    relatedLinks: [
      { label: 'Explorar la Ruta de aprendizaje', to: '/learning' }
    ]
  }
]
