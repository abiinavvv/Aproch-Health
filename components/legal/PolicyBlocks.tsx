import type { PolicyBlock } from "@/lib/legal-document";

export default function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-body-text">
              {block.text}
            </p>
          );
        }

        if (block.type === "subheading") {
          return (
            <h4 key={index} className="font-display text-base font-semibold text-dark-text">
              {block.text}
            </h4>
          );
        }

        return (
          <div key={index}>
            {block.label && (
              <p className="font-medium text-dark-text">{block.label}</p>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-body-text">
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
