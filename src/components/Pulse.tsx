import styles from './Pulse.module.css';

/** Motif de barres : la « fréquence » de RIFF. Les hauteurs répètent un petit rythme (le riff) — pas une onde décorative. */
const pattern = [0.5, 1, 0.3, 0.75, 0.5, 1, 0.3, 0.75];

interface Props { bars?: number; accent?: number; height?: number; className?: string; light?: boolean }

export function Pulse({ bars = 48, accent = 5, height = 28, className = '', light = false }: Props) {
  return (
    <div className={`${styles.pulse} ${light ? styles.light : ''} ${className}`} style={{ height }} aria-hidden="true" data-reveal>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={i % accent === 0 ? styles.hot : undefined}
          style={{ height: `${pattern[i % pattern.length] * 100}%`, ['--i' as string]: i }}
        />
      ))}
    </div>
  );
}
