export const noop = () => {};
export const getDisplayName = component =>
  component.displayName || component.name || "Component";
