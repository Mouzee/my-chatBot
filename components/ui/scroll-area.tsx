'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

function ScrollArea({
  className,
  children,
  showScrollIndicator = false,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & { showScrollIndicator?: boolean }) {
  const [canScrollDown, setCanScrollDown] = React.useState(false)
  const viewportRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const checkScrollability = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 10)
    }

    checkScrollability()
    viewport.addEventListener('scroll', checkScrollability)
    return () => viewport.removeEventListener('scroll', checkScrollability)
  }, [])

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative group', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:outline-1 hover:bg-background/5 hover:shadow-inner"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      {showScrollIndicator && canScrollDown && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-primary/20 backdrop-blur-sm rounded-full p-1"
          >
            <ChevronDown className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-all duration-200 select-none opacity-0 group-hover:opacity-100 hover:opacity-100',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent hover:w-3 hover:border-l-border/20',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent hover:h-3 hover:border-t-border/20',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border/60 hover:bg-border relative flex-1 rounded-full transition-all duration-200 hover:bg-primary/30"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
