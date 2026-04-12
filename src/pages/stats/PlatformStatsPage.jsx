import React, { useEffect, useMemo, useState } from "react";
import { fetchPlatformStats } from "../../api/stats";

export default function PlatformStatsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchPlatformStats();

        if (!ignore) {
          setStats(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Could not load statistics.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      ignore = true;
    };
  }, []);

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

      <main>
        <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 md:pb-16 md:pt-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              Platform analytics
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              SoroBuild platform statistics
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              A live overview of platform usage across users, network activity,
              tooling adoption, and developer actions.
            </p>

            {stats?.overview?.last_updated_at && (
              <p className="mt-4 text-sm text-slate-500">
                Last updated {formatDateTime(stats.overview.last_updated_at)}
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((card) => (
                  <OverviewCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    hint={card.hint}
                  />
                ))}
              </div>

              <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
                <div className="space-y-8">
                  <SectionCard
                    title="User distribution by network"
                    subtitle="How platform users are distributed across supported networks."
                  >
                    <div className="space-y-5">
                      <StatBar
                        label="Public"
                        value={stats.users.public}
                        total={stats.users.total}
                        percent={stats.percentages.users.public}
                      />
                      <StatBar
                        label="Testnet"
                        value={stats.users.testnet}
                        total={stats.users.total}
                        percent={stats.percentages.users.testnet}
                      />
                      <StatBar
                        label="Local"
                        value={stats.users.local}
                        total={stats.users.total}
                        percent={stats.percentages.users.local}
                      />
                      <StatBar
                        label="Futurenet"
                        value={stats.users.futurenet}
                        total={stats.users.total}
                        percent={stats.percentages.users.futurenet}
                      />
                    </div>
                  </SectionCard>

                  <SectionCard
                    title="Transaction volume by network"
                    subtitle="Network-level transaction activity recorded by the platform."
                  >
                    <div className="space-y-5">
                      <StatBar
                        label="Public"
                        value={stats.tx.public}
                        total={stats.tx.total}
                        percent={stats.percentages.tx.public}
                        tone="dark"
                      />
                      <StatBar
                        label="Testnet"
                        value={stats.tx.testnet}
                        total={stats.tx.total}
                        percent={stats.percentages.tx.testnet}
                        tone="dark"
                      />
                      <StatBar
                        label="Local"
                        value={stats.tx.local}
                        total={stats.tx.total}
                        percent={stats.percentages.tx.local}
                        tone="dark"
                      />
                      <StatBar
                        label="Futurenet"
                        value={stats.tx.futurenet}
                        total={stats.tx.total}
                        percent={stats.percentages.tx.futurenet}
                        tone="dark"
                      />
                    </div>
                  </SectionCard>

                  <SectionCard
                    title="Developer actions"
                    subtitle="How builders are using the platform across contract and asset workflows."
                  >
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <MiniMetricCard
                        label="Deploy"
                        value={stats.action.deploy}
                      />
                      <MiniMetricCard
                        label="Invoke"
                        value={stats.action.invoke}
                      />
                      <MiniMetricCard label="Read" value={stats.action.read} />
                      <MiniMetricCard
                        label="Upload"
                        value={stats.action.upload}
                      />
                      <MiniMetricCard
                        label="Asset Ops"
                        value={stats.action.asset_ops}
                      />
                      <MiniMetricCard
                        label="Upgrade"
                        value={stats.action.upgrade}
                      />
                    </div>
                  </SectionCard>
                </div>

                <div className="space-y-8">
                  <SectionCard
                    title="Tool adoption"
                    subtitle="A quick look at how usage is split between Studio and IDE."
                  >
                    <div className="space-y-5">
                      <FeatureSplitCard
                        label="Studio usage"
                        value={stats.feature_used.studio}
                        percent={stats.percentages.feature_used.studio}
                      />
                      <FeatureSplitCard
                        label="IDE usage"
                        value={stats.feature_used.ide}
                        percent={stats.percentages.feature_used.ide}
                      />
                    </div>
                  </SectionCard>

                  <SectionCard
                    title="Activity summary"
                    subtitle="High-level signals that matter most for platform health."
                  >
                    <div className="space-y-4">
                      <SummaryRow
                        label="Registered users"
                        value={formatNumber(stats.overview.total_users)}
                      />
                      <SummaryRow
                        label="Transactions recorded"
                        value={formatNumber(stats.overview.total_transactions)}
                      />
                      <SummaryRow
                        label="Active users in 7 days"
                        value={formatNumber(stats.overview.active_users_7d)}
                      />
                      <SummaryRow
                        label="Active users in 30 days"
                        value={formatNumber(stats.overview.active_users_30d)}
                      />
                      <SummaryRow
                        label="Leading user network"
                        value={formatNetworkName(
                          stats.overview.top_user_network?.name
                        )}
                      />
                      <SummaryRow
                        label="Leading tx network"
                        value={formatNetworkName(
                          stats.overview.top_tx_network?.name
                        )}
                      />
                    </div>
                  </SectionCard>

                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      Build on SoroBuild
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Use Studio for no-code workflows or switch to the IDE for
                      a full Soroban development environment.
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href="https://studio.soro.build"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                      >
                        Open Dev Studio
                      </a>
                      <a
                        href="https://ide.soro.build"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                      >
                        Launch Full IDE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
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
