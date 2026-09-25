import styles from './switch.module.css';
import { Switch as BaseSwitch } from '@base-ui/react/switch';

import { cn } from '../../../lib/cn';

export interface SwitchProps extends Omit<BaseSwitch.Root.Props, 'className'> {
  className?: string;
  label?: React.ReactNode;
}

export function Switch({ className, label, ...props }: SwitchProps): React.JSX.Element {
  const control = (
    <BaseSwitch.Root className={cn(styles['ming-switch'], className)} {...props}>
      <BaseSwitch.Thumb className={styles['ming-switch__thumb']} />
    </BaseSwitch.Root>
  );

  if (!label) return control;

  return (
    <label className={styles['ming-switch-label']}>
      {control}
      <span>{label}</span>
    </label>
  );
}
