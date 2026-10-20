const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}_\s-]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const unslugify = (str: string) =>
  str.toLowerCase().trim().replace(/[-]+/g, " ");

export default slugify;
