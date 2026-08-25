import { Menu as BaseMenu } from '@base-ui/react/menu';

import { cn } from '../../../lib/cn';

import type { ReactNode, Ref } from 'react';

export interface DropdownMenuItem {
  disabled?: boolean;
  id: string;
  label: ReactNode;
  onSelect: () => void;
  separatorBefore?: boolean;
  textValue?: string;
  tone?: 'default' | 'destructive';
}

export interface DropdownMenuProps {
  align?: 'center' | 'end' | 'start';
  ariaLabel: string;
  className?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  items: DropdownMenuItem[];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  portalContainer?: HTMLElement | null;
  trigger: ReactNode;
  triggerRef?: Ref<HTMLButtonElement>;
}

export function DropdownMenu({
  align = 'end',
  ariaLabel,
  className,
  defaultOpen,
  disabled,
  items,
  onOpenChange,
  open,
  portalContainer,
  trigger,
  triggerRef,
}: DropdownMenuProps): React.JSX.Element {
  return (
    <BaseMenu.Root
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseMenu.Trigger
        aria-label={ariaLabel}
        className={cn('ming-dropdown-menu__trigger', className)}
        ref={triggerRef}
      >
        {trigger}
      </BaseMenu.Trigger>
      <BaseMenu.Portal className="ming-portal" container={portalContainer}>
        <BaseMenu.Positioner
          align={align}
          className="ming-dropdown-menu__positioner"
          sideOffset={4}
        >
          <BaseMenu.Popup className="ming-dropdown-menu__popup">
            {items.map((item) => (
              <BaseMenu.Item
                className={cn(
                  'ming-dropdown-menu__item',
                  item.separatorBefore && 'ming-dropdown-menu__item--separated',
                  item.tone === 'destructive' && 'ming-dropdown-menu__item--destructive',
                )}
                disabled={item.disabled}
                key={item.id}
                label={item.textValue}
                onClick={item.onSelect}
              >
                {item.label}
              </BaseMenu.Item>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
