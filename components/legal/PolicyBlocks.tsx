import type { PolicyBlock } from "@/lib/legal-document";

export default function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-sm text-body-text md:text-base">
              {block.text}
            </p>
          );
        }

        if (block.type === "subheading") {
          return (
            <h4 key={index} className="font-display text-sm font-semibold text-dark-text md:text-base">
              {block.text}
            </h4>
          );
        }

        return (
          <div key={index}>
            {block.label && (
              <p className="text-sm font-medium text-dark-text md:text-base">{block.label}</p>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-body-text md:text-base">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
