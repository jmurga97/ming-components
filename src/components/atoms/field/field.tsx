import { Field as BaseField } from '@base-ui/react/field';

import { cn } from '../../../lib/cn';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface FieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
  disabled?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  invalid?: boolean;
  label: ReactNode;
  optional?: boolean;
  required?: boolean;
}

export function Field({
  children,
  className,
  disabled = false,
  error,
  hint,
  invalid = false,
  label,
  optional = false,
  required = false,
  ...props
}: FieldProps): React.JSX.Element {
  const isInvalid = invalid || Boolean(error);
  return (
    <BaseField.Root
      className={cn('ming-field', className)}
      disabled={disabled}
      invalid={isInvalid}
      {...props}
    >
      <BaseField.Label className="ming-field__label">
        <span>{label}</span>
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional && !required ? <span className="ming-field__optional">Optional</span> : null}
      </BaseField.Label>
      {children}
      {hint ? (
        <BaseField.Description className="ming-field__hint">{hint}</BaseField.Description>
      ) : null}
      {error ? (
        <BaseField.Error className="ming-field__error" match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
