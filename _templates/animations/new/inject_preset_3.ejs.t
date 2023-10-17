---
to: src/features/browse/preset.ts
inject: true
after: "export const idToComponentMap: Record<DataIds, ComponentType> = {"
skip_if: h.changeCase.camel(animationName)
---
  "<%= h.changeCase.camel(animationName) %>": <%= h.changeCase.pascal(animationName) %>,