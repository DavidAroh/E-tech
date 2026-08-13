import type Lenis from "lenis";

/** Module-level handle to the active Lenis instance (client only). */
export const lenisRef: { current: Lenis | null } = { current: null };
