export const appReducer = (state, action) => {
  console.log(`Dispatching action : ${action.type}`);
  switch (action.type) {
    case 'SET_INSTANCES':
      return { ...state, allInstances: action.value };
    case 'SET_USERNAME':
      return { ...state, email: action.value };
    case 'SET_PASSWORD':
      return { ...state, password: action.value };
    case 'SHOW_SIGN_IN':
      return { ...state, showSignIn: action.value };
    case 'SHOW_SIGN_UP':
      return { ...state, showSignUp: action.value };
    case 'CURRENCY_TOGGLED':
      return { ...state, currencyToggled: action.value };
    case 'TOGGLE_INSTANCE_STATUS':
      return {
        ...state,
        allInstances: [
          ...state.allInstances.slice(0, action.index),
          { ...state.allInstances[action.index], status: action.newStatus },
          ...state.allInstances.slice(
            action.index + 1,
            state.allInstances.length
          ),
        ],
      };
    case 'TOGGLE_CURRENCY':
      return {
        ...state,
        currencySelected: state.currencySelected === 'USD' ? 'INR' : 'USD',
      };
    case 'SHOW_INVALID_CREDENTIALS':
      return {
        ...state,
        inValidCredentials: action.value,
        userAuthMessage: action.userAuthMessage,
      };
    case 'SET_RUNNING_INSTANCES_COST':
      return {
        ...state,
        runningInstancesCost: action.value,
      };
    case 'SET_STOPPED_INSTANCES_COST':
      return {
        ...state,
        stoppedInstancesCost: action.value,
      };
    case 'USER_SIGNIN':
      return { ...state, hasSignedIn: action.value };
    default:
      throw new Error(`No such action : ${action.type}`);
  }
};
