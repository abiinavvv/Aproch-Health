export type PolicyBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; label?: string; items: string[] };

export type PolicySubsection = {
  number: number;
  title: string;
  blocks: PolicyBlock[];
};

export type PolicySection = {
  id: string;
  title: string;
  subsections: PolicySubsection[];
};
