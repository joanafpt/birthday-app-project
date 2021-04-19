import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from './CloseButton';
import TargetUser from './TargetUser';
import ModalTitle from './ModalTitle';
import ModalSurroundingDiv from './ModalSurroundingDiv';
import CredentialsToChangeDatabase from './CredentialsToChangeDatabase';
import { useRecordsStore } from '../store/RecordsStoreProvider';
import SaveButton from './SaveButton';

const ModalDeletion = (props) => {
  const { t } = useTranslation();

  const {
    selectedUser: { selectedName, selectedSurName },
  } = props;

  const {
    recordsState,
    deleteUserRecord,
    updateLocalStoreValues,
  } = useRecordsStore();

  const deleteRec = () => {
    deleteUserRecord({
      nameToDeleteOrEdit: recordsState.nameToDeleteOrEdit,
      surnameToDeleteOrEdit: recordsState.surnameToDeleteOrEdit,
      passwordToDeleteOrEdit: recordsState.passwordToDeleteOrEdit,
    });

    updateLocalStoreValues({
      nameToDeleteOrEdit: '',
      surnameToDeleteOrEdit: '',
      passwordToDeleteOrEdit: '',
      feedbackDeletion: '',
    });
  };

  return (
    <ModalSurroundingDiv id="exampleModalCenter">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <ModalTitle>{t('deleteForm.title')}</ModalTitle>

            <CloseButton className="close">
              <span aria-hidden="true">&times;</span>
            </CloseButton>
          </div>
          <div className="modal-body">
            <TargetUser>
              {t('deleteForm.subtitle')} {selectedName} {selectedSurName}.
            </TargetUser>
            <TargetUser>{t('deleteForm.subtitle2')}</TargetUser>
            <CredentialsToChangeDatabase />
            {recordsState.feedbackDeletion}

            <SaveButton onClick={deleteRec} id="delete-button">
              {t('deleteForm.deleteButtonLabel')}
            </SaveButton>
          </div>
        </div>
      </div>
    </ModalSurroundingDiv>
  );
};
export default ModalDeletion;
