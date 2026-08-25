import { Field } from '../../atoms/field';

import type { FieldProps } from '../../atoms/field';

export type FormFieldProps = FieldProps;

export function FormField(props: FormFieldProps): React.JSX.Element {
  return <Field {...props} />;
}
