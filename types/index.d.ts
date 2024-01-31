export type State = {
    number_of_slides: number;
    current_slide: string | null;
    slides: Slide[];
}

export type Slide = {
  id: string;
  fileName: string;
  content: string;
  language: string;
  mini_preview_blob: string | null;
};