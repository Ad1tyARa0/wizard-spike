import type { MarqueeContent } from '../../shared/config';

interface MarqueeProps {
  content: MarqueeContent;
}

/**
 * First-class marquee section. Content array comes from the config
 * (`content.marquee.items`); direction + speed are config-driven too.
 *
 * Behavior: continuous loop, pauses on hover, and under
 * `prefers-reduced-motion` the animation is disabled (static, scrollable).
 * The track duplicates the group once and translates -50% for a seamless
 * loop; the duplicate is aria-hidden.
 */
export function Marquee({ content }: MarqueeProps) {
  const { items, direction, speed } = content;

  if (!items.length) {
    return null;
  }

  return (
    <section
      className="marquee"
      data-direction={direction}
      data-speed={speed}
      aria-label="Announcements"
    >
      <div className="marquee__track">
        <MarqueeGroup items={items} />
        <div className="marquee__group" aria-hidden="true">
          {items.map((item, index) => (
            <span className="marquee__item" key={`dup-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeGroup({ items }: { items: string[] }) {
  return (
    <div className="marquee__group">
      {items.map((item, index) => (
        <span className="marquee__item" key={`${index}-${item}`}>
          {item}
        </span>
      ))}
    </div>
  );
}
