import { useEffect, useState } from 'react'

const useCountUp = (target, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const isDecimal = target % 1 !== 0
    let start = 0
    const steps = 60
    const increment = target / steps
    const interval = duration / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return count
}

export default useCountUp