import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Label from './Label';
import Input from './Input';
import CountrySelect from './CountrySelect';
import { useRecordsStore } from '../store/RecordsStoreProvider';

const FieldsToEdit = () => {
  const {
    recordsState,
    getTheCountries,
    updateLocalStoreValues,
  } = useRecordsStore();
  const { t } = useTranslation();
  useEffect(() => {
    getTheCountries();
  }, []);

  const onEditValue = (event) => {
    updateLocalStoreValues({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <div className="row">
        <div className="col-4">
          <Label>{t('updateForm.name')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForName')}
            name="name"
            value={recordsState.name || ''}
            onChange={onEditValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('updateForm.surname')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForSurname')}
            name="surname"
            value={recordsState.surname || ''}
            onChange={onEditValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('updateForm.country')}</Label>
        </div>
        <div className="col-8">
          <CountrySelect
            name="country"
            onChange={onEditValue}
            value={recordsState.country}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('updateForm.birthday')}</Label>
        </div>
        <div className="col-8">
          <Input
            placeholder={t('placeholders.placeholderForBirthday')}
            name="birthday"
            value={recordsState.birthday || ''}
            onChange={onEditValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <Label>{t('updateForm.password')}</Label>
        </div>
        <div className="col-8">
          <Input
            type="password"
            placeholder={t('placeholders.placeholderForPassword')}
            name="password"
            value={recordsState.password || ''}
            onChange={onEditValue}
          />
        </div>
      </div>
    </form>
  );
};
export default FieldsToEdit;
