// Renders text where words between *asterisks* are highlighted in blue.
export function Rich({ text, tag: Tag = "span" }: { text: string; tag?: "span" | "b" | "strong" }) {
  return (
    <>
      {text.split(/\*(.+?)\*/).map((part, i) =>
        i % 2 ? (
          <Tag key={i} className={Tag === "strong" ? undefined : "hl"}>
            {part}
          </Tag>
        ) : (
          part
        ),
      )}
    </>
  );
}
