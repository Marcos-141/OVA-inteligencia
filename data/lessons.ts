import type { Lesson } from '~/types/lesson'

/**
 * Contenido introductorio de referencia para las lecciones del OVA sobre RNA.
 * Cada lección sigue una estructura pedagógica de 7 momentos y está desacoplada
 * de la interfaz para facilitar su sustitución por material académico oficial.
 */
export const LESSONS: Lesson[] = [
  // ===========================================================================
  // NIVEL 1: INTRODUCCIÓN Y CONCEPTOS FUNDAMENTALES
  // ===========================================================================
  {
    id: 'l-1-1',
    slug: 'que-es-la-ia-y-aprender',
    levelId: 1,
    orderInLevel: 1,
    title: '¿Qué es la inteligencia artificial y qué significa aprender?',
    subtitle: 'Primer paso para entender cómo las máquinas logran resolver tareas útiles.',
    estimatedMinutes: 4,
    isReferenceContent: true,
    introduction:
      'Escuchamos hablar de inteligencia artificial casi todos los días: en el celular, en las plataformas de video o en los mapas. Antes de estudiar las redes neuronales, vale la pena responder una pregunta muy simple: ¿qué hace realmente una máquina cuando decimos que "aprende"?',
    simpleExplanation: {
      heading: 'Una idea sencilla sin palabras complicadas',
      paragraphs: [
        'La inteligencia artificial (IA) es el conjunto de programas diseñados para realizar tareas que normalmente requieren capacidad humana, como reconocer una voz, traducir un texto o sugerir una canción.',
        'Cuando decimos que una máquina "aprende", no significa que tenga conciencia, sentimientos o pensamientos propios. Significa que el programa analiza muchos ejemplos y ajusta sus propios cálculos internos para hacerlo cada vez mejor.'
      ],
      keyTerms: [
        {
          term: 'Inteligencia Artificial (IA)',
          simpleDefinition:
            'Área de la tecnología que crea sistemas capaces de realizar tareas útiles como reconocer patrones, clasificar información o tomar decisiones simples.'
        },
        {
          term: 'Aprender (en una máquina)',
          simpleDefinition:
            'Mejorar automáticamente en una tarea a partir de la experiencia acumulada con muchos ejemplos, en lugar de seguir solo instrucciones fijas.'
        }
      ]
    },
    everydayExample: {
      title: 'Aprender a reconocer frutas en el mercado',
      scenario:
        'Imagina a un niño pequeño que nunca ha visto un mango ni una manzana. En lugar de darle un manual de medidas exactas, le muestras varias fotos y le dices: "esto es una manzana", "esto es un mango". Después de ver suficientes ejemplos, el niño identifica frutas nuevas por su forma y color.',
      connection:
        'Un sistema de aprendizaje automático hace algo muy parecido: observa cientos o miles de ejemplos para descubrir qué pistas diferencian una cosa de otra.'
    },
    conceptDevelopment: {
      heading: 'Tres ideas clave para empezar con el pie derecho',
      blocks: [
        {
          title: '1. La IA no es magia, son patrones',
          body: 'Detrás de un sistema inteligente hay búsquedas de regularidades. Por ejemplo, notar que los correos basura suelen repetir ciertas palabras o enlaces sospechosos.'
        },
        {
          title: '2. El aprendizaje automático vive dentro de la IA',
          body: 'La inteligencia artificial es el gran paraguas. Dentro de ella existe el aprendizaje automático (Machine Learning), que es la forma de enseñar a una computadora usando ejemplos en vez de reglas escritas una por una.'
        },
        {
          title: '3. Las redes neuronales son una herramienta muy potente',
          body: 'Dentro del aprendizaje automático encontramos las Redes Neuronales Artificiales, especialmente buenas para entender imágenes, sonidos y lenguaje humano.',
          highlight: 'IA (campo general) → Aprendizaje automático (aprender con ejemplos) → Redes neuronales (un método inspirado en el cerebro).'
        }
      ]
    },
    summaryPoints: [
      'La inteligencia artificial busca crear programas que resuelvan tareas que suelen requerir habilidades humanas.',
      'Que una máquina aprenda significa que mejora su desempeño observando ejemplos, no que piense como una persona.',
      'Las redes neuronales artificiales forman parte del aprendizaje automático, que a su vez pertenece a la IA.'
    ],
    quickCheck: {
      question: '¿Qué significa realmente que una máquina "aprenda"?',
      hint: 'Recuerda el ejemplo de distinguir frutas sin memorizar un manual de reglas exactas.',
      options: [
        {
          id: 'a',
          text: 'Que desarrolla emociones e ideas propias como un ser humano.',
          isCorrect: false,
          feedback:
            'No exactamente. Las máquinas no tienen emociones ni conciencia. Intenta pensar en cómo mejoran su precisión al observar muchos ejemplos.'
        },
        {
          id: 'b',
          text: 'Que analiza ejemplos y ajusta sus cálculos para mejorar en una tarea específica.',
          isCorrect: true,
          feedback:
            '¡Correcto! Aprender en una máquina significa ajustar su comportamiento con base en ejemplos para cometer cada vez menos errores.'
        },
        {
          id: 'c',
          text: 'Que solo guarda archivos en memoria sin cambiar nunca sus respuestas.',
          isCorrect: false,
          feedback:
            'Guardar datos es almacenamiento, no aprendizaje. Aprender implica usar esos ejemplos para reconocer casos nuevos.'
        }
      ]
    }
  },
  {
    id: 'l-1-2',
    slug: 'redes-neuronales-y-cerebro',
    levelId: 1,
    orderInLevel: 2,
    title: '¿Qué son las redes neuronales artificiales?',
    subtitle: 'Por qué llevan ese nombre y en qué se parecen (y diferencian) del cerebro humano.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Si alguien menciona "redes neuronales", es normal imaginar un cerebro dentro de una computadora. En esta lección aclararemos por qué se llaman así y cuál es su verdadera relación con nuestro sistema nervioso.',
    simpleExplanation: {
      heading: 'Un equipo de pequeñas unidades conectadas',
      paragraphs: [
        'Una Red Neuronal Artificial (RNA) es un sistema informático compuesto por muchas unidades pequeñas y sencillas llamadas neuronas artificiales, conectadas entre sí formando una red.',
        'Cada unidad recibe pequeños trozos de información, hace un cálculo muy simple y pasa su resultado a las siguientes unidades. Al trabajar en equipo, logran resolver tareas complejas como reconocer una cara o entender una pregunta.'
      ],
      keyTerms: [
        {
          term: 'Red Neuronal Artificial (RNA)',
          simpleDefinition:
            'Modelo computacional formado por múltiples unidades conectadas que colaboran para transformar datos de entrada en una respuesta útil.'
        },
        {
          term: 'Inspiración biológica',
          simpleDefinition:
            'Idea tomada de la naturaleza (en este caso, el cerebro) para diseñar una solución tecnológica, sin necesidad de copiarla al pie de la letra.'
        }
      ]
    },
    everydayExample: {
      title: 'Los aviones y las aves',
      scenario:
        'Para inventar los aviones, los ingenieros observaron cómo las aves usan sus alas para sostenerse en el aire. Sin embargo, un avión no tiene plumas ni aletea: usa turbinas y alas rígidas porque ese mecanismo funciona mejor con materiales metálicos.',
      connection:
        'Con las redes neuronales ocurre lo mismo: se inspiran en cómo las neuronas biológicas se conectan y transmiten señales, pero funcionan con números y operaciones digitales, no con células vivas.'
    },
    conceptDevelopment: {
      heading: 'Cerebro humano vs. Red neuronal artificial',
      blocks: [
        {
          title: '¿En qué se parecen?',
          body: 'Ambos están formados por muchas unidades conectadas que se envían señales entre sí. Además, tanto en el cerebro como en una RNA, las conexiones se fortalecen o debilitan a medida que se aprende algo nuevo.'
        },
        {
          title: '¿En qué se diferencian?',
          body: 'El cerebro humano es inmensamente más complejo, consume muy poca energía y aprende con muy pocos ejemplos. Una red neuronal artificial necesita muchos datos, funciona con electricidad y suele especializarse en tareas concretas.'
        },
        {
          title: '¿Por qué es útil esta idea?',
          body: 'Porque dividir un problema grande en decenas o miles de pequeñas decisiones conectadas permite reconocer patrones sutiles que serían imposibles de escribir a mano.',
          highlight: 'Una sola neurona hace poco; muchas neuronas conectadas pueden reconocer patrones sorprendentes.'
        }
      ]
    },
    interactiveResource: {
      id: 'brain-analogy-diagram',
      title: 'Explora la comparación visual: cerebro vs. red artificial',
      instruction:
        'Haz clic en cada elemento del esquema para descubrir cómo se traduce una idea biológica al mundo digital.'
    },
    summaryPoints: [
      'Una red neuronal artificial está formada por pequeñas unidades conectadas que procesan información en equipo.',
      'Se llaman "neuronales" porque su estructura conectada se inspira en las neuronas del cerebro humano.',
      'Inspiración no significa copia exacta: las RNA funcionan con números y están diseñadas para tareas específicas.'
    ],
    quickCheck: {
      question: '¿Cuál es la relación real entre el cerebro humano y una red neuronal artificial?',
      hint: 'Piensa en la comparación entre las aves y los aviones.',
      options: [
        {
          id: 'a',
          text: 'Una red neuronal artificial es una réplica biológica exacta del cerebro humano.',
          isCorrect: false,
          feedback:
            'No es una réplica biológica. Aunque el nombre viene del cerebro, una RNA funciona con cálculos numéricos y es mucho más sencilla.'
        },
        {
          id: 'b',
          text: 'La red neuronal se inspira en las conexiones del cerebro, pero funciona con números y cálculos digitales.',
          isCorrect: true,
          feedback:
            '¡Muy bien! Toma la idea de unidades conectadas que fortalecen sus vínculos al aprender, aplicada a computadoras.'
        },
        {
          id: 'c',
          text: 'No existe ninguna relación; el nombre se eligió completamente al azar.',
          isCorrect: false,
          feedback:
            'Sí existe una relación: los investigadores observaron cómo las neuronas biológicas se comunican en red para diseñar este modelo.'
        }
      ]
    }
  },
  {
    id: 'l-1-3',
    slug: 'programacion-tradicional-vs-aprendizaje',
    levelId: 1,
    orderInLevel: 3,
    title: 'Programación tradicional vs. Aprendizaje automático',
    subtitle: 'La diferencia entre escribir una receta exacta y enseñar mostrando ejemplos.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Durante décadas, las computadoras solo hacían aquello para lo que alguien escribía instrucciones paso a paso. ¿Por qué fue necesario inventar otra manera de enseñarles? Vamos a verlo con ejemplos claros.',
    simpleExplanation: {
      heading: 'Dos formas distintas de resolver un problema',
      paragraphs: [
        'En la programación tradicional, una persona escribe todas las reglas exactas ("si pasa A, entonces haz B"). La computadora obedece esa lista al pie de la letra.',
        'En el aprendizaje automático, en lugar de escribir todas las reglas a mano, entregamos muchos ejemplos con sus resultados esperados. El sistema descubre por sí mismo qué patrones llevan a la respuesta correcta.'
      ],
      keyTerms: [
        {
          term: 'Programación tradicional',
          simpleDefinition:
            'Forma de crear software donde el programador redacta manualmente todas las reglas y condiciones para obtener un resultado.'
        },
        {
          term: 'Aprendizaje automático',
          simpleDefinition:
            'Enfoque donde el sistema recibe datos y ejemplos para descubrir automáticamente las reglas o patrones necesarios.'
        }
      ]
    },
    everydayExample: {
      title: 'Calcular una propina vs. reconocer la letra de un amigo',
      scenario:
        'Para calcular el 10% de una cuenta en un restaurante, una regla fija basta y sobra: multiplicar el total por 0,10. Nunca falla. Pero intenta escribir reglas exactas para reconocer la letra a mano de mil personas distintas: cada persona dibuja la "a" diferente.',
      connection:
        'Cuando las reglas son claras y estables, la programación tradicional es ideal. Cuando el mundo es variado y lleno de matices (fotos, voz, texto), el aprendizaje automático brilla.'
    },
    conceptDevelopment: {
      heading: '¿Qué cambia en el proceso?',
      blocks: [
        {
          title: 'Enfoque tradicional: Datos + Reglas → Resultado',
          body: 'El humano diseña las reglas con precisión. Si aparece una situación nueva que nadie escribió en las reglas, el programa no sabrá cómo responder.'
        },
        {
          title: 'Aprendizaje automático: Datos + Resultados de ejemplo → Reglas descubiertas',
          body: 'El humano reúne buenos ejemplos y el sistema construye un modelo interno que luego puede aplicar a casos que nunca había visto.'
        },
        {
          title: 'No compiten, se complementan',
          body: 'Las aplicaciones modernas combinan ambos mundos: programación tradicional para botones, pantallas y cálculos exactos, y redes neuronales para tareas de percepción o predicción.'
        }
      ]
    },
    interactiveResource: {
      id: 'paradigm-comparator',
      title: 'Comparador interactivo de enfoques',
      instruction:
        'Selecciona distintos problemas cotidianos para comparar cómo los resuelve la programación tradicional frente al aprendizaje automático.'
    },
    summaryPoints: [
      'La programación tradicional depende de reglas explícitas escritas por humanos.',
      'El aprendizaje automático descubre patrones directamente a partir de ejemplos.',
      'Las redes neuronales son especialmente útiles cuando escribir reglas manuales sería demasiado difícil o imposible.'
    ],
    quickCheck: {
      question: '¿En cuál de estas tareas es más recomendable usar aprendizaje automático en lugar de solo reglas fijas?',
      hint: 'Piensa en cuál de los casos cambia tanto que sería casi imposible escribir una regla exacta para cada variación.',
      options: [
        {
          id: 'a',
          text: 'Sumar el precio de cinco productos en un carrito de compras.',
          isCorrect: false,
          feedback:
            'Sumar precios tiene una regla matemática exacta y simple. Aquí la programación tradicional es más rápida y precisa.'
        },
        {
          id: 'b',
          text: 'Identificar si una fotografía contiene un perro o un gato en cualquier posición y luz.',
          isCorrect: true,
          feedback:
            '¡Exacto! Hay infinitas razas, ángulos e iluminaciones, por eso aprender de miles de fotos funciona mucho mejor que escribir reglas manuales.'
        },
        {
          id: 'c',
          text: 'Convertir grados Celsius a Fahrenheit usando una fórmula fija.',
          isCorrect: false,
          feedback:
            'Esa conversión ya tiene una fórmula exacta conocida. No hace falta entrenar una red para algo tan directo.'
        }
      ]
    }
  },

  // ===========================================================================
  // NIVEL 2: ESTRUCTURA DE UNA RED NEURONAL
  // ===========================================================================
  {
    id: 'l-2-1',
    slug: 'la-neurona-artificial-y-entradas',
    levelId: 2,
    orderInLevel: 1,
    title: 'La neurona artificial y sus entradas',
    subtitle: 'Cómo una pequeña unidad recibe pistas del mundo para empezar a decidir.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Ahora que ya comprendes la idea general, vamos a abrir la caja con calma. El ladrillo fundamental de toda red neuronal es la neurona artificial. Conozcamos qué es y cómo recibe información.',
    simpleExplanation: {
      heading: 'Una pequeña estación que escucha pistas',
      paragraphs: [
        'Una neurona artificial es una unidad sencilla que recibe datos, los combina internamente y produce una respuesta.',
        'Las entradas (inputs) son los datos que llegan a la neurona desde el exterior o desde otras neuronas. Para que la computadora pueda trabajar con ellos, siempre se expresan como números.'
      ],
      keyTerms: [
        {
          term: 'Neurona artificial',
          simpleDefinition:
            'Unidad básica de cálculo de una red neuronal que recibe entradas, las procesa y entrega una salida.'
        },
        {
          term: 'Entradas (Inputs)',
          simpleDefinition:
            'Datos o pistas iniciales que recibe la neurona para evaluar una situación (por ejemplo, temperatura, brillo de un píxel o presencia de nubes).'
        }
      ]
    },
    everydayExample: {
      title: 'Decidir si llevas paraguas al salir de casa',
      scenario:
        'Antes de abrir la puerta por la mañana, tu mente revisa varias pistas: 1) ¿El cielo está nublado?, 2) ¿El pronóstico dice que lloverá?, 3) ¿Sientes humedad o viento frío? Cada una de esas observaciones es una entrada.',
      connection:
        'Una neurona artificial hace exactamente lo mismo: recibe esas tres pistas convertidas en números (por ejemplo, de 0 a 10 según qué tan fuerte es cada señal) para poder tomar una decisión.'
    },
    conceptDevelopment: {
      heading: '¿Cómo se convierten cosas cotidianas en entradas?',
      blocks: [
        {
          title: 'Las entradas pueden ser simples "sí o no"',
          body: 'Por ejemplo: 0 si no hay nubes, 1 si está nublado. Así de sencillo puede empezar a representar información una neurona.'
        },
        {
          title: 'También pueden medir intensidades',
          body: 'Una entrada puede representar un valor continuo, como el porcentaje de probabilidad de lluvia (80%) o el brillo de un pequeño punto de una fotografía.'
        },
        {
          title: 'Mientras más claras sean las entradas, mejor decide la neurona',
          body: 'Si le damos pistas irrelevantes (como el color de tus zapatos para predecir lluvia), la neurona no tendrá información útil para decidir.',
          highlight: 'Buenas entradas = pistas claras y relevantes para el problema que queremos resolver.'
        }
      ]
    },
    summaryPoints: [
      'La neurona artificial es la unidad básica que recibe datos, los evalúa y produce una respuesta.',
      'Las entradas son las pistas numéricas que describen la situación actual.',
      'Cualquier dato del mundo real (clima, imágenes, texto) se transforma en números antes de entrar a la red.'
    ],
    quickCheck: {
      question: 'Si una neurona artificial intenta decidir si una fruta está madura, ¿cuál sería un buen ejemplo de "entradas"?',
      hint: 'Piensa en qué pistas observables ayudan a saber si una fruta ya se puede comer.',
      options: [
        {
          id: 'a',
          text: 'El color de la cáscara, la firmeza al tacto y el aroma (expresados en valores numéricos).',
          isCorrect: true,
          feedback:
            '¡Correcto! Esas son pistas relevantes del problema que, convertidas en números, sirven como entradas para la neurona.'
        },
        {
          id: 'b',
          text: 'La decisión final "sí está madura".',
          isCorrect: false,
          feedback:
            'Esa es la salida o resultado final, no las pistas iniciales. Las entradas son los datos que llegan antes de decidir.'
        },
        {
          id: 'c',
          text: 'El nombre del supermercado donde se tomó la foto.',
          isCorrect: false,
          feedback:
            'Ese dato no ayuda a saber si la fruta está madura. Las buenas entradas deben aportar información útil sobre la tarea.'
        }
      ]
    }
  },
  {
    id: 'l-2-2',
    slug: 'pesos-y-sesgo',
    levelId: 2,
    orderInLevel: 2,
    title: 'Pesos y sesgo (bias): decidir qué importa más',
    subtitle: 'No todas las pistas valen lo mismo, y cada neurona tiene su propio punto de partida.',
    estimatedMinutes: 6,
    isReferenceContent: true,
    introduction:
      'Cuando recibes varias pistas para tomar una decisión, no les das a todas la misma importancia. Además, tu propia actitud influye en qué tan fácil te convences. En una neurona artificial, esas dos ideas se llaman pesos y sesgo.',
    simpleExplanation: {
      heading: 'Importancia de cada pista y nivel de exigencia',
      paragraphs: [
        'Un peso (weight) es un número que indica cuánta importancia tiene una entrada específica. Un peso alto significa "esta pista importa mucho"; un peso cercano a cero significa "esta pista casi no influye"; y un peso negativo significa "esta pista empuja hacia la decisión contraria".',
        'El sesgo (bias) es un ajuste propio de la neurona que determina qué tan fácil o difícil es que se active, incluso antes de mirar las entradas.'
      ],
      keyTerms: [
        {
          term: 'Peso (Weight)',
          simpleDefinition:
            'Número asociado a cada entrada que mide cuánta influencia tiene esa pista en la decisión final de la neurona.'
        },
        {
          term: 'Sesgo (Bias)',
          simpleDefinition:
            'Valor interno que inclina la balanza de la neurona para que necesite más o menos evidencia antes de activarse.'
        }
      ]
    },
    everydayExample: {
      title: '¿Qué pista pesa más al decidir si llevas paraguas?',
      scenario:
        'Para decidir si llevas paraguas, que el pronóstico indique 90% de lluvia tiene un peso muy grande. Que haga un poco de viento tiene un peso menor. Y el sesgo eres tú: si odias mojarte, tendrás un sesgo positivo (llevas paraguas casi por cualquier duda); si te molesta cargarlo, tendrás un sesgo negativo (solo lo llevas cuando la lluvia es casi segura).',
      connection:
        'Cada neurona combina sus entradas multiplicándolas por su peso y suma su sesgo para obtener una puntuación total de evidencia.'
    },
    conceptDevelopment: {
      heading: 'Por qué los pesos son el corazón del aprendizaje',
      blocks: [
        {
          title: 'Pesos positivos y negativos',
          body: 'Un peso positivo suma puntos a favor de una respuesta ("está muy nublado" suma a favor de llevar paraguas). Un peso negativo resta puntos ("hay sol radiante" resta a favor de llevar paraguas).'
        },
        {
          title: 'El sesgo evita decisiones rígidas',
          body: 'Sin sesgo, la neurona no podría ajustar su nivel mínimo de exigencia. El sesgo le permite ser más precavida o más estricta según convenga al problema.'
        },
        {
          title: 'Aprender significa ajustar pesos y sesgos',
          body: 'Este es un secreto clave de las redes neuronales: cuando decimos que una red está aprendiendo, lo que en realidad está cambiando poco a poco son sus pesos y sus sesgos.',
          highlight: 'Guardar conocimiento en una RNA = encontrar los valores adecuados de pesos y sesgos.'
        }
      ]
    },
    interactiveResource: {
      id: 'neuron-simulator',
      title: 'Simulador interactivo: experimenta con una neurona artificial',
      instruction:
        'Mueve las entradas del clima, ajusta los pesos (importancia) y cambia el sesgo (precaución) para observar en vivo cómo decide la neurona.'
    },
    summaryPoints: [
      'Cada entrada tiene un peso que indica cuánta importancia tiene esa pista.',
      'El sesgo ajusta qué tan fácil o difícil resulta que la neurona se active.',
      'Cuando una red neuronal aprende, lo que ajusta principalmente son sus pesos y sesgos.'
    ],
    quickCheck: {
      question: 'En el ejemplo del paraguas, ¿qué papel cumple el "sesgo" (bias)?',
      hint: 'Piensa en la diferencia entre una persona muy precavida y otra a la que no le gusta cargar paraguas.',
      options: [
        {
          id: 'a',
          text: 'Es la cantidad de nubes que se ven en el cielo ese día.',
          isCorrect: false,
          feedback:
            'La cantidad de nubes es una entrada externa que cambia cada día. El sesgo es una tendencia interna de la neurona.'
        },
        {
          id: 'b',
          text: 'Es el ajuste interno que hace que la neurona sea más propensa o más exigente para activarse.',
          isCorrect: true,
          feedback:
            '¡Excelente! El sesgo mueve el punto de decisión de la neurona para que necesite más o menos evidencia.'
        },
        {
          id: 'c',
          text: 'Es un error de programación que siempre debe eliminarse.',
          isCorrect: false,
          feedback:
            'Aunque en español la palabra "sesgo" a veces suena negativa, en redes neuronales el bias es un componente necesario y útil.'
        }
      ]
    }
  },
  {
    id: 'l-2-3',
    slug: 'activacion-salida-y-conexiones',
    levelId: 2,
    orderInLevel: 3,
    title: 'Función de activación, salida y conexión entre neuronas',
    subtitle: 'Cómo una neurona decide dar el paso y cómo se organizan en capas.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Una vez que la neurona reúne las entradas, aplica los pesos y suma el sesgo, obtiene un puntaje acumulado. Pero todavía falta algo esencial: convertir ese puntaje en una respuesta clara y conectarla con otras neuronas.',
    simpleExplanation: {
      heading: 'El filtro final y el trabajo en cadena',
      paragraphs: [
        'La función de activación es una regla que toma el puntaje acumulado de la neurona y decide qué tan fuerte debe ser su respuesta final (o si debe quedarse en silencio).',
        'La salida (output) es ese resultado final que la neurona entrega. Esa salida puede ser la respuesta definitiva de la red o convertirse en la entrada de otra neurona más adelante.'
      ],
      keyTerms: [
        {
          term: 'Función de activación',
          simpleDefinition:
            'Regla que transforma el puntaje interno de una neurona en una señal de salida controlada (por ejemplo, entre 0 y 1, o activa/inactiva).'
        },
        {
          term: 'Salida (Output)',
          simpleDefinition:
            'Respuesta final que produce una neurona o la red completa tras procesar la información.'
        },
        {
          term: 'Capas',
          simpleDefinition:
            'Grupos ordenados de neuronas: capa de entrada (recibe datos), capas ocultas (procesan patrones) y capa de salida (entrega el resultado).'
        }
      ]
    },
    everydayExample: {
      title: 'Un termostato y una cocina de restaurante',
      scenario:
        'Un termostato evalúa la temperatura y decide activar o apagar la calefacción cuando cruza cierto punto: eso se parece a una función de activación. Por otro lado, en una cocina bien organizada, un equipo lava ingredientes (capa de entrada), otro cocina y combina sabores (capas ocultas) y el último emplata el pedido (capa de salida).',
      connection:
        'Al conectar neuronas en capas sucesivas, las primeras detectan detalles simples y las siguientes combinan esos detalles para entender cosas más elaboradas.'
    },
    conceptDevelopment: {
      heading: 'Las tres zonas de una red neuronal',
      blocks: [
        {
          title: '1. Capa de entrada',
          body: 'Es la puerta de acceso. Recibe los datos sin procesar (números que describen una imagen, un texto o una situación).'
        },
        {
          title: '2. Capas ocultas',
          body: 'Se llaman "ocultas" simplemente porque están en el medio, entre la entrada y la salida. Aquí las neuronas descubren combinaciones útiles de pistas.'
        },
        {
          title: '3. Capa de salida',
          body: 'Traduce todo el trabajo previo en una respuesta comprensible: una categoría ("es un gato"), una probabilidad ("85% de lluvia") o una recomendación.'
        }
      ]
    },
    interactiveResource: {
      id: 'neuron-anatomy',
      title: 'Actividad visual: identifica las partes de una neurona',
      instruction:
        'Pon en práctica todo el Nivel 2 señalando en el diagrama dónde está cada componente de la neurona artificial.'
    },
    summaryPoints: [
      'La función de activación decide si la neurona responde y con qué intensidad.',
      'La salida de una neurona puede alimentar a muchas otras neuronas en la siguiente capa.',
      'Una red neuronal se organiza en capa de entrada, capas ocultas y capa de salida.'
    ],
    quickCheck: {
      question: '¿Qué función cumplen las "capas ocultas" dentro de una red neuronal?',
      hint: 'Recuerda la analogía de la cocina del restaurante.',
      options: [
        {
          id: 'a',
          text: 'Son capas secretas que nadie puede estudiar ni entender nunca.',
          isCorrect: false,
          feedback:
            'No se llaman "ocultas" por misterio, sino simplemente porque están en el interior, entre la entrada y la salida.'
        },
        {
          id: 'b',
          text: 'Procesan y combinan la información intermedia para detectar patrones más complejos.',
          isCorrect: true,
          feedback:
            '¡Correcto! Las capas ocultas transforman pistas simples en representaciones cada vez más útiles antes de entregar la salida.'
        },
        {
          id: 'c',
          text: 'Únicamente muestran el resultado final en la pantalla del usuario.',
          isCorrect: false,
          feedback:
            'Mostrar o entregar el resultado final corresponde a la capa de salida, no a las capas ocultas.'
        }
      ]
    }
  },

  // ===========================================================================
  // NIVEL 3: FUNCIONAMIENTO Y APRENDIZAJE
  // ===========================================================================
  {
    id: 'l-3-1',
    slug: 'flujo-de-informacion-hacia-adelante',
    levelId: 3,
    orderInLevel: 1,
    title: 'Cómo viaja la información: propagación hacia adelante',
    subtitle: 'El recorrido completo desde que entra un dato hasta que la red emite una respuesta.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Ya conoces las piezas de una red neuronal. Ahora vamos a ponerla en movimiento para observar cómo viaja una señal desde el principio hasta el final.',
    simpleExplanation: {
      heading: 'Un viaje en una sola dirección para producir una respuesta',
      paragraphs: [
        'Cuando le presentamos un dato nuevo a una red neuronal, la información entra por la capa de entrada, atraviesa las capas ocultas y llega a la capa de salida.',
        'Este recorrido hacia adelante se llama propagación hacia adelante (forward propagation). En cada paso, cada neurona multiplica sus entradas por los pesos, suma su sesgo, aplica su función de activación y envía el resultado a la siguiente capa.'
      ],
      keyTerms: [
        {
          term: 'Propagación hacia adelante',
          simpleDefinition:
            'Proceso en el que los datos avanzan capa por capa desde la entrada hasta la salida para generar una predicción o respuesta.'
        },
        {
          term: 'Predicción',
          simpleDefinition:
            'Respuesta estimada que produce la red neuronal a partir de los datos que recibió.'
        }
      ]
    },
    everydayExample: {
      title: 'Pasar un informe por varios departamentos',
      scenario:
        'Imagina que llega una solicitud a una empresa: recepción recoge los datos básicos, el equipo de análisis revisa los detalles importantes y la dirección toma la decisión final. La información fluye ordenada de principio a fin.',
      connection:
        'En la propagación hacia adelante, cada capa hace su parte con los valores que recibió de la capa anterior hasta producir la respuesta final.'
    },
    conceptDevelopment: {
      heading: 'Qué ocurre en cada parada del recorrido',
      blocks: [
        {
          title: 'Paso 1: Lectura de entradas',
          body: 'Los datos iniciales ingresan como números. Por ejemplo, señales sobre el tono y ritmo de un audio.'
        },
        {
          title: 'Paso 2: Combinación en capas ocultas',
          body: 'Cada neurona oculta pondera las señales según sus pesos y decide cuánto activarse.'
        },
        {
          title: 'Paso 3: Respuesta en la capa de salida',
          body: 'La capa final reúne las activaciones y entrega la predicción de la red (por ejemplo: "la palabra pronunciada es Hola con 92% de confianza").'
        }
      ],
      optionalMath: {
        title: '¿Quieres ver cómo se ve esto con matemáticas sencillas?',
        intro:
          'Esta parte es totalmente opcional. Si ya entendiste el concepto de pistas + importancia + ajuste, aquí verás exactamente la misma idea escrita con números:',
        formulaLabel: 'Cálculo básico de una neurona',
        formulaText: 'Puntaje = (Entrada₁ × Peso₁) + (Entrada₂ × Peso₂) + Sesgo  →  Salida = Activación(Puntaje)',
        stepByStep: [
          'Supongamos Entrada₁ = 1 (está nublado) con Peso₁ = 3, y Entrada₂ = 0 (sin viento) con Peso₂ = 1.',
          'Si el Sesgo es -1, entonces: Puntaje = (1 × 3) + (0 × 1) + (-1) = 2.',
          'La función de activación revisa el puntaje (2 es mayor que 0) y decide activar la salida: "Sí, lleva paraguas".'
        ],
        takeaway:
          'Aunque una red grande tenga miles de neuronas, cada una repite esta misma operación simple de multiplicar, sumar y activar.'
      }
    },
    interactiveResource: {
      id: 'network-flow',
      title: 'Animación interactiva: flujo de información y ajuste',
      instruction:
        'Pulsa "Ejecutar propagación hacia adelante" para ver viajar los datos capa por capa, y luego prueba el modo de corrección.'
    },
    summaryPoints: [
      'En la propagación hacia adelante, los datos avanzan desde la entrada hasta la salida.',
      'Cada capa transforma lo que recibe usando pesos, sesgos y funciones de activación.',
      'El resultado final de este viaje es la predicción o respuesta de la red.'
    ],
    quickCheck: {
      question: '¿En qué dirección viaja la información durante la propagación hacia adelante?',
      hint: 'El propio nombre ("hacia adelante") te da la pista principal.',
      options: [
        {
          id: 'a',
          text: 'Desde la capa de entrada, pasando por las capas ocultas, hasta la capa de salida.',
          isCorrect: true,
          feedback:
            '¡Exacto! Primero entran los datos, se procesan en las capas intermedias y al final se obtiene la respuesta.'
        },
        {
          id: 'b',
          text: 'Desde la capa de salida hacia la capa de entrada.',
          isCorrect: false,
          feedback:
            'Ese sentido inverso ocurre después, cuando se corrige el error (retropropagación). Para producir la respuesta, el flujo va de entrada a salida.'
        },
        {
          id: 'c',
          text: 'En direcciones aleatorias sin ningún orden entre capas.',
          isCorrect: false,
          feedback:
            'El flujo está organizado capa por capa para que cada etapa construya sobre el resultado de la anterior.'
        }
      ]
    }
  },
  {
    id: 'l-3-2',
    slug: 'entrenamiento-datos-y-errores',
    levelId: 3,
    orderInLevel: 2,
    title: 'Entrenar una red neuronal: datos y errores',
    subtitle: 'Por qué equivocarse al principio es indispensable para aprender.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Cuando una red neuronal se crea por primera vez, sus pesos son prácticamente aleatorios: no sabe nada todavía. ¿Cómo pasa de adivinar sin sentido a reconocer patrones con gran precisión? Mediante el entrenamiento.',
    simpleExplanation: {
      heading: 'Aprender practicando con muchos ejemplos',
      paragraphs: [
        'Entrenar una red neuronal consiste en mostrarle una colección de ejemplos llamados datos de entrenamiento, dejar que haga una predicción, comparar su respuesta con la respuesta real y medir qué tanto se equivocó.',
        'Esa diferencia entre lo que la red respondió y lo que debía responder se llama error. El error no es un fracaso: es la brújula que indica en qué dirección debe mejorar.'
      ],
      keyTerms: [
        {
          term: 'Datos de entrenamiento',
          simpleDefinition:
            'Conjunto de ejemplos utilizados para enseñar a la red neuronal durante su etapa de aprendizaje.'
        },
        {
          term: 'Error',
          simpleDefinition:
            'Medida de la distancia entre la respuesta que dio la red y la respuesta esperada.'
        }
      ]
    },
    everydayExample: {
      title: 'Aprender a lanzar un balón a la canasta',
      scenario:
        'En tu primer lanzamiento, el balón cae muy corto. Al ver dónde cayó (el error), en el siguiente intento lanzas con un poco más de fuerza. Luego te pasas un poco hacia la derecha, y corriges el ángulo. Tras decenas de tiros, tu precisión mejora notablemente.',
      connection:
        'La red neuronal repite ese mismo ciclo miles de veces: intenta, mide su error, ajusta sus parámetros internos y vuelve a intentarlo.'
    },
    conceptDevelopment: {
      heading: 'La calidad de los datos lo cambia todo',
      blocks: [
        {
          title: 'Sin buenos datos no hay buen aprendizaje',
          body: 'Si entrenas una red para reconocer perros, pero solo le muestras fotos de una única raza blanca, fallará cuando vea un perro negro o pequeño. Los datos deben ser variados y representativos.'
        },
        {
          title: 'Aprender de memoria no sirve',
          body: 'Una buena red no debe memorizar exactamente las fotos del entrenamiento, sino aprender las características generales para acertar también con fotos nuevas.'
        },
        {
          title: 'El ciclo de entrenamiento',
          body: '1) Mostrar ejemplo → 2) Calcular predicción → 3) Medir el error → 4) Ajustar pesos → Repetir con muchos ejemplos.',
          highlight: 'Equivocarse al principio es normal; lo importante es que el error disminuya poco a poco.'
        }
      ]
    },
    summaryPoints: [
      'Una red recién creada comienza sin conocimiento y aprende durante el entrenamiento.',
      'Los datos de entrenamiento son los ejemplos variados con los que practica la red.',
      'El error mide qué tan lejos estuvo la respuesta de la red respecto al resultado esperado.'
    ],
    quickCheck: {
      question: '¿Para qué sirve medir el "error" durante el entrenamiento de una red neuronal?',
      hint: 'Recuerda el ejemplo de lanzar un balón a la canasta.',
      options: [
        {
          id: 'a',
          text: 'Para saber qué tan lejos estuvo la predicción y guiar cómo deben ajustarse los pesos.',
          isCorrect: true,
          feedback:
            '¡Correcto! Sin medir el error, la red no sabría si lo está haciendo bien ni cuánto necesita corregir.'
        },
        {
          id: 'b',
          text: 'Para apagar la red cada vez que cometa un solo fallo.',
          isCorrect: false,
          feedback:
            'Cometer errores al principio es completamente esperado. La red necesita fallar y corregirse muchas veces para aprender.'
        },
        {
          id: 'c',
          text: 'Para borrar los datos de entrenamiento y no volver a usarlos.',
          isCorrect: false,
          feedback:
            'Los datos de entrenamiento se reutilizan en varias rondas para que la red afine sus respuestas.'
        }
      ]
    }
  },
  {
    id: 'l-3-3',
    slug: 'corregir-el-rumbo-retropropagacion',
    levelId: 3,
    orderInLevel: 3,
    title: 'Corregir el rumbo: retropropagación',
    subtitle: 'Cómo la red reparte la corrección desde la salida hacia atrás para mejorar.',
    estimatedMinutes: 6,
    isReferenceContent: true,
    introduction:
      'Ya sabemos que la red mide su error al final del recorrido. Pero en una red con muchas neuronas conectadas, surge una gran pregunta: ¿cómo sabe cada conexión cuánto debe cambiar para no repetir el fallo?',
    simpleExplanation: {
      heading: 'Seguir las pistas en sentido inverso',
      paragraphs: [
        'La retropropagación (backpropagation) es el mecanismo que toma el error obtenido en la salida y lo envía hacia atrás, capa por capa, para ajustar los pesos que más contribuyeron a esa equivocación.',
        'Los pesos no cambian de golpe de forma brusca: se ajustan con pasos pequeños y controlados, para que la red aprenda de manera estable sin olvidar lo que ya había aprendido con otros ejemplos.'
      ],
      keyTerms: [
        {
          term: 'Retropropagación',
          simpleDefinition:
            'Proceso que envía la señal de error desde la salida hacia las capas anteriores para indicar cómo ajustar cada peso y sesgo.'
        },
        {
          term: 'Ajuste gradual',
          simpleDefinition:
            'Modificación pequeña y progresiva de los pesos en cada paso para reducir el error sin perder estabilidad.'
        }
      ]
    },
    everydayExample: {
      title: 'Corregir una receta de sopa demasiado salada',
      scenario:
        'Al probar el plato final (la salida), notas que la sopa quedó salada (el error). Vas hacia atrás revisando los pasos: ¿fue el caldo?, ¿fue la pizca extra de sal al final? Identificas qué paso tuvo más responsabilidad y reduces un poco esa cantidad la próxima vez.',
      connection:
        'La retropropagación hace exactamente ese recorrido hacia atrás: revisa cuánto influyó cada conexión en el resultado final y aplica un pequeño ajuste proporcional.'
    },
    conceptDevelopment: {
      heading: 'El dúo completo del aprendizaje',
      blocks: [
        {
          title: '1. Hacia adelante: probar y predecir',
          body: 'La red procesa un ejemplo y entrega su mejor intento actual.'
        },
        {
          title: '2. Medir el error',
          body: 'Comparamos la respuesta de la red con la respuesta real.'
        },
        {
          title: '3. Hacia atrás: retropropagación',
          body: 'La señal de corrección viaja desde la salida hasta las primeras capas, afinando cada peso un poco más.',
          highlight: 'Adelante para responder → Medir error → Atrás para corregir. Ese ciclo es el corazón del aprendizaje.'
        }
      ],
      optionalMath: {
        title: 'Profundización opcional: ¿cómo se decide el tamaño del ajuste?',
        intro:
          'Solo si tienes curiosidad por la idea detrás de los números: el ajuste de cada peso sigue una lógica muy intuitiva.',
        formulaLabel: 'Idea del ajuste de un peso',
        formulaText: 'Nuevo peso = Peso actual − (Ritmo de aprendizaje × Influencia en el error)',
        stepByStep: [
          'Si un peso aumentó demasiado la salida y provocó un error positivo, se reduce un poco.',
          'Si un peso casi no influyó en el error, apenas se modifica.',
          'El "ritmo de aprendizaje" (learning rate) es un número pequeño que asegura pasos suaves y cuidadosos.'
        ],
        takeaway:
          'No necesitas memorizar fórmulas: lo esencial es comprender que cada peso cambia solo un poco en la dirección que reduce el error.'
      }
    },
    summaryPoints: [
      'La retropropagación lleva la información del error desde la salida hacia las capas anteriores.',
      'Permite saber qué pesos deben subir o bajar ligeramente para mejorar la próxima predicción.',
      'Combinada con la propagación hacia adelante, forma el ciclo completo de entrenamiento.'
    ],
    quickCheck: {
      question: '¿Qué logra la retropropagación dentro de una red neuronal?',
      hint: 'Recuerda la analogía de revisar qué ingrediente hizo que la sopa quedara demasiado salada.',
      options: [
        {
          id: 'a',
          text: 'Envía el error hacia atrás para ajustar gradualmente los pesos y mejorar futuras respuestas.',
          isCorrect: true,
          feedback:
            '¡Muy bien! Gracias a la retropropagación, cada conexión aprende cuánto debe ajustarse para reducir el error.'
        },
        {
          id: 'b',
          text: 'Duplica el tamaño de las imágenes antes de entrar a la red.',
          isCorrect: false,
          feedback:
            'La retropropagación no cambia las imágenes de entrada; trabaja al final de cada predicción para ajustar los pesos internos.'
        },
        {
          id: 'c',
          text: 'Reemplaza la necesidad de tener datos de entrenamiento.',
          isCorrect: false,
          feedback:
            'La retropropagación necesita los datos de entrenamiento para poder comparar la predicción con el resultado real y calcular el error.'
        }
      ]
    }
  },

  // ===========================================================================
  // NIVEL 4: ARQUITECTURAS Y APLICACIONES
  // ===========================================================================
  {
    id: 'l-4-1',
    slug: 'de-una-capa-a-redes-profundas',
    levelId: 4,
    orderInLevel: 1,
    title: 'De una capa a redes neuronales profundas',
    subtitle: 'Cómo cambia lo que una red puede aprender al añadir más capas.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'No todas las redes neuronales tienen el mismo tamaño ni la misma estructura. Algunas son muy pequeñas y simples; otras tienen decenas o cientos de capas. Veamos por qué existen diferentes arquitecturas.',
    simpleExplanation: {
      heading: 'Más capas permiten entender ideas más elaboradas',
      paragraphs: [
        'Una red de una capa conecta directamente las entradas con la salida. Es rápida y fácil de entender, pero solo resuelve problemas sencillos donde las fronteras son claras.',
        'Una red multicapa agrega una o varias capas ocultas en el medio, lo que le permite combinar pistas y resolver problemas mucho más variados. Cuando una red tiene muchas capas ocultas apiladas, hablamos de una red neuronal profunda (Deep Learning).'
      ],
      keyTerms: [
        {
          term: 'Red de una capa',
          simpleDefinition:
            'Red muy sencilla sin capas ocultas, adecuada para decisiones directas y simples.'
        },
        {
          term: 'Red multicapa',
          simpleDefinition:
            'Red que incorpora capas ocultas entre la entrada y la salida para descubrir relaciones más ricas.'
        },
        {
          term: 'Red profunda (Deep Learning)',
          simpleDefinition:
            'Red neuronal con muchas capas ocultas que aprenden patrones en niveles progresivos, desde detalles básicos hasta conceptos complejos.'
        }
      ]
    },
    everydayExample: {
      title: 'Cómo reconoces un rostro humano',
      scenario:
        'Al mirar una foto, primero distingues bordes y sombras (nivel muy básico). Luego agrupas esos bordes en ojos, nariz y boca (nivel intermedio). Finalmente combinas todo para reconocer a tu amigo (nivel completo).',
      connection:
        'Las redes profundas trabajan por niveles similares: las primeras capas detectan trazos simples, las intermedias formas y partes, y las últimas reconocen el objeto completo.'
    },
    conceptDevelopment: {
      heading: '¿Más grande es siempre mejor?',
      blocks: [
        {
          title: 'Una capa: simple y ligera',
          body: 'Ideal cuando el problema es directo y hay pocos datos. No conviene usar una red gigante para algo sencillo.'
        },
        {
          title: 'Multicapa: el punto de equilibrio',
          body: 'Resuelve muy bien tablas de datos, predicciones cotidianas y clasificaciones moderadas.'
        },
        {
          title: 'Redes profundas: especialistas en complejidad',
          body: 'Brillan en imágenes, audio y lenguaje natural, aunque requieren muchos más ejemplos y mayor capacidad de cómputo.'
        }
      ]
    },
    interactiveResource: {
      id: 'architecture-explorer',
      title: 'Explorador visual de arquitecturas',
      instruction:
        'Alterna entre red de una capa, red multicapa y red profunda para comparar su estructura, nivel de detalle y ejemplos de uso.'
    },
    summaryPoints: [
      'Una red de una capa es simple y útil solo para relaciones directas.',
      'Las redes multicapa añaden capas ocultas para capturar patrones más ricos.',
      'Las redes profundas apilan muchas capas para construir comprensión paso a paso, de lo simple a lo complejo.'
    ],
    quickCheck: {
      question: '¿Qué caracteriza principalmente a una "red neuronal profunda" (Deep Learning)?',
      hint: 'La palabra "profunda" hace referencia a la cantidad de pasos intermedios dentro de la red.',
      options: [
        {
          id: 'a',
          text: 'Que posee muchas capas ocultas que aprenden patrones de lo simple a lo complejo.',
          isCorrect: true,
          feedback:
            '¡Exacto! "Profunda" se refiere a la profundidad en número de capas ocultas trabajando en secuencia.'
        },
        {
          id: 'b',
          text: 'Que funciona sin entradas ni salidas.',
          isCorrect: false,
          feedback:
            'Toda red neuronal, simple o profunda, necesita recibir entradas y entregar salidas.'
        },
        {
          id: 'c',
          text: 'Que solo sirve para sumar números pequeños.',
          isCorrect: false,
          feedback:
            'Al contrario: las redes profundas se usan para tareas complejas como imágenes, voz o lenguaje.'
        }
      ]
    }
  },
  {
    id: 'l-4-2',
    slug: 'aprendizaje-supervisado-y-no-supervisado',
    levelId: 4,
    orderInLevel: 2,
    title: 'Aprendizaje supervisado y no supervisado',
    subtitle: 'Aprender con un maestro que da respuestas vs. descubrir grupos por cuenta propia.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Las redes neuronales y otros sistemas de aprendizaje automático pueden entrenarse de distintas maneras según el tipo de ejemplos que tengamos disponibles. Las dos grandes familias son el aprendizaje supervisado y el no supervisado.',
    simpleExplanation: {
      heading: 'Con etiquetas o sin etiquetas',
      paragraphs: [
        'En el aprendizaje supervisado, cada ejemplo viene acompañado de su respuesta correcta (una etiqueta). Es como estudiar con un cuaderno que tiene preguntas y solucionario.',
        'En el aprendizaje no supervisado, entregamos los datos sin etiquetas. La misión del sistema es explorar esos datos y descubrir grupos, similitudes o patrones ocultos por sí mismo.'
      ],
      keyTerms: [
        {
          term: 'Etiqueta (Label)',
          simpleDefinition:
            'Respuesta correcta asociada a un ejemplo de entrenamiento (por ejemplo, marcar una foto como "bicicleta").'
        },
        {
          term: 'Aprendizaje supervisado',
          simpleDefinition:
            'Entrenamiento donde la red aprende a partir de ejemplos que incluyen la respuesta esperada.'
        },
        {
          term: 'Aprendizaje no supervisado',
          simpleDefinition:
            'Entrenamiento donde la red organiza datos sin respuestas previas buscando similitudes o estructuras.'
        }
      ]
    },
    everydayExample: {
      title: 'Ordenar una caja de piezas de colores',
      scenario:
        'Si alguien te enseña cada pieza diciendo "esto es un triángulo, esto es un cuadrado" para que luego clasifiques nuevas piezas, es aprendizaje supervisado. Si te dan una caja mezclada sin decirte nombres y tú separas las piezas parecidas en montones por forma o color, eso es aprendizaje no supervisado.',
      connection:
        'Elegir un enfoque u otro depende de si conocemos de antemano las respuestas correctas o si queremos explorar los datos para descubrir agrupaciones.'
    },
    conceptDevelopment: {
      heading: '¿Cuándo se usa cada uno?',
      blocks: [
        {
          title: 'Ejemplos de aprendizaje supervisado',
          body: 'Detectar si un correo es spam o no, reconocer dígitos escritos a mano, o estimar el tiempo de llegada de un viaje.'
        },
        {
          title: 'Ejemplos de aprendizaje no supervisado',
          body: 'Agrupar clientes con gustos similares, organizar fotografías automáticamente por parecido visual o detectar comportamientos inusuales en una red.'
        },
        {
          title: 'Un tercer camino muy conocido (mención breve)',
          body: 'También existe el aprendizaje por refuerzo, donde un sistema aprende mediante ensayo y error recibiendo puntos o recompensas, como en videojuegos o robótica.'
        }
      ]
    },
    summaryPoints: [
      'El aprendizaje supervisado utiliza ejemplos etiquetados con la respuesta correcta.',
      'El aprendizaje no supervisado analiza datos sin etiquetas para descubrir grupos o patrones.',
      'Ambos enfoques son complementarios y responden a necesidades diferentes.'
    ],
    quickCheck: {
      question: 'Tienes 10.000 canciones sin clasificar y quieres que un sistema las agrupe automáticamente por estilo similar. ¿Qué tipo de aprendizaje describe mejor este caso?',
      hint: 'Fíjate en un detalle importante: las canciones NO tienen etiquetas previas.',
      options: [
        {
          id: 'a',
          text: 'Aprendizaje supervisado, porque se busca organizar música.',
          isCorrect: false,
          feedback:
            'El tipo de aprendizaje no depende del tema (música), sino de si los datos tienen etiquetas o no. Aquí no hay etiquetas.'
        },
        {
          id: 'b',
          text: 'Aprendizaje no supervisado, porque el sistema descubre agrupaciones sin respuestas previas.',
          isCorrect: true,
          feedback:
            '¡Correcto! Cuando no existen etiquetas y el objetivo es descubrir similitudes y grupos, hablamos de aprendizaje no supervisado.'
        },
        {
          id: 'c',
          text: 'Programación fija de una sola regla.',
          isCorrect: false,
          feedback:
            'Agrupar miles de canciones por similitud requiere detectar patrones complejos a partir de los datos.'
        }
      ]
    }
  },
  {
    id: 'l-4-3',
    slug: 'aplicaciones-en-la-vida-cotidiana',
    levelId: 4,
    orderInLevel: 3,
    title: 'Redes neuronales en tu vida cotidiana',
    subtitle: 'Imágenes, voz, recomendaciones y lenguaje: dónde están actuando cada día.',
    estimatedMinutes: 5,
    isReferenceContent: true,
    introduction:
      'Aunque rara vez las vemos directamente, las redes neuronales artificiales ya forman parte de herramientas que millones de personas usan a diario. Identifiquemos cuatro grandes áreas donde marcan la diferencia.',
    simpleExplanation: {
      heading: 'Cuatro ámbitos cotidianos impulsados por RNA',
      paragraphs: [
        'Las redes neuronales destacan especialmente cuando la información es desordenada y rica en matices, justo como las imágenes, la voz humana, los gustos personales o el lenguaje escrito.',
        'En cada uno de estos casos, el principio es el mismo que ya conoces: transformar información real en números, pasarla por capas de neuronas entrenadas y entregar una respuesta útil.'
      ],
      keyTerms: [
        {
          term: 'Visión por computadora',
          simpleDefinition:
            'Capacidad de un sistema para analizar imágenes o videos e identificar objetos, rostros o texto.'
        },
        {
          term: 'Procesamiento del lenguaje natural',
          simpleDefinition:
            'Área dedicada a que las máquinas comprendan, traduzcan o generen texto y voz en idiomas humanos.'
        }
      ]
    },
    everydayExample: {
      title: 'Un día normal rodeado de redes neuronales',
      scenario:
        'Por la mañana desbloqueas el teléfono con tu rostro, dictas un mensaje de voz mientras caminas, traduces un letrero en otro idioma apuntando con la cámara y por la noche una plataforma te sugiere una película que encaja con tus gustos.',
      connection:
        'Esas cuatro acciones cotidianas usan variantes de redes neuronales entrenadas con millones de ejemplos.'
    },
    conceptDevelopment: {
      heading: '¿Cómo aportan valor en cada área?',
      blocks: [
        {
          title: 'Reconocimiento de imágenes',
          body: 'Organizar fotos por personas o lugares, ayudar a médicos a detectar señales tempranas en radiografías o asistir a vehículos para identificar peatones y señales.'
        },
        {
          title: 'Reconocimiento de voz',
          body: 'Convertir voz en texto, activar asistentes por comandos hablados y generar subtítulos automáticos en tiempo real.'
        },
        {
          title: 'Sistemas de recomendación',
          body: 'Descubrir patrones entre lo que ves, escuchas o lees para sugerir contenido relevante en música, videos, libros o cursos.'
        },
        {
          title: 'Procesamiento del lenguaje',
          body: 'Traducir entre idiomas, corregir ortografía según el contexto, resumir textos largos o responder preguntas.'
        }
      ]
    },
    interactiveResource: {
      id: 'applications-showcase',
      title: 'Explora casos reales paso a paso',
      instruction:
        'Selecciona una aplicación cotidiana para ver qué entra a la red, qué patrones analiza y qué respuesta entrega.'
    },
    summaryPoints: [
      'Las RNA impulsan herramientas cotidianas de imagen, voz, recomendaciones y lenguaje.',
      'En todos los casos siguen el mismo principio: entradas numéricas, procesamiento en capas y salida útil.',
      'También requieren uso responsable, buenos datos y supervisión humana en decisiones importantes.'
    ],
    quickCheck: {
      question: '¿Por qué las redes neuronales son tan útiles para reconocer voz o traducir idiomas?',
      hint: 'Piensa en la variedad de acentos, tonos y maneras de decir la misma frase.',
      options: [
        {
          id: 'a',
          text: 'Porque el habla y el lenguaje tienen muchísimas variaciones y patrones sutiles que se aprenden mejor con ejemplos.',
          isCorrect: true,
          feedback:
            '¡Exacto! Dos personas nunca pronuncian una palabra idéntica; las RNA aprenden a captar la esencia a partir de muchos ejemplos.'
        },
        {
          id: 'b',
          text: 'Porque todas las personas hablan exactamente con el mismo tono y velocidad.',
          isCorrect: false,
          feedback:
            'Al contrario: las voces y acentos varían muchísimo, y justo por eso las reglas fijas fallan y las RNA funcionan tan bien.'
        },
        {
          id: 'c',
          text: 'Porque las RNA no necesitan ningún ejemplo previo para entender un idioma nuevo.',
          isCorrect: false,
          feedback:
            'Las redes necesitan enormes cantidades de ejemplos durante su entrenamiento para aprender un idioma.'
        }
      ]
    }
  },

  // ===========================================================================
  // NIVEL 5: INTEGRACIÓN Y EVALUACIÓN
  // ===========================================================================
  {
    id: 'l-5-1',
    slug: 'integrando-todo-lo-aprendido',
    levelId: 5,
    orderInLevel: 1,
    title: 'Conectando todas las piezas',
    subtitle: 'El panorama completo de una Red Neuronal Artificial antes de tu evaluación final.',
    estimatedMinutes: 4,
    isReferenceContent: true,
    introduction:
      '¡Has recorrido un gran camino! Empezaste sin necesidad de conocimientos previos y ahora puedes explicar con tus propias palabras qué es una red neuronal, cómo está construida, cómo aprende y dónde se utiliza.',
    simpleExplanation: {
      heading: 'La historia completa en cinco pasos',
      paragraphs: [
        '1) Una Red Neuronal Artificial es un sistema inspirado en las conexiones del cerebro que aprende a partir de ejemplos en lugar de depender solo de reglas fijas.',
        '2) Su unidad básica es la neurona artificial: recibe entradas numéricas, las multiplica por pesos (importancia), suma un sesgo (umbral) y usa una función de activación para emitir una salida.',
        '3) Al organizar muchas neuronas en capas (entrada, ocultas y salida), la información viaja hacia adelante para producir una predicción. Durante el entrenamiento se mide el error y la retropropagación ajusta poco a poco los pesos.',
        '4) Según el tamaño del problema existen redes de una capa, multicapa o profundas, entrenadas con aprendizaje supervisado (con etiquetas) o no supervisado (sin etiquetas) para resolver tareas reales de imagen, voz, lenguaje y recomendaciones.'
      ],
      keyTerms: [
        {
          term: 'Comprensión integradora',
          simpleDefinition:
            'Capacidad de conectar cada componente (entradas, pesos, sesgo, activación, capas y entrenamiento) dentro de un mismo proceso coherente.'
        }
      ]
    },
    everydayExample: {
      title: 'Explicárselo a un amigo en 30 segundos',
      scenario:
        'Si alguien te pregunta hoy "¿qué es una red neuronal?", puedes responder: "Es un programa hecho de muchas pequeñas unidades conectadas que aprende viendo ejemplos. Cada unidad decide qué pistas pesan más, prueba dar una respuesta, ve cuánto se equivocó y ajusta sus pesos hasta acertar".',
      connection:
        'Si puedes explicar un tema complejo con palabras sencillas y un ejemplo cotidiano, significa que realmente lo comprendiste.'
    },
    conceptDevelopment: {
      heading: 'Lista de verificación antes de la evaluación final',
      blocks: [
        {
          title: '¿Distingues programación tradicional y aprendizaje automático?',
          body: 'Reglas manuales fijas vs. descubrir patrones mediante ejemplos.'
        },
        {
          title: '¿Reconoces las piezas de una neurona artificial?',
          body: 'Entradas, pesos, sesgo, función de activación y salida.'
        },
        {
          title: '¿Explicas el ciclo de aprendizaje?',
          body: 'Propagación hacia adelante → medición del error → retropropagación para ajustar pesos.'
        },
        {
          title: '¿Identificas tipos y aplicaciones?',
          body: 'Una capa / multicapa / profunda, supervisado / no supervisado, y ejemplos en imágenes, voz, lenguaje y recomendaciones.'
        }
      ]
    },
    summaryPoints: [
      'Todos los conceptos del OVA se unen en un mismo ciclo: recibir datos, ponderar pistas, responder, medir error y ajustar.',
      'Ya cuentas con las bases para resolver las actividades integradoras y la Evaluación Final.',
      'Recuerda que puedes consultar al Tutor RNA en cualquier momento para repasar un concepto antes de evaluarte.'
    ],
    quickCheck: {
      question: '¿Cuál secuencia resume correctamente cómo aprende una red neuronal supervisada?',
      hint: 'Ordena mentalmente qué pasa primero y qué ocurre después de conocer el error.',
      options: [
        {
          id: 'a',
          text: 'Entran datos → Propagación hacia adelante → Predicción → Medir error → Retropropagación para ajustar pesos.',
          isCorrect: true,
          feedback:
            '¡Sobresaliente! Has conectado perfectamente todas las piezas del proceso de aprendizaje de una red neuronal.'
        },
        {
          id: 'b',
          text: 'Medir error → Borrar las capas ocultas → Inventar entradas al azar.',
          isCorrect: false,
          feedback:
            'Para medir un error primero debe existir una entrada y una predicción, y las capas ocultas no se borran: se ajustan sus pesos.'
        },
        {
          id: 'c',
          text: 'Retropropagación primero → Luego entrar datos sin volver a comparar resultados.',
          isCorrect: false,
          feedback:
            'La retropropagación ocurre después de producir una respuesta y medir el error, no antes.'
        }
      ]
    }
  }
]

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.slug === slug)
}

export function getLessonsByLevel(levelId: number): Lesson[] {
  return LESSONS.filter((lesson) => lesson.levelId === levelId).sort(
    (a, b) => a.orderInLevel - b.orderInLevel
  )
}

export function getAdjacentLessons(slug: string): {
  previous: Lesson | null
  next: Lesson | null
} {
  const index = LESSONS.findIndex((lesson) => lesson.slug === slug)
  if (index === -1) {
    return { previous: null, next: null }
  }
  return {
    previous: index > 0 ? LESSONS[index - 1] ?? null : null,
    next: index < LESSONS.length - 1 ? LESSONS[index + 1] ?? null : null
  }
}
