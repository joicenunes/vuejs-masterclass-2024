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

usePageStore().pageData.title = 'Projects'

const tasks = ref<Tables<'tasks'>[] | null>(null)

const getProjects = async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.log(error)
  tasks.value = data
}

await getProjects()

const columns: ColumnDef<Tables<'tasks'>>[] = [
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
    accessorKey: 'project_id',
    header: () => mountTableHeader('Project'),
    cell: ({ row }) => {
      return mountTableSimpleCell(row.getValue('project_id'))
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
