export namespace ForceTypes {
  export interface Node {
    id: string;
    group: number;
  }
  export interface Link {
    source: string;
    target: string;
    value: number;
  }
  export interface ForceNode extends Node, d3.SimulationNodeDatum {
    r: number;
  }

  export interface ForceLink extends d3.SimulationLinkDatum<ForceNode> {
    source: string;
    target: string;
    value: number;
  }

  export interface ForceGraph {
    nodes: Node[];
    links: Link[];
  }
}
