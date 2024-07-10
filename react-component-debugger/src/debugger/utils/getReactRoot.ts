export const getReactRoot = () => {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("React root not found");
  }
  return root;
};
