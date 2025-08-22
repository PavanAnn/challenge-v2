import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AssetsPage } from "./AssetsPage";
import { Assets } from "../../features/assets/Types";

jest.mock("../../media/asset", () => ({ AssetIcon: () => <div data-testid="asset-icon" /> }));
jest.mock("../../media/component", () => ({ ComponentIcon: () => <div data-testid="component-icon" /> }));
jest.mock("../../media/location", () => ({ LocationIcon: () => <div data-testid="location-icon" /> }));
jest.mock("../../media/arrowDown", () => ({ ArrowDownIcon: ({ upsideDown }: { upsideDown?: boolean }) =>
  <div data-testid={upsideDown ? "arrow-up" : "arrow-down"} />
}));
jest.mock("../../media/danger", () => ({ DangerIcon: () => <div data-testid="danger-icon" /> }));
jest.mock("../../media/operating", () => ({ OperatingIcon: () => <div data-testid="operating-icon" /> }));

const setSelectedComponent = jest.fn();
jest.mock("../../store/useSelectedComponentStore", () => ({
  useSelectedComponent: (fn: any) => fn({ setSelectedComponent }),
}));

describe("AssetsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a location with children collapsed by default", () => {
    const node = {
      id: "1",
      name: "Factory",
      type: "location" as const,
      children: [{ id: "2", name: "Machine", type: "asset" as const, children: [] }],
    };

    render(<AssetsPage node={node} />);

    expect(screen.getByText("Factory")).toBeInTheDocument();
    expect(screen.getByTestId("location-icon")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-down")).toBeInTheDocument();

    expect(screen.queryByText("Machine")).not.toBeInTheDocument();
  });

  it("expands children when clicking a location", () => {
    const node = {
      id: "1",
      name: "Factory",
      type: "location" as const,
      children: [{ id: "2", name: "Machine", type: "asset" as const, children: [] }],
    };

    render(<AssetsPage node={node} />);

    fireEvent.click(screen.getByText("Factory"));
    expect(screen.getByText("Machine")).toBeInTheDocument();
  });

  it("calls setSelectedComponent when clicking a component node", () => {
    const fullItem: Assets = {
        id: "c1",
        name: "Motor",
        status: "operating",
        locationId: null,
        parentId: null,
        sensorType: null,
    };


    const node = {
      id: "c1",
      name: "Motor",
      type: "component" as const,
      children: [],
      fullItem,
    };

    render(<AssetsPage node={node} />);
    fireEvent.click(screen.getByText("Motor"));

    expect(setSelectedComponent).toHaveBeenCalledWith(node.fullItem);
  });

  it("shows DangerIcon if component is in alert status", () => {
    const fullItem: Assets = {
        id: "c1",
        name: "Pump",
        status: "alert",
        locationId: null,
        parentId: null,
        sensorType: null,
    };

    const node = {
        id: "c1",
        name: "Pump",
        type: "component" as const,
        children: [],
        fullItem,
    };
    render(<AssetsPage node={node} />);
    expect(screen.getByTestId("danger-icon")).toBeInTheDocument();
  });

  it("forces all nodes open if isFilterApplied is true", () => {
    const node = {
      id: "1",
      name: "Factory",
      type: "location" as const,
      children: [{ id: "2", name: "Machine", type: "asset" as const, children: [] }],
    };

    render(<AssetsPage node={node} isFilterApplied={true} />);

    expect(screen.getByText("Machine")).toBeInTheDocument();
  });
});
