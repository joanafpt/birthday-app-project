import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import ModalDeletion from './ModalDeletion';
import ModalEdition from './ModalEdition';
import IconsButtons from './IconsButtons';
import { useRecordsStore } from '../store/RecordsStoreProvider';
import './Data.css';

const Data = () => {
  const {
    recordsState,
    getPeople,
    updateLocalStoreValues,
    clickFriend,
  } = useRecordsStore();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedUser, getSelectedUser] = useState({
    selectedName: '',
    selectedSurname: '',
  });

  const toggleDelete = (personName, prsonSurname) => {
    updateLocalStoreValues({
      error: '',
      feedbackDeletion: '',
      feedbackEdition: '',
    });
    getSelectedUser({
      selectedName: personName,
      selectedSurName: prsonSurname,
    });
    if (deleteModalIsOpen) {
      setDeleteModalIsOpen(false);
    } else {
      setDeleteModalIsOpen(true);
    }
  };

  const toggleEdit = (personName, prsonSurname) => {
    updateLocalStoreValues({
      error: '',
      feedbackDeletion: '',
      feedbackEdition: '',
    });
    getSelectedUser({
      selectedName: personName,
      selectedSurName: prsonSurname,
    });
    if (editModalIsOpen) {
      setEditModalIsOpen(false);
    } else {
      setEditModalIsOpen(true);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return !recordsState.initialLoaded ? (
    <Loading />
  ) : (
    <>
      <div className="around-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('table.name')}</th>
              <th scope="col">{t('table.country')}</th>
              <th scope="col">{t('table.birthday')}</th>
            </tr>
          </thead>
          <tbody>
            {recordsState.listOfPeople.map((person) => {
              const countryLanguage = recordsState.language;
              const countryObject = recordsState.countries.find(
                (country) => country.name === person.country,
              );
              const translatedCountry =
                countryLanguage &&
                countryObject &&
                countryObject.translations[countryLanguage]
                  ? countryObject.translations[countryLanguage]
                  : person.country;

              return (
                <tr // eslint-disable-next-line no-underscore-dangle
                  key={person._id}
                  onClick={() => {
                    clickFriend({
                      name: person.name,
                      surname: person.surname,
                      birthday: person.birthday,
                      country: person.country,
                    });
                  }}
                >
                  <td className="list-item">
                    {person.name}
                    {'  '} {person.surname}
                  </td>
                  <td className="list-item">{translatedCountry}</td>
                  <td className="list-item">{person.birthday}</td>

                  <td className="list-item">
                    <div className="row">
                      <IconsButtons
                        dataToggle="modal"
                        dataTarget="#exampleModalCenter"
                        onClick={() =>
                          toggleDelete(person.name, person.surname)
                        }
                      >
                        <MdDelete />
                      </IconsButtons>
                      <IconsButtons
                        dataToggle="modal"
                        dataTarget="#exampleModalCenter1"
                        onClick={() => toggleEdit(person.name, person.surname)}
                      >
                        <MdEdit />
                      </IconsButtons>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ModalDeletion onClick={toggleDelete} selectedUser={selectedUser} />
      <ModalEdition onClick={toggleEdit} selectedUser={selectedUser} />
    </>
  );
};

export default Data;
