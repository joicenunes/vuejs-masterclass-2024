<template>
  <div>
    <h1>Home View</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>

<script lang="ts" setup>
usePageStore().pageData.title = 'Homepage'
</script>
