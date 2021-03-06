import React from 'react';
import {Container, Column, Row} from './styles/layout';
import Inputs from './Inputs';
import Graph from './Graph';
import {compose, withProps} from 'recompose';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {datesChanged} from './actions';
import defaults from './defaults';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk, logger)
))

const App = (props) => {
  return (
    <Provider store={store}>
      <Container>
        <Column grow>
         <h1>Exchango Patronum!</h1>
          <Row grow>
            <Inputs />
            <Graph />
          </Row>
        </Column>
      </Container>
    </Provider>
  );
}

const enhance = compose(
  withProps(() => { store.dispatch(datesChanged(defaults.fromDate, defaults.toDate)) })
)

export default enhance(App);
