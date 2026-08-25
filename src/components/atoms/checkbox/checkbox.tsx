import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';

import { CheckIcon } from '../../internal/icon';
import { cn } from '../../../lib/cn';

export interface CheckboxProps extends Omit<BaseCheckbox.Root.Props, 'className'> {
  className?: string;
  label?: React.ReactNode;
}

export function Checkbox({ className, label, ...props }: CheckboxProps): React.JSX.Element {
  const control = (
    <BaseCheckbox.Root className={cn('ming-checkbox', className)} {...props}>
      <BaseCheckbox.Indicator className="ming-checkbox__indicator">
        <CheckIcon />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label) return control;

  return (
    <label className="ming-checkbox-label">
      {control}
      <span>{label}</span>
    </label>
  );
}
