import { NavList } from '../../molecules/nav_list';
import { cn } from '../../../lib/cn';

import type { NavListItem } from '../../molecules/nav_list';
import type { ReactNode } from 'react';

export interface SidebarNavProps {
  ariaLabel?: string;
  className?: string;
  collapsed?: boolean;
  footer?: ReactNode;
  footerItems?: NavListItem[];
  header?: ReactNode;
  items: NavListItem[];
  onNavigate?: (id: string) => void;
}

export function SidebarNav({
  ariaLabel = 'Primary navigation',
  className,
  collapsed = false,
  footer,
  footerItems = [],
  header,
  items,
  onNavigate,
}: SidebarNavProps): React.JSX.Element {
  return (
    <nav aria-label={ariaLabel} className={cn('ming-sidebar-nav', className)}>
      {header ? <div className="ming-sidebar-nav__header">{header}</div> : null}
      <NavList collapsed={collapsed} items={items} onNavigate={onNavigate} />
      {footerItems.length || footer ? (
        <footer className="ming-sidebar-nav__footer">
          {footerItems.length ? (
            <NavList collapsed={collapsed} items={footerItems} onNavigate={onNavigate} />
          ) : null}
          {footer}
        </footer>
      ) : null}
    </nav>
  );
}
