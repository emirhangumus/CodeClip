import { TokenizeTypes } from "@/components/TokenizeTypes";
import parse from "html-react-parser";
import * as PrismJS from "../../public/prismjs";

export const highlightWrapper = (
  code: string,
  id?: string,
  splitAllChars?: boolean
) => {
  // @ts-ignore
  const c = PrismJS.highlight(code, PrismJS.languages.ts, "ts");
  let parsed = parse(c);

  if (typeof parsed !== "string" && Array.isArray(parsed)) {
    parsed = parsed.map((x) => {
      // if its whitespace, wrap with span
      if (typeof x === "string" && x === " ") {
        return <span className="token custom_whitespace"> </span>;
      } else if (typeof x === "string") {
        return <span className="token custom_text">{x}</span>;
      }
      return x;
    });
    if (splitAllChars) {
        const newParsed: JSX.Element[] = [];
        
        for (let i = 0; i < parsed.length; i++) {
            const el = parsed[i];
            const classnames = el.props.className.split(" ");
            for (let j = 0; j < classnames.length; j++) {
                const className = classnames[j];
                if (TokenizeTypes.includes(className)) {
                    const text = el.props.children;
                    for (let k = 0; k < text.length; k++) {
                        const char = text[k];
                        newParsed.push(<span className={'token ' + className}>{char}</span>);
                    }   
                }
            }
        }
        parsed = newParsed;
    }
  }

  return (
    <div className="parsedText" id={id}>
      {parsed}
    </div>
  );
};
