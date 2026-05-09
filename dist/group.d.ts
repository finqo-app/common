/**
 * Group palette and utilities.
 *
 * Single source of truth shared by finqo-web and finqo-mobile.
 * The backend (`internal/domain/group/colors.go`) holds the same values and
 * validates submitted colors against this list.
 * If you update the palette, mirror the change in the Go `AllowedColors` slice.
 */
export declare const GROUP_PALETTE: readonly ["#B8C5F2", "#96D4C8", "#A8D4A0", "#F5C9A0", "#F2A8B8", "#A0C4E8", "#F0DFA0", "#C8A8F2"];
export type GroupColor = (typeof GROUP_PALETTE)[number];
/** Default color used when no color has been saved for a membership. */
export declare const GROUP_DEFAULT_COLOR: GroupColor;
/**
 * Returns the stored DB color if it is a valid palette value,
 * otherwise falls back deterministically to a palette color based on the id.
 */
export declare function resolveGroupColor(id?: string, storedColor?: string): string;
/**
 * Returns the 1–2 letter initials for a group name.
 * Single-word names → first two characters. Multi-word → first + last initials.
 */
export declare function getGroupInitials(name?: string): string;
//# sourceMappingURL=group.d.ts.map