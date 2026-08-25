import { useMemo, useState } from 'react';

import { cn } from '../../../lib/cn';
import { Input } from '../../atoms/input';
import { CheckIcon, PlusIcon } from '../../internal/icon';

export interface TagPickerOption {
  disabled?: boolean;
  id: string;
  label: string;
}
export interface TagPickerProps {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  emptyLabel?: string;
  onValueChange: (ids: string[]) => void;
  options: TagPickerOption[];
  placeholder?: string;
  value: string[];
}

export function TagPicker({
  ariaLabel = 'Select tags',
  className,
  disabled = false,
  emptyLabel = 'No tags found.',
  onValueChange,
  options,
  placeholder = 'Search tags',
  value,
}: TagPickerProps): React.JSX.Element {
  const [query, setQuery] = useState('');
  const selected = new Set(value);
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [options, query],
  );
  return (
    <div className={cn('ming-tag-picker', className)}>
      <Input
        aria-label={ariaLabel}
        disabled={disabled}
        onValueChange={setQuery}
        placeholder={placeholder}
        type="search"
        value={query}
      />
      <div aria-multiselectable="true" className="ming-tag-picker__options" role="listbox">
        {filteredOptions.length === 0 ? (
          <p>{emptyLabel}</p>
        ) : (
          filteredOptions.map((option) => (
            <button
              aria-selected={selected.has(option.id)}
              disabled={disabled || option.disabled}
              key={option.id}
              onClick={() => {
                onValueChange(
                  selected.has(option.id)
                    ? value.filter((id) => id !== option.id)
                    : [...value, option.id],
                );
              }}
              role="option"
              type="button"
            >
              {option.label}
              <span aria-hidden="true">
                {selected.has(option.id) ? <CheckIcon /> : <PlusIcon />}
              </span>
            </button>
          ))
        )}
      </div>
      <span aria-live="polite" className="ming-visually-hidden">
        {value.length} tags selected
      </span>
    </div>
  );
}
