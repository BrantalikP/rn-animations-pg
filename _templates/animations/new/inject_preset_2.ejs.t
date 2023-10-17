---
to: src/features/browse/preset.ts
inject: true
after: "export const data ="
skip_if: h.changeCase.camel(animationName)
---
  {
    id: "<%= h.changeCase.camel(animationName) %>",
    name: "<%= animationName %>",
    description: "<%= animationDescription %>",
    tags: [<%- animationTags.split(',').map(tag => `"${tag.trim()}"`).join(', ') %>],
  },