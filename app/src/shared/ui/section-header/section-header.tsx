import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRightIcon, type IconWeight } from '@phosphor-icons/react';

export interface SectionHeaderAction {
  label: string;
  to: string;
}

export interface SectionHeaderProps {
  /** `id` for the section `h2`, referenced by the section's `aria-labelledby`. */
  id?: string;
  /** Section ordinal (e.g. `02`), rendered in the accent kicker. */
  index: string;
  /** Optional kicker label beside the index (e.g. `Featured Collection`). */
  eyebrow?: string;
  title: string;
  /** Right-side meta count (e.g. `04 products`); may be a deferred node. */
  count?: ReactNode;
  /** Optional right-side link with an accent arrow. */
  action?: SectionHeaderAction;
  /** Icon-weight token for the arrow (e.g. `theme.tokens.icon.weight`). */
  iconWeight?: IconWeight;
}

/**
 * Structural section header shared by the home product bands (wireframe):
 * index kicker + display title on the left, count + action link on the right,
 * anchored by a 2px structure rule. Stacks on mobile, with the meta moved to a
 * dashed-top row.
 */
export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  count,
  action,
  iconWeight,
}: SectionHeaderProps) {
  const hasCount = count !== undefined && count !== null;
  const hasMeta = hasCount || (action !== undefined && action !== null);
  return (
    <header className="section-header">
      <div className="section-heading">
        <p className="section-kicker">
          <span className="section-index" aria-hidden="true">
            {index}
          </span>
          {eyebrow}
        </p>
        <h2 className="section-title" id={id}>
          {title}
        </h2>
      </div>
      {hasMeta && (
        <div className="section-actions">
          {hasCount && <span className="section-count">{count}</span>}
          {action && (
            <Link className="section-link" prefetch="intent" to={action.to}>
              <span>{action.label}</span>
              <ArrowRightIcon aria-hidden="true" weight={iconWeight} />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
