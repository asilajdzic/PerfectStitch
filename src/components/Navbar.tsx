import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home", end: true, showIcon: false },
  { to: "/about", label: "About", end: false, showIcon: false },
  { to: "/cart", label: "Cart", end: true, showIcon: true },
] as const;

const CartIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6h15l-1.5 9h-12L6 6Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {open ? (
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    ) : (
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    )}
  </svg>
);

const getLinkClassName = (
  isActive: boolean,
  variant: "desktop" | "mobile" = "desktop",
) => {
  const size =
    variant === "desktop" ? "px-3 py-2 text-sm" : "px-3 py-3 text-base";

  return [
    "inline-flex items-center gap-1.5 rounded-md font-medium transition-colors duration-200",
    size,
    isActive
      ? "bg-secondary/20 text-accent"
      : "text-neutral-light/90 hover:bg-secondary/15 hover:text-secondary",
  ].join(" ");
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-primary text-neutral-light shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          className="rounded-md text-lg font-semibold tracking-tight transition-opacity hover:opacity-90"
          to="/"
          onClick={closeMenu}
        >
          Perfect<span className="text-accent">Stitch</span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, end, showIcon }) => (
            <li key={to}>
              <NavLink
                className={({ isActive }) =>
                  getLinkClassName(isActive, "desktop")
                }
                end={end}
                to={to}
              >
                {showIcon && (
                  <CartIcon className="h-5 w-5 shrink-0 transition-colors duration-200" />
                )}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-neutral-light transition-colors hover:bg-secondary/20 hover:text-secondary md:hidden"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-neutral-light/10 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map(({ to, label, end, showIcon }) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    getLinkClassName(isActive, "mobile")
                  }
                  end={end}
                  to={to}
                  onClick={closeMenu}
                >
                  {showIcon && (
                    <CartIcon className="h-5 w-5 shrink-0 transition-colors duration-200" />
                  )}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
