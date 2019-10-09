import React, {useState} from 'react';
import { Grid, Button, Slider } from "@material-ui/core";
import './App.css';
import data from './defaultStrings.json';

function App() {
  const [state, setState] = useState({newText: [], chunk: 1});

  const marks = [
    {
      value: 1,
      label: '1 word',
    },
    {
      value: 2,
      label: '2 words',
    },
    {
      value: 3,
      label: '3 words',
    },
    {
      value: 4,
      label: '4 words',
    },
    {
      value: 5,
      label: '5 words',
    }
  ];

  function _handleChange(value) {
    setState({...state, orgText: value});
  }

  function _changeStep(event, newValue) {
    setState({...state, chunk: newValue});
  }

  function _handleStart() {
    // TODO add more options for memorizing (flipcard, etc)
    setState({
      ...state,
      hideText: true,
      text: state.orgText.split(" "),
      textPosition: 0
    });
  }

  function _handlePrevious() {
    let newPosition = state.textPosition >= 1 ? state.textPosition - state.chunk : state.textPosition;
    setState({
      ...state,
      textPosition: newPosition,
      newText: state.text.slice(0, newPosition)
    });
  }

  function _handleNext() {
    let newPosition = state.textPosition <= state.text.length ? state.textPosition + state.chunk : state.textPosition;
    setState({
      ...state,
      textPosition: newPosition,
      newText: state.text.slice(0, newPosition)
    });
  }

  function getText() {
    let words = [];

    for (let i = 0; i < state.newText.length; i++) {
      let a = state.newText[i];
      if (a === "\\n") {
        words.push(<br/>);
        a = state.text[i + state.chunk];
      }
      words.push(<span className="word" key={i}>{a}&nbsp;</span>);
    }

    return words;
  }

  return (
    <Grid container className="App">
      <Grid item xs={12}>
        <Grid container>
          {!state.hideText && (
            <React.Fragment>
              <Grid item xs={12}>
                <textarea onChange={(e)=>{_handleChange(e.target.value)}} className="textarea" placeholder="Add text or click a preset below"/>
                <Button onClick={_handleStart} className="button" disableRipple>Start</Button>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={()=>{_handleChange(data.eph3Prayer)}} className="button" disableRipple>eph3</Button>
              </Grid>
            </React.Fragment>
          )}
          {state.hideText && (
            <React.Fragment>
              <Grid item xs={12} className="words">
                {getText()}
              </Grid>
              <Grid item xs={6} className="steps">
                <Button onClick={_handlePrevious} className="step-button" disableRipple>Previous</Button>
              </Grid>
              <Grid item xs={6} className="steps">
                <Button onClick={_handleNext} className="step-button" disableRipple>Next</Button>
              </Grid>
              <Grid item xs={12} className="words">
                <Slider
                  defaultValue={1}
                  step={1}
                  min={1}
                  max={5}
                  marks={marks}
                  onChange={_changeStep}
                />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
