import { Assets } from "../../features/assets/Types";
import { Location } from "../../features/locations/Types";

type TreeNode = {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  children: TreeNode[];
  fullItem?: Assets;
};

function insertChild(parent: TreeNode, child: TreeNode) {
  if (child.type === "location") {
    parent.children.unshift(child);
  } else if (child.type === "asset") {
    const lastLocationIndex = parent.children.findLastIndex(
      (c) => c.type === "location"
    );
    parent.children.splice(lastLocationIndex + 1, 0, child);
  } else {
    parent.children.push(child);
  }
}

export const handleLocations = (locations?: Location[]): TreeNode[] => {
  if (!locations || locations.length === 0) return [];

  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  locations.forEach((loc) => {
    map.set(loc.id, {
      id: loc.id,
      name: loc.name,
      type: "location",
      children: [],
    });
  });

  locations.forEach((loc) => {
    const node = map.get(loc.id)!;
    if (loc.parentId) {
      const parent = map.get(loc.parentId);
      if (parent) insertChild(parent, node);
    } else {
      roots.push(node);
    }
  });

  return roots;
};

export const handleAssetsTree = (
  assets?: Assets[],
  locations?: Location[]
): TreeNode[] => {
  if (!assets || assets.length === 0) return handleLocations(locations);

  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  if (locations) {
    locations.forEach((loc) => {
      map.set(loc.id, {
        id: loc.id,
        name: loc.name,
        type: "location",
        children: [],
      });
    });
  }

  assets.forEach((asset) => {
    const node: TreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? "component" : "asset",
      children: [],
      fullItem: asset,
    };
    map.set(asset.id, node);
  });

  assets.forEach((asset) => {
    const node = map.get(asset.id)!;

    if (asset.locationId) {
      const parent = map.get(asset.locationId);
      if (parent) insertChild(parent, node);
      else roots.push(node);
    } else if (asset.parentId) {
      const parent = map.get(asset.parentId);
      if (parent) insertChild(parent, node);
      else roots.push(node);
    } else {
      roots.push(node);
    }
  });

  if (locations) {
    locations.forEach((loc) => {
      const node = map.get(loc.id)!;
      if (loc.parentId) {
        const parent = map.get(loc.parentId);
        if (parent) insertChild(parent, node);
      } else {
        if (!roots.includes(node)) roots.push(node);
      }
    });
  }

  return roots;
};
