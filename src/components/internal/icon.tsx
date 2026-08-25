import type { ReactNode, SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

function IconBase({ children, ...props }: IconProps & { children: ReactNode }): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className="ming-icon"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 20 20"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m4.5 10.25 3.25 3.25 7.75-8" />
    </IconBase>
  );
}
export function ChevronDownIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m5.5 7.75 4.5 4.5 4.5-4.5" />
    </IconBase>
  );
}
export function CloseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m5 5 10 10M15 5 5 15" />
    </IconBase>
  );
}
export function MenuIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M4 6h12M4 10h12M4 14h12" />
    </IconBase>
  );
}
export function MoreIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <circle cx="5" cy="10" fill="currentColor" r="1" stroke="none" />
      <circle cx="10" cy="10" fill="currentColor" r="1" stroke="none" />
      <circle cx="15" cy="10" fill="currentColor" r="1" stroke="none" />
    </IconBase>
  );
}
export function PlusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M10 4v12M4 10h12" />
    </IconBase>
  );
}
export function SortIcon({
  direction,
  ...props
}: IconProps & { direction?: 'ascending' | 'descending' }): React.JSX.Element {
  if (direction === 'ascending')
    return (
      <IconBase {...props}>
        <path d="m6 9 4-4 4 4M10 5v10" />
      </IconBase>
    );
  if (direction === 'descending')
    return (
      <IconBase {...props}>
        <path d="m6 11 4 4 4-4M10 5v10" />
      </IconBase>
    );
  return (
    <IconBase {...props}>
      <path d="m6 8 4-4 4 4M10 4v12m-4-4 4 4 4-4" />
    </IconBase>
  );
}
