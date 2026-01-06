import { useCallback, useEffect, useRef } from 'react'

interface UseScrollAreaOptions {
  autoScroll?: boolean
  scrollBehavior?: ScrollBehavior
  scrollOffset?: number
}

export function useScrollArea({
  autoScroll = true,
  scrollBehavior = 'smooth',
  scrollOffset = 0
}: UseScrollAreaOptions = {}) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  const scrollToBottom = useCallback(() => {
    if (!scrollAreaRef.current || !autoScroll) return

    const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight
    scrollContainer.scrollTo({
      top: maxScrollTop + scrollOffset,
      behavior: scrollBehavior
    })
  }, [autoScroll, scrollBehavior, scrollOffset])

  const scrollToTop = useCallback(() => {
    if (!scrollAreaRef.current) return

    const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    scrollContainer.scrollTo({
      top: scrollOffset,
      behavior: scrollBehavior
    })
  }, [scrollBehavior, scrollOffset])

  const scrollToElement = useCallback((element: HTMLElement) => {
    if (!scrollAreaRef.current) return

    const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    const containerRect = scrollContainer.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const scrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) + scrollOffset

    scrollContainer.scrollTo({
      top: scrollTop,
      behavior: scrollBehavior
    })
  }, [scrollBehavior, scrollOffset])

  const handleScroll = useCallback(() => {
    isScrollingRef.current = true
    setTimeout(() => {
      isScrollingRef.current = false
    }, 150)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]')
    if (!scrollContainer) return

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return {
    scrollAreaRef,
    scrollToBottom,
    scrollToTop,
    scrollToElement,
    isScrolling: isScrollingRef.current
  }
}
