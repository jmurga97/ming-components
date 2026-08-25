import { cn } from '../../../lib/cn';

export interface TagListItem {
  disabled?: boolean;
  id: string;
  label: string;
}
export interface TagListProps {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  interactive?: boolean;
  items: TagListItem[];
  onValueChange?: (ids: string[]) => void;
  value?: string[];
}

export function TagList({
  ariaLabel = 'Tags',
  className,
  disabled = false,
  interactive = false,
  items,
  onValueChange,
  value = [],
}: TagListProps): React.JSX.Element {
  const selected = new Set(value);
  return (
    <div
      aria-label={ariaLabel}
      className={cn('ming-tag-list', className)}
      role={interactive ? 'group' : undefined}
    >
      {items.map((item) =>
        interactive ? (
          <button
            aria-pressed={selected.has(item.id)}
            disabled={disabled || item.disabled}
            key={item.id}
            onClick={() => {
              onValueChange?.(
                selected.has(item.id) ? value.filter((id) => id !== item.id) : [...value, item.id],
              );
            }}
            type="button"
          >
            {item.label}
          </button>
        ) : (
          <span key={item.id}>{item.label}</span>
        ),
      )}
    </div>
  );
}
