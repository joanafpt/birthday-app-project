import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecordsStore } from '../store/RecordsStoreProvider';
import './CountrySelect.css';

const CountrySelect = React.forwardRef((props, ref) => {
  const { recordsState } = useRecordsStore();
  const { value } = props;
  const { t } = useTranslation();
  return recordsState.countries.length > 0 ? (
    <select
      className="form-control mb-1"
      ref={ref}
      name={props.name}
      onChange={props.onChange}
      value={value || ''}
    >
      <option value="" disabled selected>
        {t('createRecordForm.selectTitle')}
      </option>
      {recordsState.countries.map((item) => (
        <option value={item.name} key={item.name}>
          {recordsState.language && item.translations[recordsState.language]
            ? item.translations[recordsState.language]
            : item.name}
        </option>
      ))}
    </select>
  ) : (
    <select className="form-control mb-1">
      <option value="" disabled selected>
        {t('errors.somethingWentWrong')}
      </option>
    </select>
  );
});
const ref = React.createRef();
<CountrySelect ref={ref} />;

export default CountrySelect;
