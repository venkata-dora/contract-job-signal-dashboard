"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { SignalForm } from "@/components/SignalForm";
import { useSignals } from "@/components/useSignals";

export default function Page() {
  const router = useRouter();
  const { addSignal } = useSignals();

  return (
    <AppShell>
      <SignalForm
        onSubmit={(signal) => {
          addSignal(signal);
          router.push("/");
        }}
        onCancel={() => router.push("/")}
      />
    </AppShell>
  );
}
