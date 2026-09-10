import { createFileRoute } from "@tanstack/react-router";
import { TreeShell } from "@/components/tree-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <TreeShell />;
}
