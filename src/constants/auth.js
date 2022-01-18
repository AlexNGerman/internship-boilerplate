export const AUTH_VALIDATION_SETS = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 70,
  PASSWORD_LENGTH: 10,
  PASSWORD_MATCH_STRING: /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
}
