import { Input as BaseInput } from '@base-ui/react/input';

import { cn } from '../../../lib/cn';

export interface InputProps extends Omit<BaseInput.Props, 'className'> {
  className?: string;
  invalid?: boolean;
}

export function Input({
  'aria-invalid': ariaInvalid,
  className,
  invalid = false,
  ...props
}: InputProps): React.JSX.Element {
  return (
    <BaseInput
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      className={cn('ming-input', className)}
      {...props}
    />
  );
}
