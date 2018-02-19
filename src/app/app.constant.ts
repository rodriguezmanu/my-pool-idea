// tslint:disable-next-line:max-line-length
export const EMAIL_VALIDATOR_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_VALIDATION_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const API = {
  USERS: {
    LOGIN: '/access-tokens',
    LOGOUT: '/access-tokens',
    SIGNUP: '/users',
    ME: '/me',
    REFRESH: '/access-tokens/refresh',
  },
  IDEAS: {
    CREATE: '/ideas',
    DELETE: '/ideas/',
    UPDATE: '/ideas/',
    GET: '/ideas'
  }
};
