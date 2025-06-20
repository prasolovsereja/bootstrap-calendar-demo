import { useEffect, useRef, useState } from "react";

export const useGetSlotSize = (daysToRender: string[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [slotWidth, setSlotWidth] = useState<number | null>(null);
  const [slotHeight, setSlotHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entires) => {
      requestAnimationFrame(() => {
        const entry = entires[0];
        const borderSize = 0.8
        setSlotWidth((entry.contentRect.width + borderSize));
        setSlotHeight(entry.contentRect.height  + borderSize);
      })
    })
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, daysToRender.length]);
  return { ref, slotWidth, slotHeight };
}