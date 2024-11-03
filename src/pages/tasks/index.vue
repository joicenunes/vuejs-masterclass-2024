<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from 'database/types'
import type { ColumnDef } from '@tanstack/vue-table'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import {
  mountTableCell,
  mountTableHeader,
} from '@/lib/helpers/dataTableFunctions'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.log(error)
  tasks.value = data
})()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => mountTableHeader('Name'),
    cell: ({ row }) => {
      return mountTableCell(row.getValue('name'))
    },
  },
  {
    accessorKey: 'status',
    header: () => mountTableHeader('Status'),
    cell: ({ row }) => {
      return mountTableCell(row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => mountTableHeader('Due Date'),
    cell: ({ row }) => {
      return mountTableCell(row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'project_id',
    header: () => mountTableHeader('Project'),
    cell: ({ row }) => {
      return mountTableCell(row.getValue('project_id'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => mountTableHeader('Collaborators'),
    cell: ({ row }) => {
      return mountTableCell(JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<style lang=""></style>
