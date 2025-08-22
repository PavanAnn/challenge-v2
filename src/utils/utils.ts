import { Assets } from "../features/assets/Types";

type TreeNodeType = {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  children: TreeNodeType[];
  fullItem?: Assets;
};

export function newTest(
  nodes: TreeNodeType[],
  {
    nameFilter,
    requireAlert,
    requireEnergy,
  }: {
    nameFilter?: string;
    requireAlert?: boolean;
    requireEnergy?: boolean;
  }
): TreeNodeType[] {
  const matchesFilter = (node: TreeNodeType): boolean => {
    const full = node.fullItem;
    if (nameFilter && !node.name.toLowerCase().includes(nameFilter.toLowerCase())) {
      return false;
    }
    if (requireAlert && full?.status !== "alert") {
      return false;
    }
    if (requireEnergy && full?.sensorType !== "energy") {
      return false;
    }
    return true;
  };

  const dfs = (node: TreeNodeType): TreeNodeType | null => {
    const filteredChildren = node.children
      .map(dfs)
      .filter((c): c is TreeNodeType => c !== null);

    const nodeMatches = matchesFilter(node);

    if (nodeMatches || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  };

  let filtered = nodes
    .map(dfs)
    .filter((n): n is TreeNodeType => n !== null);

  const sortFn = (a: TreeNodeType, b: TreeNodeType): number => {
    const getPriority = (n: TreeNodeType): number => {
      const full = n.fullItem;
      if (full?.status === "alert") return 1;
      if (full?.sensorType === "energy") return 2;
      return 3;
    };
    return getPriority(a) - getPriority(b);
  };

  const sortTree = (arr: TreeNodeType[]): TreeNodeType[] =>
    arr
      .slice()
      .sort(sortFn)
      .map((n) => ({
        ...n,
        children: sortTree(n.children),
      }));

  const sorted = sortTree(filtered);

  const locationsWithChildren = sorted.filter(n => n.type === "location" && n.children.length > 0);
  const assetsWithChildren = sorted.filter(n => n.type === "asset" && n.children.length > 0);
  const locationsWithoutChildren = sorted.filter(n => n.type === "location" && n.children.length === 0);
  const singleAssets = sorted.filter(n => n.type === "asset" && n.children.length === 0);
  const components = sorted.filter(n => n.type === "component");

  return [
    ...locationsWithChildren,
    ...assetsWithChildren,
    ...locationsWithoutChildren,
    ...singleAssets,
    ...components,
  ];
}