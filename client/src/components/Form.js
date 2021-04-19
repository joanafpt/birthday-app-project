import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import Label from './Label';
import CountrySelect from './CountrySelect';
import { useRecordsStore } from '../store/RecordsStoreProvider';

const Form = () => {
  const { t } = useTranslation();
  const {
    recordsState,
    getTheCountries,
    updateLocalStoreValues,
  } = useRecordsStore();
  const countryRef = React.createRef();

  useEffect(() => {
    getTheCountries();
  }, []);

  const onChangeValue = (event) => {
    updateLocalStoreValues({
      [event.target.name]: event.target.value,
      dayOfBirth: undefined,
      monthOfBirth: undefined,
      nextAge: undefined,
      error: undefined,
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.name')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForName')}
            name="name"
            value={recordsState.name || ''}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.surname')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForSurname')}
            name="surname"
            value={recordsState.surname || ''}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.country')}</Label>
        </div>
        <div className="col-8">
          <CountrySelect
            name="country"
            ref={countryRef}
            onChange={onChangeValue}
            value={recordsState.country || ''}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.birthday')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForBirthday')}
            name="birthday"
            value={recordsState.birthday || ''}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.password')}</Label>
        </div>
        <div className="col-8">
          <Input
            type="password"
            placeholder={t('placeholders.placeholderForPassword')}
            name="password"
            value={recordsState.password || ''}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('createRecordForm.confirmPassword')}</Label>
        </div>
        <div className="col-8">
          <Input
            type="password"
            placeholder={t('placeholders.placeholderForPassword')}
            name="confirmation"
            value={recordsState.confirmation || ''}
            onChange={onChangeValue}
          />
        </div>
      </div>

      {recordsState.error}
    </>
  );
};
export default Form;
