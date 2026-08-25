import { cn } from '../../../lib/cn';
import { StatusText } from '../../atoms/status_text';

import type { StatusTextProps } from '../../atoms/status_text';

export interface OverviewPanelStat {
  description?: string;
  id: string;
  label: string;
  value: string;
}
export interface OverviewPanelProps {
  className?: string;
  description?: string;
  loading?: boolean;
  stats: OverviewPanelStat[];
  status?: { label: string; tone?: StatusTextProps['tone'] };
  title: string;
}

export function OverviewPanel({
  className,
  description,
  loading = false,
  stats,
  status,
  title,
}: OverviewPanelProps): React.JSX.Element {
  return (
    <section aria-busy={loading || undefined} className={cn('ming-overview-panel', className)}>
      <header>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {status ? <StatusText label={status.label} tone={status.tone} /> : null}
      </header>
      <dl>
        {stats.map((stat) => (
          <div key={stat.id}>
            <dt>{stat.label}</dt>
            <dd>{loading ? '—' : stat.value}</dd>
            {stat.description ? <small>{stat.description}</small> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
