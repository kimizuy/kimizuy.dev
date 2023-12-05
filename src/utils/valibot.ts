import { array, date, is, object, type Output, string } from "valibot";

const FrontmatterSchema = object({
  title: string(),
  description: string(),
  publishedAt: date(),
  tags: array(string()),
});

export const isFrontmatter = (
  value: unknown,
): value is Output<typeof FrontmatterSchema> => is(FrontmatterSchema, value);

const MDXExportSchema = object({ cover: string() });

export const isMDXExport = (
  value: unknown,
): value is Output<typeof MDXExportSchema> => is(MDXExportSchema, value);

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("Frontmatter", () => {
    it("should validate valid frontmatter", () => {
      expect(
        isFrontmatter({
          title: "Hello",
          description: "World",
          publishedAt: new Date(),
          tags: ["hello", "world"],
        }),
      ).toBe(true);
    });

    it("should invalidate invalid frontmatter", () => {
      expect(
        isFrontmatter({
          title: "Hello",
          description: "World",
          publishedAt: new Date(),
          tags: ["hello", 1],
        }),
      ).toBe(false);
    });
  });

  describe("MDXExport", () => {
    it("should validate valid MDXExport", () => {
      expect(isMDXExport({ cover: "hello" })).toBe(true);
    });

    it("should invalidate invalid MDXExport", () => {
      expect(isMDXExport({ cover: 1 })).toBe(false);
    });
  });
}
