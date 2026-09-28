import { cx } from '../ui';
import Img from '../ui/Img';

export interface LogoItem {
  id: string;
  name: string;
  image: string;
  website?: string;
}

/**
 * Logo grid. Each logo sits on a light tile (logos are uploaded in their own
 * colors and may be unreadable directly on charcoal), height-normalised to 48px
 * inside a fixed-height tile so nothing shifts as images load.
 */
const LogoGrid = ({ items, tileClassName }: { items: LogoItem[]; tileClassName: string }) => (
  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    {items.map((item) => {
      const tile = (
        <span className={cx('flex h-28 w-full items-center justify-center rounded-card px-6', tileClassName)}>
          <Img
            src={item.image}
            alt={item.name}
            width={160}
            height={48}
            widths={[160, 320, 480]}
            sizes="160px"
            className="h-12 w-40 max-w-full object-contain"
          />
        </span>
      );
      return (
        <li key={item.id}>
          {item.website && item.website.trim() !== '' ? (
            <a href={item.website} target="_blank" rel="noopener noreferrer" className="block rounded-card">
              {tile}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            tile
          )}
        </li>
      );
    })}
  </ul>
);

export default LogoGrid;
