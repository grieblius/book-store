import { ActionModel, ErrorActionModel } from '@utils/redux';

const requestReducer = (state = {}, action: ActionModel<ErrorActionModel>) => {
  const { type, payload } = action;

  const matches = /(.*)(\.)(REQUEST|RECEIVE|ERROR)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, , requestState] = matches;

  const capitalizedActionType = requestName
    .split('.')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  const camelCaseActionType = capitalizedActionType.charAt(0).toLowerCase()
        + capitalizedActionType.slice(1);

  return {
    ...state,
    [`is${capitalizedActionType}Loading`]: requestState === 'REQUEST',
    [`${camelCaseActionType}Error`]:
            requestState === 'ERROR' ? payload.error : null,
  };
};

export default requestReducer;
