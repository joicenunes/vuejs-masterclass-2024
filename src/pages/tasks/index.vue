<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script setup lang="ts">
import {
  tasksWithProjectQuery,
  type TasksWithProject,
} from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProject | null>(null)

const getProjects = async () => {
  const { data, error } = await tasksWithProjectQuery

  if (error) console.log(error)
  tasks.value = data
}

await getProjects()
</script>
