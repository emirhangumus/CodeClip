"use client";

import { generateID } from "@/helpers/functions/generateId";
import { stateAtom } from "@/stores/state";
import { Slide } from "@/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function Slides() {
  const [state, setState] = useAtom(stateAtom);

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        number_of_slides: state.slides.length,
      };
    });
  }, [state.slides.length]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {state.slides.map((slide, index) => {
          return <Slide key={slide.id} slide={slide} />;
        })}
      </div>
      <button
        className="bg-zinc-900 w-full rounded-md mt-4 hover:bg-zinc-800 transition-colors text-lg"
        onClick={() => {
          setState((prev) => {
            return {
              ...prev,
              slides: [
                ...prev.slides,
                {
                  id: generateID(),
                  content: "",
                  language: "typescript",
                  fileName: "Untitled",
                  mini_preview_blob: "",
                },
              ],
            };
          });
        }}
      >
        +
      </button>
    </div>
  );
}

const Slide = ({ slide }: { slide: Slide }) => {
  const [state, setState] = useAtom(stateAtom);

  const setSelected = () => {
    setState((prev) => {
      return {
        ...prev,
        current_slide: slide.id,
      };
    });
  };

  return (
    <button
      onClick={setSelected}
      className="relative aspect-video w-full border border-zinc-900 bg-zinc-950 shadow shadow-transparent hover:shadow-md transition-shadow rounded-md hover:shadow-zinc-900"
    >
      {slide.mini_preview_blob !== "" && slide.mini_preview_blob !== null ? (
        <img
          src={slide.mini_preview_blob || ""}
          alt="screenshot"
          className="w-full h-full object-cover"
        />
      ) : null}
      {/** show a trash icon to delete */}
    </button>
  );
};
