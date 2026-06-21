<template>
  <router-view></router-view>
</template>

<script setup>
// Global bazda çalışmasını istediğin JavaScript mantıklarını buraya yazabilirsin
</script>

<style>
/* Tailwind CSS temel katmanlarını doğrudan buraya ekliyoruz */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* İstersen kendi global CSS kodlarını da buraya yazabilirsin */
body {
  margin: 0;
  padding: 0;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}
</style>
