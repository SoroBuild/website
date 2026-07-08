import React, { useEffect, useMemo, useState } from "react";

const PLATFORM_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://server.soro.build";

const FLOW_BASE_URL =
  import.meta.env.VITE_FLOW_BASE_URL || "https://flow-api.soro.build";

const PLATFORM_STATS_PATH =
  import.meta.env.VITE_PLATFORM_STATS_PATH || "/api/stats/platform";

const FLOW_STATS_PATH =
  import.meta.env.VITE_FLOW_STATS_PATH || "/api/stats/flow";

export default function PlatformStatsPage() {
  const [platformStats, setPlatformStats] = useState(null);
  const [flowStats, setFlowStats] = useState(null);
  const [status, setStatus] = useState({
    platform: "idle",
    flow: "idle",
  });
  const [errors, setErrors] = useState({
    platform: "",
    flow: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      setIsLoading(true);
      setStatus({ platform: "loading", flow: "loading" });
      setErrors({ platform: "", flow: "" });

      const [platformResult, flowResult] = await Promise.allSettled([
        fetchPlatformStats(),
        fetchFlowStats(),
      ]);

      if (ignore) return;

      if (platformResult.status === "fulfilled") {
        setPlatformStats(normalizePlatformStats(platformResult.value));
        setStatus((current) => ({ ...current, platform: "ready" }));
      } else {
        console.error("Platform stats failed:", platformResult.reason);
        setStatus((current) => ({ ...current, platform: "error" }));
        setErrors((current) => ({
          ...current,
          platform:
            platformResult.reason?.message ||
            "Could not load platform statistics.",
        }));
      }

      if (flowResult.status === "fulfilled") {
        setFlowStats(normalizeFlowStats(flowResult.value));
        setStatus((current) => ({ ...current, flow: "ready" }));
      } else {
        console.error("Flow stats failed:", flowResult.reason);
        setStatus((current) => ({ ...current, flow: "error" }));
        setErrors((current) => ({
          ...current,
          flow: flowResult.reason?.message || "Could not load Flow statistics.",
        }));
      }

      setIsLoading(false);
    }

    loadStats();

    return () => {
      ignore = true;
    };
  }, []);

  const hasAnyData = Boolean(platformStats || flowStats);
  const lastUpdated = getMostRecentDate([
    platformStats?.overview?.last_updated_at,
    platformStats?.updatedAt,
    flowStats?.lastUpdated,
    flowStats?.updatedAt,
  ]);

  const overviewCards = useMemo(() => {
    return [
      {
        label: "Flow workflows",
        value: formatNumber(flowStats?.workflows?.created),
        hint: `${formatNumber(flowStats?.workflows?.downloaded)} downloaded`,
        unavailable: !flowStats,
      },
      {
        label: "Flow users",
        value: formatNumber(flowStats?.users?.total),
        hint: `${formatNumber(flowStats?.users?.active_30d)} active in 30 days`,
        unavailable: !flowStats,
      },
      {
        label: "IDE/Studio users",
        value: formatNumber(platformStats?.overview?.total_users),
        hint: `${formatNumber(
          platformStats?.overview?.active_users_30d
        )} active in 30 days`,
        unavailable: !platformStats,
      },
      {
        label: "IDE/Studio transactions",
        value: formatNumber(platformStats?.overview?.total_transactions),
        hint: `${formatNumber(
          platformStats?.overview?.active_users_7d
        )} active in 7 days`,
        unavailable: !platformStats,
      },
    ];
  }, [platformStats, flowStats]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_35%)]" />

      <main>
        <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 ">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              SoroBuild platform statistics
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              A live overview of platform usage across users, network activity,
              workflow generation, tooling adoption, and developer actions.
            </p>

            {lastUpdated ? (
              <p className="mt-4 text-sm text-slate-500">
                Last updated {formatDateTime(lastUpdated)}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusPill
                label="Platform API"
                status={status.platform}
                error={errors.platform}
              />
              <StatusPill
                label="Flow API"
                status={status.flow}
                error={errors.flow}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          {isLoading ? (
            <LoadingState />
          ) : !hasAnyData ? (
            <ErrorState
              error={
                errors.platform ||
                errors.flow ||
                "Could not load platform or Flow statistics."
              }
            />
          ) : (
            <div className="space-y-8">
              {(errors.platform || errors.flow) && (
                <PartialErrorNotice errors={errors} />
              )}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((card) => (
                  <OverviewCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    hint={card.hint}
                    unavailable={card.unavailable}
                  />
                ))}
              </div>

              <div className="space-y-8">
                <FlowStatsBlock flowStats={flowStats} />
                <IdeStudioStatsBlock platformStats={platformStats} />
              </div>

              {/* <ActivitySummaryBlock
                platformStats={platformStats}
                flowStats={flowStats}
              /> */}

              <BuildOnSorobuildCard />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

async function fetchPlatformStats() {
  const url = buildUrl(PLATFORM_BASE_URL, PLATFORM_STATS_PATH);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Platform statistics failed: ${response.status}`);
  }

  return response.json();
}

async function fetchFlowStats() {
  const url = buildUrl(FLOW_BASE_URL, FLOW_STATS_PATH);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Flow statistics failed: ${response.status}`);
  }

  return response.json();
}

function normalizePlatformStats(payload) {
  if (!payload) return null;

  const raw = payload.stats || payload.data || payload;

  const users = normalizeNetworkCount(raw.users);
  const tx = normalizeNetworkCount(raw.tx || raw.transactions);
  const featureUsed = raw.feature_used || raw.featureUsed || {};
  const action = raw.action || raw.actions || {};
  const overview = raw.overview || buildPlatformOverview(raw, users, tx);
  const percentages =
    raw.percentages ||
    buildPlatformPercentages({
      users,
      tx,
      feature_used: featureUsed,
    });

  return {
    ...raw,
    users,
    tx,
    feature_used: {
      studio: Number(featureUsed.studio || 0),
      ide: Number(featureUsed.ide || 0),
      flow: Number(featureUsed.flow || 0),
    },
    action: {
      deploy: Number(action.deploy || 0),
      invoke: Number(action.invoke || 0),
      read: Number(action.read || 0),
      upload: Number(action.upload || 0),
      asset_ops: Number(action.asset_ops || action.assetOps || 0),
      upgrade: Number(action.upgrade || 0),
    },
    overview: {
      total_users: Number(overview.total_users || overview.totalUsers || 0),
      total_transactions: Number(
        overview.total_transactions || overview.totalTransactions || 0
      ),
      active_users_7d: Number(
        overview.active_users_7d || overview.activeUsers7d || 0
      ),
      active_users_30d: Number(
        overview.active_users_30d || overview.activeUsers30d || 0
      ),
      top_user_network:
        overview.top_user_network || getTopNetwork(users, "users"),
      top_tx_network: overview.top_tx_network || getTopNetwork(tx, "tx"),
      last_updated_at:
        overview.last_updated_at ||
        overview.lastUpdatedAt ||
        payload.lastUpdated ||
        raw.updatedAt ||
        null,
    },
    percentages,
    updatedAt: raw.updatedAt || payload.lastUpdated || null,
  };
}

function normalizeFlowStats(payload) {
  if (!payload) return null;

  if (payload.enabled === false) {
    return {
      enabled: false,
      users: {},
      workflows: {},
      files: {},
      generated: {},
      actions: {},
      lastUpdated: payload.lastUpdated || null,
    };
  }

  const stats = payload.stats || payload.data || payload;

  return {
    enabled: true,
    users: {
      total: Number(payload.users?.total ?? stats.users?.total ?? 0),
      active_7d: Number(
        payload.users?.active_7d ?? stats.users?.active_7d ?? 0
      ),
      active_30d: Number(
        payload.users?.active_30d ?? stats.users?.active_30d ?? 0
      ),
    },
    workflows: {
      created: Number(stats.workflows?.created || 0),
      downloaded: Number(stats.workflows?.downloaded || 0),
      failed: Number(stats.workflows?.failed || 0),
    },
    files: {
      wasm_uploaded: Number(stats.files?.wasm_uploaded || 0),
      zip_uploaded: Number(stats.files?.zip_uploaded || 0),
    },
    generated: {
      deploy_scripts: Number(stats.generated?.deploy_scripts || 0),
      invoke_scripts: Number(stats.generated?.invoke_scripts || 0),
      total_scripts: Number(stats.generated?.total_scripts || 0),
      functions_detected: Number(stats.generated?.functions_detected || 0),
    },
    actions: {
      generate: Number(stats.actions?.generate || 0),
      download: Number(stats.actions?.download || 0),
    },
    createdAt: stats.createdAt || null,
    updatedAt: stats.updatedAt || null,
    lastUpdated: payload.lastUpdated || stats.updatedAt || null,
  };
}

function FlowStatsBlock({ flowStats }) {
  if (!flowStats) {
    return (
      <SectionCard
        eyebrow="Flow stats"
        title="SoroBuild Flow"
        subtitle="Workflow generation metrics from the Flow API."
      >
        <EmptyMetricState text="Flow statistics are unavailable." />
      </SectionCard>
    );
  }

  if (flowStats.enabled === false) {
    return (
      <SectionCard
        eyebrow="Flow stats"
        title="SoroBuild Flow"
        subtitle="Workflow generation metrics from the Flow API."
      >
        <EmptyMetricState text="Flow statistics are disabled on the Flow API." />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      eyebrow="Flow stats"
      title="SoroBuild Flow"
      subtitle="Generated workflows, downloads, uploaded WASM files, detected functions, and generated scripts."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MiniMetricCard
          label="Workflows created"
          value={flowStats.workflows.created}
        />
        <MiniMetricCard
          label="Workflow downloads"
          value={flowStats.workflows.downloaded}
        />
        <MiniMetricCard
          label="Failed generations"
          value={flowStats.workflows.failed}
        />
        <MiniMetricCard
          label="WASM uploads"
          value={flowStats.files.wasm_uploaded}
        />
        <MiniMetricCard
          label="Deploy scripts"
          value={flowStats.generated.deploy_scripts}
        />
        <MiniMetricCard
          label="Invoke scripts"
          value={flowStats.generated.invoke_scripts}
        />
        <MiniMetricCard
          label="Functions detected"
          value={flowStats.generated.functions_detected}
        />
        <MiniMetricCard
          label="Total scripts"
          value={flowStats.generated.total_scripts}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryPanel
          label="Flow users"
          value={formatNumber(flowStats.users.total)}
          hint={`${formatNumber(flowStats.users.active_30d)} active in 30 days`}
        />
        <SummaryPanel
          label="Active 7d"
          value={formatNumber(flowStats.users.active_7d)}
          hint="Recent Flow users"
        />
        <SummaryPanel
          label="Actions"
          value={`${formatNumber(flowStats.actions.generate)} / ${formatNumber(
            flowStats.actions.download
          )}`}
          hint="Generate / download"
        />
      </div>
    </SectionCard>
  );
}

function IdeStudioStatsBlock({ platformStats }) {
  if (!platformStats) {
    return (
      <SectionCard
        eyebrow="IDE / Studio stats"
        title="SoroBuild IDE / Studio"
        subtitle="Platform usage metrics from the main SoroBuild API."
      >
        <EmptyMetricState text="IDE and Studio statistics are unavailable." />
      </SectionCard>
    );
  }

  const studio = platformStats.feature_used.studio;
  const ide = platformStats.feature_used.ide;
  const totalTools = studio + ide;

  return (
    <SectionCard
      eyebrow="IDE / Studio stats"
      title="SoroBuild IDE / Studio"
      subtitle="Users, transactions, network distribution, tool adoption, and developer actions."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniMetricCard
          label="Total users"
          value={platformStats.overview.total_users}
        />
        <MiniMetricCard
          label="Transactions"
          value={platformStats.overview.total_transactions}
        />
        <MiniMetricCard
          label="Active users 7d"
          value={platformStats.overview.active_users_7d}
        />
        <MiniMetricCard
          label="Active users 30d"
          value={platformStats.overview.active_users_30d}
        />
      </div>

      <div className="mt-6 space-y-5">
        <FeatureSplitCard
          label="Studio usage"
          value={studio}
          percent={percentOf(studio, totalTools)}
        />
        <FeatureSplitCard
          label="IDE usage"
          value={ide}
          percent={percentOf(ide, totalTools)}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SummaryPanel
          label="Top user network"
          value={formatNetworkName(
            platformStats.overview.top_user_network?.name
          )}
          hint={`${formatNumber(
            platformStats.overview.top_user_network?.value
          )} users`}
        />
        <SummaryPanel
          label="Top tx network"
          value={formatNetworkName(platformStats.overview.top_tx_network?.name)}
          hint={`${formatNumber(
            platformStats.overview.top_tx_network?.value
          )} transactions`}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-950">
            Users by network
          </h3>
          <div className="space-y-4">
            <StatBar
              label="Public"
              value={platformStats.users.public}
              total={platformStats.users.total}
              percent={platformStats.percentages.users.public}
            />
            <StatBar
              label="Testnet"
              value={platformStats.users.testnet}
              total={platformStats.users.total}
              percent={platformStats.percentages.users.testnet}
            />
            <StatBar
              label="Local"
              value={platformStats.users.local}
              total={platformStats.users.total}
              percent={platformStats.percentages.users.local}
            />
            <StatBar
              label="Futurenet"
              value={platformStats.users.futurenet}
              total={platformStats.users.total}
              percent={platformStats.percentages.users.futurenet}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-950">
            Transactions by network
          </h3>
          <div className="space-y-4">
            <StatBar
              label="Public"
              value={platformStats.tx.public}
              total={platformStats.tx.total}
              percent={platformStats.percentages.tx.public}
              tone="dark"
            />
            <StatBar
              label="Testnet"
              value={platformStats.tx.testnet}
              total={platformStats.tx.total}
              percent={platformStats.percentages.tx.testnet}
              tone="dark"
            />
            <StatBar
              label="Local"
              value={platformStats.tx.local}
              total={platformStats.tx.total}
              percent={platformStats.percentages.tx.local}
              tone="dark"
            />
            <StatBar
              label="Futurenet"
              value={platformStats.tx.futurenet}
              total={platformStats.tx.total}
              percent={platformStats.percentages.tx.futurenet}
              tone="dark"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-sm font-semibold text-slate-950">
          Developer actions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MiniMetricCard label="Deploy" value={platformStats.action.deploy} />
          <MiniMetricCard label="Invoke" value={platformStats.action.invoke} />
          <MiniMetricCard label="Read" value={platformStats.action.read} />
          <MiniMetricCard label="Upload" value={platformStats.action.upload} />
          <MiniMetricCard
            label="Asset Ops"
            value={platformStats.action.asset_ops}
          />
          <MiniMetricCard
            label="Upgrade"
            value={platformStats.action.upgrade}
          />
        </div>
      </div>
    </SectionCard>
  );
}

function ActivitySummaryBlock({ platformStats, flowStats }) {
  return (
    <SectionCard
      eyebrow="Summary"
      title="Activity summary"
      subtitle="A quick combined view of SoroBuild platform and Flow activity."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryRow
          label="Registered users"
          value={formatNumber(platformStats?.overview?.total_users)}
        />
        <SummaryRow
          label="Transactions recorded"
          value={formatNumber(platformStats?.overview?.total_transactions)}
        />
        <SummaryRow
          label="Flow workflows"
          value={formatNumber(flowStats?.workflows?.created)}
        />
        <SummaryRow
          label="Flow downloads"
          value={formatNumber(flowStats?.workflows?.downloaded)}
        />
        <SummaryRow
          label="Flow functions detected"
          value={formatNumber(flowStats?.generated?.functions_detected)}
        />
        <SummaryRow
          label="Flow scripts generated"
          value={formatNumber(flowStats?.generated?.total_scripts)}
        />
        <SummaryRow
          label="Leading user network"
          value={formatNetworkName(
            platformStats?.overview?.top_user_network?.name
          )}
        />
        <SummaryRow
          label="Leading tx network"
          value={formatNetworkName(
            platformStats?.overview?.top_tx_network?.name
          )}
        />
      </div>
    </SectionCard>
  );
}

function BuildOnSorobuildCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            Build on SoroBuild
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Use Studio for no-code workflows, Flow for executable Soroban
            workflow generation, or switch to the IDE for a full development
            environment.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="https://studio.soro.build"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
          >
            Open Dev Studio
          </a>
          <a
            href="https://flow.soro.build"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Open SoroBuild Flow
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
  );
}

function LoadingState() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[120px] animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
          />
        ))}
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        <div className="min-h-[620px] animate-pulse rounded-3xl border border-slate-200 bg-slate-50" />
        <div className="min-h-[620px] animate-pulse rounded-3xl border border-slate-200 bg-slate-50" />
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
      <h3 className="text-lg font-semibold text-red-900">
        Could not load statistics
      </h3>
      <p className="mt-2 text-sm text-red-700">{error}</p>
    </div>
  );
}

function PartialErrorNotice({ errors }) {
  const visibleErrors = [errors.platform, errors.flow].filter(Boolean);
  if (!visibleErrors.length) return null;

  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-semibold">Some statistics could not be loaded.</p>
      <div className="mt-2 space-y-1">
        {visibleErrors.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}

function EmptyMetricState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
      {text}
    </div>
  );
}

function StatusPill({ label, status, error }) {
  const config =
    status === "ready"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "error"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : status === "loading"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-slate-200 bg-slate-50 text-slate-600";

  const text =
    status === "ready"
      ? "Connected"
      : status === "error"
      ? "Unavailable"
      : status === "loading"
      ? "Loading"
      : "Idle";

  return (
    <span
      title={error || ""}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${config}`}
    >
      <span>{label}</span>
      <span>•</span>
      <span>{text}</span>
    </span>
  );
}

function OverviewCard({ label, value, hint, unavailable }) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        unavailable
          ? "border-slate-200 bg-slate-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {unavailable ? "—" : value}
      </p>
      <p className="mt-2 text-sm text-slate-600">
        {unavailable ? "Unavailable" : hint}
      </p>
    </div>
  );
}

function SectionCard({ eyebrow, title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
      <div className="mb-6">
        {eyebrow ? (
          <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function SummaryPanel({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function StatBar({ label, value, total, percent, tone = "blue" }) {
  const safePercent = Number.isFinite(Number(percent))
    ? Number(percent)
    : percentOf(value, total);

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
        <p className="text-sm font-semibold text-slate-900">
          {formatPercent(safePercent)}%
        </p>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${Math.min(safePercent || 0, 100)}%` }}
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
  const safePercent = Number(percent || 0);

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
          {formatPercent(safePercent)}%
        </div>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-slate-950"
          style={{ width: `${Math.min(safePercent, 100)}%` }}
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

function buildUrl(baseUrl, path) {
  return `${trimSlash(baseUrl)}${path.startsWith("/") ? path : `/${path}`}`;
}

function trimSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

function normalizeNetworkCount(value = {}) {
  return {
    public: Number(value.public || 0),
    testnet: Number(value.testnet || 0),
    local: Number(value.local || 0),
    futurenet: Number(value.futurenet || 0),
    total: Number(
      value.total ||
        Number(value.public || 0) +
          Number(value.testnet || 0) +
          Number(value.local || 0) +
          Number(value.futurenet || 0)
    ),
  };
}

function buildPlatformOverview(raw, users, tx) {
  return {
    total_users: users.total,
    total_transactions: tx.total,
    active_users_7d: raw.active_users_7d || raw.activeUsers7d || 0,
    active_users_30d: raw.active_users_30d || raw.activeUsers30d || 0,
    top_user_network: getTopNetwork(users, "users"),
    top_tx_network: getTopNetwork(tx, "transactions"),
    last_updated_at: raw.updatedAt || raw.createdAt || null,
  };
}

function buildPlatformPercentages({ users, tx, feature_used }) {
  const featureTotal =
    Number(feature_used.studio || 0) +
    Number(feature_used.ide || 0) +
    Number(feature_used.flow || 0);

  return {
    users: {
      public: percentOf(users.public, users.total),
      testnet: percentOf(users.testnet, users.total),
      local: percentOf(users.local, users.total),
      futurenet: percentOf(users.futurenet, users.total),
    },
    tx: {
      public: percentOf(tx.public, tx.total),
      testnet: percentOf(tx.testnet, tx.total),
      local: percentOf(tx.local, tx.total),
      futurenet: percentOf(tx.futurenet, tx.total),
    },
    feature_used: {
      studio: percentOf(feature_used.studio, featureTotal),
      ide: percentOf(feature_used.ide, featureTotal),
      flow: percentOf(feature_used.flow, featureTotal),
    },
  };
}

function getTopNetwork(counts, fallbackLabel = "items") {
  const entries = ["public", "testnet", "local", "futurenet"].map((name) => ({
    name,
    value: Number(counts?.[name] || 0),
  }));

  const top = entries.sort((a, b) => b.value - a.value)[0];

  return top || { name: fallbackLabel, value: 0 };
}

function percentOf(value, total) {
  const v = Number(value || 0);
  const t = Number(total || 0);
  if (!t) return 0;
  return Number(((v / t) * 100).toFixed(1));
}

function formatPercent(value) {
  const number = Number(value || 0);
  if (Number.isInteger(number)) return String(number);
  return number.toFixed(1);
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

function getMostRecentDate(values) {
  const timestamps = values
    .filter(Boolean)
    .map((value) => new Date(value).getTime())
    .filter((value) => Number.isFinite(value));

  if (!timestamps.length) return null;

  return new Date(Math.max(...timestamps)).toISOString();
}
