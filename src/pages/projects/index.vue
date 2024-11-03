<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumnns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getTasks = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)
  projects.value = data
}

await getTasks()
</script>

<style lang=""></style>
