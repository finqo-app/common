/**
 * Category colors and utilities.
 *
 * Single source of truth shared by finqo-web and finqo-mobile.
 * Slugs mirror `internal/domain/category.go` — if the Go enum changes,
 * update this file and mirror the change in the backend.
 */
export declare const CATEGORY_COLORS: {
    readonly food: "#FFCC00";
    readonly transport: "#FF9500";
    readonly home: "#5B5FC7";
    readonly utilities: "#34C759";
    readonly entertainment: "#FF3B30";
    readonly shopping: "#AF52DE";
    readonly health: "#FF3B30";
    readonly fitness: "#FF9500";
    readonly education: "#5856D6";
    readonly travel: "#5AC8FA";
    readonly personal: "#AF52DE";
    readonly salary: "#34C759";
    readonly investment: "#34C759";
    readonly tech: "#14B8A6";
    readonly other: "#64748B";
};
export type CategorySlug = keyof typeof CATEGORY_COLORS;
/** Returns the hex color for a category slug, falling back to `other`. */
export declare function getCategoryColor(slug: string): string;
/**
 * Returns a 12% opacity tint of the category color — suitable for icon
 * background tiles on both platforms.
 */
export declare function getCategoryBackgroundColor(slug: string): string;
//# sourceMappingURL=category.d.ts.map