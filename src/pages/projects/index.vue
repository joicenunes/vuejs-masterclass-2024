<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  mountTableSimpleCell,
  mountTableHeader,
} from '@/lib/helpers/dataTableFunctions'
import { RouterLink } from 'vue-router'
import { projectsQuery, type Project } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Project | null>(null)

const getTasks = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log(error)
  projects.value = data
}

await getTasks()

const columns: ColumnDef<Project[0]>[] = [
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
