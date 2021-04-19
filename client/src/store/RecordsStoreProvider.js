import React from 'react';
import { useReducer } from 'reinspect';
import { useTranslation } from 'react-i18next';
import api from '../api/api';
import * as ActionCreators from './actionCreators';
import helpers from '../helpers/helpers';

const RecordsStore = React.createContext();
export const useRecordsStore = () => React.useContext(RecordsStore);

export const RecordsStoreProvider = ({
  children,
  initialState,
  recordsReducer,
}) => {
  const { t } = useTranslation();

  const [recordsState, dispatch] = useReducer(
    recordsReducer,
    initialState,
    (state) => state,
    'records',
  );
  const updateLocalStoreValues = (newValuesObject) => {
    dispatch(ActionCreators.updateLocalStoreValuesAction(newValuesObject));
  };

  const sendRecord = () => {
    if (
      helpers.validateIfStateEmpty(
        recordsState.name,
        recordsState.surname,
        recordsState.birthday,
        recordsState.country,
        recordsState.password,
        recordsState.confirmation,
      )
    ) {
      updateLocalStoreValues({ error: t('errors.fillAllTheFields') });
      return;
    }
    const birthdayDate = helpers.getBirthDate(recordsState.birthday);

    if (
      helpers.validateDateFormat(birthdayDate) &&
      recordsState.password === recordsState.confirmation
    ) {
      api.createRecordOnDB({
        name: recordsState.name,
        surname: recordsState.surname,
        birthday: recordsState.birthday,
        country: recordsState.country,
        password: recordsState.password,
        confirmPassword: recordsState.confirmation,
      });

      const nextAge = helpers.getAge(birthdayDate) + 1;

      updateLocalStoreValues({
        dayOfBirth: birthdayDate.date(),
        monthOfBirth: birthdayDate.format('MMMM'),
        nextAge,
        error: '',
        password: '',
        confirmation: '',
      });
    } else {
      updateLocalStoreValues({
        error: t('errors.checkProvidedData'),
      });
    }
  };

  const callbackListCountries = (data) => {
    dispatch(ActionCreators.feedListOfCountries(data));
  };

  const getTheCountries = () => {
    api.fillDbWithCountries(callbackListCountries /* , errorWarningFn */);
  };

  const callbackWithPeople = (data) => {
    dispatch(ActionCreators.getListOfRecords(data));
  };
  const getPeople = () => {
    api.getListOfEntries(callbackWithPeople);
  };

  const callbackDeletion = (data) => {
    dispatch(ActionCreators.deleteRecord(data));
  };

  const deleteUserRecord = (receivedInfo) => {
    api.deleteMyRecordOnDB(receivedInfo, callbackDeletion);
  };

  const callbackUpdate = (data) => {
    dispatch(ActionCreators.editRecordValuesStoredInDatabase(data));
  };

  const editUserRecord = (receivedInfo) => {
    if (
      receivedInfo.name.length === 0 &&
      receivedInfo.surname.length === 0 &&
      receivedInfo.birthday.length === 0 &&
      receivedInfo.country.length === 0
    ) {
      updateLocalStoreValues({
        error: t('errors.noChange'),
      });
      return;
    }
    if (receivedInfo.password.length === 0) {
      updateLocalStoreValues({
        error: t('errors.noPassword'),
        name: '',
        surname: '',
        birthday: '',
        country: '',
        password: '',
      });
      return;
    }

    const dataToUpdt = {
      selectedUserName: receivedInfo.selectedUserName,
      selectedUserSurname: receivedInfo.selectedUserSurname,
      name: receivedInfo.name,
      surname: receivedInfo.surname,
      birthday: receivedInfo.birthday,
      country: receivedInfo.country,
      password: receivedInfo.password,
    };
    api.editRecordOnDB(dataToUpdt, callbackUpdate);
  };

  const clickFriend = (data) => {
    const bdayDate = helpers.getBirthDate(data.birthday);
    const ageInNextBday = helpers.getAge(bdayDate) + 1;

    updateLocalStoreValues({
      name: data.name,
      country: data.country,
      dayOfBirth: bdayDate.date(),
      monthOfBirth: bdayDate.format('MMMM'),
      nextAge: ageInNextBday,
      error: '',
    });
  };

  return (
    <RecordsStore.Provider
      value={{
        recordsState,
        sendRecord,
        getTheCountries,
        updateLocalStoreValues,
        getPeople,
        deleteUserRecord,
        editUserRecord,
        clickFriend,
        dispatch,
      }}
    >
      {children}
    </RecordsStore.Provider>
  );
};
