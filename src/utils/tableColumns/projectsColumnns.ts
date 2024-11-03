import { mountTableHeader, mountTableSimpleCell } from "@/lib/helpers/dataTableFunctions"
import type { ColumnDef } from "@tanstack/vue-table"
import { RouterLink } from "vue-router"
import type { Project } from "../supaQueries"

export const columns: ColumnDef<Project[0]>[] = [
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