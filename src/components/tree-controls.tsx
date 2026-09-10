import { Flower2, GitBranch, Leaf, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toCss } from "@/lib/tree/color";
import { DEPTH_MAX, DEPTH_MIN } from "@/lib/tree/generate";
import { PALETTES, type OverlayMode } from "@/lib/tree/palettes";
import { useTreeStore } from "@/lib/tree/store";
import { cn } from "@/lib/utils";

const OVERLAYS: { id: OverlayMode; label: string; icon: typeof Leaf }[] = [
  { id: "none", label: "Bare", icon: GitBranch },
  { id: "leaves", label: "Leaves", icon: Leaf },
  { id: "blossoms", label: "Blossoms", icon: Flower2 },
];

function Field({
  id,
  label,
  value,
  children,
}: {
  id: string;
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs tabular-nums text-fg">{value}</span>
      </div>
      {children}
    </div>
  );
}

export function TreeControls({ showRegenerate = true }: { showRegenerate?: boolean }) {
  const angle = useTreeStore((s) => s.angle);
  const depth = useTreeStore((s) => s.depth);
  const length = useTreeStore((s) => s.length);
  const wind = useTreeStore((s) => s.wind);
  const overlay = useTreeStore((s) => s.overlay);
  const paletteId = useTreeStore((s) => s.paletteId);
  const setAngle = useTreeStore((s) => s.setAngle);
  const setDepth = useTreeStore((s) => s.setDepth);
  const setLength = useTreeStore((s) => s.setLength);
  const setWind = useTreeStore((s) => s.setWind);
  const setOverlay = useTreeStore((s) => s.setOverlay);
  const setPaletteId = useTreeStore((s) => s.setPaletteId);
  const regenerate = useTreeStore((s) => s.regenerate);
  const paletteName = PALETTES.find((p) => p.id === paletteId)?.name ?? "Dusk grove";

  return (
    <div className="flex flex-col gap-5">
      <Field id="angle" label="Branching angle" value={`${Math.round(angle)}°`}>
        <Slider
          id="angle"
          min={8}
          max={42}
          step={1}
          value={[angle]}
          onValueChange={(v) => setAngle(v[0] ?? angle)}
          aria-label="Branching angle"
        />
      </Field>

      <Field id="depth" label="Depth" value={`${depth}`}>
        <Slider
          id="depth"
          min={DEPTH_MIN}
          max={DEPTH_MAX}
          step={1}
          value={[depth]}
          onValueChange={(v) => setDepth(v[0] ?? depth)}
          aria-label="Depth"
        />
      </Field>

      <Field id="length" label="Length" value={`${Math.round(length * 100)}%`}>
        <Slider
          id="length"
          min={0.6}
          max={1.45}
          step={0.01}
          value={[length]}
          onValueChange={(v) => setLength(v[0] ?? length)}
          aria-label="Length"
        />
      </Field>

      <Field id="wind" label="Wind" value={`${Math.round(wind * 100)}%`}>
        <Slider
          id="wind"
          min={0}
          max={1}
          step={0.01}
          value={[wind]}
          onValueChange={(v) => setWind(v[0] ?? wind)}
          aria-label="Wind"
        />
      </Field>

      <div className="flex flex-col gap-2">
        <Label>Overlay</Label>
        <div className="grid grid-cols-3 gap-1 rounded-sm bg-surface-2 p-1">
          {OVERLAYS.map((item) => {
            const Icon = item.icon;
            const active = overlay === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOverlay(item.id)}
                aria-pressed={active}
                className={cn(
                  "flex h-11 items-center justify-center gap-1.5 rounded-xs text-xs font-medium transition-[background-color,color] duration-(--motion-quick) ease-(--ease-out)",
                  active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                <Icon className="size-3.5" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <Label>Palette</Label>
          <span className="text-xs text-muted">{paletteName}</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {PALETTES.map((p) => {
            const selected = p.id === paletteId;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={p.name}
                aria-pressed={selected}
                title={p.name}
                onClick={() => setPaletteId(p.id)}
                className={cn(
                  "size-11 rounded-full ring-2 ring-offset-2 ring-offset-surface transition-[box-shadow,transform] duration-(--motion-quick) ease-(--ease-out)",
                  selected ? "ring-accent" : "ring-transparent hover:ring-border",
                )}
                style={{ backgroundColor: toCss(p.swatch) }}
              />
            );
          })}
        </div>
      </div>

      {showRegenerate ? (
        <Button type="button" className="w-full" onClick={regenerate}>
          <RefreshCw strokeWidth={1.75} />
          Regenerate
          <kbd className="ml-auto hidden rounded-xs border border-accent-fg/20 px-1.5 py-0.5 text-xs font-medium text-accent-fg/70 md:inline">
            R
          </kbd>
        </Button>
      ) : null}
    </div>
  );
}
