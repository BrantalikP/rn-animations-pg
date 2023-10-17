---
to: src/features/browse/preset.ts
inject: true
after: import { ComponentType } from "react";
skip_if: h.changeCase.pascal(animationName)
---
import { <%= h.changeCase.pascal(animationName) %> } from "../animations/<%= h.changeCase.pascal(animationName) %>";