import type { MouseEventHandler, ReactNode } from "react";

type Props = {
  /** In-app route, e.g. "/about" or "/services/ged-exam-help". */
  to: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Optional side effect (e.g. analytics) — runs in addition to navigation. */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * A real anchor for in-app navigation.
 *
 * Previously every navigation was a <button onClick={navigate}>. Buttons are
 * not links: they can't be opened in a new tab, middle-clicked, copied,
 * bookmarked, or discovered by crawlers, and screen readers don't announce
 * them as navigation.
 *
 * Because the app uses hash routing ("#/about") and listens for `hashchange`,
 * a plain <a href> performs the navigation natively — no JS router required.
 */
export default function Link({ to, children, className, onClick, ...rest }: Props) {
  return (
    <a href={`#${to}`} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
