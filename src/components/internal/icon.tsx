import styles from './icon.module.css';
import type { ReactNode, SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

/*
 * Pixel icons from pixelarticons (MIT): a 24-unit grid of 2-unit pixels, filled with
 * currentColor. They stay crisp only at 24px (`--ming-icon`) and 12px (`--ming-icon-sm`).
 */
function IconBase({ children, ...props }: IconProps & { children: ReactNode }): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className={styles['ming-icon']}
      fill="currentColor"
      focusable="false"
      shapeRendering="crispEdges"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M10 18H8v-2h2v2Zm-2-2H6v-2h2v2Zm4-2v2h-2v-2h2Zm-6 0H4v-2h2v2Zm8 0h-2v-2h2v2Zm2-2h-2v-2h2v2Zm2-2h-2V8h2v2Zm2-2h-2V6h2v2Z" />
    </IconBase>
  );
}
export function ChevronDownIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M13 16h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 10H5V8h2v2Zm12 0h-2V8h2v2Z" />
    </IconBase>
  );
}
export function CloseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M7 19H5V17H7V19ZM19 19H17V17H19V19ZM9 15V17H7V15H9ZM17 17H15V15H17V17ZM11 15H9V13H11V15ZM15 15H13V13H15V15ZM13 13H11V11H13V13ZM11 11H9V9H11V11ZM15 11H13V9H15V11ZM9 9H7V7H9V9ZM17 9H15V7H17V9ZM7 7H5V5H7V7ZM19 7H17V5H19V7Z" />
    </IconBase>
  );
}
export function MenuIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M20 18H4v-2h16v2Zm0-5H4v-2h16v2Zm0-5H4V6h16v2Z" />
    </IconBase>
  );
}
export function MoreIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M4 11h2v2H4v-2Zm7 0h2v2h-2v-2Zm7 0h2v2h-2v-2Z" />
    </IconBase>
  );
}
export function PlusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M13 11h7v2h-7v7h-2v-7H4v-2h7V4h2v7Z" />
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
        <path d="M13 12h6v-2h-2v-2h-2v-2h-2v-2h-2v2H9v2H7v2H5v2h6V20h2v-8Z" />
      </IconBase>
    );
  if (direction === 'descending')
    return (
      <IconBase {...props}>
        <path d="M13 12h6v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2h6V4h2v8Z" />
      </IconBase>
    );
  return (
    <IconBase {...props}>
      <path d="M16 4h2v16h-2zm-2 10h2v4h-2zm-2 0h2v2h-2zm6 0h2v4h-2zm2 0h2v2h-2zM6 20h2V4H6zM4 10h2V6H4zm-2 0h2V8H2zm6 0h2V6H8zm2 0h2V8h-2z" />
    </IconBase>
  );
}
