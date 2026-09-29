import styles from './media_browser.module.css';
import { cn } from '../../../lib/cn';

export interface MediaBrowserItem {
  alt: string;
  caption?: string;
  id: string;
  src: string;
  thumbnailSrc?: string;
}
export interface MediaBrowserProps {
  className?: string;
  disabled?: boolean;
  emptyLabel?: string;
  items: MediaBrowserItem[];
  thumbnailsLabel?: string;
  onValueChange?: (id: string) => void;
  selectedId?: string;
  showRail?: boolean;
}

export function MediaBrowser({
  className,
  disabled = false,
  emptyLabel = 'No media available.',
  items,
  thumbnailsLabel = 'Media thumbnails',
  onValueChange,
  selectedId,
  showRail = true,
}: MediaBrowserProps): React.JSX.Element {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  if (!selected)
    return (
      <div
        className={cn(
          `${styles['ming-media-browser']} ${styles['ming-media-browser--empty']}`,
          className,
        )}
      >
        {emptyLabel}
      </div>
    );
  return (
    <section className={cn(styles['ming-media-browser'], className)}>
      <figure>
        <img alt={selected.alt} src={selected.src} />
        {selected.caption ? <figcaption>{selected.caption}</figcaption> : null}
      </figure>
      {showRail && items.length > 1 ? (
        <ul aria-label={thumbnailsLabel} className={styles['ming-media-browser__rail']}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                aria-current={item.id === selected.id ? 'true' : undefined}
                disabled={disabled}
                onClick={() => {
                  onValueChange?.(item.id);
                }}
                type="button"
              >
                <img alt="" src={item.thumbnailSrc ?? item.src} />
                <span className={styles['ming-media-browser__alt']}>{item.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
