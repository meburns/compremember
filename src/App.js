import React, {useState} from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({});

  function _handleChange(e) {
    setState({orgText: e.target.value});
  }

  function _handleStart() {
    // TODO handle new lines
    // TODO add new position size (1, 2, etc words at a time)
    // TODO add default strings (eph 3:16-19, etc)
    // TODO add materialUI grid and basic styling
    setState({
      ...state,
      hideText: true,
      text: state.orgText.split(" "),
      textPosition: 0
    });
  }

  function _handlePrevious() {
    let newPosition = state.textPosition >= 1 ? state.textPosition - 1 : state.textPosition;
    setState({
      ...state,
      textPosition: newPosition,
      newText: state.text.slice(0, newPosition).map(x => x + " ")
    });
  }

  function _handleNext() {
    let newPosition = state.textPosition <= state.text.length ? state.textPosition + 1 : state.textPosition;
    setState({
      ...state,
      textPosition: newPosition,
      newText: state.text.slice(0, newPosition).map(x => x + " ")
    });
  }

  return (
    <div className="App">
      {!state.hideText && (
        <div>
          <textarea onChange={_handleChange} className="textarea"/>
          <button onClick={_handleStart}>Start</button>
        </div>
      )}
      {state.hideText && (
        <div>
          <button onClick={_handlePrevious}>Previous</button>
          <div>
            {state.newText}
          </div>
          <button onClick={_handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
