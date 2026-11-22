export const Users = {
  STANDARD: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED_OUT: { username: 'locked_out_user', password: 'secret_sauce' },
  UNKNOWN: { username: 'not_a_real_user', password: 'not_the_password' },
} as const;