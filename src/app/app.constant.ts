// tslint:disable-next-line:max-line-length
export const EMAIL_VALIDATOR_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_VALIDATION_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const API = {
  URL: 'https://small-project-api.herokuapp.com',
  LOGIN: '/access-tokens',
  SIGNUP: '/users'
};
