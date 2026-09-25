import axe from 'axe-core';
import { useState } from 'react';

import type { ReactNode } from 'react';

export function cssModuleClass(styles: Readonly<Record<string, string>>, name: string): string {
  const className = styles[name];
  if (!className) throw new Error(`CSS module is missing the ${name} class.`);
  return className;
}

/** Runs axe against `container` with color contrast disabled (jsdom has no layout). */
export async function axeVerify(container: HTMLElement): Promise<void> {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(results.violations).toEqual([]);
}

export interface PortalHostProps {
  children: ReactNode | ((container: HTMLDivElement | null) => ReactNode);
}

/** Render-prop host exposing a stable node for portal injection assertions. */
export function PortalHost({ children }: PortalHostProps): React.JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return (
    <div>
      <div data-testid="portal-host" ref={setContainer} />
      {typeof children === 'function' ? children(container) : children}
    </div>
  );
}
