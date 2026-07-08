import React from "react";

export default function SoroBuildLanding() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.13),transparent_34%),linear-gradient(to_bottom,rgba(248,250,252,1),rgba(255,255,255,0))]" />

      <HeroSection />
      <LogoStrip />
      <ProductSuite />
      <FlowSection />
      <FeatureSection />
      <WorkflowSection />
      <StatsSection />
      <FinalCta />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Soroban developer tooling for faster shipping
        </div>

        <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl md:leading-[0.98]">
          Build, test, and automate
          <span className="block bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 bg-clip-text text-transparent">
            Soroban workflows
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-8 text-slate-600 md:text-xl">
          SoroBuild is a premium developer platform for Soroban builders. Use
          Studio for no-code contract workflows, Flow to generate executable
          deployment scripts, and the IDE for full smart contract development.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryLink href="https://flow.soro.build">
            Open SoroBuild Flow
          </PrimaryLink>
          <SecondaryLink href="https://ide.soro.build">
            Launch IDE
          </SecondaryLink>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <HeroMetric label="Tools" value="3" hint="Studio, Flow, IDE" />
          <HeroMetric
            label="Networks"
            value="4"
            hint="Public, Testnet, Local"
          />
          <HeroMetric label="Focus" value="Soroban" hint="Built for Stellar" />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-2 shadow-[0_40px_120px_rgba(15,23,42,0.22)]">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  SoroBuild Platform
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">
                  Developer workflow command center
                </h2>
              </div>
              <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 sm:block">
                Live tooling
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    Generated Flow
                  </p>
                  <p className="text-xs text-slate-400">flow.selected.sh</p>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <CodeLine text="1  ./scripts/deploy.sh" />
                  <CodeLine text="2  ./scripts/invoke/initialize.sh" />
                  <CodeLine text="3  ./scripts/invoke/add_validator.sh" />
                  <CodeLine text="4  ./scripts/invoke/propose_upgrade.sh" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <DashboardTile label="WASM upload" value="Inspect" />
                <DashboardTile label="Scripts" value="Generate" />
                <DashboardTile label="Arguments" value="Configure" />
                <DashboardTile label="Workflow" value="Download" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
        <span>Built for serious Soroban builders and ecosystem teams.</span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Pill>Contract deployment</Pill>
          <Pill>Workflow automation</Pill>
          <Pill>Simulation</Pill>
          <Pill>IDE tooling</Pill>
        </div>
      </div>
    </section>
  );
}

function ProductSuite() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Product suite"
        title="One platform. Three focused tools."
        description="Each SoroBuild product solves a different part of the Soroban developer workflow while staying connected under one ecosystem."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <ProductCard
          title="SoroBuild Studio"
          eyebrow="No-code developer studio"
          description="Deploy, manage, and interact with contracts through a clean visual interface without repetitive setup."
          href="https://studio.soro.build"
          cta="Open Studio"
          features={[
            "One-click deployment",
            "Visual contract interaction",
            "Token and asset workflows",
            "Pre-execution simulation",
          ]}
        />
        <ProductCard
          title="SoroBuild Flow"
          eyebrow="Workflow automation"
          description="Upload a compiled WASM and generate portable deploy, invoke, env, and argument scripts you can run locally."
          href="https://flow.soro.build"
          cta="Open Flow"
          featured
          features={[
            "WASM inspection",
            "Executable shell workflows",
            "Editable env and arguments",
            "Downloadable workflow ZIPs",
          ]}
        />
        <ProductCard
          title="SoroBuild IDE"
          eyebrow="Full browser IDE"
          description="Write, test, simulate, debug, and manage Soroban projects from a structured online development environment."
          href="https://ide.soro.build"
          cta="Launch IDE"
          features={[
            "Multi-file Rust projects",
            "Integrated simulation",
            "Execution logs",
            "Wallet and network support",
          ]}
        />
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.2),transparent_32%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300">
            New: SoroBuild Flow
          </div>

          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl md:leading-tight">
            Generate complete Soroban workflows from a WASM file.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            Flow saves time after contract development by generating deployment,
            invocation, environment, and argument scripts automatically. Edit
            the workflow, download it, and run it locally with your own keys.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://flow.soro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Try Flow
            </a>
            <a
              href="https://github.com/SoroBuild/sorobuild-flow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View GitHub
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur">
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs text-slate-400">Generated package</p>
                <p className="mt-1 font-mono text-sm text-white">
                  sorobuild-flow.zip
                </p>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Local-first
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                "env.sh",
                "arguments.sh",
                "flow.selected.sh",
                "scripts/deploy.sh",
                "scripts/invoke/*.sh",
                "contract.optimized.wasm",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <span className="font-mono text-sm text-slate-200">
                    {item}
                  </span>
                  <span className="text-xs text-slate-500">generated</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Capabilities"
        title="Built for modern Soroban development"
        description="From visual contract workflows to code-first project development, SoroBuild helps developers reduce setup and focus on shipping."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-y border-slate-200 bg-slate-50/70 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Workflow"
          title="A clear path from contract to execution"
          description="SoroBuild gives developers the tooling they need across the full lifecycle."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={step.title} index={index + 1} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-slate-200 p-8 md:p-10 lg:border-b-0 lg:border-r">
            <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Analytics
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Live platform statistics for ecosystem visibility.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Track platform users, developer actions, network activity, and
              SoroBuild Flow adoption from a single statistics page.
            </p>

            <a
              href="/stats"
              className="mt-7 inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View statistics
            </a>
          </div>

          <div className="grid gap-4 p-8 md:grid-cols-2 md:p-10">
            <StatPreview label="Platform users" value="Live" />
            <StatPreview label="Transactions" value="Tracked" />
            <StatPreview label="Flow workflows" value="Generated" />
            <StatPreview label="Scripts" value="Automated" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center shadow-[0_24px_90px_rgba(15,23,42,0.22)] md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.22),transparent_34%)]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Start building Soroban apps with less friction.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Choose the product that matches your workflow: Studio for visual
            contract operations, Flow for executable script generation, or IDE
            for full development.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://flow.soro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[170px] items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Open Flow
            </a>
            <a
              href="https://docs.soro.build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  title,
  eyebrow,
  description,
  features,
  href,
  cta,
  featured,
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] border p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-32 ${
          featured
            ? "bg-gradient-to-b from-white/10 to-transparent"
            : "bg-gradient-to-b from-slate-100 to-transparent"
        }`}
      />

      <div className="relative">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            featured ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {eyebrow}
        </p>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>

        <p
          className={`mt-4 text-sm leading-7 ${
            featured ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>

        <div className="mt-7 space-y-3">
          {features.map((feature) => (
            <Feature key={feature} text={feature} inverted={featured} />
          ))}
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex items-center text-sm font-semibold transition hover:opacity-75 ${
            featured ? "text-white" : "text-slate-950"
          }`}
        >
          {cta} <span className="ml-2">→</span>
        </a>
      </div>
    </article>
  );
}

function Feature({ text, inverted }) {
  return (
    <div
      className={`flex items-start gap-3 text-sm ${
        inverted ? "text-slate-300" : "text-slate-700"
      }`}
    >
      <div
        className={`mt-2 h-1.5 w-1.5 rounded-full ${
          inverted ? "bg-white" : "bg-slate-950"
        }`}
      />
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

function StepCard({ index, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
        {index}
      </div>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function PrimaryLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
    >
      {children}
    </a>
  );
}

function SecondaryLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </a>
  );
}

function HeroMetric({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
      {children}
    </span>
  );
}

function CodeLine({ text }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
      {text}
    </div>
  );
}

function DashboardTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function StatPreview({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

const features = [
  {
    icon: "⚙️",
    title: "Smart contract operations",
    desc: "Deploy, invoke, upgrade, and manage Soroban contracts through cleaner workflows.",
  },
  {
    icon: "🧪",
    title: "Simulation-first workflows",
    desc: "Validate interactions and inspect behavior before committing to network activity.",
  },
  {
    icon: "📦",
    title: "Portable generated scripts",
    desc: "Export env, arguments, deploy, and invoke scripts that can be executed locally.",
  },
  {
    icon: "🧭",
    title: "Visual workflow composition",
    desc: "Compose deployment and invocation order visually, then download the workflow.",
  },
  {
    icon: "🌐",
    title: "Multi-network support",
    desc: "Build workflows for Testnet, Mainnet, Local, and future network environments.",
  },
  {
    icon: "🚀",
    title: "Less repetitive setup",
    desc: "Reduce the engineering time spent wiring scripts, configs, and test flows.",
  },
];

const steps = [
  {
    title: "Upload or create",
    desc: "Start with a compiled WASM, no-code workflow, or full project in the IDE.",
  },
  {
    title: "Generate and configure",
    desc: "Let SoroBuild generate scripts, env files, arguments, and execution steps.",
  },
  {
    title: "Simulate and inspect",
    desc: "Review outputs, generated files, and contract interaction logic.",
  },
  {
    title: "Run locally or deploy",
    desc: "Download workflows and execute them in your own secure development environment.",
  },
];
