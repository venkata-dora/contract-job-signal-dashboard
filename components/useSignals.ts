"use client";

import { useEffect, useMemo, useState } from "react";
import { loadSignals, resetSignals, saveSignals } from "@/lib/storage";
import type { JobSignal } from "@/lib/types";
import { rankSignals } from "@/lib/utils";

export function useSignals() {
  const [signals, setSignals] = useState<JobSignal[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSignals(loadSignals());
    setIsReady(true);
  }, []);

  const rankedSignals = useMemo(() => rankSignals(signals), [signals]);

  function commit(nextSignals: JobSignal[]) {
    setSignals(nextSignals);
    saveSignals(rankSignals(nextSignals));
  }

  return {
    signals: rankedSignals,
    isReady,
    addSignal(signal: JobSignal) {
      commit([signal, ...rankedSignals]);
    },
    updateSignal(signal: JobSignal) {
      commit(rankedSignals.map((item) => (item.id === signal.id ? signal : item)));
    },
    deleteSignal(id: string) {
      commit(rankedSignals.filter((item) => item.id !== id));
    },
    reset() {
      setSignals(resetSignals());
    }
  };
}
