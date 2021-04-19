import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import Disclaimer from './Disclaimer';
import Label from './Label';
import { useRecordsStore } from '../store/RecordsStoreProvider';
import './CredentialsToChangeDatabase.css';

const CredentialsToChangeDatabase = () => {
  const {
    recordsState,
    // deleteUserRecord,
    updateLocalStoreValues,
  } = useRecordsStore();
  const { t } = useTranslation();
  const onChangeValues = (event) => {
    updateLocalStoreValues({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="row">
      <div className="col">
        <Disclaimer />
        <form>
          <div className="row">
            <div className="col-4">
              <Label>{t('updateForm.name')}</Label>
            </div>
            <div className="col-8">
              <Input
                type="text"
                placeholder={t('placeholders.placeholderForName')}
                className="form-control mb-2"
                id="name-input"
                value={recordsState.nameToDeleteOrEdit || ''}
                onChange={onChangeValues}
                name="nameToDeleteOrEdit"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <Label>{t('updateForm.surname')}</Label>
            </div>
            <div className="col-8">
              <Input
                type="text"
                placeholder={t('placeholders.placeholderForSurname')}
                className="form-control mb-2"
                id="surname-input"
                value={recordsState.surnameToDeleteOrEdit || ''}
                onChange={onChangeValues}
                name="surnameToDeleteOrEdit"
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
                className="form-control mb-2"
                id="pswd-input"
                value={recordsState.passwordToDeleteOrEdit || ''}
                onChange={onChangeValues}
                name="passwordToDeleteOrEdit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CredentialsToChangeDatabase;
