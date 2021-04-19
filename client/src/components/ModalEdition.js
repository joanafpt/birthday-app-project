import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from './CloseButton';
import Disclaimer from './Disclaimer';
import ModalTitle from './ModalTitle';
import TargetUser from './TargetUser';
import ModalSurroundingDiv from './ModalSurroundingDiv';
import FieldsToEdit from './FieldsToEdit';
import SaveButton from './SaveButton';
import { useRecordsStore } from '../store/RecordsStoreProvider';

const ModalEdition = (props) => {
  const {
    recordsState,
    editUserRecord,
    updateLocalStoreValues,
  } = useRecordsStore();

  const {
    selectedUser: { selectedName, selectedSurName },
  } = props;

  const { t } = useTranslation();
  const changeRec = () => {
    editUserRecord({
      selectedUserName: props.selectedUser.selectedName,
      selectedUserSurname: props.selectedUser.selectedSurName,
      name: recordsState.name,
      surname: recordsState.surname,
      birthday: recordsState.birthday,
      country: recordsState.country,
      password: recordsState.password,
      confirmPassword: recordsState.confirmation,
    });
    updateLocalStoreValues({
      selectedUserName: '',
      selectedUserSurname: '',
      // name: '',
      surname: '',
      birthday: '',
      // country: '',
      password: '',
    });
  };

  return (
    <ModalSurroundingDiv id="exampleModalCenter1">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <ModalTitle>{t('updateForm.title')}</ModalTitle>
            <CloseButton className="close">
              <span aria-hidden="true">&times;</span>
            </CloseButton>
          </div>
          <div className="modal-body">
            <TargetUser>
              {t('updateForm.subtitle')} {selectedName} {selectedSurName}
            </TargetUser>
            <Disclaimer>{t('updateForm.firstInstructions')}</Disclaimer>
            <Disclaimer>{t('updateForm.secondInstructions')}</Disclaimer>
            <FieldsToEdit />

            {recordsState.error}
            {recordsState.feedbackEdition}

            <SaveButton id="edit-button" onClick={changeRec}>
              {t('updateForm.editButtonLabel')}
            </SaveButton>
          </div>
        </div>
      </div>
    </ModalSurroundingDiv>
  );
};

export default ModalEdition;
