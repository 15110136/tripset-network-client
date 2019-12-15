export const SET_MAP = 'SET_MAP';
export const SET_PLACE_SERVICE = 'SET_PLACE_SERVICE';
export const CLEAR_MAP = 'CLEAR_MAP';

export const mapInitialState = {
  Maps: null,
  placeService: null
};

export const mapReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        Maps: action.payload,
      };
    case SET_PLACE_SERVICE:
      return {
        ...state,
        placeService: action.payload
      }
    case CLEAR_MAP: {
      return {
        ...state,
        ...mapInitialState,
      };
    }

    default:
      return state;
  }
};