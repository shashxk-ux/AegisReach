/** One shared vocabulary of springs so everything in the app moves with the same weight. */
export const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.7 } as const;
export const springSoft = { type: "spring", stiffness: 180, damping: 26, mass: 0.9 } as const;
export const springSnappy = { type: "spring", stiffness: 520, damping: 36 } as const;
