import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

import List from './components/List';
const LS_KEY = 'pierre-list';

class App extends React.Component {
  state = { list: [], itemNames: [] };

  sortList = (list) => {
    list.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  addItem = (itemName) => {
    const { list, itemNames } = this.state;
    list.push({
      name: itemName.toUpperCase(),
      aisle: '',
      store: '',
      qty: 1,
    });

    this.sortList(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
    itemNames.push(itemName.toUpperCase());
    itemNames.sort();
    this.setState({ list, itemNames });
  };

  updateItem = (oldItemName, newItem) => {
    const { list, itemNames } = this.state;
    const idx1 = list.findIndex((i) => i.name === oldItemName);
    list.splice(idx1, 1);
    list.push(newItem);
    this.sortList(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));

    const idx2 = itemNames.findIndex((i) => i === oldItemName);
    itemNames.splice(idx2, 1);
    itemNames.push(newItem.name);
    itemNames.sort();

    this.setState({ list, itemNames });
  };

  removeItem = (item) => {
    const { list, itemNames } = this.state;
    const idx1 = list.findIndex((i) => i.name === item.name);
    list.splice(idx1, 1);
    localStorage.setItem(LS_KEY, JSON.stringify(list));

    const idx2 = itemNames.findIndex((i) => i === item.name);
    itemNames.splice(idx2, 1);

    this.setState({ list, itemNames });
  };

  componentDidMount() {
    if (localStorage.getItem(LS_KEY)) {
      const list = JSON.parse(localStorage.getItem(LS_KEY));
      const itemNames = list.map((i) => i.name);
      this.setState({ list, itemNames });
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify([]));
    }
  }

  render() {
    const { list, itemNames } = this.state;
    console.log(list);
    return (
      <div>
        <List
          list={list}
          itemNames={itemNames}
          add={this.addItem}
          update={this.updateItem}
          remove={this.removeItem}
        />
      </div>
    );
  }
}
export default App;
