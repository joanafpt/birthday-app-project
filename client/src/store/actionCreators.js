import {
  CREATE_RECORD,
  UPDATE_STORE_VALUES,
  DELETE_RECORD,
  SET_LIST_RECORDS,
  FEED_LIST_OF_COUNTRIES,
  EDIT_RECORD,
  CLICK_ON_FRIEND_RECORD,
} from './actions';

export const createRecord = (data) => ({
  type: CREATE_RECORD,
  data,
});

export const updateLocalStoreValuesAction = (newValuesObject) => ({
  type: UPDATE_STORE_VALUES,
  payload: { newValuesObject },
});

export const deleteRecord = (data) => ({
  type: DELETE_RECORD,
  data,
});

export const getListOfRecords = (listOfRecords) => ({
  type: SET_LIST_RECORDS,
  listOfRecords,
});

export const feedListOfCountries = (data) => ({
  type: FEED_LIST_OF_COUNTRIES,
  data,
});

export const editRecordValuesStoredInDatabase = (dataToChange) => ({
  type: EDIT_RECORD,
  dataToChange,
});

export const clickOnAFriendRecord = (data) => ({
  type: CLICK_ON_FRIEND_RECORD,
  data,
});
