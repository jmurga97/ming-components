import { cn } from '../../../lib/cn';

export interface RelationshipPanelItem {
  description?: string;
  disabled?: boolean;
  id: string;
  label: string;
}
export interface RelationshipPanelProps {
  className?: string;
  disabled?: boolean;
  emptyLabel?: string;
  items: RelationshipPanelItem[];
  onValueChange?: (id: string) => void;
  title: string;
}

export function RelationshipPanel({
  className,
  disabled = false,
  emptyLabel = 'No related resources.',
  items,
  onValueChange,
  title,
}: RelationshipPanelProps): React.JSX.Element {
  return (
    <section className={cn('ming-relationship-panel', className)}>
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p className="ming-relationship-panel__empty">{emptyLabel}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {onValueChange ? (
                <button
                  disabled={disabled || item.disabled}
                  onClick={() => {
                    onValueChange(item.id);
                  }}
                  type="button"
                >
                  <span>{item.label}</span>
                  {item.description ? <small>{item.description}</small> : null}
                </button>
              ) : (
                <div>
                  <span>{item.label}</span>
                  {item.description ? <small>{item.description}</small> : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
