import type { LinkKind } from '../data/artists';

/** Pictogrammes simples, tracés pour le site (trait uniforme, hérite de la couleur du texte). */
export function SocialIcon({ kind }: { kind: LinkKind }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
  switch (kind) {
    case 'youtube':
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
        </svg>
      );
    case 'soundcloud':
      return (
        <svg {...common}>
          <path d="M3 15v2M5.5 13v4M8 11.5V17M10.5 10v7" />
          <path d="M13 17V9.2a5.6 5.6 0 0 1 8.3 3.7A3 3 0 0 1 20.5 17z" />
        </svg>
      );
    case 'spotify':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M7.5 9.8c3-.9 6.2-.6 9 1M8 12.8c2.5-.7 5-.4 7.4.9M8.6 15.6c2-.5 4-.3 5.8.6" />
        </svg>
      );
    case 'bandcamp':
      return (
        <svg {...common}>
          <path d="M3 17.5 8.2 6.5H21L15.8 17.5z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.2H8V14h2.5v6H14v-6h2.4l.6-3.8H14V8.6c0-.4.2-.6.6-.6z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.7 3.8 5.7 3.8 9S14.6 18.3 12 21c-2.6-2.7-3.8-5.7-3.8-9S9.4 5.7 12 3z" />
        </svg>
      );
  }
}
