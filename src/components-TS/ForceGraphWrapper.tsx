import React from 'react';
import data from '../data/miserables';
import ForceGraph from './ForceGraph';

import '../styles/App.css';
import { ForceTypes } from '../types/ForceTypes';

function ForceGraphWrapper() {
  // const d3Svg = forceGraphMiserables(data);
  const nodeHoverTooltip = React.useCallback((node: ForceTypes.ForceNode) => {
    return `<div>     
      <b>${node.id}</b>
    </div>`;
  }, []);

  return (
    <div className="App">
      <header className="App-header">Force Graph Les Miserables</header>
      <section className="Main">
        <ForceGraph width={1400} height={1000} graph={data} />
      </section>
    </div>
  );
}

export default ForceGraphWrapper;
