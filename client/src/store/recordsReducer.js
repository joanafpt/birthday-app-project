import initialState from './initialState';
import {
  CREATE_RECORD,
  UPDATE_STORE_VALUES,
  DELETE_RECORD,
  SET_LIST_RECORDS,
  FEED_LIST_OF_COUNTRIES,
  EDIT_RECORD,
  CLICK_ON_FRIEND_RECORD,
} from './actions';

const recordsReducer = (state = initialState, action) => {
  if (action.type === CREATE_RECORD) {
    return {
      ...state,
    };
  }
  if (action.type === UPDATE_STORE_VALUES) {
    const { newValuesObject } = action.payload;
    return {
      ...state,
      ...newValuesObject,
    };
  }
  if (action.type === DELETE_RECORD) {
    if (action.data.unauthorized) {
      return {
        ...state,
        feedbackDeletionUnauthorized: action.data.unauthorized,
      };
    }
    if (action.data.success) {
      return {
        ...state,
        feedbackDeletion: action.data.success,
      };
    }
    return { ...state };
  }
  if (action.type === SET_LIST_RECORDS) {
    if (action.listOfRecords === undefined) {
      return {
        ...state,
      };
    }
    return {
      ...state,
      listOfPeople: action.listOfRecords.people,
      initialLoaded: true,
    };
  }

  if (action.type === FEED_LIST_OF_COUNTRIES) {
    return { ...state, countries: action.data };
  }
  if (action.type === EDIT_RECORD) {
    if (action.dataToChange.success) {
      return {
        ...state,
        feedbackEdition: action.dataToChange.success,
      };
    }
    if (action.dataToChange.unauthorized) {
      return {
        ...state,
        feedbackEdition: action.dataToChange.unauthorized,
      };
    }
  }
  if (action.type === CLICK_ON_FRIEND_RECORD) {
    return {
      ...state,
    };
  }
  return state;
};
export default recordsReducer;
