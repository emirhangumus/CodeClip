import { getDiff } from "@/helpers/functions/getDiff";
import { highlightWrapper } from "@/helpers/functions/hightlightWrapper";
import { stateAtom } from "@/stores/state";
import { Slide } from "@/types";
import type { Diff } from "diff-match-patch";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";

const ANIMATE_DURATION = 500;
const ANIMATE_CURVE = "cubic-bezier(0.4, 0, 0.2, 1)";

const isAdded = (part: Diff) => part[0] === 1;
const isRemoved = (part: Diff) => part[0] === -1;

const animateDiff = (diff: Diff[]) => {
  const CurrentDOM = document.querySelector("#currentEditor > pre");
  const NextDOM = document.querySelector("#helperEditor > pre");

  if (!CurrentDOM || !NextDOM) return;

  const cd_cnodes = CurrentDOM.childNodes;
  const nd_cnodes = NextDOM.childNodes;
};

export const PresentMode = () => {
  const ref = useRef(null);
  const [state, setState] = useAtom(stateAtom);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(
    state.slides.find((slide) => slide.id === state.current_slide)
  );
  const [nextSlide, setNextSlide] = useState<Slide | null>(
    state.slides[currentSlideIndex + 1]
  );
  const [diff, setDiff] = useState<Diff[]>();

  const valueOfCurrentSlide = () => {
    return currentSlide?.content;
  };

  const valueOfNextSlide = () => {
    return nextSlide?.content;
  };

  useEffect(() => {
    if (!window) return;
    // if press right arrow
    const handleRightArrow = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (currentSlideIndex + 1 > state.slides.length - 1) {
          return;
        }
        setCurrentSlideIndex((prev) => prev + 1);
      }
    };
    // if press left arrow
    const handleLeftArrow = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (currentSlideIndex - 1 < 0) {
          return;
        }
        setCurrentSlideIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleRightArrow);
    window.addEventListener("keydown", handleLeftArrow);

    return () => {
      window.removeEventListener("keydown", handleRightArrow);
      window.removeEventListener("keydown", handleLeftArrow);
    };
  }, [currentSlideIndex, state.slides.length]);

  useEffect(() => {
    setCurrentSlide(state.slides[currentSlideIndex]);
    if (currentSlideIndex + 1 > state.slides.length - 1) {
      setNextSlide(null);
    } else {
      setNextSlide(state.slides[currentSlideIndex + 1]);
    }
  }, [currentSlideIndex, state.slides]);

  useEffect(() => {
    setTimeout(() => {
      setDiff(getDiff(currentSlide?.content, nextSlide?.content));
    }, 0);
  }, [currentSlide, nextSlide]);

  useEffect(() => {
    if (!diff) return;
    animateDiff(diff);
  }, [diff]);

  return (
    <div className="p-8 h-full relative" ref={ref} id="scene">
      <Editor
        readOnly
        value={valueOfCurrentSlide() || ""}
        onValueChange={() => null}
        highlight={(code) => highlightWrapper(code, "currentEditor", true)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          height: "100%",
        }}
        insertSpaces
      />
      <Editor
        className="!absolute !top-0 !left-0 !p-8 !opacity-0 w-full"
        readOnly
        value={valueOfNextSlide() || ""}
        onValueChange={() => null}
        highlight={(code) => highlightWrapper(code, "helperEditor", true)}
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
