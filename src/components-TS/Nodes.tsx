import { useRef, useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ForceTypes } from '../types/ForceTypes';

export interface NodeProps {
  node: ForceTypes.Node;
}
export interface ForceNodeProps {
  node: ForceTypes.ForceNode;
}

interface NodeDisplayProps extends NodeProps {
  // node: ForceTypes.ForceNode;
  color?: string;
}

export interface NodesProps {
  nodes: ForceTypes.Node[];
}

export interface ForceNodesProps {
  nodes: ForceTypes.ForceNode[];
}

interface NodesSimulationProps extends NodesProps {
  simulation: any;
}

function Node({ node, color }: NodeDisplayProps) {
  const svgNode = useRef<SVGCircleElement>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGCircleElement | null,
    ForceTypes.Node,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgNode.current).data([node]));
    } else {
    }
  }, [selection]);

  return (
    <circle className="node" r={5} fill={color} ref={svgNode}>
      <title>{node.id}</title>
    </circle>
  );
}

const colors = d3.scaleOrdinal(d3.schemeCategory10);

export default function Nodes({ nodes, simulation }: NodesSimulationProps) {
  const nodesData = useMemo(
    () =>
      nodes.map((node: ForceTypes.Node, index: number) => {
        return (
          <Node
            key={index}
            node={node}
            color={colors(node.group.toString())?.toString()}
          />
        );
      }),
    [nodes]
  );

  useEffect(() => {
    const _simulation = simulation;

    function onDragStart(event: any, d: any) {
      if (!event.active) {
        _simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function onDrag(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function onDragEnd(event: any, d: any) {
      if (!event.active) {
        _simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    const dragHandler = d3
      .drag()
      .on('start', onDragStart)
      .on('drag', onDrag)
      .on('end', onDragEnd);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    d3.selectAll<SVGSVGElement, unknown>('.node').call(dragHandler);
  }, [simulation]);

  return <g className="nodes">{nodesData}</g>;
}
