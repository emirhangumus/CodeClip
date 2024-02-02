import { stateAtom } from "@/stores/state";
import { useAtom } from "jotai";
import { CloseIcon } from "./icons/CloseIcon";
import { MaximizeIcon } from "./icons/MaximizeIcon";
import { MinimizeIcon } from "./icons/MinimizeIcon";

export const SlideTopbar = () => {
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
