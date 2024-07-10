export const getReactContainer = (nativeElement: Element) => {
  const rKeys = Object.keys(nativeElement);

  // _reactListeninggmo0epq70dp
  // __reactContainer$lmazt05fqp
  const reactContainer =
    rKeys.find((key) => key.startsWith("__reactContainer")) || "";

  if (!reactContainer) {
    console.error("React container not found");
  }

  // @ts-expect-error - bs typings
  const containerNode = nativeElement[reactContainer];

  return containerNode;
};
