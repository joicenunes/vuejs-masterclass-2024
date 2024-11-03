<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from 'database/types'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import {
  mountTableCell,
  mountTableHeader,
} from '@/lib/helpers/dataTableFunctions'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)
  projects.value = data
})()

const columns: ColumnDef<Tables<'projects'>>[] = [
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
    accessorKey: 'collaborators',
    header: () => mountTableHeader('Collaborators'),
    cell: ({ row }) => {
      return mountTableCell(JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<style lang=""></style>
