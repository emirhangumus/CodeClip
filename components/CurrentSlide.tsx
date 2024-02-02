"use client";

import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
import { EditMode } from "./EditMode";
import { PresentMode } from "./PresentMode";
import { SlideTopbar } from "./SlideTopbar";

export const CurrentSlide = () => {
  const [state, setState] = useAtom(stateAtom);

  return (
    <>
      <div className="aspect-video overflow-hidden w-full border rounded-md border-zinc-900 bg-zinc-950">
        <div className="h-8">
          <SlideTopbar />
        </div>
        <div className="w-full h-[1px] bg-zinc-900 rounded-md" />
        {state.mode == "edit" ? <EditMode /> : <PresentMode />}
      </div>
    </>
  );
};

