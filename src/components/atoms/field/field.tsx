import styles from './field.module.css';
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
  optionalLabel?: string;
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
  optionalLabel = 'Optional',
  required = false,
  ...props
}: FieldProps): React.JSX.Element {
  const isInvalid = invalid || Boolean(error);
  return (
    <BaseField.Root
      className={cn(styles['ming-field'], className)}
      disabled={disabled}
      invalid={isInvalid}
      {...props}
    >
      <BaseField.Label className={styles['ming-field__label']}>
        <span>{label}</span>
        {required ? <span aria-hidden="true"> *</span> : null}
        {optional && !required ? (
          <span className={styles['ming-field__optional']}>{optionalLabel}</span>
        ) : null}
      </BaseField.Label>
      {children}
      {hint ? (
        <BaseField.Description className={styles['ming-field__hint']}>{hint}</BaseField.Description>
      ) : null}
      {error ? (
        <BaseField.Error className={styles['ming-field__error']} match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
