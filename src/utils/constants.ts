export enum errorMessages {
  NOT_FOUND_USER_BY_ID = 'User with this id does not exist',
  NOT_FOUND_USER_BY_EMAIL = 'User with this email does not exist',
  USER_NOT_CREATED = 'User has not been created',
  IMAGE_NOT_CREATED = 'Image has not been created',
  ACCESS_TOKEN_INVALID = 'Access token missing, or invalid',
  NO_ACCESS = 'User is not authorized to access this resource',
  EMAIL_ALREADY_EXIST = 'A user with the same email already exists',
  USER_NOT_FOUND = 'User not found',
}

export enum responseMessages {
  OK = 'OK',
  CREATED = 'Created',
  UNPROCESSABLE_ENTITY = 'Unprocessable',
  NO_CONTENT = 'No Content',
}
