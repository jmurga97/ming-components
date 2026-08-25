import { Switch as BaseSwitch } from '@base-ui/react/switch';

import { cn } from '../../../lib/cn';

export interface SwitchProps extends Omit<BaseSwitch.Root.Props, 'className'> {
  className?: string;
  label?: React.ReactNode;
}

export function Switch({ className, label, ...props }: SwitchProps): React.JSX.Element {
  const control = (
    <BaseSwitch.Root className={cn('ming-switch', className)} {...props}>
      <BaseSwitch.Thumb className="ming-switch__thumb" />
    </BaseSwitch.Root>
  );

  if (!label) return control;

  return (
    <label className="ming-switch-label">
      {control}
      <span>{label}</span>
    </label>
  );
}
