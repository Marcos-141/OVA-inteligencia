import type {
  ActivityModule,
  AnatomyHotspot,
  EvaluationQuestion,
  MatchingActivityData,
  MultipleChoiceItem,
  TrueFalseItem
} from '~/types/activity'

/**
 * Banco de actividades interactivas y evaluación final del OVA.
 * Material introductorio de referencia preparado para fácil ampliación o sustitución.
 */
export const ACTIVITY_MODULES: ActivityModule[] = [
  {
    id: 'act-anatomy',
    levelId: 2,
    title: 'Identifica las partes de una neurona artificial',
    description:
      'Haz clic en el componente correcto del diagrama según la pista que te mostramos.',
    kind: 'neuron-anatomy',
    estimatedMinutes: 3
  },
  {
    id: 'act-matching',
    levelId: 2,
    title: 'Asocia cada concepto con su analogía cotidiana',
    description:
      'Relaciona los términos clave de una red neuronal con situaciones fáciles de recordar.',
    kind: 'matching',
    estimatedMinutes: 4
  },
  {
    id: 'act-true-false',
    levelId: 3,
    title: 'Verdadero o Falso: mitos y realidades de las RNA',
    description:
      'Comprueba qué afirmaciones sobre el aprendizaje de las redes neuronales son ciertas y cuáles son mitos.',
    kind: 'true-false',
    estimatedMinutes: 4
  },
  {
    id: 'act-multiple-choice',
    levelId: 4,
    title: 'Casos prácticos de selección múltiple',
    description:
      'Aplica lo aprendido para identificar enfoques, arquitecturas y usos cotidianos.',
    kind: 'multiple-choice',
    estimatedMinutes: 5
  }
]

export const NEURON_ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'inputs',
    label: 'Entradas',
    roleDescription: 'Son los datos numéricos iniciales o pistas que recibe la neurona.',
    everydayAnalogy: 'Las observaciones del clima antes de salir (nubes, pronóstico, viento).',
    prompt: 'Señala dónde llegan las pistas o datos iniciales a la neurona.'
  },
  {
    id: 'weights',
    label: 'Pesos',
    roleDescription: 'Indican cuánta importancia o influencia tiene cada entrada.',
    everydayAnalogy: 'Darle mucha importancia al pronóstico de lluvia y poca a una brisa leve.',
    prompt: 'Señala el componente que define cuánta importancia tiene cada pista.'
  },
  {
    id: 'bias',
    label: 'Sesgo (Bias)',
    roleDescription: 'Ajuste interno que facilita o dificulta que la neurona se active.',
    everydayAnalogy: 'Qué tan precavido eres: llevar paraguas ante cualquier duda o solo si llueve fuerte.',
    prompt: 'Señala el ajuste propio de la neurona que inclina la balanza antes de decidir.'
  },
  {
    id: 'activation',
    label: 'Función de activación',
    roleDescription: 'Transforma el puntaje acumulado en una respuesta controlada.',
    everydayAnalogy: 'Un termostato o filtro que decide si la señal se enciende y con qué fuerza.',
    prompt: 'Señala el bloque que convierte el puntaje combinado en una señal de respuesta.'
  },
  {
    id: 'output',
    label: 'Salida',
    roleDescription: 'Es la respuesta final que emite la neurona hacia el exterior o hacia la siguiente capa.',
    everydayAnalogy: 'La decisión final tomada: "Sí, llevo paraguas" o "No hace falta".',
    prompt: 'Señala el punto por donde sale la respuesta final de la neurona.'
  }
]

export const MATCHING_ACTIVITY: MatchingActivityData = {
  id: 'act-matching',
  levelId: 2,
  title: 'Asocia cada concepto con su analogía cotidiana',
  description:
    'Selecciona primero un concepto de la izquierda y luego la analogía que mejor lo explica a la derecha.',
  pairs: [
    {
      id: 'p1',
      concept: 'Entradas',
      analogy: 'Las pistas que observas antes de decidir (nubes, temperatura, viento).',
      explanation: 'Las entradas son los datos iniciales que describen la situación.'
    },
    {
      id: 'p2',
      concept: 'Pesos',
      analogy: 'Qué tanto valor le das a cada pista al tomar tu decisión.',
      explanation: 'Cada peso multiplica su entrada para reflejar su nivel de importancia.'
    },
    {
      id: 'p3',
      concept: 'Sesgo (Bias)',
      analogy: 'Tu tendencia personal a ser más precavido o más exigente.',
      explanation: 'El sesgo desplaza el punto en que la neurona decide activarse.'
    },
    {
      id: 'p4',
      concept: 'Error',
      analogy: 'Ver qué tan lejos cayó el balón de la canasta tras un lanzamiento.',
      explanation: 'El error mide la diferencia entre la predicción y el resultado real.'
    },
    {
      id: 'p5',
      concept: 'Retropropagación',
      analogy: 'Revisar hacia atrás qué ingrediente saló demasiado la sopa para ajustarlo.',
      explanation: 'La retropropagación reparte la corrección hacia atrás para ajustar los pesos.'
    }
  ]
}

export const TRUE_FALSE_ITEMS: TrueFalseItem[] = [
  {
    id: 'tf-1',
    levelId: 1,
    statement:
      'Para que una máquina aprenda con una red neuronal artificial, necesita desarrollar conciencia y emociones como un humano.',
    isTrue: false,
    feedbackWhenCorrect:
      '¡Correcto! Es falso. Las redes neuronales aprenden ajustando números a partir de ejemplos, sin conciencia ni sentimientos.',
    feedbackWhenIncorrect:
      'En realidad es falso. Aunque se inspiran en el cerebro, las RNA solo realizan cálculos numéricos para detectar patrones.',
    guidance: 'Repasa la lección 1.1: aprender en una máquina significa mejorar con ejemplos, no pensar como una persona.'
  },
  {
    id: 'tf-2',
    levelId: 2,
    statement:
      'Cuando una red neuronal artificial está aprendiendo, lo que cambia principalmente en su interior son sus pesos y sesgos.',
    isTrue: true,
    feedbackWhenCorrect:
      '¡Muy bien! Es verdadero. Ajustar pesos y sesgos es la forma en que la red guarda lo que aprende.',
    feedbackWhenIncorrect:
      'En realidad es verdadero. El conocimiento de una red entrenada reside en los valores que alcanzan sus pesos y sesgos.',
    guidance: 'Recuerda el simulador del Nivel 2: cambiar los pesos transforma por completo cómo decide la neurona.'
  },
  {
    id: 'tf-3',
    levelId: 3,
    statement:
      'Durante la propagación hacia adelante, los datos viajan desde la capa de entrada hacia la capa de salida para producir una respuesta.',
    isTrue: true,
    feedbackWhenCorrect:
      '¡Exacto! Es verdadero. Ese recorrido de entrada a salida es justamente la propagación hacia adelante.',
    feedbackWhenIncorrect:
      'Es verdadero. Primero la información viaja hacia adelante para emitir una predicción; solo después ocurre la retropropagación.',
    guidance: 'Asocia "hacia adelante" con producir la respuesta y "hacia atrás" (retropropagación) con corregir el error.'
  },
  {
    id: 'tf-4',
    levelId: 3,
    statement:
      'Si una red neuronal comete errores al principio de su entrenamiento, significa que está dañada y no puede aprender.',
    isTrue: false,
    feedbackWhenCorrect:
      '¡Correcto! Es falso. Al inicio sus pesos son aleatorios, así que equivocarse es totalmente normal y necesario para corregirse.',
    feedbackWhenIncorrect:
      'Es falso. Justamente los errores iniciales sirven como guía para saber en qué dirección ajustar los pesos.',
    guidance: 'Piensa en aprender un deporte: fallar los primeros tiros te muestra cuánto debes corregir.'
  },
  {
    id: 'tf-5',
    levelId: 4,
    statement:
      'En el aprendizaje no supervisado, todos los ejemplos de entrenamiento incluyen previamente la respuesta correcta escrita por una persona.',
    isTrue: false,
    feedbackWhenCorrect:
      '¡Muy bien! Es falso. Eso describe al aprendizaje supervisado; en el no supervisado los datos no llevan etiquetas.',
    feedbackWhenIncorrect:
      'En realidad es falso. Cuando hay respuestas o etiquetas previas se llama aprendizaje supervisado.',
    guidance: 'Truco para recordar: "supervisado" = hay un supervisor que aporta las etiquetas correctas.'
  }
]

export const MULTIPLE_CHOICE_ITEMS: MultipleChoiceItem[] = [
  {
    id: 'mc-1',
    levelId: 1,
    prompt:
      'Una tienda quiere un programa que calcule exactamente el IVA (19%) de cada factura. ¿Qué enfoque es el más adecuado?',
    hint: 'Pregúntate si existe una fórmula fija y exacta que nunca cambia.',
    options: [
      {
        id: 'a',
        label: 'Programación tradicional, porque existe una regla matemática exacta y simple.',
        isCorrect: true,
        feedback:
          '¡Correcto! Cuando una regla es clara y fija, la programación tradicional es directa, exacta y suficiente.'
      },
      {
        id: 'b',
        label: 'Una red neuronal profunda con millones de fotos de facturas.',
        isCorrect: false,
        feedback:
          'Sería innecesariamente complejo e impreciso para algo que una multiplicación exacta resuelve al instante.'
      },
      {
        id: 'c',
        label: 'Aprendizaje no supervisado sin decirle cuánto vale el impuesto.',
        isCorrect: false,
        feedback:
          'No hace falta descubrir patrones ocultos cuando ya conocemos exactamente la fórmula del 19%.'
      }
    ]
  },
  {
    id: 'mc-2',
    levelId: 2,
    prompt:
      'Una neurona artificial recibe la entrada "Hay sol radiante" al decidir si llevar paraguas. ¿Qué tipo de peso debería tener esa pista?',
    hint: 'Si hay sol radiante, ¿te anima a llevar paraguas o te anima a dejarlo en casa?',
    options: [
      {
        id: 'a',
        label: 'Un peso muy positivo, para recomendar siempre llevar paraguas.',
        isCorrect: false,
        feedback:
          'Un peso positivo sumaría a favor de llevar paraguas, justo lo contrario de lo que sugiere un sol radiante.'
      },
      {
        id: 'b',
        label: 'Un peso negativo, porque resta motivos para llevar paraguas.',
        isCorrect: true,
        feedback:
          '¡Excelente! Los pesos negativos representan pistas que empujan en contra de activar la respuesta.'
      },
      {
        id: 'c',
        label: 'Las neuronas no pueden usar pesos negativos.',
        isCorrect: false,
        feedback:
          'Sí pueden usar pesos negativos; de hecho son fundamentales para indicar evidencia en contra.'
      }
    ]
  },
  {
    id: 'mc-3',
    levelId: 4,
    prompt:
      'Una aplicación recibe la foto de una planta y te dice su especie exacta tras haberse entrenado con 50.000 fotos etiquetadas por botánicos. ¿Qué combinación describe mejor este caso?',
    hint: 'Observa dos pistas: trabaja con imágenes complejas y las fotos tenían etiquetas de expertos.',
    options: [
      {
        id: 'a',
        label: 'Red profunda + Aprendizaje supervisado + Reconocimiento de imágenes.',
        isCorrect: true,
        feedback:
          '¡Perfecto! Las imágenes detalladas suelen usar redes profundas y las etiquetas de los botánicos indican aprendizaje supervisado.'
      },
      {
        id: 'b',
        label: 'Red de una sola capa + Aprendizaje no supervisado + Reconocimiento de voz.',
        isCorrect: false,
        feedback:
          'Revisa las pistas del enunciado: se trata de fotos (imágenes) y además tienen etiquetas previas (supervisado).'
      },
      {
        id: 'c',
        label: 'Programación tradicional sin datos de ejemplo.',
        isCorrect: false,
        feedback:
          'Escribir reglas manuales para 50.000 variaciones de hojas, luz y ángulos sería inviable.'
      }
    ]
  },
  {
    id: 'mc-4',
    levelId: 4,
    prompt:
      '¿Por qué las plataformas de música o películas usan redes neuronales en sus sistemas de recomendación?',
    hint: 'Piensa en la cantidad de usuarios, géneros y combinaciones sutiles de preferencias.',
    options: [
      {
        id: 'a',
        label: 'Para detectar patrones complejos entre gustos, historiales y similitudes de contenido.',
        isCorrect: true,
        feedback:
          '¡Correcto! Las RNA encuentran relaciones sutiles entre millones de preferencias para sugerir contenido afín.'
      },
      {
        id: 'b',
        label: 'Para mostrar exactamente la misma lista en orden alfabético a todas las personas.',
        isCorrect: false,
        feedback:
          'Ordenar alfabéticamente es una regla fija simple y no personaliza las recomendaciones.'
      },
      {
        id: 'c',
        label: 'Para evitar usar cualquier tipo de dato sobre lo que vio el usuario.',
        isCorrect: false,
        feedback:
          'Justamente los sistemas de recomendación necesitan datos de interacción para aprender preferencias.'
      }
    ]
  }
]

export const FINAL_EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: 'eval-1',
    levelId: 1,
    levelLabel: 'Nivel 1 · Fundamentos',
    prompt: '¿Qué diferencia principal existe entre la programación tradicional y el aprendizaje automático?',
    options: [
      {
        id: 'a',
        text: 'En la programación tradicional se escriben reglas explícitas paso a paso; en el aprendizaje automático el sistema descubre patrones a partir de ejemplos.',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'La programación tradicional no usa computadoras y el aprendizaje automático sí.',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'El aprendizaje automático nunca utiliza datos para funcionar.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'No existe ninguna diferencia; son exactamente lo mismo.',
        isCorrect: false
      }
    ],
    explanation:
      'La programación tradicional depende de reglas escritas manualmente, mientras que el aprendizaje automático extrae patrones observando ejemplos.',
    relatedLessonSlug: 'programacion-tradicional-vs-aprendizaje'
  },
  {
    id: 'eval-2',
    levelId: 1,
    levelLabel: 'Nivel 1 · Fundamentos',
    prompt: '¿Por qué este tipo de tecnología recibe el nombre de "Redes Neuronales Artificiales"?',
    options: [
      {
        id: 'a',
        text: 'Porque contienen células vivas conectadas a un microchip.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Porque su estructura de unidades conectadas que transmiten señales se inspira en las neuronas del cerebro humano.',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Porque solo las pueden utilizar médicos y neurólogos.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Porque piensan y sienten exactamente igual que una persona.',
        isCorrect: false
      }
    ],
    explanation:
      'Las RNA toman inspiración de la organización conectada del cerebro, pero funcionan mediante números y cálculos digitales.',
    relatedLessonSlug: 'redes-neuronales-y-cerebro'
  },
  {
    id: 'eval-3',
    levelId: 2,
    levelLabel: 'Nivel 2 · Estructura',
    prompt: 'Dentro de una neurona artificial, ¿para qué sirven los "pesos" (weights)?',
    options: [
      {
        id: 'a',
        text: 'Para medir cuánto pesa físicamente la computadora.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Para indicar cuánta importancia o influencia tiene cada entrada en la decisión de la neurona.',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Para borrar las entradas antes de que lleguen a la neurona.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Para decorar el diagrama de la red neuronal.',
        isCorrect: false
      }
    ],
    explanation:
      'Cada peso pondera su entrada correspondiente: un peso grande indica mucha influencia; uno cercano a cero indica poca influencia.',
    relatedLessonSlug: 'pesos-y-sesgo'
  },
  {
    id: 'eval-4',
    levelId: 2,
    levelLabel: 'Nivel 2 · Estructura',
    prompt: '¿Qué función cumple la "función de activación" en una neurona artificial?',
    options: [
      {
        id: 'a',
        text: 'Enciende el monitor de la computadora cuando termina el cálculo.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Convierte el puntaje acumulado de la neurona en una señal de salida controlada (activándose o no según el resultado).',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Descarga automáticamente nuevos datos de internet.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Elimina el sesgo de todas las neuronas.',
        isCorrect: false
      }
    ],
    explanation:
      'La función de activación actúa como un filtro que decide con qué intensidad responde la neurona tras combinar entradas, pesos y sesgo.',
    relatedLessonSlug: 'activacion-salida-y-conexiones'
  },
  {
    id: 'eval-5',
    levelId: 2,
    levelLabel: 'Nivel 2 · Estructura',
    prompt: '¿Cuáles son las tres zonas principales en las que se organizan las neuronas de una red multicapa?',
    options: [
      {
        id: 'a',
        text: 'Capa de teclado, capa de pantalla y capa de batería.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Capa de entrada, capas ocultas y capa de salida.',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Capa rápida, capa lenta y capa apagada.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Capa de preguntas, capa de errores y capa de archivos.',
        isCorrect: false
      }
    ],
    explanation:
      'Los datos llegan por la capa de entrada, se procesan en las capas ocultas y entregan el resultado en la capa de salida.',
    relatedLessonSlug: 'activacion-salida-y-conexiones'
  },
  {
    id: 'eval-6',
    levelId: 3,
    levelLabel: 'Nivel 3 · Aprendizaje',
    prompt: '¿Qué ocurre durante la "propagación hacia adelante" (forward propagation)?',
    options: [
      {
        id: 'a',
        text: 'Los datos avanzan desde la capa de entrada, pasan por las capas ocultas y producen una predicción en la salida.',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'El error se devuelve desde la salida hasta las primeras capas.',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Se eliminan todos los datos de entrenamiento de la memoria.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Se apagan todas las neuronas para ahorrar energía.',
        isCorrect: false
      }
    ],
    explanation:
      'En la propagación hacia adelante la señal fluye de entrada a salida para calcular la respuesta actual de la red.',
    relatedLessonSlug: 'flujo-de-informacion-hacia-adelante'
  },
  {
    id: 'eval-7',
    levelId: 3,
    levelLabel: 'Nivel 3 · Aprendizaje',
    prompt: '¿Cuál es el propósito de la "retropropagación" (backpropagation) durante el entrenamiento?',
    options: [
      {
        id: 'a',
        text: 'Mostrar las imágenes al revés en la pantalla.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Enviar la señal de error hacia atrás para ajustar gradualmente los pesos y reducir futuras equivocaciones.',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Evitar que la red vuelva a recibir datos nuevos.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Convertir una red profunda en una regla fija manual.',
        isCorrect: false
      }
    ],
    explanation:
      'La retropropagación utiliza el error medido al final para guiar pequeños ajustes en los pesos de las capas anteriores.',
    relatedLessonSlug: 'corregir-el-rumbo-retropropagacion'
  },
  {
    id: 'eval-8',
    levelId: 4,
    levelLabel: 'Nivel 4 · Arquitecturas',
    prompt: '¿Qué distingue a una red neuronal profunda (Deep Learning) frente a una red de una sola capa?',
    options: [
      {
        id: 'a',
        text: 'Que posee muchas capas ocultas apiladas que aprenden patrones de lo simple a lo complejo.',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'Que no necesita pesos ni funciones de activación.',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Que solo puede tomar decisiones de "sí" o "no" muy simples.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Que no requiere datos de entrenamiento.',
        isCorrect: false
      }
    ],
    explanation:
      'Las múltiples capas ocultas permiten que las primeras detecten rasgos básicos y las siguientes construyan conceptos más complejos.',
    relatedLessonSlug: 'de-una-capa-a-redes-profundas'
  },
  {
    id: 'eval-9',
    levelId: 4,
    levelLabel: 'Nivel 4 · Arquitecturas',
    prompt: 'Si entrenamos una red con miles de correos ya marcados como "Spam" o "Normal", ¿qué tipo de aprendizaje estamos usando?',
    options: [
      {
        id: 'a',
        text: 'Aprendizaje no supervisado.',
        isCorrect: false
      },
      {
        id: 'b',
        text: 'Aprendizaje supervisado, porque cada ejemplo incluye su etiqueta o respuesta esperada.',
        isCorrect: true
      },
      {
        id: 'c',
        text: 'Programación sin ejemplos.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Aprendizaje aleatorio sin corrección.',
        isCorrect: false
      }
    ],
    explanation:
      'Cuando los ejemplos incluyen la respuesta correcta ("Spam" o "Normal"), la red aprende bajo aprendizaje supervisado.',
    relatedLessonSlug: 'aprendizaje-supervisado-y-no-supervisado'
  },
  {
    id: 'eval-10',
    levelId: 5,
    levelLabel: 'Nivel 5 · Integración',
    prompt: '¿Cuál de estas situaciones cotidianas es un ejemplo real de aplicación de redes neuronales artificiales?',
    options: [
      {
        id: 'a',
        text: 'Traducir un letrero en otro idioma con la cámara, transcribir una nota de voz o recibir recomendaciones personalizadas.',
        isCorrect: true
      },
      {
        id: 'b',
        text: 'Usar un interruptor mecánico común para encender una bombilla.',
        isCorrect: false
      },
      {
        id: 'c',
        text: 'Multiplicar dos números en una calculadora de bolsillo clásica.',
        isCorrect: false
      },
      {
        id: 'd',
        text: 'Guardar un documento de texto en una carpeta sin analizarlo.',
        isCorrect: false
      }
    ],
    explanation:
      'Reconocimiento de imágenes, voz, traducción del lenguaje y recomendaciones son aplicaciones directas y cotidianas de las RNA.',
    relatedLessonSlug: 'aplicaciones-en-la-vida-cotidiana'
  }
]
