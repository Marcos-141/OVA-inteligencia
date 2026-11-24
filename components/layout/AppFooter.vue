<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <div class="app-footer__brand">
        <p class="app-footer__title">OVA · Redes Neuronales Artificiales (RNA)</p>
        <p class="app-footer__desc">
          Experiencia educativa interactiva diseñada para aprender desde cero. Tu progreso se guarda
          únicamente en tu navegador mediante <code>localStorage</code>.
        </p>
      </div>

      <nav class="app-footer__links" aria-label="Enlaces rápidos">
        <NuxtLink to="/learning">Ruta de aprendizaje</NuxtLink>
        <NuxtLink to="/activities">Actividades</NuxtLink>
        <NuxtLink to="/evaluation">Evaluación final</NuxtLink>
        <NuxtLink to="/tutor">Tutor RNA</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding: 2rem 0;
  margin-top: auto;
}

.app-footer__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.app-footer__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}

.app-footer__desc {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  max-width: 56ch;
}

.app-footer__desc code {
  font-size: 0.8125rem;
  background-color: var(--color-surface-subtle);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.app-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.app-footer__links a:hover {
  color: var(--color-primary);
}
</style>
