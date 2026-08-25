import { Field } from '@base-ui/react/field';

import { cn } from '../../../lib/cn';

import type { ComponentPropsWithoutRef } from 'react';
import type { FieldControlProps } from '@base-ui/react/field';

export interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'onChange'> {
  invalid?: boolean;
  onChange?: ComponentPropsWithoutRef<'textarea'>['onChange'];
  onValueChange?: (value: string) => void;
}

export function Textarea({
  'aria-invalid': ariaInvalid,
  className,
  invalid = false,
  onChange,
  onValueChange,
  ...props
}: TextareaProps): React.JSX.Element {
  const controlProps = {
    'aria-invalid': ariaInvalid ?? (invalid || undefined),
    className: cn('ming-textarea', className),
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
      if (!event.defaultPrevented) onValueChange?.(event.currentTarget.value);
    },
    ...props,
  } as unknown as FieldControlProps;

  return <Field.Control {...controlProps} render={<textarea />} />;
}
