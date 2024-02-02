import { highlightWrapper } from "@/helpers/functions/hightlightWrapper";
import { useScreenshot } from "@/hooks/useScreenshot";
import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";

export const EditMode = () => {
  const ref = useRef(null);
  const [state, setState] = useAtom(stateAtom);
  const { screenshot, takeScreenshot } = useScreenshot(ref);

  const currentSlide = state.slides.find(
    (slide) => slide.id === state.current_slide
  );

  const valueOfCurrentSlide = () => {
    return currentSlide?.content;
  };

  const setCodeOfCurrentSlide = (code: string) => {
    setState((prev) => {
      return {
        ...prev,
        slides: prev.slides.map((slide) => {
          if (slide.id === currentSlide?.id) {
            return {
              ...slide,
              content: code,
            };
          }
          return slide;
        }),
      };
    });
  };

  const setBlobOfCurrentSlide = (blob: string) => {
    setState((prev) => {
      return {
        ...prev,
        slides: prev.slides.map((slide) => {
          if (slide.id === currentSlide?.id) {
            return {
              ...slide,
              mini_preview_blob: blob,
            };
          }
          return slide;
        }),
      };
    });
  };

  useEffect(() => {
    if (!screenshot || screenshot === "") return;
    setBlobOfCurrentSlide(screenshot);
  }, [screenshot]);

  return (
    <div className="p-8 h-full" ref={ref}>
      <Editor
        value={valueOfCurrentSlide() || ""}
        onValueChange={(code) => setCodeOfCurrentSlide(code)}
        onBlur={() => {
          takeScreenshot();
        }}
        highlight={(code) => highlightWrapper(code, "testid", true)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          height: "100%",
        }}
      />
    </div>
  );
};
