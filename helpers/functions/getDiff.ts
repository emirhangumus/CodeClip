import DiffMatchPatch from "diff-match-patch";

const dmp = new DiffMatchPatch();

export const getDiff = (s1?: string, s2?: string) => {
  if (!s1) s1 = "";
  if (!s2) s2 = "";
  const diff = dmp.diff_main(s1, s2);
  dmp.diff_cleanupSemantic(diff);
  return diff;
};
