<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
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

const projects = ref<Tables<'projects'>[] | null>(null)

const getTasks = async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.log(error)
  projects.value = data
}

await getTasks()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => mountTableHeader('Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
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
    accessorKey: 'collaborators',
    header: () => mountTableHeader('Collaborators'),
    cell: ({ row }) => {
      return mountTableSimpleCell(JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<style lang=""></style>
