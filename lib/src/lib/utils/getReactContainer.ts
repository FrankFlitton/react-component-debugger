export const getReactContainer = (nativeElement: Element) => {
  const rKeys = Object.keys(nativeElement);

  // _reactListeninggmo0epq70dp
  // __reactContainer$lmazt05fqp
  const reactContainer =
    rKeys.find((key) => key.startsWith("__reactContainer") || key.startsWith("__reactFiber")) || "";

  if (!reactContainer) {
    console.error("React container not found");
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - bs typings
  const containerNode = nativeElement[reactContainer];

  return containerNode;
};
