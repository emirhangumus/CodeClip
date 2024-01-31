import { State } from "@/types";
import { atom } from "jotai";

export const stateAtom = atom<State>({
  number_of_slides: 0,
  current_slide: "first-slide",
  slides: [
    {
      id: "first-slide",
      fileName: "Untitled",
      content: "",
      language: "javascript",
      mini_preview_blob: null,
    },
  ],
});
