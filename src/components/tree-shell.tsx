import { RefreshCw, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { TreeCanvas } from "@/components/tree-canvas";
import { TreeControls } from "@/components/tree-controls";
import { Button } from "@/components/ui/button";
import { persistTreeSettings, useTreeStore } from "@/lib/tree/store";

function PersistGate() {
  useEffect(() => persistTreeSettings(), []);
  return null;
}

function Keybinds() {
  const regenerate = useTreeStore((s) => s.regenerate);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "r" && event.key !== "R") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      event.preventDefault();
      regenerate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [regenerate]);
  return null;
}

function BrandMark() {
  return (
    <div className="rounded-lg bg-surface/92 px-4 py-3 shadow-panel ring-1 ring-border">
      <h1 className="font-display text-xl font-medium leading-tight tracking-tight text-fg text-balance">
        Sylva
      </h1>
      <p className="mt-0.5 text-sm leading-snug text-muted">Generative trees</p>
    </div>
  );
}

function DesktopPanel() {
  return (
    <aside className="pointer-events-auto hidden w-80 shrink-0 flex-col rounded-xl bg-surface/92 p-4 shadow-panel ring-1 ring-border md:flex md:max-h-[calc(100dvh-2.5rem)] md:overflow-y-auto">
      <p className="font-display text-base font-medium text-fg">Grow</p>
      <p className="mt-1 text-sm text-muted">
        Shape the tree, then let the wind move through it.
      </p>
      <div className="mt-5">
        <TreeControls />
      </div>
    </aside>
  );
}

function MobileChrome() {
  const [open, setOpen] = useState(false);
  const regenerate = useTreeStore((s) => s.regenerate);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="pointer-events-auto shadow-panel"
            aria-label="Open controls"
          >
            <SlidersHorizontal strokeWidth={1.75} />
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-40 bg-bg/50" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col rounded-t-xl bg-surface p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-panel ring-1 ring-border">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <Drawer.Title className="font-display text-lg font-medium text-fg">
              Grow
            </Drawer.Title>
            <Drawer.Description className="sr-only">
              Adjust branching angle, depth, length, wind, overlay, and palette
            </Drawer.Description>
            <div className="mt-4 overflow-y-auto">
              <TreeControls />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <Button
        size="icon"
        className="pointer-events-auto shadow-panel"
        aria-label="Regenerate tree"
        onClick={regenerate}
      >
        <RefreshCw strokeWidth={1.75} />
      </Button>
    </div>
  );
}

export function TreeShell() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <PersistGate />
      <Keybinds />
      <TreeCanvas />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-between gap-4 p-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="pointer-events-auto">
          <BrandMark />
        </div>
        <DesktopPanel />
      </div>
      <MobileChrome />
    </main>
  );
}
