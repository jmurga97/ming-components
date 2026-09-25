import styles from './label.module.css';
import { cn } from '../../../lib/cn';

import type { ComponentPropsWithoutRef } from 'react';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

export function Label({ className, ...props }: LabelProps): React.JSX.Element {
  // Association is supplied by the consumer through htmlFor or label nesting.
  return <label className={cn(styles['ming-label'], className)} {...props} />;
}
