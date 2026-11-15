import React from 'react';

export const EngineeringDiagramSvg: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDDFD8" strokeWidth="0.6" opacity="0.6" />
          <circle cx="40" cy="40" r="1" fill="#777D78" opacity="0.4" />
        </pattern>
      </defs>

      {/* Grid Floor */}
      <rect width="800" height="600" fill="url(#grid-pattern)" />

      {/* Primary Pipeline Pathways */}
      <g stroke="#285943" strokeWidth="1.2" opacity="0.4" strokeDasharray="4 4">
        <path d="M 120 180 L 260 180 L 360 260 L 520 260 L 640 180 L 720 180" />
        <path d="M 160 420 L 300 420 L 400 340 L 520 340 L 620 420 L 700 420" />
        <path d="M 360 260 L 400 340" />
        <path d="M 520 260 L 520 340" />
      </g>

      {/* Core Systems Bus (Solid Precision Lines) */}
      <g stroke="#202522" strokeWidth="1" opacity="0.3">
        <line x1="80" y1="300" x2="720" y2="300" />
        <line x1="260" y1="120" x2="260" y2="480" />
        <line x1="520" y1="120" x2="520" y2="480" />
      </g>

      {/* Telemetry / Data Nodes */}
      <g>
        {/* Node 1: Ingestion */}
        <circle cx="260" cy="180" r="16" fill="#F7F7F2" stroke="#285943" strokeWidth="1.5" />
        <circle cx="260" cy="180" r="5" fill="#285943" opacity="0.8" />
        <text x="260" y="212" textAnchor="middle" fill="#777D78" fontSize="9" fontFamily="monospace" letterSpacing="1">
          INGEST.01
        </text>

        {/* Node 2: Feature Transformation */}
        <circle cx="360" cy="260" r="14" fill="#F7F7F2" stroke="#202522" strokeWidth="1.2" opacity="0.8" />
        <rect x="355" y="255" width="10" height="10" fill="#E8EEE8" stroke="#285943" strokeWidth="1" />
        <text x="360" y="290" textAnchor="middle" fill="#777D78" fontSize="9" fontFamily="monospace" letterSpacing="1">
          PIPELINE.TX
        </text>

        {/* Node 3: Model Inference Center */}
        <rect x="420" y="280" width="80" height="40" rx="2" fill="#E8EEE8" stroke="#285943" strokeWidth="1.5" />
        <text x="460" y="304" textAnchor="middle" fill="#202522" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="1">
          ML.CORE
        </text>
        <circle cx="432" cy="300" r="2.5" fill="#285943" />
        <circle cx="488" cy="300" r="2.5" fill="#285943" />

        {/* Node 4: Decision & API Gateway */}
        <circle cx="520" cy="340" r="16" fill="#F7F7F2" stroke="#285943" strokeWidth="1.5" />
        <circle cx="520" cy="340" r="6" fill="#285943" opacity="0.8" />
        <text x="520" y="374" textAnchor="middle" fill="#777D78" fontSize="9" fontFamily="monospace" letterSpacing="1">
          REST.API
        </text>

        {/* Node 5: Client Interface State */}
        <circle cx="640" cy="180" r="12" fill="#F7F7F2" stroke="#202522" strokeWidth="1.2" opacity="0.8" />
        <circle cx="640" cy="180" r="3" fill="#777D78" />
        <text x="640" y="208" textAnchor="middle" fill="#777D78" fontSize="9" fontFamily="monospace" letterSpacing="1">
          CLIENT.UI
        </text>
      </g>

      {/* Technical Schematic Annotation Markers */}
      <g fill="#777D78" opacity="0.6" fontSize="8" fontFamily="monospace">
        <text x="100" y="80">+ SYS.REF: RD-ARCH-2026</text>
        <text x="620" y="80">LATENCY: &lt;18ms // SYNC</text>
        <text x="100" y="520">CLOSED_LOOP_STATE: ACTIVE</text>
        <text x="610" y="520">DATA_BUS: NORMALIZED</text>
      </g>

      {/* Coordinate ticks */}
      <path d="M 75 75 L 85 75 M 75 75 L 75 85" stroke="#777D78" strokeWidth="1" opacity="0.5" />
      <path d="M 725 75 L 715 75 M 725 75 L 725 85" stroke="#777D78" strokeWidth="1" opacity="0.5" />
      <path d="M 75 525 L 85 525 M 75 525 L 75 515" stroke="#777D78" strokeWidth="1" opacity="0.5" />
      <path d="M 725 525 L 715 525 M 725 525 L 725 515" stroke="#777D78" strokeWidth="1" opacity="0.5" />
    </svg>
  );
};
