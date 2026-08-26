import { useMemo, useRef, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const selected = new Set(value);
  const optionRefs = useRef(new Map<string, HTMLButtonElement>());
  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [options, query],
  );

  function focusAdjacentOption(delta: 1 | -1): void {
    const count = filteredOptions.length;
    if (count === 0) return;
    let index =
      activeIndex < 0 || activeIndex >= count ? (delta === 1 ? 0 : count - 1) : activeIndex + delta;
    for (let step = 0; step < count; step += 1) {
      index = (index + count) % count;
      const candidate = filteredOptions[index];
      if (!candidate || !candidate.disabled) {
        setActiveIndex(index);
        optionRefs.current.get(candidate?.id ?? '')?.focus();
        return;
      }
      index += delta === 1 ? 1 : -1;
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusAdjacentOption(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusAdjacentOption(-1);
    }
  }

  return (
    <div className={cn('ming-tag-picker', className)}>
      <Input
        aria-label={ariaLabel}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onValueChange={setQuery}
        placeholder={placeholder}
        type="search"
        value={query}
      />
      <div
        aria-label={ariaLabel}
        aria-multiselectable="true"
        className="ming-tag-picker__options"
        role="listbox"
      >
        {filteredOptions.length === 0 ? (
          <p>{emptyLabel}</p>
        ) : (
          filteredOptions.map((option, index) => (
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
                setActiveIndex(index);
              }}
              onFocus={() => {
                setActiveIndex(index);
              }}
              onKeyDown={handleKeyDown}
              ref={(node) => {
                if (node) optionRefs.current.set(option.id, node);
                else optionRefs.current.delete(option.id);
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
