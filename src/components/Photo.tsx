import type { Photo as PhotoData } from '../data/photos';
import styles from './Photo.module.css';

/** Photo plein cadre (object-fit: cover), dimensions déclarées pour éviter les sauts de mise en page. */
export function Photo({ photo, priority = false }: { photo: PhotoData; priority?: boolean }) {
  return (
    <img
      className={styles.photo}
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      style={{ objectPosition: photo.position }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
