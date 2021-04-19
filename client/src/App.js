import React from 'react';
import InitialScreen from './components/InitialScreen';
import LanguageSelectButton from './components/LanguageSelectButton';

const App = () => (
  <div className="App">
    <div className="container">
      <InitialScreen />
      <LanguageSelectButton />
    </div>
  </div>
);
export default App;
