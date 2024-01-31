"use client";

import { useScreenshot } from "@/hooks/useScreenshot";
import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";
import * as PrismJS from "../public/prismjs";

export const CurrentSlide = () => {
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
    <>
    
      <div className="aspect-video overflow-hidden w-full border rounded-md border-zinc-900 bg-zinc-950">
        <div className="h-8">
          <SlideTopbar />
        </div>
        <div className="w-full h-[1px] bg-zinc-900 rounded-md" />
        <div className="p-8 h-full" ref={ref}>
          <Editor
            value={valueOfCurrentSlide() || ""}
            onValueChange={(code) => setCodeOfCurrentSlide(code)}
            onBlur={() => {
                takeScreenshot();
            }}
            highlight={(code) =>
              // @ts-ignore
              PrismJS.highlight(code, PrismJS.languages.ts, "ts")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
};

const SlideTopbar = () => {
  const [state, setState] = useAtom(stateAtom);

  const currentSlide = state.slides.find(
    (slide) => slide.id === state.current_slide
  );

  return (
    <div className="flex items-center justify-between px-4 w-full h-full">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none border-none text-sm font-mono text-zinc-500"
          value={currentSlide?.fileName}
          onChange={(e) => {
            setState((prev) => {
              return {
                ...prev,
                slides: prev.slides.map((slide) => {
                  if (slide.id === currentSlide?.id) {
                    return {
                      ...slide,
                      fileName: e.target.value,
                    };
                  }
                  return slide;
                }),
              };
            });
          }}
        />
      </div>
      <div className="flex gap-4 items-center justify-end px-4 w-full h-full">
        <MinimizeIcon className="h-4 w-4" />
        <MaximizeIcon className="h-4 w-4 fill-zinc-700" />
        <CloseIcon className="h-4 w-4 fill-zinc-700" />
      </div>
    </div>
  );
};

const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
      <path
        d="M2.5 12A1.5 1.5 0 0 1 4 10.5h16a1.5 1.5 0 0 1 0 3H4A1.5 1.5 0 0 1 2.5 12Z"
        fill="#3f3f46"
      />
    </g>
  </svg>
);

const MaximizeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    {...props}
  >
    <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z" />
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    id="cross"
    className="icon glyph"
    {...props}
  >
    <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z" />
  </svg>
);
