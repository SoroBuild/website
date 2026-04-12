import React, { useEffect, useMemo, useState } from "react";

const SOCIAL_LINKS = {
  github: {
    label: "GitHub",
    href: "https://github.com/sorobuild",
    enabled: true,
  },
  x: {
    label: "X / Twitter",
    href: "https://x.com/sorobuild",
    enabled: true,
  },
  telegram: {
    label: "Telegram",
    href: "https://t.me/sorobuild",
    enabled: true,
  },
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Stats", href: "/stats", active: true },
];

export default function PlatformStatsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const enabledSocials = useMemo(
    () =>
      Object.values(SOCIAL_LINKS).filter((item) => item.enabled && item.href),
    []
  );

  const overviewCards = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: "Total users",
        value: formatNumber(stats.overview.total_users),
        hint: `${formatNumber(
          stats.overview.active_users_30d
        )} active in 30 days`,
      },
      {
        label: "Total transactions",
        value: formatNumber(stats.overview.total_transactions),
        hint: `${formatNumber(
          stats.overview.active_users_7d
        )} active in 7 days`,
      },
      {
        label: "Most active user network",
        value: formatNetworkName(stats.overview.top_user_network?.name),
        hint: `${formatNumber(
          stats.overview.top_user_network?.value || 0
        )} users`,
      },
      {
        label: "Top transaction network",
        value: formatNetworkName(stats.overview.top_tx_network?.name),
        hint: `${formatNumber(
          stats.overview.top_tx_network?.value || 0
        )} transactions`,
      },
    ];
  }, [stats]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_35%)]" />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-10">
            <a
              href="/"
              className="text-lg gap-[6px] flex items-center font-semibold tracking-tight text-slate-950"
            >
              <img
                className="h-10 w-auto"
                src="/sorobuildIcon.svg"
                alt="SoroBuild"
              />
              <span className="mt-2">SoroBuild</span>
            </a>

            <nav className="hidden items-center gap-7 font-medium text-slate-700 md:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition ${
                    item.active ? "text-slate-950" : "hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://docs.soro.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition hover:text-slate-950"
              >
                Docs
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://studio.soro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex"
            >
              Use Dev Studio
            </a>

            <a
              href="https://ide.soro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 md:inline-flex"
            >
              Open Full IDE
            </a>
          </div>
        </div>
      </header>

      <output />

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="max-w-sm">
              <div className="text-lg font-semibold tracking-tight text-slate-950">
                SoroBuild
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Developer tooling for the Soroban and Stellar ecosystem —
                helping teams deploy faster, test smarter, and build with less
                friction.
              </p>

              {enabledSocials.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {enabledSocials.map((item) => (
                    <SocialIconLink
                      key={item.label}
                      href={item.href}
                      label={item.label}
                      icon={getSocialIcon(item.label)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <FooterLinkGroup
                title="Product"
                links={[
                  { label: "Studio", href: "https://studio.soro.build" },
                  { label: "IDE", href: "https://ide.soro.build" },
                ]}
              />
              <FooterLinkGroup
                title="Resources"
                links={[
                  { label: "Documentation", href: "https://docs.soro.build" },
                  { label: "Platform Stats", href: "/stats" },
                ]}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} SoroBuild. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="/#privacy" className="transition hover:text-slate-900">
                Privacy
              </a>
              <a href="/#terms" className="transition hover:text-slate-900">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[120px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
        />
      ))}
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
      <h3 className="text-lg font-semibold text-red-900">
        Could not load platform statistics
      </h3>
      <p className="mt-2 text-sm text-red-700">{error}</p>
    </div>
  );
}

function OverviewCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function StatBar({ label, value, total, percent, tone = "blue" }) {
  const barClass =
    tone === "dark"
      ? "bg-slate-950"
      : "bg-gradient-to-r from-blue-600 to-violet-600";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">
            {formatNumber(value)} of {formatNumber(total)}
          </p>
        </div>
        <p className="text-sm font-semibold text-slate-900">{percent}%</p>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${Math.min(percent || 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MiniMetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function FeatureSplitCard({ label, value, percent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="mt-1 text-xs text-slate-500">
            {formatNumber(value)} recorded uses
          </p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-950">
          {percent}%
        </div>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-slate-950"
          style={{ width: `${Math.min(percent || 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm text-slate-600 transition hover:text-slate-950"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIconLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
    >
      {icon}
    </a>
  );
}

function getSocialIcon(label) {
  const value = label.toLowerCase();

  if (value.includes("twitter") || value.includes("x")) return <XIcon />;
  if (value.includes("github")) return <GitHubIcon />;
  if (value.includes("telegram")) return <TelegramIcon />;
  return <GlobeIcon />;
}

function IconBase({ children, viewBox = "0 0 24 24" }) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} className="h-4 w-4 fill-current">
      {children}
    </svg>
  );
}

function XIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M18.901 2H21l-4.588 5.244L21.807 22h-4.225l-3.31-4.327L10.49 22H8.39l4.906-5.607L2.193 2h4.333l2.993 3.912L12.95 2h1.951L10.38 7.168l7.604 9.92h-1.972L8.56 7.34 5.52 10.82 11.09 18h.002l.205.267L18.9 2Z" />
    </IconBase>
  );
}

function GitHubIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.107.785-.25.785-.557 0-.274-.01-1-.016-1.963-3.197.695-3.873-1.54-3.873-1.54-.523-1.327-1.277-1.68-1.277-1.68-1.044-.714.08-.7.08-.7 1.155.081 1.763 1.187 1.763 1.187 1.027 1.76 2.695 1.252 3.352.957.104-.744.402-1.252.732-1.54-2.552-.29-5.236-1.276-5.236-5.68 0-1.255.448-2.282 1.184-3.086-.119-.29-.513-1.456.112-3.037 0 0 .966-.309 3.166 1.179a10.98 10.98 0 0 1 5.764 0c2.198-1.488 3.163-1.179 3.163-1.179.627 1.581.233 2.748.115 3.037.738.804 1.183 1.831 1.183 3.086 0 4.415-2.689 5.386-5.25 5.67.413.355.78 1.056.78 2.128 0 1.537-.014 2.776-.014 3.153 0 .31.207.67.79.556A11.503 11.503 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" />
    </IconBase>
  );
}

function TelegramIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M21.944 4.487c.29-.121.607.14.531.438l-3.36 13.143c-.115.451-.647.65-1.029.386l-4.312-2.973-2.2 2.123c-.25.24-.67.1-.722-.245l-.647-4.265L4.8 10.972c-.45-.17-.43-.815.03-.957l17.114-5.528ZM9.88 12.656l.49 3.23.11-1.062 7.19-6.97a.375.375 0 0 0-.43-.596l-8.56 5.398a.375.375 0 0 0-.17.38l.002.02.002.014.366 2.41Z" />
    </IconBase>
  );
}

function GlobeIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-3.02a15.77 15.77 0 0 0-1.19-5.01A8.03 8.03 0 0 1 18.93 11Zm-6.93 9c-.88 0-2.29-1.74-2.84-5h5.68c-.55 3.26-1.96 5-2.84 5Zm-3.06-7a13.93 13.93 0 0 1 0-2h6.12a13.93 13.93 0 0 1 0 2H8.94Zm.22-4c.55-3.26 1.96-5 2.84-5 .88 0 2.29 1.74 2.84 5H9.16ZM9.28 5.99A15.77 15.77 0 0 0 8.09 11H5.07a8.03 8.03 0 0 1 4.21-5.01ZM5.07 13h3.02c.2 1.8.62 3.5 1.19 5.01A8.03 8.03 0 0 1 5.07 13Zm9.65 5.01c.57-1.51.99-3.21 1.19-5.01h3.02a8.03 8.03 0 0 1-4.21 5.01Z" />
    </IconBase>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(Number(value || 0));
}

function formatNetworkName(name) {
  if (!name) return "—";
  if (name === "futurenet") return "Futurenet";
  if (name === "testnet") return "Testnet";
  if (name === "public") return "Public";
  if (name === "local") return "Local";
  return name;
}

function formatDateTime(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
