<template>
  <div>
    <h1>Project {{ route.params?.id }}</h1>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<style lang=""></style>
