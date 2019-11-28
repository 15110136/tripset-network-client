export const mapInitialState = {
  Map: null,
};

export const mapReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case 'SET_MAP':
      return {
        ...state,
        Map: action.payload,
      };
    case 'CLEAR_MAP': {
      return {
        ...state,
        ...mapInitialState,
      };
    }

    default:
      return state;
  }
};