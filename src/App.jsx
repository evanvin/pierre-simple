import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

import List from './components/List';
const LS_KEY = 'pierre-list';

class App extends React.Component {
  state = { list: [] };

  componentDidMount() {
    if (localStorage.getItem(LS_KEY)) {
      this.setState({ list: JSON.parse(localStorage.getItem(LS_KEY)) });
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify([]));
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <List list={list} />
      </div>
    );
  }
}
export default App;
