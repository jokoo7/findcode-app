export const PRODUCT_CATEGORIES = [
  {
    id: 'starter_kit',
    label: 'Starter Kit',
    subLabel: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    value: 'starter_kit' as const,
    href: '/products?category=starter_kit'
  },
  {
    id: 'ui_template',
    label: 'UI Template',
    subLabel:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, numquam magni! Numquam, dolorum? Necessitatibus.',
    value: 'ui_template' as const,
    href: '/products?category=ui_template'
  }
]

export const TECH_STACKS = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Javascript', value: 'js' },
  { label: 'Typescript', value: 'ts' },
  { label: 'Tailwind CSS', value: 'tailwind_css' },
  { label: 'shadcn/ui', value: 'shadcn_ui' },
  { label: 'PHP', value: 'php' },
  { label: 'Laravel', value: 'laravel' },
  { label: 'Filament', value: 'filament' },
  { label: 'Inertia.js', value: 'inertiajs' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' }
]
