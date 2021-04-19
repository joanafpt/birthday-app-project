import React from 'react';
import { useRecordsStore } from '../store/RecordsStoreProvider';
import './BirthdayMessage.css';

const BirthdayMessage = () => {
  const { recordsState } = useRecordsStore();

  if (
    recordsState.name !== undefined &&
    recordsState.country !== undefined &&
    recordsState.dayOfBirth !== undefined &&
    recordsState.monthOfBirth !== undefined &&
    recordsState.nextAge !== undefined
  ) {
    return (
      <div className="container">
        <div className="row">
          <div className="result">{`Hello ${recordsState.name} from ${recordsState.country}, 
          on day ${recordsState.dayOfBirth} of ${recordsState.monthOfBirth} you will have ${recordsState.nextAge} years`}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default BirthdayMessage;
