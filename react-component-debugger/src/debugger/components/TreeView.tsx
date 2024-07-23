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
  return (
    <ul>
      <li>
        <button onClick={() => setOpen(!open)}>{open ? "-" : "+"}</button>
        type: {treeNode?.elementType || treeNode?.type}
        <br />
        nodeid: "{treeNode?.nodeId}"<br />
        {`${childrenIds?.length || 0}`}
        <br />
        children:{JSON.stringify(childrenIds)}
        {open && (
          <div>
            {!!childrenIds?.length &&
              childrenIds.map((id) => {
                return id ? <TreeView nodeId={id} /> : null;
              })}
          </div>
        )}
      </li>
    </ul>
  );
};
