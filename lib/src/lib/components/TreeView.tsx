import { useContext, useMemo, useState } from "react";
import { TreeNodeContext } from "../contexts/TreeNodeContext";

export const TreeView = ({ nodeId }: { nodeId: string }) => {
  const { getNode } = useContext(TreeNodeContext);

  const treeNode = useMemo(() => {
    return getNode(nodeId);
  }, [getNode, nodeId]);

  const childrenIds = useMemo(() => {
    return (treeNode?.childIds || []).filter((id) => id !== nodeId);
  }, [treeNode?.childIds, nodeId]);

  const [open, setOpen] = useState<boolean>(false);

  const color = useMemo(() => {
    if (treeNode?.isNodeModule) {
      return "red-500";
    }
    if (treeNode?.isDom) {
      return "blue-500";
    }
    if (treeNode?.isText) {
      return "slate-500";
    }
    if (treeNode?.elementType) {
      return "green-500";
    }
    if (treeNode?.type) {
      return "yellow-500";
    }
    return "gray-500";
  }, [
    treeNode?.elementType,
    treeNode?.isDom,
    treeNode?.isNodeModule,
    treeNode?.isText,
    treeNode?.type,
  ]);

  return (
    <ul className="pl-4 flex flex-wrap">
      <li className="w-full relative">
        {childrenIds?.length ? (
          <button className="pr-2 opacity-80" onClick={() => setOpen(!open)}>
            {open ? "v" : ">"}
          </button>
        ) : (
          <span className="pr-2 opacity-80">•</span>
        )}
        <button className={`text-${color}`} onClick={() => console.log(treeNode)}>
          type: {treeNode?.elementType || treeNode?.type}
        </button>
        {open && (
          <>
            <div>
              {!!childrenIds?.length &&
                childrenIds.map((id) => {
                  return id ? <TreeView nodeId={id} /> : null;
                })}
            </div>
            <div
              className={`
            absolute
            top-6 bottom-0
            w-1 w-px pt-3
            bg-${color}
            `}
            ></div>
          </>
        )}
      </li>
    </ul>
  );
};
