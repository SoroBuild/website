import React, { useMemo, useState } from "react";

const socialLinks = {
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
  discord: {
    label: "Discord",
    href: "https://discord.gg/yourcommunity",
    enabled: false,
  },
};

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  // { label: "Docs", href: "#docs" },
];

const footerLinks = {
  product: [
    { label: "Studio", href: "#studio" },
    { label: "IDE", href: "#ide" },
    // { label: "RPC", href: "#rpc" },
  ],
  resources: [
    { label: "Documentation", href: "#docs" },
    { label: "Guides", href: "#guides" },
    // { label: "Support", href: "#support" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    // { label: "Status", href: "#status" },
  ],
};

export default function SoroBuildLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const enabledSocials = useMemo(
    () =>
      Object.values(socialLinks).filter((item) => item.enabled && item.href),
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_35%)]" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-10">
            <a
              href="#top"
              className="text-lg gap-[6px] flex items-center font-semibold tracking-tight text-slate-950"
            >
              <img className="h-10  w-auto" src="/sorobuildIcon.svg" />{" "}
              <span className="mt-2">SoroBuild</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-7 font-medium text-slate-700  md:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}

              <a
                href="https://docs.soro.build"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://studio.soro.build"
              target="_blank"
              className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex"
            >
              Use Dev Studio
            </a>

            <a
              href="https://ide.soro.build"
              target="_blank"
              className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 md:inline-flex"
            >
              Open Full IDE
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className=" ">
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="absolute left-0 right-0 top-full z-50 border-t border-slate-200 bg-white shadow-xl md:hidden">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    className="px-3 py-3"
                    href="https://docs.soro.build"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Docs
                  </a>
                </nav>

                <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
                  <a
                    href="https://studio.soro.build"
                    target="_blank"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Use Dev Studio
                  </a>

                  <a
                    href="https://ide.soro.build"
                    target="_blank"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Open Full IDE
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 md:pb-24 md:pt-28"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            Soroban developer platform
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl md:leading-[1.05]">
            Build, test, and deploy
            <span className="block text-slate-500">
              Soroban applications faster
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            SoroBuild gives teams a complete workflow for Soroban development —
            from no-code contract deployment and interaction to a full online
            IDE for writing, simulating, debugging, and shipping smart
            contracts.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://ide.soro.build"
              target="_blank"
              className="inline-flex min-w-[160px] items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.15)] transition hover:bg-slate-800"
            >
              Launch IDE
            </a>

            <a
              href="https://studio.soro.build"
              target="_blank"
              className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Open Dev Studio
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCT SPLIT */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <ProductCard
            id="studio"
            eyebrow="No-code studio"
            eyebrowClass="text-blue-700"
            title="Deploy and interact with contracts through a clean visual interface"
            description="A no-code workflow for developers, teams, and ecosystem builders who want to deploy, manage, test, and interact with Soroban smart contracts without repetitive setup."
            features={[
              "One-click contract deployment",
              "Visual contract interaction flows",
              "Token and asset management",
              "Pre-execution simulation support",
            ]}
            cta="Open Studio"
            accent="blue"
            refs="https://studio.soro.build"
          />

          <ProductCard
            id="ide"
            eyebrow="Online IDE"
            eyebrowClass="text-violet-700"
            title="A full in-browser environment for coding, testing, and debugging"
            description="Write and manage Soroban smart contracts in a structured browser-based IDE with testing, simulation, network integration, and developer tooling in one place."
            features={[
              "Multi-file Rust project support",
              "Integrated Soroban simulation",
              "Execution logs and debugging",
              "Wallet and network integration",
            ]}
            cta="Open IDE"
            accent="violet"
            refs="https://ide.soro.build"
            muted
          />
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-y border-slate-200 bg-slate-50/70 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Built for modern Soroban development
            </h2>
            <p className="mt-4 text-slate-600">
              Everything needed to go from idea to deployed contract with less
              friction and better tooling.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            A simple workflow from build to deployment
          </h2>
          <p className="mt-4 text-slate-600">
            Clear, fast, and designed for builders who want less setup and more
            output.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="text-base font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 px-6 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.16)] md:px-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Start building on Soroban with less friction
            </h2>
            <p className="mt-4 text-slate-300">
              Use Studio for no-code workflows, switch to the IDE for full
              development, and keep your team shipping from one platform.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://studio.soro.build"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
              >
                Get Started
              </a>
              <a
                href="https://docs.soro.build"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
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
                <div className="mt-5 flex flex-wrap items-center gap-3">
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

            <FooterLinkGroup title="Product" links={footerLinks.product} />
            <FooterLinkGroup title="Resources" links={footerLinks.resources} />
            <FooterLinkGroup title="Company" links={footerLinks.company} />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} SoroBuild. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-5">
              <a href="#privacy" className="transition hover:text-slate-900">
                Privacy
              </a>
              <a href="#terms" className="transition hover:text-slate-900">
                Terms
              </a>
              <a href="#status" className="transition hover:text-slate-900">
                Status
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
    >
      {children}
    </a>
  );
}

function ProductCard({
  id,
  eyebrow,
  eyebrowClass,
  title,
  description,
  features,
  cta,
  muted = false,
  accent = "blue",
  refs,
}) {
  const accentClasses =
    accent === "violet"
      ? "from-violet-500/10 to-transparent"
      : "from-blue-500/10 to-transparent";

  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-3xl border border-slate-200 p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl md:p-10 ${
        muted ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accentClasses}`}
      />
      <div className="relative">
        <div className={`mb-4 text-xs font-semibold uppercase ${eyebrowClass}`}>
          {eyebrow}
        </div>

        <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
          {description}
        </p>

        <div className="mt-7 space-y-3">
          {features.map((feature) => (
            <Feature key={feature} text={feature} />
          ))}
        </div>

        <a
          href={refs}
          target="_blank"
          className="mt-8 inline-flex items-center rounded-lg px-0 text-sm font-semibold text-slate-950 transition hover:opacity-70"
        >
          {cta} <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-start gap-3 text-sm text-slate-700">
      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-950" />
      <span>{text}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-lg text-white">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
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

  if (value.includes("twitter") || value.includes("x")) {
    return <XIcon />;
  }
  if (value.includes("github")) {
    return <GitHubIcon />;
  }
  if (value.includes("telegram")) {
    return <TelegramIcon />;
  }
  if (value.includes("discord")) {
    return <DiscordIcon />;
  }
  return <GlobeIcon />;
}

function IconBase({ children, viewBox = "0 0 24 24" }) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} className="h-4 w-4 fill-current">
      {children}
    </svg>
  );
}

function MenuIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M4 6.75A.75.75 0 0 1 4.75 6h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 6.75Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 12Zm.75 4.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5Z" />
    </IconBase>
  );
}

function CloseIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M6.53 5.47a.75.75 0 0 0-1.06 1.06L10.94 12l-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.06l5.47 5.47a.75.75 0 0 0 1.06-1.06L13.06 12l5.47-5.47a.75.75 0 1 0-1.06-1.06L12 10.94 6.53 5.47Z" />
    </IconBase>
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

function DiscordIcon() {
  return (
    <IconBase viewBox="0 0 24 24">
      <path d="M20.317 4.369A19.791 19.791 0 0 0 15.433 3a13.43 13.43 0 0 0-.625 1.283 18.27 18.27 0 0 0-5.616 0A13.43 13.43 0 0 0 8.567 3a19.736 19.736 0 0 0-4.89 1.374C.533 9.058-.32 13.625.107 18.128a19.96 19.96 0 0 0 5.993 2.872c.485-.666.917-1.372 1.29-2.112-.71-.269-1.388-.604-2.03-.995.17-.125.337-.255.497-.39 3.914 1.84 8.16 1.84 12.028 0 .164.135.33.265.497.39a12.79 12.79 0 0 1-2.035 1c.375.738.807 1.444 1.289 2.11a19.9 19.9 0 0 0 6-2.875c.5-5.218-.853-9.743-3.319-13.759ZM8.02 15.39c-1.173 0-2.134-1.08-2.134-2.406 0-1.327.94-2.406 2.134-2.406 1.203 0 2.155 1.088 2.134 2.406 0 1.327-.941 2.406-2.134 2.406Zm7.96 0c-1.174 0-2.135-1.08-2.135-2.406 0-1.327.94-2.406 2.134-2.406 1.204 0 2.156 1.088 2.135 2.406 0 1.327-.94 2.406-2.135 2.406Z" />
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

const features = [
  {
    icon: "⚙️",
    title: "Smart contract tools",
    desc: "Deploy, upgrade, and manage Soroban contracts through cleaner workflows.",
  },
  {
    icon: "🧪",
    title: "Simulation engine",
    desc: "Validate interactions and test behaviors before pushing to network.",
  },
  {
    icon: "🔗",
    title: "Wallet integration",
    desc: "Connect wallets and interact with contracts in a more seamless flow.",
  },
  {
    icon: "📦",
    title: "Project management",
    desc: "Work with structured multi-file contract projects directly in-browser.",
  },
  {
    icon: "🌐",
    title: "Multi-network support",
    desc: "Support for Testnet, Futurenet, and Mainnet workflows in one platform.",
  },
  {
    icon: "🚀",
    title: "Faster deployment",
    desc: "Reduce repetitive setup and move from build to deployment more quickly.",
  },
];

const steps = [
  {
    title: "Create or import",
    desc: "Start from scratch or bring in an existing smart contract project.",
  },
  {
    title: "Build and simulate",
    desc: "Use Studio or the IDE to write, test, and inspect contract behavior.",
  },
  {
    title: "Debug and verify",
    desc: "Review logs, outputs, and execution flows before deployment.",
  },
  {
    title: "Deploy to network",
    desc: "Ship directly to the Soroban environment you want to target.",
  },
];
