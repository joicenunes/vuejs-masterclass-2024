<template>
  <div>
    <h1>Project {{ route.params?.slug }}</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>

<script lang="ts">
const route = useRoute()
</script>
<style lang=""></style>
