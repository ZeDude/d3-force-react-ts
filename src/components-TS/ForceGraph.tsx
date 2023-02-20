import { useRef, useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ForceTypes } from '../types/ForceTypes';
import { get } from 'lodash';
import Links from './Links';
import Nodes from './Nodes';
import Labels from './Labels';
import '../styles/App.css';
import { SimulationNodeDatum } from 'd3';

interface Props {
  width: number;
  height: number;
  graph: ForceTypes.ForceGraph;
}

function intern(value: any) {
  return value !== null && typeof value === 'object' ? value.valueOf() : value;
}

export default function ForceGraph({ width, height, graph }: Props, {}) {
  const svgRefForceGraph = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const _nodes: d3.SimulationNodeDatum[] = d3
    .map(graph.nodes, (d) => d.id)
    .map(intern);
  const _linkSources: any[] = d3
    .map(graph.links, ({ source }) => source)
    .map(intern);
  const _linkTargets: any[] = d3
    .map(graph.links, ({ target }) => target)
    .map(intern);

  const nodes = d3.map(graph.nodes, (_, i) => ({ id: _nodes[i] }));
  const links = d3.map(graph.links, (_, i) => ({
    source: _linkSources[i],
    target: _linkTargets[i]
  }));

  // d3.forceLink(links).id((d: ForceTypes.ForceNode as SimulationNodeDatum, i: number, nodesData: SimulationNodeDatum[] ):string | number => d ? d.id : '')
  const simulation: any = useMemo(() => {
    let _simulation = d3
      .forceSimulation(nodes as SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(links)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .id((d: ForceTypes.ForceNode): string | number => get(d, 'id'))
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .nodes(graph.nodes as SimulationNodeDatum[]);

    if (_simulation) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _simulation.force('link').links(graph.links);
    }
    return _simulation;
  }, [graph.links, graph.nodes, height, width]);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRefForceGraph.current));
    } else {
      const nodeSelection = d3.selectAll('.node');
      const linkSelection = d3.selectAll('.link');
      const labelSelection = d3.selectAll('.label');

      // link
      //   .attr('x1', (d) => d.source.x)
      //   .attr('y1', (d) => d.source.y)
      //   .attr('x2', (d) => d.target.x)
      //   .attr('y2', (d) => d.target.y);

      // node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      function ticked() {
        linkSelection
          .attr('x1', function (d: any) {
            return d.source.x;
          })
          .attr('y1', function (d: any) {
            return d.source.y;
          })
          .attr('x2', function (d: any) {
            return d.target.x;
          })
          .attr('y2', function (d: any) {
            return d.target.y;
          });

        nodeSelection
          .attr('cx', function (d: any) {
            return d.x;
          })
          .attr('cy', function (d: any) {
            return d.y;
          });

        labelSelection
          .attr('x', function (d: any) {
            return d.x + 5;
          })
          .attr('y', function (d: any) {
            return d.y + 5;
          });
      }

      simulation.nodes(graph.nodes).on('tick', ticked);
    }
  }, [graph.nodes, selection, simulation]);

  return (
    <svg
      ref={svgRefForceGraph}
      className="container"
      width={width}
      height={height}
    >
      <Links links={graph.links} />
      <Nodes nodes={graph.nodes} simulation={simulation} />
      <Labels nodes={graph.nodes} />
    </svg>
  );
}
