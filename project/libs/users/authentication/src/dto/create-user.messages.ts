export const CreateUserMessages = {
  name: {
    invalidFormat: 'Name is required',
    minLength: 'min length is 3',
    maxLength: 'max is 50'
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  }
} as const;
