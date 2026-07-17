/**
 * Formats a price number as Argentine pesos.
 * e.g. 46999 → "$46.999"
 */
export const fmt = (n: number): string =>
  `$${n.toLocaleString('es-AR')}`;
