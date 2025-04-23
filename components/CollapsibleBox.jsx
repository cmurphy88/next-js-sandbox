import { Collapsible } from '@base-ui-components/react/collapsible'

const CollapsibleBox = ({ title, children }) => {
  return (
    <Collapsible.Root className="flex w-full flex-col my-5 justify-center">
      <Collapsible.Trigger className="group flex items-center gap-2 rounded-sm bg-gray-800 px-2 py-5 text-xl font-medium hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-600">
        <ChevronIcon className="size-3 transition-all ease-out group-data-[panel-open]:rotate-90" />
        {title}
      </Collapsible.Trigger>
      <Collapsible.Panel className="flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        {children}
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}

function ChevronIcon(props) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
    </svg>
  )
}

export default CollapsibleBox
