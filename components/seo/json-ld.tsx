/**
 * Renders one or more schema.org nodes as a native `<script type="application/ld+json">`.
 *
 * `<` is escaped to its unicode form because `JSON.stringify` does not sanitise
 * strings for HTML contexts — without it, content containing a tag could break
 * out of the script element.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const nodes = Array.isArray(data) ? data : [data];

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
