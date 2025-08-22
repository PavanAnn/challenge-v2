/* eslint-disable no-mixed-operators */
import React, { JSX, useState } from "react";
import { TreeRow } from "./Assets.styles";
import { AssetIcon } from "../../media/asset";
import { ComponentIcon } from "../../media/component";
import { LocationIcon } from "../../media/location";
import { ArrowDownIcon } from "../../media/arrowDown";
import { useSelectedComponent } from "../../store/useSelectedComponentStore";
import { Assets } from "../../features/assets/Types";
import { DangerIcon } from "../../media/danger";
import { OperatingIcon } from "../../media/operating";

type TreeNodeType = {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  children: TreeNodeType[];
  fullItem?: Assets;
  _visibleChildren?: TreeNodeType[];
};

type TreeNodeProps = {
  node: TreeNodeType;
  level?: number;
  isFilterApplied?: boolean;
};

export const AssetsPage: React.FC<TreeNodeProps> = ({ node, level = 0, isFilterApplied = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setSelectedComponent } = useSelectedComponent((state) => state);

  const hasChildren = node.children && node.children.length > 0;

  const icons: Record<string, JSX.Element> = {
    asset: <AssetIcon />,
    component: <ComponentIcon />,
    location: <LocationIcon />,
  };

  const open = isFilterApplied ? true : isOpen;

  return (
    <div style={{ marginLeft: level * 16 }}>
      <TreeRow
        style={{
          cursor: hasChildren && !isFilterApplied || node.type === 'component' ? "pointer" : "default"
        }}
        onClick={() => {
          if (!isFilterApplied) {
            if (hasChildren) setIsOpen(!isOpen);
            else if (node.type === 'component' && node.fullItem) setSelectedComponent(node.fullItem);
          } else if (node.type === 'component' && node.fullItem) {
            setSelectedComponent(node.fullItem);
          }
        }}
      >
        {hasChildren && <span>{<ArrowDownIcon upsideDown={open}/>}</span>}
        {icons[node.type]} {node.name} {node.type === 'component' && (node.fullItem?.status === 'alert' ? <DangerIcon /> : <OperatingIcon />)}
      </TreeRow>

      {hasChildren && open && (
        <div>
          {(node._visibleChildren || node.children).map((child) => (
            <AssetsPage key={child.id} node={child} level={level + 1} isFilterApplied={isFilterApplied} />
          ))}
        </div>
      )}
    </div>
  );
};