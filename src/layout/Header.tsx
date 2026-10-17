import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
} from "react";
import { Link, NavLink } from "react-router-dom";
import { navItems, site } from "../content/site";

interface HeaderProps {
  menuId?: string;
}

function navId(to: string): string {
  return to === "/" ? "start" : to.replace(/^\//, "");
}

export function Header({ menuId = "mobile-navigation" }: HeaderProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 8);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsOpen(false);

    if (!restoreFocus) return;

    const lastFocused = lastFocusedRef.current;
    const target =
      lastFocused && document.contains(lastFocused)
        ? lastFocused
        : toggleRef.current;

    target?.focus();
  }, []);

  const openMenu = useCallback(() => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("menu-open");

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        )
      : [];

    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) closeMenu(false);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  return (
    <>
      <header
        className={`site-header${isScrolled ? " is-scrolled" : ""}`}
        data-site-header
        data-od-id="site-header"
      >
        <div className="container header-inner">
          <Link
            className="brand"
            to="/"
            aria-label="equicrew – Startseite"
            data-od-id="brand-home"
          >
            <img
              className="brand__mark"
              src="/favicon.svg"
              alt=""
              width={30}
              height={30}
            />
            <span className="brand__text">
              <span className="brand__name">equicrew</span>
              <span className="brand__tag">smarte energie</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className="nav-link"
                to={item.to}
                end={item.to === "/"}
                data-od-id={`nav-${navId(item.to)}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => {
              if (isOpen) {
                closeMenu(true);
              } else {
                openMenu();
              }
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div
        className={`menu-layer${isOpen ? " is-open" : ""}`}
        id={menuId}
        data-menu
        inert={!isOpen}
      >
        <button
          className="menu-scrim"
          type="button"
          tabIndex={-1}
          aria-label="Menü schließen"
          onClick={() => closeMenu(true)}
        />
        <div
          ref={panelRef}
          className="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
        >
          <div className="menu-panel__head">
            <Link
              className="brand"
              to="/"
              aria-label="equicrew – Startseite"
              onClick={() => closeMenu(false)}
            >
              <img
                className="brand__mark"
                src="/favicon.svg"
                alt=""
                width={30}
                height={30}
              />
              <span className="brand__text">
                <span className="brand__name">equicrew</span>
                <span className="brand__tag">smarte energie</span>
              </span>
            </Link>
            <button
              className="menu-close"
              type="button"
              aria-label="Menü schließen"
              onClick={() => closeMenu(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="menu-nav" aria-label="Mobile Hauptnavigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => closeMenu(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="menu-panel__foot">
            <p>{site.address}</p>
            <a href={site.phoneHref}>{site.phone}</a>
            <br />
            <a href={site.emailHref}>{site.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
