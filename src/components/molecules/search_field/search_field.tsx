import { Button } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { CloseIcon } from '../../internal/icon';
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
    <div className={cn('ming-search-field', className)} role="search">
      <Input
        className="ming-search-field__input"
        disabled={disabled}
        onValueChange={onValueChange}
        placeholder={placeholder}
        type="search"
        value={value}
        {...props}
      />
      {value ? (
        <Button
          aria-label={clearLabel}
          className="ming-search-field__clear"
          disabled={disabled}
          onClick={() => {
            if (onClear) onClear();
            else onValueChange('');
          }}
          size="sm"
          variant="ghost"
        >
          <CloseIcon />
        </Button>
      ) : null}
    </div>
  );
}
