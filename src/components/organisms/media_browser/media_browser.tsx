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
  onValueChange?: (id: string) => void;
  selectedId?: string;
  showRail?: boolean;
}

export function MediaBrowser({
  className,
  disabled = false,
  emptyLabel = 'No media available.',
  items,
  onValueChange,
  selectedId,
  showRail = true,
}: MediaBrowserProps): React.JSX.Element {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  if (!selected)
    return (
      <div className={cn('ming-media-browser ming-media-browser--empty', className)}>
        {emptyLabel}
      </div>
    );
  return (
    <section className={cn('ming-media-browser', className)}>
      <figure>
        <img alt={selected.alt} src={selected.src} />
        {selected.caption ? <figcaption>{selected.caption}</figcaption> : null}
      </figure>
      {showRail && items.length > 1 ? (
        <div aria-label="Media thumbnails" className="ming-media-browser__rail" role="list">
          {items.map((item) => (
            <div key={item.id} role="listitem">
              <button
                aria-current={item.id === selected.id ? 'true' : undefined}
                disabled={disabled}
                onClick={() => {
                  onValueChange?.(item.id);
                }}
                type="button"
              >
                <img alt="" src={item.thumbnailSrc ?? item.src} />
                <span className="ming-visually-hidden">{item.alt}</span>
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
