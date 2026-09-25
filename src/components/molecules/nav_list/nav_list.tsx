import styles from './nav_list.module.css';
import { cn } from '../../../lib/cn';

import type { ReactNode } from 'react';

export interface NavListItem {
  current?: boolean;
  description?: ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  id: string;
  label: ReactNode;
}

export interface NavListProps {
  className?: string;
  collapsed?: boolean;
  items: NavListItem[];
  onNavigate?: (id: string) => void;
}

export function NavList({
  className,
  collapsed = false,
  items,
  onNavigate,
}: NavListProps): React.JSX.Element {
  return (
    <ul className={cn(styles['ming-nav-list'], className)}>
      {items.map((item) => {
        const content = (
          <>
            {item.icon ? <span className={styles['ming-nav-list__icon']}>{item.icon}</span> : null}
            <span className={styles['ming-nav-list__copy']} data-collapsed={collapsed || undefined}>
              <span className={styles['ming-nav-list__label']}>{item.label}</span>
              {item.description ? (
                <span className={styles['ming-nav-list__description']}>{item.description}</span>
              ) : null}
            </span>
          </>
        );
        return (
          <li key={item.id}>
            {item.href ? (
              <a
                aria-current={item.current ? 'page' : undefined}
                className={styles['ming-nav-list__item']}
                data-current={item.current || undefined}
                href={item.href}
                onClick={(event) => {
                  if (item.disabled) {
                    event.preventDefault();
                    return;
                  }
                  if (
                    !onNavigate ||
                    event.defaultPrevented ||
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  ) {
                    return;
                  }
                  event.preventDefault();
                  onNavigate(item.id);
                }}
              >
                {content}
              </a>
            ) : (
              <button
                aria-current={item.current ? 'page' : undefined}
                className={styles['ming-nav-list__item']}
                data-current={item.current || undefined}
                disabled={item.disabled}
                onClick={() => onNavigate?.(item.id)}
                type="button"
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
