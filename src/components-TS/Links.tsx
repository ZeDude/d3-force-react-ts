import { useRef, useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ForceTypes } from '../types/ForceTypes';

interface LinkProps {
  link: ForceTypes.ForceLink;
}

interface LinksProps {
  links: ForceTypes.ForceLink[];
}

function Link({ link }: LinkProps, {}) {
  const svgLink = useRef<SVGLineElement>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGLineElement | null,
    ForceTypes.ForceLink,
    null,
    undefined
  >>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgLink.current).data([link]));
    } else {
    }
  }, [selection]);

  return (
    <>
      <line
        className="link"
        ref={svgLink}
        strokeWidth={Math.sqrt(link.value)}
      />
      ;
    </>
  );
}

export default function Links({ links }: LinksProps, {}) {
  const linksData = useMemo(
    () =>
      links.map((link: ForceTypes.ForceLink, index: number) => {
        return <Link key={index} link={link} />;
      }),
    [links]
  );

  return <g className="links">{linksData}</g>;
}
