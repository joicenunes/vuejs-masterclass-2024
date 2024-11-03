import { h } from "vue"

const mountTableHeader = (headerName: string) => {
  return h('div', { class: 'text-left;' }, headerName)
}

const mountTableCell = (value: string) => {
  return h('div', { class: 'text-left;' }, value)
}

export {
  mountTableHeader,
  mountTableCell
}