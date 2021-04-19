import moment from 'moment';

moment().format();

const validateDateFormat = (birthday) => {
  if (birthday.isValid()) {
    return true;
  }
  return false;
};

const validateIfStateEmpty = (
  name,
  surname,
  birthday,
  country,
  password,
  confirmation,
) => {
  if (
    name === undefined ||
    surname === undefined ||
    birthday === undefined ||
    country === undefined ||
    password === undefined ||
    confirmation === undefined
  ) {
    return true;
  }
  if (
    name.trim().length === 0 ||
    surname.trim().length === 0 ||
    birthday.trim().length === 0 ||
    password.trim().length === 0 ||
    confirmation.trim().length === 0
  ) {
    return true;
  }
  return false;
};

const getAge = (birthDate) => {
  const today = moment().startOf('day');
  const age = today.diff(birthDate, 'years');
  return age;
};

const getBirthDate = (birthdateString) =>
  moment(birthdateString, 'MM/DD/YYYY', true).startOf('day');

const handleErrorsOnAPICalls = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const helpers = {
  validateDateFormat,
  validateIfStateEmpty,
  getAge,
  getBirthDate,
  handleErrorsOnAPICalls,
};

export default helpers;
