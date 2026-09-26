import { describe, expect, it } from "vitest";
import { paragraphsToPortableText } from "./types";

describe("paragraphsToPortableText", () => {
  it("wraps each paragraph as a normal-style block with one text span", () => {
    const blocks = paragraphsToPortableText(["First paragraph.", "Second paragraph."]);
    expect(blocks).toEqual([
      {
        _type: "block",
        _key: "fallback-0",
        style: "normal",
        children: [{ _type: "span", _key: "fallback-0-span", text: "First paragraph." }],
      },
      {
        _type: "block",
        _key: "fallback-1",
        style: "normal",
        children: [{ _type: "span", _key: "fallback-1-span", text: "Second paragraph." }],
      },
    ]);
  });

  it("returns an empty array for no paragraphs", () => {
    expect(paragraphsToPortableText([])).toEqual([]);
  });

  it("gives every block a unique _key, matching what @portabletext/react requires for a list", () => {
    const blocks = paragraphsToPortableText(["a", "b", "c"]);
    const keys = blocks.map((b) => b._key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
