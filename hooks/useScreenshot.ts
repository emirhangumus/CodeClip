import { toPng } from "html-to-image";
import { MutableRefObject, useCallback, useState } from "react";

export const useScreenshot = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const takeScreenshot = useCallback(async () => {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { quality: 0.1, cacheBust: true });
    setScreenshot(dataUrl);
  }, [ref]);

  return { screenshot, takeScreenshot };
}

// Path: hooks/useSlide.ts