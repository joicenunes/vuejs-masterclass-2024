<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from 'database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import {
  mountTableSimpleCell,
  mountTableHeader,
} from '@/lib/helpers/dataTableFunctions'
import { RouterLink } from 'vue-router'
import type { QueryData } from '@supabase/supabase-js'

usePageStore().pageData.title = 'Tasks'

const taskWithProjectQuery = supabase.from('tasks').select(`
    *,
    projects (id, name, slug)
  `)

type TaskWithProject = QueryData<typeof taskWithProjectQuery>
const tasks = ref<TaskWithProject | null>(null)

const getProjects = async () => {
  const { data, error } = await taskWithProjectQuery

  if (error) console.log(error)
  tasks.value = data
}

await getProjects()

const columns: ColumnDef<TaskWithProject[0]>[] = [
  {
    accessorKey: 'name',
    header: () => mountTableHeader('Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => mountTableHeader('Status'),
    cell: ({ row }) => {
      return mountTableSimpleCell(row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => mountTableHeader('Due Date'),
    cell: ({ row }) => {
      return mountTableSimpleCell(row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => mountTableHeader('Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-left font-medium hover:bg-muted block w-full',
            },
            () => row.original.projects?.name,
          )
        : ''
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => mountTableHeader('Collaborators'),
    cell: ({ row }) => {
      return mountTableSimpleCell(JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<style lang=""></style>
