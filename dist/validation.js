"use strict";
/**
 * Auth validation constants and helpers.
 * Identical regex and minimum lengths were duplicated across all four auth
 * entry points (web login/register + mobile login/register). Single source here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_PASSWORD_LENGTH = exports.EMAIL_REGEX = void 0;
exports.isValidEmail = isValidEmail;
exports.EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.MIN_PASSWORD_LENGTH = 8;
/** Returns true if the email string passes basic RFC-style validation. */
function isValidEmail(email) {
    return exports.EMAIL_REGEX.test(email.trim());
}
//# sourceMappingURL=validation.js.map