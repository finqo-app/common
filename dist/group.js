"use strict";
/**
 * Group palette and utilities.
 *
 * Single source of truth shared by finqo-web and finqo-mobile.
 * The backend (`internal/domain/group/colors.go`) holds the same values and
 * validates submitted colors against this list.
 * If you update the palette, mirror the change in the Go `AllowedColors` slice.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROUP_DEFAULT_COLOR = exports.GROUP_PALETTE = void 0;
exports.resolveGroupColor = resolveGroupColor;
exports.getGroupInitials = getGroupInitials;
exports.GROUP_PALETTE = [
    '#B8C5F2', // Soft indigo
    '#96D4C8', // Soft teal
    '#A8D4A0', // Soft sage
    '#F5C9A0', // Soft peach
    '#F2A8B8', // Soft rose
    '#A0C4E8', // Soft sky blue
    '#F0DFA0', // Soft amber
    '#C8A8F2', // Soft violet
];
/** Default color used when no color has been saved for a membership. */
exports.GROUP_DEFAULT_COLOR = '#B8C5F2';
/**
 * Returns the stored DB color if it is a valid palette value,
 * otherwise falls back deterministically to a palette color based on the id.
 */
function resolveGroupColor(id, storedColor) {
    if (storedColor && exports.GROUP_PALETTE.includes(storedColor)) {
        return storedColor;
    }
    if (!id)
        return exports.GROUP_DEFAULT_COLOR;
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash * 31 + id.charCodeAt(i)) % 2147483647;
    }
    return exports.GROUP_PALETTE[Math.abs(hash) % exports.GROUP_PALETTE.length];
}
/**
 * Returns the 1–2 letter initials for a group name.
 * Single-word names → first two characters. Multi-word → first + last initials.
 */
function getGroupInitials(name) {
    const n = name ?? '';
    if (!n.trim())
        return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1)
        return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
//# sourceMappingURL=group.js.map