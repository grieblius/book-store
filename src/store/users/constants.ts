export const Types = {
  USERS: {
    INIT: {
      REQUEST: 'USERS.INIT.REQUEST',
      RECEIVE: 'USERS.INIT.RECEIVE',
    },
    LOGIN: {
      REQUEST: 'USERS.LOGIN.REQUEST',
      RECEIVE: 'USERS.LOGIN.RECEIVE',
      ERROR: 'USERS.LOGIN.ERROR',
    },
    LOGOUT: {
      REQUEST: 'USERS.LOGOUT.REQUEST',
      RECEIVE: 'USERS.LOGOUT.RECEIVE',
      ERROR: 'USERS.LOGOUT.ERROR',
    },
    LIST: {
      REQUEST: 'USERS.LIST.REQUEST',
      RECEIVE: 'USERS.LIST.RECEIVE',
      ERROR: 'USERS.LIST.ERROR',
    },
  },
} as const;

export const DATA_KEY = 'users';
