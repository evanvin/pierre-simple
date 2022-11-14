import { formatList } from './utils/utils';
import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import axios from 'axios';

import List from './components/List';

const BASE_URL = 'https://clovereartquakedog.pythonanywhere.com/pierre';

class App extends React.Component {
  state = { list: [], itemNames: [], isLoading: true };

  sortList = (list) => {
    list.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  addItem = (itemName, store, aisle) => {
    const { list, itemNames } = this.state;
    // Aisle massaging
    if (aisle && aisle !== '') {
      aisle = aisle.toUpperCase();
    } else {
      aisle = 'OTHER';
    }

    const item = {
      name: itemName.toUpperCase(),
      aisle,
      store,
      qty: 1,
    };

    axios.post(`${BASE_URL}/add`, item).then((res) => {
      item['id'] = res.data;
      list.push(item);
      this.sortList(list);
      itemNames.push(itemName.toUpperCase());
      itemNames.sort();
      this.setState({ list, itemNames });
    });
  };

  updateItem = (oldItemName, newItem) => {
    const { list, itemNames } = this.state;
    const idx1 = list.findIndex((i) => i.name === oldItemName);
    list.splice(idx1, 1);
    list.push(newItem);
    this.sortList(list);
    const idx2 = itemNames.findIndex((i) => i === oldItemName);
    itemNames.splice(idx2, 1);
    itemNames.push(newItem.name);
    itemNames.sort();

    if (!newItem.qty) {
      newItem.qty = 1;
    }

    if (!newItem.aisle) {
      newItem.aisle = 'OTHER';
    }

    axios.patch(`${BASE_URL}/update`, newItem).then((res) => {
      console.log(res);
      this.setState({ list, itemNames });
    });
  };

  removeItem = (item) => {
    const { list, itemNames } = this.state;
    const idx1 = list.findIndex((i) => i.name === item.name);
    list.splice(idx1, 1);
    const idx2 = itemNames.findIndex((i) => i === item.name);
    itemNames.splice(idx2, 1);
    axios.delete(`${BASE_URL}/delete/${item['id']}`).then((res) => {
      console.log(res);
      this.setState({ list, itemNames });
    });
  };

  clearList = () => {
    const { list } = this.state;
    const ids = list.map((i) => i['id']);
    console.log(ids);
    axios.post(`${BASE_URL}/clear`, ids).then((res) => {
      console.log(res);
      this.setState({ list: [], itemNames: [] });
    });
  };

  dragStoreEnd = (end) => {
    const { list } = this.state;
    const idx = list.findIndex((i) => i.id === end.draggableId);
    let item = list[idx];
    item.store = end.destination.droppableId;
    axios.patch(`${BASE_URL}/update`, item).then((res) => {
      console.log(res);
      list[idx] = item;
      this.setState({ list });
    });
  };

  printList = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/publish`, formatList(this.state.list))
      .then((res) => {
        console.log(res);
      });
  };

  createGithubIssue = async () => {
    const issue = prompt(
      'What issue would you like to add to the github project?',
      ''
    );
    if (issue) {
      axios.post(`${BASE_URL}/github_issue`, { issue }).then((res) => {
        console.log(res);
      });
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const list = await axios.get(`${BASE_URL}/list`);
    const itemNames = list.data.map((i) => i.name);
    this.setState({ list: list.data, itemNames, isLoading: false });
  }

  render() {
    const { list, itemNames, isLoading } = this.state;
    return (
      <div>
        <List
          list={list}
          itemNames={itemNames}
          add={this.addItem}
          update={this.updateItem}
          remove={this.removeItem}
          clear={this.clearList}
          print={this.printList}
          dragStoreEnd={this.dragStoreEnd}
          isLoading={isLoading}
          createGithubIssue={this.createGithubIssue}
        />
      </div>
    );
  }
}
export default App;
