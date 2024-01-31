"use client";

import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
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

  if (state.current_slide === "" || state.current_slide === null) {
    return (
      <div className="w-full h-full rounded-md flex flex-col justify-center items-center">
        <h1 className="text-4xl">Select a slide</h1>
      </div>
    );
  }

  return (
    <div>
        {/* <pre className="text-white">{JSON.stringify(state, null, 2)}</pre> */}
      <div className="max-w-7xl mx-auto">
        <CurrentSlide key={state.current_slide} />
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-zinc-950 px-16 py-4 flex gap-4 rounded-md border-zinc-900 border">
          <button className="bg-blue-950 border border-blue-900 rounded-md px-4 py-1 border-opacity-50">
            Preview
          </button>
          <button className="bg-blue-950 border border-blue-900 rounded-md px-4 py-1 border-opacity-50">
            Render
          </button>
        </div>
      </div>
    </div>
  );
};
