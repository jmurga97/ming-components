import styles from './icon.module.css';
import type { ReactNode, SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

/*
 * Pixel icons from HackerNoon's Pixel Icon Library (MIT, pixeliconlibrary.com): a 24-unit
 * grid of 1-unit pixels, filled with currentColor. They are drawn for 24px (`--ming-icon`).
 * Icons are decorative unless given an `aria-label`, which exposes them as an image.
 */
function IconBase({
  children,
  'aria-label': label,
  ...props
}: IconProps & { children: ReactNode }): React.JSX.Element {
  return (
    <svg
      aria-hidden={label === undefined ? true : undefined}
      aria-label={label}
      className={styles['ming-icon']}
      fill="currentColor"
      focusable="false"
      role="img"
      shapeRendering="crispEdges"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AnalyticsIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="2" y="15" width="2" height="7" />
      <rect x="8" y="10" width="2" height="12" />
      <rect x="14" y="14" width="2" height="8" />
      <rect x="20" y="10" width="2" height="12" />
      <rect x="18" y="5" width="1" height="1" />
      <rect x="17" y="6" width="1" height="1" />
      <rect x="14" y="7" width="2" height="1" />
      <rect x="14" y="10" width="2" height="1" />
      <rect x="13" y="8" width="1" height="2" />
      <rect x="16" y="8" width="1" height="2" />
      <rect x="12" y="6" width="1" height="1" />
      <rect x="11" y="5" width="1" height="1" />
      <rect x="8" y="4" width="2" height="1" />
      <rect x="8" y="1" width="2" height="1" />
      <rect x="10" y="2" width="1" height="2" />
      <rect x="7" y="2" width="1" height="2" />
      <rect x="20" y="4" width="2" height="1" />
      <rect x="19" y="2" width="1" height="2" />
      <rect x="20" y="1" width="2" height="1" />
      <rect x="22" y="2" width="1" height="2" />
      <rect x="6" y="6" width="1" height="1" />
      <rect x="5" y="7" width="1" height="1" />
      <rect x="4" y="9" width="1" height="2" />
      <rect x="1" y="9" width="1" height="2" />
      <rect x="2" y="8" width="2" height="1" />
      <rect x="2" y="11" width="2" height="1" />
    </IconBase>
  );
}
export function ArchiveIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="17 16 17 18 16 18 16 19 8 19 8 18 7 18 7 16 8 16 8 15 16 15 16 16 17 16" />
      <path d="M22,12V11H21V6H20V5H19V4H18V3H17V2H16V1H5V2H4V3H3V8H2V9H1V22H2v1H22V22h1V12ZM8,10V9H7V8H5V4H6V3h8V8h5v3H9V10ZM21,20H20v1H4V20H3V11H4V10H6v1H7v1H9v1H20v1h1Z" />
    </IconBase>
  );
}
export function ArrowDownIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 12 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 12 2 12 2 11 3 11 3 12 4 12 4 13 5 13 5 14 6 14 6 15 7 15 7 16 8 16 8 17 9 17 9 18 10 18 10 19 11 19 11 1 13 1 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 20 13 20 12 21 12 21 11 22 11 22 12 23 12" />
    </IconBase>
  );
}
export function ArrowLeftIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 11 23 13 5 13 5 14 6 14 6 15 7 15 7 16 8 16 8 17 9 17 9 18 10 18 10 19 11 19 11 20 12 20 12 21 13 21 13 22 12 22 12 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 12 1 12 2 13 2 13 3 12 3 12 4 11 4 11 5 10 5 10 6 9 6 9 7 8 7 8 8 7 8 7 9 6 9 6 10 5 10 5 11 23 11" />
    </IconBase>
  );
}
export function ArrowRightIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 11 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 12 23 12 22 11 22 11 21 12 21 12 20 13 20 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 1 13 1 11 19 11 19 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 5 13 5 13 4 12 4 12 3 11 3 11 2 12 2 12 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11" />
    </IconBase>
  );
}
export function ArrowUpIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 11 23 12 22 12 22 13 21 13 21 12 20 12 20 11 19 11 19 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 5 13 5 13 23 11 23 11 5 10 5 10 6 9 6 9 7 8 7 8 8 7 8 7 9 6 9 6 10 5 10 5 11 4 11 4 12 3 12 3 13 2 13 2 12 1 12 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11" />
    </IconBase>
  );
}
export function AtIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,10v-2h-1v-2h-1v-2h-1v-1h-2v-1h-3v-1h-4v1h-3v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h3v1h4v-1h3v-2h-3v1h-4v-1h-3v-1h-1v-1h-1v-2h-1v-2h-1v-4h1v-2h1v-2h1v-1h1v-1h3v-1h4v1h3v1h1v1h1v2h1v2h1v4h-1v1h-2v-5h-1v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v4h1v2h1v1h2v1h4v-1h2v-1h1v1h4v-1h1v-2h1v-4h-1Zm-6,4h-1v1h-1v1h-4v-1h-1v-1h-1v-4h1v-1h1v-1h4v1h1v1h1v4Z" />
    </IconBase>
  );
}
export function BellIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="15 20 15 22 14 22 14 23 10 23 10 22 9 22 9 20 15 20" />
      <path d="m21,17v-1h-1v-2h-1v-6h-1v-2h-1v-1h-1v-1h-2v-1h-1V1h-2v2h-1v1h-2v1h-1v1h-1v2h-1v6h-1v2h-1v1h-1v1h1v1h18v-1h1v-1h-1Zm-15-1v-2h1v-6h1v-2h2v-1h4v1h2v2h1v6h1v2h1v1H5v-1h1Z" />
    </IconBase>
  );
}
export function BellOffIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="3" y="16" width="1" height="1" />
      <polygon points="5 16 4 16 4 14 5 14 5 8 6 8 6 6 7 6 7 5 8 5 8 4 10 4 10 3 11 3 11 1 13 1 13 3 14 3 14 4 16 4 16 5 15 5 15 6 14 6 14 5 10 5 10 6 8 6 8 8 7 8 7 14 6 14 6 15 5 15 5 16" />
      <rect x="2" y="17" width="1" height="1" />
      <polygon points="15 20 15 22 14 22 14 23 10 23 10 22 9 22 9 20 15 20" />
      <polygon points="21 17 22 17 22 18 21 18 21 19 9 19 9 18 10 18 10 17 19 17 19 16 18 16 18 14 17 14 17 10 18 10 18 9 19 9 19 14 20 14 20 16 21 16 21 17" />
      <polygon points="22 3 22 4 21 4 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 12 13 12 13 13 12 13 12 14 11 14 11 15 10 15 10 16 9 16 9 17 8 17 8 18 7 18 7 19 6 19 6 20 5 20 5 21 4 21 4 22 3 22 3 21 2 21 2 20 3 20 3 19 4 19 4 18 5 18 5 17 6 17 6 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 12 11 12 11 11 12 11 12 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 20 3 20 2 21 2 21 3 22 3" />
    </IconBase>
  );
}
export function BookmarkIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m19,2v-1H5v1h-1v21h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v1h1v1h1v1h1v1h1v1h1v1h1v1h1V2h-1Zm-1,16h-1v-1h-1v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-1v1h-1V4h1v-1h10v1h1v14Z" />
    </IconBase>
  );
}
export function BriefcaseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M22,7V6H17V3H16V2H8V3H7V6H2V7H1V21H2v1H22V21h1V7ZM9,4h6V6H9ZM21,19H20v1H4V19H3V14H9v2h6V14h6Zm0-7H3V9H4V8H20V9h1Z" />
    </IconBase>
  );
}
export function CalendarIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="6" y="1" width="2" height="6" />
      <rect x="9" y="4" width="6" height="2" />
      <rect x="16" y="1" width="2" height="6" />
      <path d="M22,5V4H19V6h2V9H3V6H5V4H2V5H1V22H2v1H22V22h1V5ZM21,21H3V11H21Z" />
    </IconBase>
  );
}
export function CartIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="9 19 10 19 10 21 9 21 9 22 7 22 7 21 6 21 6 19 7 19 7 18 9 18 9 19" />
      <polygon points="20 19 21 19 21 21 20 21 20 22 18 22 18 21 17 21 17 19 18 19 18 18 20 18 20 19" />
      <path d="m4,3v-1H1v2h3v3h1v5h1v4h1v1h13v-2h-12v-2h12v-1h1v-3h1v-3h1v-3H4Zm16,3v3h-1v2H7v-4h-1v-2h15v1h-1Z" />
    </IconBase>
  );
}
export function ChartLineIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="22 5 22 12 21 12 21 8 19 8 19 9 18 9 18 10 17 10 17 11 16 11 16 12 15 12 15 13 14 13 14 14 13 14 13 13 12 13 12 12 11 12 11 11 10 11 10 10 9 10 9 11 8 11 8 12 7 12 7 13 6 13 6 11 7 11 7 10 8 10 8 9 9 9 9 8 10 8 10 9 11 9 11 10 12 10 12 11 13 11 13 12 14 12 14 11 15 11 15 10 16 10 16 9 17 9 17 8 18 8 18 7 19 7 19 6 15 6 15 5 22 5" />
      <polygon points="23 18 23 20 2 20 2 19 1 19 1 4 3 4 3 18 23 18" />
    </IconBase>
  );
}
export function CheckIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="22 4 22 6 21 6 21 7 20 7 20 8 19 8 19 9 18 9 18 10 17 10 17 11 16 11 16 12 15 12 15 13 14 13 14 14 13 14 13 15 12 15 12 16 11 16 11 17 10 17 10 18 8 18 8 17 7 17 7 16 6 16 6 15 5 15 5 14 4 14 4 13 3 13 3 12 2 12 2 10 4 10 4 11 5 11 5 12 6 12 6 13 7 13 7 14 8 14 8 15 10 15 10 14 11 14 11 13 12 13 12 12 13 12 13 11 14 11 14 10 15 10 15 9 16 9 16 8 17 8 17 7 18 7 18 6 19 6 19 5 20 5 20 4 22 4" />
    </IconBase>
  );
}
export function CheckCircleIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="19 9 19 10 18 10 18 11 17 11 17 12 16 12 16 13 15 13 15 14 14 14 14 15 13 15 13 16 12 16 12 17 10 17 10 16 9 16 9 15 8 15 8 14 7 14 7 13 6 13 6 12 7 12 7 11 8 11 8 12 9 12 9 13 10 13 10 14 12 14 12 13 13 13 13 12 14 12 14 11 15 11 15 10 16 10 16 9 17 9 17 8 18 8 18 9 19 9" />
      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-2,6v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6h-1Z" />
    </IconBase>
  );
}
export function ChevronDownIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="22 6 22 8 21 8 21 9 20 9 20 10 19 10 19 11 18 11 18 12 17 12 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 11 17 11 16 10 16 10 15 9 15 9 14 8 14 8 13 7 13 7 12 6 12 6 11 5 11 5 10 4 10 4 9 3 9 3 8 2 8 2 6 4 6 4 7 5 7 5 8 6 8 6 9 7 9 7 10 8 10 8 11 9 11 9 12 10 12 10 13 11 13 11 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 7 20 7 20 6 22 6" />
    </IconBase>
  );
}
export function ChevronLeftIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="16 22 18 22 18 20 17 20 17 19 16 19 16 18 15 18 15 17 14 17 14 16 13 16 13 15 12 15 12 14 11 14 11 13 10 13 10 11 11 11 11 10 12 10 12 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 5 17 5 17 4 18 4 18 2 16 2 16 3 15 3 15 4 14 4 14 5 13 5 13 6 12 6 12 7 11 7 11 8 10 8 10 9 9 9 9 10 8 10 8 11 7 11 7 13 8 13 8 14 9 14 9 15 10 15 10 16 11 16 11 17 12 17 12 18 13 18 13 19 14 19 14 20 15 20 15 21 16 21 16 22" />
    </IconBase>
  );
}
export function ChevronRightIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="6 22 8 22 8 21 9 21 9 20 10 20 10 19 11 19 11 18 12 18 12 17 13 17 13 16 14 16 14 15 15 15 15 14 16 14 16 13 17 13 17 11 16 11 16 10 15 10 15 9 14 9 14 8 13 8 13 7 12 7 12 6 11 6 11 5 10 5 10 4 9 4 9 3 8 3 8 2 6 2 6 4 7 4 7 5 8 5 8 6 9 6 9 7 10 7 10 8 11 8 11 9 12 9 12 10 13 10 13 11 14 11 14 13 13 13 13 14 12 14 12 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 19 7 19 7 20 6 20 6 22" />
    </IconBase>
  );
}
export function ChevronUpIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="22 16 22 18 20 18 20 17 19 17 19 16 18 16 18 15 17 15 17 14 16 14 16 13 15 13 15 12 14 12 14 11 13 11 13 10 11 10 11 11 10 11 10 12 9 12 9 13 8 13 8 14 7 14 7 15 6 15 6 16 5 16 5 17 4 17 4 18 2 18 2 16 3 16 3 15 4 15 4 14 5 14 5 13 6 13 6 12 7 12 7 11 8 11 8 10 9 10 9 9 10 9 10 8 11 8 11 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11 17 12 18 12 18 13 19 13 19 14 20 14 20 15 21 15 21 16 22 16" />
    </IconBase>
  );
}
export function ClipboardIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m19,5v-1h-3v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-3v1h-1v17h1v1h14v-1h1V5h-1Zm-9-2h1v-1h2v1h1v2h-1v1h-2v-1h-1v-2Zm-4,3h2v1h8v-1h2v15H6V6Z" />
    </IconBase>
  );
}
export function ClockIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
      <polygon points="16 15 16 16 15 16 15 17 14 17 14 16 13 16 13 15 12 15 12 14 11 14 11 5 13 5 13 13 14 13 14 14 15 14 15 15 16 15" />
    </IconBase>
  );
}
export function CloseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 13 15 13 15 14 16 14 16 15 17 15 17 16 18 16 18 17 19 17 19 18 20 18 20 19 21 19 21 20 22 20 22 21 21 21 21 22 20 22 20 21 19 21 19 20 18 20 18 19 17 19 17 18 16 18 16 17 15 17 15 16 14 16 14 15 13 15 13 14 11 14 11 15 10 15 10 16 9 16 9 17 8 17 8 18 7 18 7 19 6 19 6 20 5 20 5 21 4 21 4 22 3 22 3 21 2 21 2 20 3 20 3 19 4 19 4 18 5 18 5 17 6 17 6 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 11 9 11 9 10 8 10 8 9 7 9 7 8 6 8 6 7 5 7 5 6 4 6 4 5 3 5 3 4 2 4 2 3 3 3 3 2 4 2 4 3 5 3 5 4 6 4 6 5 7 5 7 6 8 6 8 7 9 7 9 8 10 8 10 9 11 9 11 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 20 3 20 2 21 2 21 3 22 3 22 4 21 4 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 13" />
    </IconBase>
  );
}
export function CloseCircleIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 13 15 13 15 14 16 14 16 15 17 15 17 16 16 16 16 17 15 17 15 16 14 16 14 15 13 15 13 14 11 14 11 15 10 15 10 16 9 16 9 17 8 17 8 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 11 9 11 9 10 8 10 8 9 7 9 7 8 8 8 8 7 9 7 9 8 10 8 10 9 11 9 11 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 13" />
      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
    </IconBase>
  );
}
export function CloudUploadIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 12 14 14 13 14 13 13 12 13 12 12 11 12 11 18 10 18 10 12 9 12 9 13 8 13 8 14 7 14 7 12 8 12 8 11 9 11 9 10 10 10 10 9 11 9 11 10 12 10 12 11 13 11 13 12 14 12" />
      <path d="m22,12v-1h-2v-2h-1v-1h-1v-1h-3v1h-1v-2h-1v-1h-5v1h-1v1h-1v1h-1v3h-3v1h-1v5h1v1h1v1h2v1h14v-1h2v-1h1v-1h1v-5h-1Zm0,4h-1v1h-1v1h-2v1H6v-1h-2v-1h-1v-1h-1v-3h1v-1h3v-3h1v-1h1v-1h1v-1h3v1h1v2h3v-1h1v1h1v1h1v2h2v1h1v3Z" />
    </IconBase>
  );
}
export function CodeIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="7 7 7 8 6 8 6 9 5 9 5 10 4 10 4 11 3 11 3 13 4 13 4 14 5 14 5 15 6 15 6 16 7 16 7 17 5 17 5 16 4 16 4 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 10 3 10 3 9 4 9 4 8 5 8 5 7 7 7" />
      <polygon points="15 3 16 3 16 6 15 6 15 9 14 9 14 12 13 12 13 14 12 14 12 17 11 17 11 20 10 20 10 21 9 21 9 18 10 18 10 15 11 15 11 12 12 12 12 10 13 10 13 7 14 7 14 4 15 4 15 3" />
      <polygon points="23 11 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 17 17 17 16 18 16 18 15 19 15 19 14 20 14 20 13 21 13 21 11 20 11 20 10 19 10 19 9 18 9 18 8 17 8 17 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11" />
    </IconBase>
  );
}
export function CollapseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="9 1 9 8 8 8 8 9 1 9 1 7 7 7 7 1 9 1" />
      <polygon points="8 16 9 16 9 23 7 23 7 17 1 17 1 15 8 15 8 16" />
      <polygon points="23 7 23 9 16 9 16 8 15 8 15 1 17 1 17 7 23 7" />
      <polygon points="23 15 23 17 17 17 17 23 15 23 15 16 16 16 16 15 23 15" />
    </IconBase>
  );
}
export function CommentIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,8v-2h-1v-1h-1v-1h-2v-1h-3v-1h-6v1h-3v1h-2v1h-1v1h-1v2h-1v6h1v2h1v2h-1v1h-1v2h5v-1h1v-1h2v1h6v-1h3v-1h2v-1h1v-1h1v-2h1v-6h-1Zm-2,6v2h-2v1h-3v1h-6v-1h-2v1h-1v1h-2v-1h1v-2h-1v-2h-1v-6h1v-2h2v-1h3v-1h6v1h3v1h2v2h1v6h-1Z" />
    </IconBase>
  );
}
export function CommentsIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m23,16v-5h-1v-2h-2v-1h-2v-1h-3v-2h-2v-1h-2v-1h-5v1h-2v1h-2v2h-1v5h1v2h-1v4h3v-1h1v-1h4v2h2v1h2v1h6v1h1v1h3v-4h-1v-2h1Zm-18-2v1h-1v1h-1v-2h1v-2h-1v-5h1v-1h2v-1h5v1h2v1h1v5h-1v1h-2v1h-6Zm16,2h-1v2h1v2h-1v-1h-1v-1h-6v-1h-2v-2h2v-1h2v-2h1v-3h2v1h2v1h1v5Z" />
    </IconBase>
  );
}
export function CopyIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="16 20 16 22 15 22 15 23 3 23 3 22 2 22 2 6 3 6 3 5 6 5 6 20 16 20" />
      <path d="m16,7V1h-8v1h-1v16h1v1h13v-1h1V7h-6Zm4,10h-11V3h5v6h6v8Z" />
      <polygon points="22 5 22 6 17 6 17 1 18 1 18 2 19 2 19 3 20 3 20 4 21 4 21 5 22 5" />
    </IconBase>
  );
}
export function CreditCardIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,5v-1H2v1h-1v14h1v1h20v-1h1V5h-1Zm-1,13H3v-7h18v7Zm0-10H3v-2h18v2Z" />
      <rect x="4" y="15" width="4" height="1" />
      <rect x="10" y="15" width="6" height="1" />
    </IconBase>
  );
}
export function DollarIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M17,12V11H13V6h4V4H13V1H11V4H7V5H6v7H7v1h4v5H6v2h5v3h2V20h4V19h1V12Zm-6-1H9V10H8V7H9V6h2Zm4,6v1H13V13h2v1h1v3Z" />
    </IconBase>
  );
}
export function DownloadIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="5 10 4 10 4 8 6 8 6 9 7 9 7 10 8 10 8 11 9 11 9 12 10 12 10 13 11 13 11 1 13 1 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 20 8 20 10 19 10 19 11 18 11 18 12 17 12 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 11 17 11 16 10 16 10 15 9 15 9 14 8 14 8 13 7 13 7 12 6 12 6 11 5 11 5 10" />
      <rect x="2" y="21" width="20" height="2" />
    </IconBase>
  );
}
export function EditIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="22 4 22 7 21 7 21 8 20 8 20 7 19 7 19 6 21 6 21 5 20 5 20 4 19 4 19 6 18 6 18 5 17 5 17 4 18 4 18 3 21 3 21 4 22 4" />
      <polygon points="18 14 18 21 17 21 17 22 2 22 2 21 1 21 1 6 2 6 2 5 14 5 14 6 13 6 13 7 3 7 3 20 16 20 16 15 17 15 17 14 18 14" />
      <path d="m18,8v-1h-1v-1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v4h4v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h-1Zm-1,2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v2Z" />
    </IconBase>
  );
}
export function ExpandIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="9 1 9 3 3 3 3 9 1 9 1 2 2 2 2 1 9 1" />
      <polygon points="9 21 9 23 2 23 2 22 1 22 1 15 3 15 3 21 9 21" />
      <polygon points="23 15 23 22 22 22 22 23 15 23 15 21 21 21 21 15 23 15" />
      <polygon points="23 2 23 9 21 9 21 3 15 3 15 1 22 1 22 2 23 2" />
    </IconBase>
  );
}
export function ExternalLinkIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="20 15 20 22 19 22 19 23 2 23 2 22 1 22 1 5 2 5 2 4 11 4 11 6 3 6 3 21 18 21 18 15 20 15" />
      <polygon points="23 1 23 9 21 9 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 12 13 12 13 13 12 13 12 14 11 14 11 15 10 15 10 16 9 16 9 17 7 17 7 15 8 15 8 14 9 14 9 13 10 13 10 12 11 12 11 11 12 11 12 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 15 3 15 1 23 1" />
    </IconBase>
  );
}
export function EyeIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="16" y="11" width="1" height="2" />
      <polygon points="16 13 16 15 15 15 15 16 13 16 13 15 14 15 14 14 15 14 15 13 16 13" />
      <polygon points="16 9 16 11 15 11 15 10 14 10 14 9 13 9 13 8 15 8 15 9 16 9" />
      <rect x="11" y="16" width="2" height="1" />
      <polygon points="11 15 11 16 9 16 9 15 8 15 8 13 9 13 9 14 10 14 10 15 11 15" />
      <polygon points="13 7 13 8 12 8 12 11 11 11 11 12 8 12 8 13 7 13 7 11 8 11 8 9 9 9 9 8 11 8 11 7 13 7" />
      <path d="m22,11v-2h-1v-1h-1v-1h-1v-1h-2v-1H7v1h-2v1h-1v1h-1v1h-1v2h-1v2h1v2h1v1h1v1h1v1h2v1h10v-1h2v-1h1v-1h1v-1h1v-2h1v-2h-1Zm-1,3h-1v1h-1v1h-1v1h-2v1h-8v-1h-1v-1h-2v-1h-1v-1h-1v-4h1v-1h1v-1h1v-1h2v-1h8v1h2v1h1v1h1v1h1v4Z" />
    </IconBase>
  );
}
export function EyeOffIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="15 13 16 13 16 15 15 15 15 16 13 16 13 15 14 15 14 14 15 14 15 13" />
      <rect x="16" y="11" width="1" height="2" />
      <polygon points="23 11 23 13 22 13 22 15 21 15 21 16 20 16 20 17 19 17 19 18 17 18 17 19 9 19 9 18 16 18 16 17 18 17 18 16 19 16 19 15 20 15 20 14 21 14 21 10 20 10 20 9 19 9 19 8 21 8 21 9 22 9 22 11 23 11" />
      <polygon points="2 13 1 13 1 11 2 11 2 9 3 9 3 8 4 8 4 7 5 7 5 6 7 6 7 5 15 5 15 6 8 6 8 7 6 7 6 8 5 8 5 9 4 9 4 10 3 10 3 14 4 14 4 15 5 15 5 16 3 16 3 15 2 15 2 13" />
      <polygon points="13 7 13 8 12 8 12 9 11 9 11 10 10 10 10 11 9 11 9 12 8 12 8 13 7 13 7 11 8 11 8 9 9 9 9 8 11 8 11 7 13 7" />
      <polygon points="9 17 8 17 8 18 7 18 7 19 6 19 6 20 5 20 5 21 4 21 4 22 3 22 3 21 2 21 2 20 3 20 3 19 4 19 4 18 5 18 5 17 6 17 6 16 7 16 7 15 8 15 8 14 9 14 9 13 10 13 10 12 11 12 11 11 12 11 12 10 13 10 13 9 14 9 14 8 15 8 15 7 16 7 16 6 17 6 17 5 18 5 18 4 19 4 19 3 20 3 20 2 21 2 21 3 22 3 22 4 21 4 21 5 20 5 20 6 19 6 19 7 18 7 18 8 17 8 17 9 16 9 16 10 15 10 15 11 14 11 14 12 13 12 13 13 12 13 12 14 11 14 11 15 10 15 10 16 9 16 9 17" />
      <rect x="11" y="16" width="2" height="1" />
    </IconBase>
  );
}
export function FilterIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m1,2v4h1v1h1v1h1v1h1v1h1v1h1v1h1v2h1v3h1v1h1v1h1v1h1v1h1v1h1v-8h1v-2h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1V2H1Zm20,3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v3h-1v3h-1v-1h-1v-2h-1v-3h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h18v1Z" />
    </IconBase>
  );
}
export function FlagIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,4v1h-2v1h-6v-1h-7v1h-1v-1h1v-2h-1v-1h-2v1h-1v2h1v17h2v-4h1v-1h7v1h6v-1h2v-1h1V4h-1Zm-1,11h-1v1h-6v-1h-7v1h-1v-8h1v-1h7v1h6v-1h1v8Z" />
    </IconBase>
  );
}
export function FolderIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,6v-1h-9v-1h-1v-1h-1v-1H2v1h-1v18h1v1h20v-1h1V6h-1Zm-1,14H3V4h7v1h1v1h1v1h9v13Z" />
    </IconBase>
  );
}
export function FolderOpenIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m6,10v2h-1v2h-1v2h-1v2h-1v3h1v1h15v-1h1v-3h1v-2h1v-2h1v-2h1v-2H6Zm14,4h-1v2h-1v2h-1v2H4v-2h1v-2h1v-2h1v-2h13v2Z" />
      <polygon points="20 5 20 9 18 9 18 6 9 6 9 5 8 5 8 4 3 4 3 14 2 14 2 16 1 16 1 3 2 3 2 2 9 2 9 3 10 3 10 4 19 4 19 5 20 5" />
    </IconBase>
  );
}
export function GlobeIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v7h1v1h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,1v4h-3v-4h3Zm-5-6h1v1h2v2h1v1h-3v-3h-1v-1Zm-2,14v2h-1v1h-2v-1h-1v-2h-1v-2h6v2h-1Zm2-8v4h-8v-4h8Zm-7-4h1v-2h1v-1h2v1h1v2h1v2h-6v-2Zm-5,1h1v-2h2v-1h1v1h-1v3h-3v-1Zm-1,7v-4h3v4h-3Zm2,5v-2h-1v-1h3v3h1v1h-1v-1h-2Zm14-2v2h-2v1h-1v-1h1v-3h3v1h-1Z" />
    </IconBase>
  );
}
export function GridIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m10,13H2v1h-1v8h1v1h8v-1h1v-8h-1v-1Zm-1,8H3v-6h6v6Z" />
      <path d="m10,2v-1H2v1h-1v8h1v1h8v-1h1V2h-1Zm-7,7V3h6v6H3Z" />
      <path d="m22,13h-8v1h-1v8h1v1h8v-1h1v-8h-1v-1Zm-1,8h-6v-6h6v6Z" />
      <path d="m22,2v-1h-8v1h-1v8h1v1h8v-1h1V2h-1Zm-1,7h-6V3h6v6Z" />
    </IconBase>
  );
}
export function HandshakeIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="18 8 18 7 11 7 11 8 10 8 10 9 9 9 9 10 8 10 8 12 11 12 11 11 12 11 12 10 13 10 13 9 15 9 15 10 16 10 16 11 17 11 17 12 18 12 18 13 19 13 19 14 21 14 21 13 23 13 23 15 22 15 22 16 20 16 20 17 19 17 19 18 18 18 18 19 17 19 17 20 14 20 14 21 8 21 8 20 6 20 6 19 5 19 5 18 4 18 4 17 3 17 3 16 2 16 2 15 1 15 1 13 3 13 3 14 4 14 4 15 5 15 5 16 6 16 6 17 7 17 7 18 8 18 8 19 9 19 9 18 8 18 8 17 7 17 7 16 9 16 9 17 10 17 10 18 11 18 11 19 13 19 13 18 12 18 12 17 11 17 11 16 10 16 10 15 12 15 12 16 13 16 13 17 14 17 14 18 17 18 17 17 15 17 15 16 14 16 14 15 13 15 13 14 15 14 15 15 16 15 16 16 18 16 18 15 17 15 17 14 16 14 16 13 15 13 15 12 13 12 13 13 11 13 11 14 8 14 8 13 7 13 7 12 6 12 6 10 7 10 7 9 8 9 8 8 9 8 9 7 6 7 6 8 5 8 5 7 3 7 3 6 1 6 1 4 3 4 3 5 5 5 5 6 6 6 6 5 18 5 18 6 19 6 19 5 21 5 21 4 23 4 23 6 21 6 21 7 19 7 19 8 18 8" />
    </IconBase>
  );
}
export function HashtagIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M17,12V9h6V7H18V4h1V1H17V4H16V7H10V4h1V1H9V4H8V7H3V9H7v3H6v3H1v2H5v3H4v3H6V20H7V17h6v3H12v3h2V20h1V17h6V15H16V12Zm-2,0H14v3H8V12H9V9h6Z" />
    </IconBase>
  );
}
export function HelpIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="11" y="17" width="2" height="2" />
      <polygon points="16 7 16 11 15 11 15 12 14 12 14 13 13 13 13 15 11 15 11 12 12 12 12 11 13 11 13 10 14 10 14 8 13 8 13 7 11 7 11 8 10 8 10 9 8 9 8 7 9 7 9 6 10 6 10 5 14 5 14 6 15 6 15 7 16 7" />
      <path d="M22,9V7H21V5H20V4H19V3H17V2H15V1H9V2H7V3H5V4H4V5H3V7H2V9H1v6H2v2H3v2H4v1H5v1H7v1H9v1h6V22h2V21h2V20h1V19h1V17h1V15h1V9Zm-2,6v2H19v1H18v1H17v1H15v1H9V20H7V19H6V18H5V17H4V15H3V9H4V7H5V6H6V5H7V4H9V3h6V4h2V5h1V6h1V7h1V9h1v6Z" />
    </IconBase>
  );
}
export function HomeIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,11v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h3v10h1v1h4v-7h6v7h4v-1h1v-10h3v-1h-1Zm-3,0h-1v10h-1v-6h-1v-1h-8v1h-1v6h-1v-10h-1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h2v1h1v1h1v1h1v1h1v1h1v1h1v1Z" />
    </IconBase>
  );
}
export function ImageIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="9 6 9 9 8 9 8 10 5 10 5 9 4 9 4 6 5 6 5 5 8 5 8 6 9 6" />
      <path d="m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-5,12v1h1v1h1v1h1v1h1v3h-13v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v1h1Zm3,1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-1v-1h-1V3h18v12h-1Zm-15,3v1h1v1h1v1H3v-4h1v1h1Z" />
    </IconBase>
  );
}
export function ImportIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="1 15 1 13 12 13 12 8 13 8 13 9 14 9 14 10 15 10 15 11 16 11 16 12 17 12 17 13 18 13 18 15 17 15 17 16 16 16 16 17 15 17 15 18 14 18 14 19 13 19 13 20 12 20 12 15 1 15" />
      <polygon points="23 6 23 22 22 22 22 23 7 23 7 22 6 22 6 16 8 16 8 21 21 21 21 8 16 8 16 3 8 3 8 12 6 12 6 2 7 2 7 1 18 1 18 2 19 2 19 3 20 3 20 4 21 4 21 5 22 5 22 6 23 6" />
    </IconBase>
  );
}
export function InfoIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 15 14 17 10 17 10 15 11 15 11 10 10 10 10 9 13 9 13 15 14 15" />
      <rect x="11" y="6" width="2" height="2" />
      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v1h-1v1h-1v1h-2v1h-6v-1h-2v-1h-1v-1h-1v-1h-1v-2h-1v-6h1v-2h1v-1h1v-1h1v-1h2v-1h6v1h2v1h1v1h1v1h1v2h1v6Z" />
    </IconBase>
  );
}
export function LinkIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="16 10 17 10 17 17 16 17 16 18 15 18 15 19 14 19 14 20 13 20 13 21 12 21 12 22 11 22 11 23 5 23 5 22 4 22 4 21 3 21 3 20 2 20 2 19 1 19 1 14 2 14 2 13 3 13 3 12 4 12 4 11 5 11 5 14 4 14 4 15 3 15 3 18 4 18 4 19 5 19 5 20 6 20 6 21 10 21 10 20 11 20 11 19 12 19 12 18 13 18 13 17 14 17 14 16 15 16 15 11 14 11 14 10 13 10 13 9 14 9 14 8 15 8 15 9 16 9 16 10" />
      <polygon points="23 5 23 10 22 10 22 11 21 11 21 12 20 12 20 13 19 13 19 10 20 10 20 9 21 9 21 6 20 6 20 5 19 5 19 4 18 4 18 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 13 10 13 10 14 11 14 11 15 10 15 10 16 9 16 9 15 8 15 8 14 7 14 7 7 8 7 8 6 9 6 9 5 10 5 10 4 11 4 11 3 12 3 12 2 13 2 13 1 19 1 19 2 20 2 20 3 21 3 21 4 22 4 22 5 23 5" />
    </IconBase>
  );
}
export function ListIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="2" y="5" width="3" height="3" />
      <rect x="2" y="11" width="3" height="3" />
      <rect x="2" y="17" width="3" height="3" />
      <rect x="8" y="18" width="14" height="1" />
      <rect x="8" y="6" width="14" height="1" />
      <rect x="8" y="12" width="14" height="1" />
    </IconBase>
  );
}
export function LockIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,12v-1h-3v-6h-1v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v6h-3v1h-1v10h1v1h18v-1h1v-10h-1Zm-1,1v8H4v-8h16ZM9,5v-1h1v-1h4v1h1v1h1v6h-8v-6h1Z" />
    </IconBase>
  );
}
export function LoginIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="10 19 10 20 8 20 8 18 9 18 9 17 10 17 10 16 11 16 11 15 12 15 12 14 13 14 13 13 1 13 1 11 13 11 13 10 12 10 12 9 11 9 11 8 10 8 10 7 9 7 9 6 8 6 8 4 10 4 10 5 11 5 11 6 12 6 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 18 11 18 11 19 10 19" />
      <rect x="21" y="2" width="2" height="20" />
    </IconBase>
  );
}
export function LogoutIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 9 21 9 21 10 22 10 22 11 23 11 23 13 22 13 22 14 21 14 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 14 20 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 7 13 7 11 19 11 19 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 4" />
      <rect x="1" y="2" width="2" height="20" />
    </IconBase>
  );
}
export function MailIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,5v-1H3v1H1v14h1v1h20v-1h1V5h-2Zm-11,7v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h14v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1Zm-6-5v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v11H3V7h1Z" />
    </IconBase>
  );
}
export function MapPinIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="15 8 15 10 14 10 14 11 13 11 13 12 11 12 11 11 10 11 10 10 9 10 9 8 10 8 10 7 11 7 11 6 13 6 13 7 14 7 14 8 15 8" />
      <path d="m19,6v-2h-1v-1h-1v-1h-2v-1h-6v1h-2v1h-1v1h-1v2h-1v6h1v2h1v1h1v2h1v1h1v2h1v1h1v2h2v-2h1v-1h1v-2h1v-1h1v-2h1v-1h1v-2h1v-6h-1Zm-2,6v2h-1v1h-1v2h-1v1h-1v2h-2v-2h-1v-1h-1v-2h-1v-1h-1v-2h-1v-6h1v-2h2v-1h6v1h2v2h1v6h-1Z" />
    </IconBase>
  );
}
export function MenuIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="1" y="11" width="22" height="2" />
      <rect x="1" y="19" width="22" height="2" />
      <rect x="1" y="3" width="22" height="2" />
    </IconBase>
  );
}
export function MessageIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,2v-1H2v1h-1v16h1v1h6v4h1v-1h1v-1h1v-1h2v-1h9v-1h1V2h-1Zm-1,15H3V3h18v14Z" />
    </IconBase>
  );
}
export function MinusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="1" y="11" width="22" height="2" />
    </IconBase>
  );
}
export function MoonIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,17v1h-2v1h-4v-1h-2v-1h-2v-1h-1v-2h-1v-2h-1v-4h1v-2h1v-2h1v-1h2v-1h2v-1h-5v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h-1Zm-13,3v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v1h-1v2h-1v4h1v2h1v2h1v1h1v1h1v1h2v1h2v1h-5v-1h-2Z" />
    </IconBase>
  );
}
export function MoreIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m6,10h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1v-1Zm-1,3h-2v-2h2v2Z" />
      <path d="m14,10h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1v-1Zm-1,3h-2v-2h2v2Z" />
      <path d="m22,11v-1h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1Zm-3,2v-2h2v2h-2Z" />
    </IconBase>
  );
}
export function MoreVerticalIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m14,18h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1v-1Zm-1,3h-2v-2h2v2Z" />
      <path d="m14,10h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1v-1Zm-1,3h-2v-2h2v2Z" />
      <path d="m14,3v-1h-1v-1h-2v1h-1v1h-1v2h1v1h1v1h2v-1h1v-1h1v-2h-1Zm-3,2v-2h2v2h-2Z" />
    </IconBase>
  );
}
export function PaperclipIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="21 4 21 9 20 9 20 10 19 10 19 11 18 11 18 12 17 12 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 18 11 18 11 19 8 19 8 18 7 18 7 17 6 17 6 14 7 14 7 13 8 13 8 12 9 12 9 11 10 11 10 10 11 10 11 9 12 9 12 8 13 8 13 7 14 7 14 6 15 6 15 5 16 5 16 6 17 6 17 7 16 7 16 8 15 8 15 9 14 9 14 10 13 10 13 11 12 11 12 12 11 12 11 13 10 13 10 14 9 14 9 15 8 15 8 16 9 16 9 17 10 17 10 16 11 16 11 15 12 15 12 14 13 14 13 13 14 13 14 12 15 12 15 11 16 11 16 10 17 10 17 9 18 9 18 8 19 8 19 5 18 5 18 4 17 4 17 3 14 3 14 4 13 4 13 5 12 5 12 6 11 6 11 7 10 7 10 8 9 8 9 9 8 9 8 10 7 10 7 11 6 11 6 12 5 12 5 13 4 13 4 18 5 18 5 19 6 19 6 20 7 20 7 21 12 21 12 20 13 20 13 19 14 19 14 18 15 18 15 17 16 17 16 16 17 16 17 15 18 15 18 14 19 14 19 13 21 13 21 15 20 15 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 7 23 7 22 5 22 5 21 4 21 4 20 3 20 3 18 2 18 2 12 3 12 3 11 4 11 4 10 5 10 5 9 6 9 6 8 7 8 7 7 8 7 8 6 9 6 9 5 10 5 10 4 11 4 11 3 12 3 12 2 14 2 14 1 18 1 18 2 19 2 19 3 20 3 20 4 21 4" />
    </IconBase>
  );
}
export function PhoneIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="12" y="10" width="2" height="2" />
      <polygon points="18 9 19 9 19 12 17 12 17 10 16 10 16 9 15 9 15 8 14 8 14 7 12 7 12 5 15 5 15 6 16 6 16 7 17 7 17 8 18 8 18 9" />
      <polygon points="23 8 23 12 21 12 21 8 20 8 20 7 19 7 19 6 18 6 18 5 17 5 17 4 16 4 16 3 12 3 12 1 16 1 16 2 18 2 18 3 19 3 19 4 20 4 20 5 21 5 21 6 22 6 22 8 23 8" />
      <path d="m22,17v-1h-1v-1h-2v-1h-3v1h-1v1h-3v-1h-1v-1h-1v-1h-1v-1h-1v-3h1v-1h1v-3h-1v-2h-1v-1h-1v-1h-3v1h-2v1h-1v5h1v4h1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v1h4v1h5v-1h1v-2h1v-3h-1Zm-2,3v1h-4v-1h-4v-1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-2h-1v-4h-1v-4h1v-1h3v2h1v3h-1v1h-1v3h1v1h1v1h1v1h1v1h1v1h1v1h3v-1h1v-1h3v1h2v3h-1Z" />
    </IconBase>
  );
}
export function PinIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m18,13v-1h-1v-1h-1v-7h2v-2h-1v-1H7v1h-1v2h2v7h-1v1h-1v1h-1v2h1v1h5v7h2v-7h5v-1h1v-2h-1ZM9,3h6v1h-1v8h1v1h1v1h-8v-1h1v-1h1V4h-1v-1Z" />
    </IconBase>
  );
}
export function PlusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 11 23 13 13 13 13 23 11 23 11 13 1 13 1 11 11 11 11 1 13 1 13 11 23 11" />
    </IconBase>
  );
}
export function PrintIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="18" y="12" width="2" height="1" />
      <polygon points="20 3 20 8 18 8 18 4 17 4 17 3 6 3 6 8 4 8 4 1 18 1 18 2 19 2 19 3 20 3" />
      <path d="m1,9v8h3v6h16v-6h3v-8H1Zm17,12H6v-5h12v5Zm3-6h-2v-1H5v1h-2v-4h18v4Z" />
    </IconBase>
  );
}
export function ReceiptIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="7" y="15" width="10" height="2" />
      <rect x="7" y="11" width="10" height="2" />
      <rect x="7" y="7" width="10" height="2" />
      <path d="m19,1v1h-1v1h-1v-1h-1v-1h-2v1h-1v1h-2v-1h-1v-1h-2v1h-1v1h-1v-1h-1v-1h-1v22h1v-1h1v-1h1v1h1v1h2v-1h1v-1h2v1h1v1h2v-1h1v-1h1v1h1v1h1V1h-1Zm-3,19v1h-2v-1h-1v-1h-2v1h-1v1h-2v-1h-1v-1h-1V5h1v-1h1v-1h2v1h1v1h2v-1h1v-1h2v1h1v1h1v14h-1v1h-1Z" />
    </IconBase>
  );
}
export function RefreshIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="23 14 23 15 22 15 22 17 21 17 21 19 20 19 20 20 19 20 19 21 17 21 17 22 15 22 15 23 9 23 9 22 7 22 7 21 5 21 5 20 3 20 3 21 2 21 2 22 1 22 1 15 8 15 8 16 7 16 7 17 6 17 6 19 7 19 7 20 9 20 9 21 15 21 15 20 17 20 17 19 19 19 19 17 20 17 20 14 23 14" />
      <polygon points="23 2 23 9 16 9 16 8 17 8 17 7 18 7 18 5 17 5 17 4 15 4 15 3 9 3 9 4 7 4 7 5 5 5 5 7 4 7 4 10 1 10 1 9 2 9 2 7 3 7 3 5 4 5 4 4 5 4 5 3 7 3 7 2 9 2 9 1 15 1 15 2 17 2 17 3 19 3 19 4 21 4 21 3 22 3 22 2 23 2" />
    </IconBase>
  );
}
export function SaveIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="15 14 15 18 14 18 14 19 10 19 10 18 9 18 9 14 10 14 10 13 14 13 14 14 15 14" />
      <path d="m22,7v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H2v1h-1v20h1v1h20v-1h1V7h-1Zm-7,3V3h1v1h1v1h1v1h1v1h1v1h1v13H3V3h1v7h11ZM6,3h7v5h-7V3Z" />
    </IconBase>
  );
}
export function SearchIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,20v-1h-1v-1h-1v-1h-1v-1h-2v-1h1v-2h1v-6h-1v-2h-1v-1h-1v-1h-1v-1h-2v-1h-6v1h-2v1h-1v1h-1v1h-1v2h-1v6h1v2h1v1h1v1h1v1h2v1h6v-1h2v-1h1v2h1v1h1v1h1v1h1v1h2v-1h1v-2h-1Zm-10-5v1h-4v-1h-2v-1h-1v-2h-1v-4h1v-2h1v-1h2v-1h4v1h2v1h1v2h1v4h-1v2h-1v1h-2Z" />
    </IconBase>
  );
}
export function SettingsIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,10v-1h-1v-2h1v-2h-1v-1h-1v-1h-2v1h-2v-1h-1V1h-4v2h-1v1h-2v-1h-2v1h-1v1h-1v2h1v2h-1v1H1v4h2v1h1v2h-1v2h1v1h1v1h2v-1h2v1h1v2h4v-2h1v-1h2v1h2v-1h1v-1h1v-2h-1v-2h1v-1h2v-4h-2Zm0,3h-1v1h-1v1h-1v2h1v2h-2v-1h-2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-2v1h-2v-2h1v-2h-1v-1h-1v-1h-1v-2h1v-1h1v-1h1v-2h-1v-2h2v1h2v-1h1v-1h1v-1h2v1h1v1h1v1h2v-1h2v2h-1v2h1v1h1v1h1v2Z" />
      <path d="m16,10v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-1v4h1v1h1v1h1v1h4v-1h1v-1h1v-1h1v-4h-1Zm-1,4h-1v1h-4v-1h-1v-4h1v-1h4v1h1v4Z" />
    </IconBase>
  );
}
export function ShareIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M22,9V8H21V7H20V6H19V5H18V4H17V3H16V2H14V3H13V7H6V8H4V9H3v2H2v2H1v3H2v2H3v2H4v1H5v1H7V20H6V15H7V13h6v4h1v1h2V17h1V16h1V15h1V14h1V13h1V12h1V11h1V9Zm-2,2H19v1H18v1H17v1H16v1H15V11H6v1H5v3H3V13H4V11H5V10H7V9h8V5h1V6h1V7h1V8h1V9h1Z" />
    </IconBase>
  );
}
export function ShopIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 11 14 20 13 20 13 21 4 21 4 20 3 20 3 11 5 11 5 16 12 16 12 11 14 11" />
      <rect x="19" y="11" width="2" height="10" />
      <path d="m22,7v-1h-1v-2h-1v-1H4v1h-1v2h-1v1h-1v2h1v1h20v-1h1v-2h-1Zm-19,1v-1h1v-1h1v-1h14v1h1v1h1v1H3Z" />
    </IconBase>
  );
}
export function SidebarCollapseIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M22,5V3H20V2H4V3H2V5H1V19H2v2H4v1H20V21h2V19h1V5ZM7,19H5V18H4V6H5V5H7Zm13-1H19v1H10V5h9V6h1Z" />
      <polygon points="18 7 18 9 17 9 17 10 16 10 16 11 15 11 15 13 16 13 16 14 17 14 17 15 18 15 18 17 16 17 16 16 15 16 15 15 14 15 14 14 13 14 13 13 12 13 12 11 13 11 13 10 14 10 14 9 15 9 15 8 16 8 16 7 18 7" />
    </IconBase>
  );
}
export function SidebarExpandIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M22,5V3H20V2H4V3H2V5H1V19H2v2H4v1H20V21h2V19h1V5ZM7,19H5V18H4V6H5V5H7Zm13-1H19v1H10V5h9V6h1Z" />
      <polygon points="18 11 18 13 17 13 17 14 16 14 16 15 15 15 15 16 14 16 14 17 12 17 12 15 13 15 13 14 14 14 14 13 15 13 15 11 14 11 14 10 13 10 13 9 12 9 12 7 14 7 14 8 15 8 15 9 16 9 16 10 17 10 17 11 18 11" />
    </IconBase>
  );
}
export function SpinnerIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <rect x="20" y="13" width="2" height="1" />
      <rect x="22" y="11" width="1" height="2" />
      <rect x="20" y="10" width="2" height="1" />
      <rect x="19" y="11" width="1" height="2" />
      <rect x="17" y="19" width="2" height="1" />
      <rect x="19" y="17" width="1" height="2" />
      <rect x="17" y="16" width="2" height="1" />
      <rect x="16" y="17" width="1" height="2" />
      <rect x="10" y="20" width="1" height="2" />
      <rect x="11" y="22" width="2" height="1" />
      <rect x="13" y="20" width="1" height="2" />
      <rect x="11" y="19" width="2" height="1" />
      <rect x="5" y="19" width="2" height="1" />
      <rect x="13" y="2" width="1" height="2" />
      <rect x="11" y="4" width="2" height="1" />
      <rect x="11" y="1" width="2" height="1" />
      <rect x="10" y="2" width="1" height="2" />
      <rect x="7" y="17" width="1" height="2" />
      <rect x="7" y="5" width="1" height="2" />
      <rect x="5" y="7" width="2" height="1" />
      <rect x="5" y="16" width="2" height="1" />
      <rect x="5" y="4" width="2" height="1" />
      <rect x="4" y="17" width="1" height="2" />
      <rect x="4" y="11" width="1" height="2" />
      <rect x="4" y="5" width="1" height="2" />
      <rect x="2" y="10" width="2" height="1" />
      <rect x="2" y="13" width="2" height="1" />
      <rect x="1" y="11" width="1" height="2" />
    </IconBase>
  );
}
export function StarIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m16,8v-2h-1v-2h-1v-2h-1v-1h-2v1h-1v2h-1v2h-1v2H1v2h1v1h1v1h1v1h1v1h1v5h-1v4h2v-1h2v-1h2v-1h2v1h2v1h2v1h2v-4h-1v-5h1v-1h1v-1h1v-1h1v-1h1v-2h-7Zm4,3h-1v1h-1v1h-1v1h-1v5h1v1h-2v-1h-2v-1h-2v1h-2v1h-2v-1h1v-5h-1v-1h-1v-1h-1v-1h-1v-1h4v-1h1v-1h1v-2h1v-2h2v2h1v2h1v1h1v1h4v1Z" />
    </IconBase>
  );
}
export function SunIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,11v-1h1v-1h1v-2h-3v-1h-2v-2h-1V1h-2v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-2v3h-1v2h-2v1H1v2h1v1h1v1h1v2h-1v1h-1v1h-1v2h3v1h2v2h1v3h2v-1h1v-1h1v-1h2v1h1v1h1v1h2v-3h1v-2h2v-1h3v-2h-1v-1h-1v-1h-1v-2h1Zm-2,2v1h1v1h1v1h-3v1h-1v1h-1v3h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v-3h-1v-1h-1v-1h-3v-1h1v-1h1v-1h1v-2h-1v-1h-1v-1h-1v-1h3v-1h1v-1h1v-3h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v2h1v2h1v1h3v1h-1v1h-1v1h-1v2h1Z" />
      <path d="m16,10v-1h-1v-1h-1v-1h-4v1h-1v1h-1v1h-1v4h1v1h1v1h1v1h4v-1h1v-1h1v-1h1v-4h-1Zm-1,4h-1v1h-4v-1h-1v-4h1v-1h4v1h1v4Z" />
    </IconBase>
  );
}
export function TableIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-9,14h8v5h-8v-5Zm0-1v-6h8v6h-8Zm0-7V3h8v5h-8Zm-2,1v6H3v-6h8Zm-8-1V3h8v5H3Zm8,8v5H3v-5h8Z" />
    </IconBase>
  );
}
export function TagIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="8 5 8 7 7 7 7 8 5 8 5 7 4 7 4 5 5 5 5 4 7 4 7 5 8 5" />
      <path d="m22,13v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H2v1h-1v9h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h-1ZM3,3h7v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1V3Z" />
    </IconBase>
  );
}
export function TrashIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m4,6v8h1v8h1v1h12v-1h1v-8h1V6H4Zm14,7h-1v8H7v-8h-1v-5h12v5Z" />
      <polygon points="21 3 21 5 3 5 3 3 4 3 4 2 9 2 9 1 15 1 15 2 20 2 20 3 21 3" />
    </IconBase>
  );
}
export function UnlockIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m21,12v-1h-13v-6h1v-1h1v-1h4v1h1v1h1v4h2v-4h-1v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v6h-3v1h-1v10h1v1h18v-1h1v-10h-1Zm-1,9H4v-8h16v8Z" />
    </IconBase>
  );
}
export function UploadIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="4 10 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8 20 10 18 10 18 9 17 9 17 8 16 8 16 7 15 7 15 6 14 6 14 5 13 5 13 17 11 17 11 5 10 5 10 6 9 6 9 7 8 7 8 8 7 8 7 9 6 9 6 10 4 10" />
      <rect x="2" y="20" width="20" height="3" />
    </IconBase>
  );
}
export function UserIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m17,5v-2h-1v-1h-2v-1h-4v1h-2v1h-1v2h-1v4h1v2h1v1h2v1h4v-1h2v-1h1v-2h1v-4h-1Zm-2,4v1h-1v1h-4v-1h-1v-1h-1v-4h1v-1h1v-1h4v1h1v1h1v4h-1Z" />
      <path d="m21,19v-1h-1v-1h-1v-1h-2v-1H7v1h-2v1h-1v1h-1v1h-1v3h1v1h18v-1h1v-3h-1Zm-16,0v-1h2v-1h10v1h2v1h1v2H4v-2h1Z" />
    </IconBase>
  );
}
export function UserCheckIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m15,16v-1h-1v-1h-1v-1h-2v1h-5v-1h-2v1h-1v1h-1v1h-1v4h1v1h13v-1h1v-4h-1Zm-1,3H3v-3h1v-1h2v1h5v-1h2v1h1v3Z" />
      <polygon points="23 9 23 10 22 10 22 11 21 11 21 12 20 12 20 13 19 13 19 14 17 14 17 13 16 13 16 12 15 12 15 11 16 11 16 10 17 10 17 11 19 11 19 10 20 10 20 9 21 9 21 8 22 8 22 9 23 9" />
      <path d="m12,6v-2h-2v-1h-3v1h-2v2h-1v3h1v2h2v1h3v-1h2v-2h1v-3h-1Zm-2,3v1h-3v-1h-1v-3h1v-1h3v1h1v3h-1Z" />
    </IconBase>
  );
}
export function UserMinusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="M22,15V13H21V12H19V11H16v1H14v1H13v2H12v3h1v2h1v1h2v1h3V21h2V20h1V18h1V15Zm-7,2V16h5v1Z" />
      <polygon points="11 20 12 20 12 21 2 21 2 20 1 20 1 17 2 17 2 16 3 16 3 15 4 15 4 14 11 14 11 15 10 15 10 16 4 16 4 17 3 17 3 19 11 19 11 20" />
      <path d="M12,5V4H11V3H6V4H5V5H4v5H5v1H6v1h5V11h1V10h1V5ZM11,9H10v1H7V9H6V6H7V5h3V6h1Z" />
    </IconBase>
  );
}
export function UserPlusIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="11 20 12 20 12 21 2 21 2 20 1 20 1 17 2 17 2 16 3 16 3 15 4 15 4 14 11 14 11 15 10 15 10 16 4 16 4 17 3 17 3 19 11 19 11 20" />
      <path d="M22,15V13H21V12H19V11H16v1H14v1H13v2H12v3h1v2h1v1h2v1h3V21h2V20h1V18h1V15Zm-4,2v2H17V17H15V16h2V14h1v2h2v1Z" />
      <path d="M12,5V4H11V3H6V4H5V5H4v5H5v1H6v1h5V11h1V10h1V5ZM10,9v1H7V9H6V6H7V5h3V6h1V9Z" />
    </IconBase>
  );
}
export function UsersIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <path d="m19,18v-1h-1v-1h-2v-1h-8v1h-2v1h-1v1h-1v3h1v1h14v-1h1v-3h-1Zm-11,0v-1h8v1h2v2H6v-2h2Z" />
      <path d="m15,7v-1h-1v-1h-4v1h-1v1h-1v4h1v1h1v1h4v-1h1v-1h1v-4h-1Zm-5,4v-4h4v4h-4Z" />
      <polygon points="7 5 8 5 8 6 7 6 7 8 5 8 5 7 4 7 4 5 5 5 5 4 7 4 7 5" />
      <polygon points="7 12 8 12 8 13 2 13 2 12 1 12 1 10 2 10 2 9 7 9 7 12" />
      <polygon points="17 6 16 6 16 5 17 5 17 4 19 4 19 5 20 5 20 7 19 7 19 8 17 8 17 6" />
      <polygon points="23 10 23 12 22 12 22 13 16 13 16 12 17 12 17 9 22 9 22 10 23 10" />
    </IconBase>
  );
}
export function WalletIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="18 12 18 13 19 13 19 15 18 15 18 16 16 16 16 15 15 15 15 13 16 13 16 12 18 12" />
      <polygon points="23 8 23 21 22 21 22 22 2 22 2 21 1 21 1 3 2 3 2 2 21 2 21 3 22 3 22 4 3 4 3 20 21 20 21 9 5 9 5 7 22 7 22 8 23 8" />
    </IconBase>
  );
}
export function WarningIcon(props: IconProps): React.JSX.Element {
  return (
    <IconBase {...props}>
      <polygon points="14 11 14 14 13 14 13 17 11 17 11 14 10 14 10 11 14 11" />
      <rect x="11" y="18" width="2" height="2" />
      <path d="m22,20v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-2h-1v-1h-2v1h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h-1v2h1v1h20v-1h1v-2h-1Zm-19,1v-1h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h1v-2h2v2h1v2h1v2h1v2h1v2h1v2h1v2h1v2h1v1H3Z" />
    </IconBase>
  );
}

const SORT_UP_SOLID =
  '20 8 20 10 19 10 19 11 5 11 5 10 4 10 4 8 5 8 5 7 6 7 6 6 7 6 7 5 8 5 8 4 9 4 9 3 10 3 10 2 11 2 11 1 13 1 13 2 14 2 14 3 15 3 15 4 16 4 16 5 17 5 17 6 18 6 18 7 19 7 19 8 20 8';
const SORT_DOWN_SOLID =
  '20 14 20 16 19 16 19 17 18 17 18 18 17 18 17 19 16 19 16 20 15 20 15 21 14 21 14 22 13 22 13 23 11 23 11 22 10 22 10 21 9 21 9 20 8 20 8 19 7 19 7 18 6 18 6 17 5 17 5 16 4 16 4 14 5 14 5 13 19 13 19 14 20 14';
const SORT_UP_OUTLINE =
  'm19,8v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v2h1v1h14v-1h1v-2h-1Zm-2,1H7v-1h1v-1h1v-1h1v-1h1v-1h2v1h1v1h1v1h1v1h1v1Z';
const SORT_DOWN_OUTLINE =
  'm19,14v-1H5v1h-1v2h1v1h1v1h1v1h1v1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v-2h-1Zm-2,2h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h10v1Z';

// The library's `sort` (outline) and `sort-solid`; the active direction fills its half.
export function SortIcon({
  direction,
  ...props
}: IconProps & { direction?: 'ascending' | 'descending' }): React.JSX.Element {
  return (
    <IconBase {...props}>
      {direction === 'ascending' ? (
        <polygon points={SORT_UP_SOLID} />
      ) : (
        <path d={SORT_UP_OUTLINE} />
      )}
      {direction === 'descending' ? (
        <polygon points={SORT_DOWN_SOLID} />
      ) : (
        <path d={SORT_DOWN_OUTLINE} />
      )}
    </IconBase>
  );
}
