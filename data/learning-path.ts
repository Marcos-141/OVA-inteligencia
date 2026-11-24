import type { LearningLevel } from '~/types/lesson'

/**
 * Definición modular de la ruta de aprendizaje progresiva (5 niveles).
 * Material introductorio de referencia preparado para ser sustituido o ampliado
 * con contenidos académicos oficiales.
 */
export const LEARNING_LEVELS: LearningLevel[] = [
  {
    id: 1,
    code: 'Nivel 1',
    title: 'Introducción y conceptos fundamentales',
    shortTitle: 'Fundamentos',
    description:
      'Comprende desde cero qué es la inteligencia artificial, qué significa que una máquina aprenda y por qué las redes neuronales se inspiran en el cerebro humano.',
    objective:
      'Construir una idea clara y cotidiana de qué es una Red Neuronal Artificial antes de ver detalles técnicos.',
    difficultyLabel: 'Inicio',
    lessonSlugs: [
      'que-es-la-ia-y-aprender',
      'redes-neuronales-y-cerebro',
      'programacion-tradicional-vs-aprendizaje'
    ]
  },
  {
    id: 2,
    code: 'Nivel 2',
    title: 'Estructura de una red neuronal',
    shortTitle: 'Estructura',
    description:
      'Descubre las piezas internas de una neurona artificial: entradas, pesos, sesgo, función de activación, salida y cómo se conectan entre sí.',
    objective:
      'Identificar los componentes de una neurona artificial mediante analogías cotidianas y experimentación visual.',
    difficultyLabel: 'Básico',
    lessonSlugs: [
      'la-neurona-artificial-y-entradas',
      'pesos-y-sesgo',
      'activacion-salida-y-conexiones'
    ]
  },
  {
    id: 3,
    code: 'Nivel 3',
    title: 'Funcionamiento y aprendizaje',
    shortTitle: 'Aprendizaje',
    description:
      'Observa paso a paso cómo entra la información, cómo se procesa, qué ocurre cuando la red se equivoca y cómo mejora practicando con ejemplos.',
    objective:
      'Explicar de manera sencilla qué significa entrenar una red neuronal mediante propagación hacia adelante y corrección de errores.',
    difficultyLabel: 'Intermedio',
    lessonSlugs: [
      'flujo-de-informacion-hacia-adelante',
      'entrenamiento-datos-y-errores',
      'corregir-el-rumbo-retropropagacion'
    ]
  },
  {
    id: 4,
    code: 'Nivel 4',
    title: 'Arquitecturas y aplicaciones',
    shortTitle: 'Aplicaciones',
    description:
      'Conoce la diferencia entre redes de una capa, multicapa y profundas, las formas principales de aprendizaje y cómo están presentes en tu día a día.',
    objective:
      'Reconocer distintos tipos de redes neuronales y sus aplicaciones en imágenes, voz, lenguaje y recomendaciones.',
    difficultyLabel: 'Aplicado',
    lessonSlugs: [
      'de-una-capa-a-redes-profundas',
      'aprendizaje-supervisado-y-no-supervisado',
      'aplicaciones-en-la-vida-cotidiana'
    ]
  },
  {
    id: 5,
    code: 'Nivel 5',
    title: 'Integración y evaluación',
    shortTitle: 'Integración',
    description:
      'Conecta todas las piezas aprendidas, pon a prueba tu comprensión con ejercicios prácticos y completa la evaluación final del OVA.',
    objective:
      'Integrar los conceptos clave, reconocer componentes y explicar con claridad cómo aprende y se utiliza una red neuronal.',
    difficultyLabel: 'Integración',
    lessonSlugs: ['integrando-todo-lo-aprendido']
  }
]

export function getLevelById(levelId: number): LearningLevel | undefined {
  return LEARNING_LEVELS.find((level) => level.id === levelId)
}
