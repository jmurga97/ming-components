import styles from './search_field.module.css';
import { Button } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { XIcon } from 'lucide-react';
import { cn } from '../../../lib/cn';

import type { InputProps } from '../../atoms/input';

export interface SearchFieldProps extends Omit<InputProps, 'onValueChange' | 'type' | 'value'> {
  clearLabel?: string;
  onClear?: () => void;
  onValueChange: (value: string) => void;
  value: string;
}

export function SearchField({
  className,
  clearLabel = 'Clear search',
  disabled,
  onClear,
  onValueChange,
  placeholder = 'Search…',
  value,
  ...props
}: SearchFieldProps): React.JSX.Element {
  return (
    <search className={cn(styles['ming-search-field'], className)}>
      <Input
        disabled={disabled}
        onValueChange={onValueChange}
        placeholder={placeholder}
        type="search"
        value={value}
        {...props}
      />
      {value ? (
        <span className={styles['ming-search-field__clear-action']}>
          <Button
            aria-label={clearLabel}
            disabled={disabled}
            iconOnly
            onClick={() => {
              if (onClear) onClear();
              else onValueChange('');
            }}
            size="sm"
            variant="ghost"
          >
            <XIcon />
          </Button>
        </span>
      ) : null}
    </search>
  );
}
