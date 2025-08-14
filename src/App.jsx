import React from 'react';
import Home from './Home';
import MatchList from './MatchList';
import Classmate from './Classmates';

function App() {
  const currentUser = new Classmate("You", ["CS310", "MATH110"], ["Music"]);
  
  return (
    <div className="App">
     <Home />
    </div>
  );
}

export default App;
