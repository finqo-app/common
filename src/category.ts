/**
 * Category colors and utilities.
 *
 * Single source of truth shared by finqo-web and finqo-mobile.
 * Slugs mirror `internal/domain/category.go` — if the Go enum changes,
 * update this file and mirror the change in the backend.
 */

export const CATEGORY_COLORS = {
  food: '#FFCC00',
  transport: '#FF9500',
  home: '#5B5FC7',
  utilities: '#34C759',
  entertainment: '#FF3B30',
  shopping: '#AF52DE',
  health: '#FF3B30',
  fitness: '#FF9500',
  education: '#5856D6',
  travel: '#5AC8FA',
  personal: '#AF52DE',
  salary: '#34C759',
  investment: '#34C759',
  tech: '#14B8A6',
  other: '#64748B',
} as const;

export type CategorySlug = keyof typeof CATEGORY_COLORS;

/** Returns the hex color for a category slug, falling back to `other`. */
export function getCategoryColor(slug: string): string {
  return (CATEGORY_COLORS as Record<string, string>)[slug] ?? CATEGORY_COLORS.other;
}

/**
 * Returns a 12% opacity tint of the category color — suitable for icon
 * background tiles on both platforms.
 */
export function getCategoryBackgroundColor(slug: string): string {
  const hex = getCategoryColor(slug);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.12)`;
}
