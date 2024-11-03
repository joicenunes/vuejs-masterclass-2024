import { mountTableHeader, mountTableSimpleCell } from "@/lib/helpers/dataTableFunctions"
import type { ColumnDef } from "@tanstack/vue-table"
import { RouterLink } from "vue-router"
import type { TasksWithProject } from "../supaQueries"

export const columns: ColumnDef<TasksWithProject[0]>[] = [
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