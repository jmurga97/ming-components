import { cn } from '../../../lib/cn';

import type { ComponentPropsWithoutRef } from 'react';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

export function Label({ className, ...props }: LabelProps): React.JSX.Element {
  // Association is supplied by the consumer through htmlFor or label nesting.
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className={cn('ming-label', className)} {...props} />;
}
