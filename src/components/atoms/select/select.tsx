import styles from './select.module.css';
import { Select as BaseSelect } from '@base-ui/react/select';

import { CheckIcon, ChevronDownIcon } from '../icon';
import { cn } from '../../../lib/cn';

import { useId } from 'react';

import type { ReactNode, Ref } from 'react';

export interface SelectOption {
  disabled?: boolean;
  id: string;
  label: ReactNode;
  textValue?: string;
}

export interface SelectProps {
  ariaLabel?: string;
  className?: string;
  defaultOpen?: boolean;
  defaultValue?: string | null;
  disabled?: boolean;
  id?: string;
  inputRef?: Ref<HTMLInputElement>;
  name?: string;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string | null) => void;
  open?: boolean;
  options: SelectOption[];
  placeholder?: ReactNode;
  portalContainer?: HTMLElement | null;
  readOnly?: boolean;
  required?: boolean;
  triggerRef?: Ref<HTMLButtonElement>;
  value?: string | null;
}

export function Select({
  ariaLabel,
  className,
  defaultOpen,
  defaultValue,
  disabled,
  id,
  inputRef,
  name,
  onOpenChange,
  onValueChange,
  open,
  options,
  placeholder = 'Select…',
  portalContainer,
  readOnly,
  required,
  triggerRef,
  value,
}: SelectProps): React.JSX.Element {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const items = options.map((option) => ({
    label: option.label,
    value: option.id,
  }));
  return (
    <div className={cn(styles['ming-select'], className)}>
      <BaseSelect.Root
        defaultOpen={defaultOpen}
        defaultValue={defaultValue}
        disabled={disabled}
        id={triggerId}
        inputRef={inputRef}
        items={items}
        name={name}
        onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
        onValueChange={(nextValue) => onValueChange?.(nextValue)}
        open={open}
        readOnly={readOnly}
        required={required}
        value={value}
      >
        <BaseSelect.Trigger
          aria-label={ariaLabel}
          className={styles['ming-select__trigger']}
          ref={triggerRef}
        >
          <BaseSelect.Value placeholder={placeholder} />
          <BaseSelect.Icon aria-hidden="true" className={styles['ming-select__icon']}>
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal container={portalContainer}>
          <BaseSelect.Positioner
            alignItemWithTrigger={false}
            className={styles['ming-select__positioner']}
            sideOffset={4}
          >
            <BaseSelect.Popup className={styles['ming-select__popup']}>
              <BaseSelect.List aria-labelledby={triggerId} className={styles['ming-select__list']}>
                {options.map((option) => (
                  <BaseSelect.Item
                    className={styles['ming-select__item']}
                    disabled={option.disabled}
                    key={option.id}
                    label={option.textValue}
                    value={option.id}
                  >
                    <BaseSelect.ItemIndicator
                      aria-hidden="true"
                      className={styles['ming-select__indicator']}
                    >
                      <CheckIcon />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
}
