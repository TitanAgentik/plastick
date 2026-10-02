import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Shield, Wrench } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/hold")({ component: HoldPage });

function HoldPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        Specs in human
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        How it holds up.
      </h1>
      <p className="mt-4 text-muted">
        Built for youth life, not a marketing dive rating. Here's what that
        actually means.
      </p>

      <div className="mt-10 space-y-4">
        <Spec
          icon={<Droplets className="size-5" strokeWidth={1.75} />}
          title="50 meters. Rain, pool, shower."
          body="5 ATM. Swim laps. Get caught in it. Do not scuba. The LCD will fog if you boil it in a sauna — that's resin, not magic."
        />
        <Spec
          icon={<Shield className="size-5" strokeWidth={1.75} />}
          title="Daily shock. Gym bag. Skate fall."
          body="42mm resin tank with corner bumpers. It is designed to survive a drop onto concrete from pocket height. It is not a military instrument and we will not pretend it is."
        />
        <Spec
          icon={<Wrench className="size-5" strokeWidth={1.75} />}
          title="Durable snaps. Fully interchangeable."
          body="Every part is snappable plastic — face, bezel, body, strap, hands, markings, crown. Click off. Click on. Same parts fit every shell. Built to get swapped, dropped, and swapped again."
        />
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-border pt-8 text-sm">
        <div>
          <dt className="text-muted">Case</dt>
          <dd className="mt-1">42mm resin, 12.4mm thick</dd>
        </div>
        <div>
          <dt className="text-muted">Movement</dt>
          <dd className="mt-1">Quartz analog-digital hybrid</dd>
        </div>
        <div>
          <dt className="text-muted">Water</dt>
          <dd className="mt-1">50m / 5 ATM</dd>
        </div>
        <div>
          <dt className="text-muted">Weight</dt>
          <dd className="mt-1">~52g depending on strap</dd>
        </div>
        <div>
          <dt className="text-muted">Battery</dt>
          <dd className="mt-1">~3 years, user-replaceable</dd>
        </div>
        <div>
          <dt className="text-muted">Warranty</dt>
          <dd className="mt-1">2 years on movement and case</dd>
        </div>
      </dl>
    </div>
  );
}

function Spec({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className="text-fg">{icon}</span>
        <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
