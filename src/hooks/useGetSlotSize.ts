import { useEffect, useRef, useState } from "react";

export const useGetSlotSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [slotWidth, setSlotWidth] = useState<number | null>(null);
  // const [slotHeight, setSlotHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entires) => {
      requestAnimationFrame(() => {
        const entry = entires[0];
        setSlotWidth((entry.contentRect.width + 0.8));
        // setSlotHeight(entry.contentRect.height);
      })
    })
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, slotWidth };
}