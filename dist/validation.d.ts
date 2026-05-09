/**
 * Auth validation constants and helpers.
 * Identical regex and minimum lengths were duplicated across all four auth
 * entry points (web login/register + mobile login/register). Single source here.
 */
export declare const EMAIL_REGEX: RegExp;
export declare const MIN_PASSWORD_LENGTH = 8;
/** Returns true if the email string passes basic RFC-style validation. */
export declare function isValidEmail(email: string): boolean;
//# sourceMappingURL=validation.d.ts.map