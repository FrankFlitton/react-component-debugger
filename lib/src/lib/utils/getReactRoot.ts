export const getReactRoot = () => {
  const root = document.getElementById("root-b");
  if (!root) {
    throw new Error("React root not found");
  }
  return root;
};
