import React, { Component } from 'react'
import * as actionCreators from './state/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class AppComponent extends Component {
  render () {
    return (
      <div className="App">
        i am testing!
      </div>
    )
  }

  componentDidMount () {
  }
}

export const App = connect(
  state => ({ }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AppComponent);

export default App;