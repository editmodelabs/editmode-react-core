import hash from "@emotion/hash";
import kebabCase from "lodash.kebabcase";

export function computeContentKey(content) {
  if (typeof content !== "string") return;

  return `${kebabCase(content.slice(0, 32))}-${hash(content)}`;
}
