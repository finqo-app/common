/**
 * Auth validation constants and helpers.
 * Identical regex and minimum lengths were duplicated across all four auth
 * entry points (web login/register + mobile login/register). Single source here.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

/** Returns true if the email string passes basic RFC-style validation. */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}
