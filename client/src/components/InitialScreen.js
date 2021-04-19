import React from 'react';
import './InitialScreen.css';
import { useTranslation } from 'react-i18next';
import Form from './Form';
import Data from './Data';
import BirthdayMessage from './BirthdayMessage';
import NameAndLastName from './NameAndLastName';
import SaveButton from './SaveButton';
import { useRecordsStore } from '../store/RecordsStoreProvider';

const InitialScreen = () => {
  const { sendRecord } = useRecordsStore();
  const { t } = useTranslation();
  const internalSendRecord = (event) => {
    event.preventDefault();
    sendRecord();
  };

  return (
    <div className="container external-box">
      <div className="row justify-content-center">
        <div
          className="col-sm-12 col-md-6 col-lg-6"
          style={{
            backgroundColor: '#e4e7ed',
            paddingTop: '2vh',
            paddingBottom: '2vh',
          }}
        >
          <Form />

          <SaveButton id="save-button" onClick={internalSendRecord}>
            {t('createRecordForm.saveButtonLabel')}
          </SaveButton>

          <BirthdayMessage />
        </div>
        <div
          className="col-sm-12 col-md-6 col-lg-6"
          style={{
            backgroundColor: '#e4e7ed',
            paddingTop: '2vh',
            paddingBottom: '2vh',
          }}
        >
          <Data />
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            backgroundColor: '#e4e7ed',
          }}
        >
          <NameAndLastName />
        </div>
      </div>
    </div>
  );
};
export default InitialScreen;
