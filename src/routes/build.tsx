import { createFileRoute } from "@tanstack/react-router";
import { Configurator } from "@/components/configurator";
import { decodeSku, DEFAULT_BUILD, PRESETS } from "@/lib/catalog";

type Search = { sku?: string };

export const Route = createFileRoute("/build")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    sku: typeof raw.sku === "string" ? raw.sku : undefined,
  }),
  component: BuildPage,
});

function BuildPage() {
  const { sku } = Route.useSearch();
  const fromSku = decodeSku(sku);
  const fromPreset = PRESETS.find((p) => p.id === sku);
  const initial = fromSku ?? fromPreset?.build ?? DEFAULT_BUILD;
  return (
    <div className="lg:py-10">
      <Configurator initial={initial} />
    </div>
  );
}