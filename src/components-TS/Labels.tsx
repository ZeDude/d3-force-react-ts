import { useRef, useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ForceTypes } from '../types/ForceTypes';
import { NodeProps, NodesProps } from './Nodes';

function Label({ node }: NodeProps, {}) {
  const svgText = useRef<SVGTextElement>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGTextElement | null,
    ForceTypes.Node,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgText.current).data([node]));
    } else {
    }
  }, [selection]);

  return (
    <>
      <text className="label" ref={svgText}>
        {node.id}
      </text>
    </>
  );
}

export default function Labels({ nodes }: NodesProps, {}) {
  const labelsData = useMemo(
    () =>
      nodes.map((node: ForceTypes.Node, index: number) => {
        return <Label key={index} node={node} />;
      }),
    [nodes]
  );

  return <g className="nodes">{labelsData}</g>;
}
