"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CaseFile } from "@/lib/types";
import { DEMO_CASES } from "@/lib/api/analysis";

interface SessionState {
  /** Дела, добавленные пользователем в текущем сеансе. */
  uploaded: CaseFile[];
  /** Идентификаторы дел, по которым сформировано заключение. */
  reportedIds: string[];
  /** Состояние восстановлено из localStorage. До этого рендерим только серверные данные. */
  hydrated: boolean;
  addCase: (caseFile: CaseFile) => void;
  removeCase: (id: string) => void;
  markReported: (id: string) => void;
  setHydrated: () => void;
  reset: () => void;
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      uploaded: [],
      reportedIds: ["1-241-2026", "1-198-2026"],
      hydrated: false,
      addCase: (caseFile) =>
        set((state) => ({
          uploaded: [
            caseFile,
            ...state.uploaded.filter((c) => c.id !== caseFile.id),
          ],
        })),
      removeCase: (id) =>
        set((state) => ({
          uploaded: state.uploaded.filter((c) => c.id !== id),
          reportedIds: state.reportedIds.filter((r) => r !== id),
        })),
      markReported: (id) =>
        set((state) =>
          state.reportedIds.includes(id)
            ? state
            : { reportedIds: [...state.reportedIds, id] },
        ),
      setHydrated: () => set({ hydrated: true }),
      reset: () => set({ uploaded: [], reportedIds: [] }),
    }),
    {
      name: "second-justice-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        uploaded: state.uploaded,
        reportedIds: state.reportedIds,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/**
 * Все дела реестра: сначала загруженные в этом сеансе, затем демонстрационные.
 * До восстановления состояния возвращаются только демонстрационные — иначе
 * серверная и клиентская разметка разошлись бы.
 */
export function useAllCases(): CaseFile[] {
  const uploaded = useSession((s) => s.uploaded);
  const hydrated = useSession((s) => s.hydrated);
  return hydrated ? [...uploaded, ...DEMO_CASES] : DEMO_CASES;
}

export function useCaseById(id: string): CaseFile | undefined {
  const uploaded = useSession((s) => s.uploaded);
  return (
    uploaded.find((c) => c.id === id) ?? DEMO_CASES.find((c) => c.id === id)
  );
}
