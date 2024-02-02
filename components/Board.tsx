"use client";

import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { CurrentSlide } from "./CurrentSlide";
import { Slides } from "./Slides";

export function Board() {
  return (
    <>
      <div className="w-screen h-screen p-8 grid grid-cols-[1fr_13fr] gap-8 bg-black">
        <Slides />
        <MainBoard />
      </div>
    </>
  );
}

const MainBoard = () => {
  const [state, setState] = useAtom(stateAtom);

  const switchMode = () => {
    const mode = state.mode === "edit" ? "present" : "edit";
    setState((prev) => ({ ...prev, mode }));
  };

  useEffect(() => {
    if (!window) return;

    const handleSpace = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === " ") {
        switchMode();
      }
    };

    window.addEventListener("keydown", handleSpace);

    return () => {
      window.removeEventListener("keydown", handleSpace);
    };
  }, [state.mode]);

  if (state.current_slide === "" || state.current_slide === null) {
    return (
      <div className="w-full h-full rounded-md flex flex-col justify-center items-center">
        <h1 className="text-4xl">Select a slide</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <CurrentSlide />
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-zinc-950 px-16 py-4 flex gap-4 rounded-md border-zinc-900 border">
          <button
            onClick={switchMode}
            className="bg-blue-950 border border-blue-900 rounded-md px-4 py-1 border-opacity-50"
          >
            {state.mode === "edit" ? "Switch To Present" : "Switch To Edit"}
          </button>
          <button className="bg-blue-950 border border-blue-900 rounded-md px-4 py-1 border-opacity-50">
            Render
          </button>
        </div>
      </div>
    </div>
  );
};
