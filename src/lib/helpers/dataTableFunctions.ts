import { h } from "vue"

const mountTableHeader = (headerName: string) => {
  return h('div', { class: 'text-left' }, headerName)
}

const mountTableSimpleCell = (value: string) => {
  return h('div', { class: 'text-left font-medium' }, value)
}

export {
  mountTableHeader,
  mountTableSimpleCell
}