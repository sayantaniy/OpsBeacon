import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BRAND,
  FAQ,
  INTEGRATIONS,
  SECURITY,
  STEPS,
  SURFACES,
} from "./_data/landing";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero: the one loud moment on the page */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:px-10 md:pt-28">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="grid-bg pointer-events-none absolute inset-0" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <Badge variant="outline" className="gap-2 rounded-full px-3 py-1 text-xs font-normal">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Early access
          </Badge>

          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Every service connected.{" "}
            <span className="text-muted-foreground">Every incident understood.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            One control room for deploying, monitoring and debugging your
            production stack. Connect GitHub, AWS, Docker and your databases
            without moving anything.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/sign-up">
                Connect your first repo <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>

        {/* Muted + playsInline are required for autoplay on mobile. WebM first, MP4 fallback. */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-x-6 -bottom-10 top-10 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" />
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/50 ring-1 ring-white/5">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/hero-poster.jpg"
              aria-label={`${BRAND} walkthrough: a deploy goes out, latency rises, and the copilot finds the cause`}
              className="size-full object-cover"
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Integrations strip */}
      <section className="border-t border-white/10 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">
            Works with the tools you already run
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-sm text-muted-foreground/80">
            {INTEGRATIONS.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="border-t border-white/10 px-6 py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Your stack, finally in one place
            </h2>
            <p className="mt-4 text-muted-foreground">
              {BRAND} correlates deployments, logs, database performance,
              errors and cloud costs, so you stop switching tabs to piece
              together what happened.
            </p>
          </div>

          <div className="mt-20 flex flex-col gap-28">
            {SURFACES.map(({ icon: Icon, ...surface }, i) => (
              <SurfaceRow
                key={surface.title}
                reverse={i % 2 === 1}
                icon={<Icon className="size-5" />}
                {...surface}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Approve from anywhere */}
      <section className="border-t border-white/10 px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">
              Approve fixes where you already work
            </h2>
            <p className="mt-4 text-muted-foreground">
              Alerts reach you in the dashboard, the CLI, Slack or Telegram. So
              does the approval for the fix.
            </p>
          </div>

          <Tabs defaultValue="slack" className="w-full">
            <TabsList>
              <TabsTrigger value="slack">Slack</TabsTrigger>
              <TabsTrigger value="telegram">Telegram</TabsTrigger>
              <TabsTrigger value="cli">CLI</TabsTrigger>
            </TabsList>
            <TabsContent value="slack">
              <Snippet>{`api: p95 latency 2.4s since deploy v143
Likely cause: missing index on orders.user_id
Suggested fix: roll back to v142

[ Approve rollback ]   [ Dismiss ]`}</Snippet>
            </TabsContent>
            <TabsContent value="telegram">
              <Snippet>{`api is slower since v143.
Likely cause: missing index on orders.user_id.

Roll back to v142?
/approve   /dismiss`}</Snippet>
            </TabsContent>
            <TabsContent value="cli">
              <Snippet>{`$ helm rollback api --to v142
Approval needed. Request sent to #prod-alerts.
Approved by maya. Rolled back in 18s.`}</Snippet>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How it works: a real sequence, so numbered */}
      <section id="how-it-works" className="border-t border-white/10 px-6 py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display max-w-xl text-4xl tracking-tight md:text-5xl">
            From first connection to first answer
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Step key={step.title} number={i + 1} title={step.title}>
                {step.body}
              </Step>
            ))}
          </div>
        </div>
      </section>

      {/* Security: hairline grid instead of a wall of cards */}
      <section id="security" className="border-t border-white/10 px-6 py-28 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display max-w-2xl text-4xl tracking-tight md:text-5xl">
            Built so you never have to wonder what it can touch
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {SECURITY.map((item) => (
              <div key={item.title} className="bg-background p-8">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 px-6 py-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Questions, answered
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden border-t border-white/10 px-6 py-32 md:px-10">
        <div className="hero-glow pointer-events-none absolute inset-0 rotate-180" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <h2 className="font-display text-4xl tracking-tight md:text-6xl">
            Run production with the whole picture
          </h2>
          <Button asChild size="lg" className="gap-2 text-base">
            <Link href="/sign-up">
              Connect your first repo <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-muted-foreground md:px-10">
        {BRAND}. Built for developers who would rather be shipping.
      </footer>
    </div>
  );
}

/* ---------- Small components ---------- */

function SurfaceRow({
  icon,
  title,
  description,
  bullets,
  reverse,
  image,
  alt,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  image: string;
  alt: string;
}) {
  return (
    <div
      className={`flex flex-col gap-12 md:flex-row md:items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
          {icon}
        </div>
        <h3 className="font-display mt-5 text-3xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-[1.2]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl shadow-black/30">
          <Image src={image} alt={alt} width={1200} height={800} className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/60 text-xs text-primary">
          {number}
        </span>
        <span className="h-px flex-1 border-t border-dashed border-white/15" />
      </div>
      <h3 className="mt-5 font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function Snippet({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-card p-5 font-mono text-sm leading-relaxed text-muted-foreground">
      {children}
    </pre>
  );
}