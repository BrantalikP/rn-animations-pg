export const data = [
  { id: "bottomSheet", name: "Bottom Sheet" },

  { id: "colorPicker", name: "Color Picker" },
  { id: "animated3D", name: "Animated 3D Card" },
] as const;

export type DataIds = (typeof data)[number]["id"];
