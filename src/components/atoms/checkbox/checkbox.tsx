import styles from './checkbox.module.css';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';

import { CheckIcon } from '../icon';
import { cn } from '../../../lib/cn';

export interface CheckboxProps extends Omit<BaseCheckbox.Root.Props, 'className'> {
  className?: string;
  label?: React.ReactNode;
}

export function Checkbox({ className, label, ...props }: CheckboxProps): React.JSX.Element {
  const control = (
    <BaseCheckbox.Root className={cn(styles['ming-checkbox'], className)} {...props}>
      <BaseCheckbox.Indicator className={styles['ming-checkbox__indicator']}>
        <CheckIcon />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );

  if (!label) return control;

  return (
    <label className={styles['ming-checkbox-label']}>
      {control}
      <span>{label}</span>
    </label>
  );
}
