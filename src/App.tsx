import React, { Dispatch } from 'react';
import {connect, DispatchProp} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {fetchFruits} from './Actions';

const App: React.FC = (props: any) => {
  const { dispatch, fruits } = props;
  dispatch(fetchFruits);
  console.log(fruits);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function mapStateToProps (state: any) {
  return {
    fruits: state.fruit.fruits
  }
}
export default connect(mapStateToProps, null)(App);
