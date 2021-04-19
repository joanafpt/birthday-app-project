import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecordsStore } from '../store/RecordsStoreProvider';

const LanguageSelectButton = () => {
  const { i18n } = useTranslation();
  const { recordsState, updateLocalStoreValues } = useRecordsStore();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    updateLocalStoreValues({
      error: '',
      feedbackDeletion: '',
      feedbackEdition: '',
      language,
    });
  };

  return (
    <div>
      {recordsState.availableLanguages.map((language) => (
        <button
          key={language}
          className={`btn btn-primary ${
            recordsState.language === language ? 'active' : ''
          }`}
          type="button"
          aria-pressed={recordsState.language === language ? 'true' : ''}
          onClick={() => changeLanguage(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
export default LanguageSelectButton;
