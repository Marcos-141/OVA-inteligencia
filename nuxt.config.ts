export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  typescript: {
    strict: true,
    typeCheck: false
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      title: 'OVA: Redes Neuronales Artificiales (RNA)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Objeto Virtual de Aprendizaje interactivo para comprender desde cero qué son las Redes Neuronales Artificiales, cómo funcionan y cómo se aplican en la vida cotidiana.'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'
        }
      ]
    }
  }
})
