import helpers from '../helpers/helpers';

const HTTP = 'https://';
const SERVER = 'birthday-app-project.herokuapp.com';
const GET_COUNTRIES = 'https://restcountries.eu/rest/v2/all';
const CREATE_A_RECORD = `${HTTP + SERVER}/create-record`;
const UPDATE_A_RECORD = `${HTTP + SERVER}/update-record`;
const DELETE_A_RECORD = `${HTTP + SERVER}/delete-record`;
const GET_A_LIST_OF_RECORDS = `${HTTP + SERVER}/get-a-list-of-records`;

const fillDbWithCountries = (callbackListCountries) => {
  fetch(GET_COUNTRIES, {
    method: 'GET',
  })
    .then(helpers.handleErrorsOnAPICalls)
    .then((response) => response.json())
    .then((data) => {
      callbackListCountries(data);
    })
    .catch((error) => console.log(error));
};

const createRecordOnDB = (data, callbackDeletion) => {
  fetch(CREATE_A_RECORD, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .catch((error) => {
      console.log('error:', error);
    })
    .then((response) => response.json())
    .then((response) => {
      if (callbackDeletion) {
        callbackDeletion(response);
      }
    });
};

const getListOfEntries = (callback) => {
  fetch(GET_A_LIST_OF_RECORDS, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .catch((error) => console.log('error:', error))
    .then((response) => response.json())
    .then((response) => {
      callback(response);
    });
};

const deleteMyRecordOnDB = (data, callback) => {
  const dataToSendToDB = {
    nameToDeleteOrEdit: data.nameToDeleteOrEdit.trim(),
    surnameToDeleteOrEdit: data.surnameToDeleteOrEdit.trim(),
    passwordToDeleteOrEdit: data.passwordToDeleteOrEdit,
  };
  fetch(DELETE_A_RECORD, {
    method: 'DELETE',
    body: JSON.stringify(dataToSendToDB),
    headers: {
      'content-type': 'application/json',
    },
  })
    .catch((error) => console.log('error:', error))
    .then((response) => response.json())
    .then((response) => {
      if (callback) {
        callback(response);
      }
    });
};

const editRecordOnDB = (dataToUpdate, callbackUpdate) => {
  fetch(UPDATE_A_RECORD, {
    method: 'PUT',
    body: JSON.stringify(dataToUpdate),
    headers: {
      'content-type': 'application/json',
    },
  })
    .catch((error) => console.log('error:', error))
    .then((response) => response.json())
    .then((response) => {
      if (callbackUpdate) {
        callbackUpdate(response);
      }
    });
};

const functions = {
  createRecordOnDB,
  fillDbWithCountries,
  getListOfEntries,
  deleteMyRecordOnDB,
  editRecordOnDB,
};

export default functions;
