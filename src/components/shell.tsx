import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cartCount, useCart } from "@/lib/cart";
import { MEMBER_OFF } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand";
import { Button } from "./ui/button";

const NAV = [
  { to: "/build", label: "Build" },
  { to: "/parts", label: "Parts" },
  { to: "/drops", label: "Drops" },
  { to: "/gallery", label: "Gallery" },
  { to: "/hold", label: "How it holds up" },
  { to: "/about", label: "About" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = useCart((s) => s.items);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const count = ready ? cartCount(items) : 0;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-fg"
            aria-label="Plas/Tick home"
          >
            <BrandMark className="text-2xl" />
          </Link>
          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-150",
                  pathname === item.to
                    ? "text-fg"
                    : "text-fg/70 hover:text-fg",
                )}
              >
                {item.label}
                {pathname === item.to ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-fg" />
                ) : null}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <AuthSlot />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/build">Build yours</Link>
            </Button>
            <Link
              to="/cart"
              className="relative inline-flex size-11 items-center justify-center rounded-md border border-border text-fg hover:border-fg hover:bg-elevated"
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" strokeWidth={1.75} />
              {count > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-primary px-1 text-center font-mono text-[11px] leading-5 text-primary-foreground tabular-nums">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-fg bg-fg px-3 text-sm font-medium tracking-wide text-bg lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-4" strokeWidth={2} />
              ) : (
                <Menu className="size-4" strokeWidth={2} />
              )}
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-border bg-surface px-4 py-5 lg:hidden">
            <p className="mb-3 text-[11px] tracking-[0.2em] text-muted uppercase">
              Menu
            </p>
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-14 items-center rounded-md px-3 font-display text-2xl tracking-tight",
                    pathname === item.to
                      ? "bg-elevated text-fg"
                      : "text-fg/80 hover:bg-elevated hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-4 h-12">
                <Link to="/build">Build yours</Link>
              </Button>
              <SignedOut>
                <Button asChild variant="outline" className="h-12">
                  <Link to="/login" search={{ next: "/cart" }}>
                    Sign in · {MEMBER_OFF}% off
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="px-3 py-2">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        ) : null}
      </header>
      <main className="min-w-0 flex-1">{children}</main>
      <footer
        className={cn(
          "border-t border-border",
          pathname === "/build" && "hidden lg:block",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <BrandMark className="block text-3xl" />
            <p className="mt-2 max-w-xs text-sm text-muted">
              Modular resin tanks. Durable snappable parts. Mix any shell,
              any color. Extra parts sold separately on purpose.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <Link to="/build" className="hover:text-fg">
              Build
            </Link>
            <Link to="/parts" className="hover:text-fg">
              Parts
            </Link>
            <Link to="/drops" className="hover:text-fg">
              Drops
            </Link>
            <Link to="/support" className="hover:text-fg">
              Support
            </Link>
            <Link to="/about" className="hover:text-fg">
              About
            </Link>
            <Link to="/login" className="hover:text-fg">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="hidden h-9 w-24 animate-pulse rounded-md bg-elevated sm:block" />
    );
  }
  if (user) {
    return (
      <div className="hidden max-w-[10rem] truncate sm:flex">
        <UserButton />
      </div>
    );
  }
  return (
    <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
      <Link to="/login" search={{ next: "/cart" }}>
        Sign in · {MEMBER_OFF}% off
      </Link>
    </Button>
  );
}
