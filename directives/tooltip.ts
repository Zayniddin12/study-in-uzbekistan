import { DirectiveBinding } from 'vue'

export function VTooltip(el: HTMLElement, binding: DirectiveBinding) {
  el.classList.add('group', 'relative', '_v-tooltip')
  const tooltip = document.createElement('div')
  tooltip.classList.add(
      'max-md:hidden',
      'absolute',
      'top-0',
      '-translate-y-full',
      'opacity-0',
      'bg-[#1D2C3B]',
      'text-white',
      'text-xs',
      'py-1',
      'px-2',
      'rounded-[10px]',
      'pointer-events-none',
      'group-hover:opacity-100',
      'group-hover:-top-2',
      'after:absolute',
      'after:w-2.5',
      'after:h-2.5',
      'after:rotate-45',
      'after:rounded-sm',
      'after:bg-[#1D2C3B]',
      'transition-all',
      'duration-300',
      'w-max',
      'max-w-[200px]',
      'text-center'
  )
  if (binding.modifiers?.right) {
    tooltip.classList.add('-right-1', 'after:right-2', 'after:-bottom-1')
  } else if (binding.modifiers?.left) {
    tooltip.classList.add('-left-1', 'after:left-2', 'after:-bottom-1')
  } else if (binding.modifiers?.bottom) {
    tooltip.classList.add(
        '!top-full',
        '!translate-y-2',
        'after:left-1/2',
        'after:-translate-x-1/2',
        'after:-top-1'
    )
  } else if (binding.modifiers?.achievement) {
    tooltip.classList.add(
        '-translate-x-1/2',
        '!translate-y-2',
        '!top-full',
        'left-1/2',
        'after:left-1/2',
        'after:-translate-x-1/2',
        'after:-bottom-1',
        'after:-top-1',
        '!bg-[#1D2C3B]',
        'after:bg-[#1D2C3B]'
    )
  } else {
    tooltip.classList.add(
        '-translate-x-1/2',
        'left-1/2',
        'after:left-1/2',
        'after:-translate-x-1/2',
        'after:-bottom-1'
    )
  }
  const span = document.createElement('span')
  span.classList.add('text-white', 'z-10', 'relative', 'font-sans')
  span.innerHTML = binding.value
  tooltip.appendChild(span)
  el.appendChild(tooltip)
}
