import { STORES, SpinnerOverlay } from '../utils/utils';
import React from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Panel,
  Form,
  Button,
  Box,
  Navbar,
  Heading,
} from 'react-bulma-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const { Input, Control, Field } = Form;

class List extends React.Component {
  state = {
    itemToAdd: '',
    itemRepeat: '',
    burgerOpen: false,
    selectedStore: 'Other',
    selectedAisle: null,
  };

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.addItem();
    }
  };

  addItem = () => {
    const { itemNames, add } = this.props;
    const { itemToAdd, selectedStore, selectedAisle } = this.state;

    if (!itemNames.includes(itemToAdd.toUpperCase()) && itemToAdd) {
      // If item with name doesn't already exist, add it
      add(itemToAdd, selectedStore, selectedAisle);
      this.setState({
        itemToAdd: '',
        itemRepeat: '',
        selectedStore: 'Other',
        selectedAisle: null,
      });
    } else {
      // Else show a red outline on the input box
      this.setState({ itemRepeat: 'is-danger' });
    }
  };

  changeItem = (promptText, item, attribute) => {
    const { update } = this.props;
    const newAttribute = prompt(promptText, item[attribute]);
    if (newAttribute) {
      if (
        attribute === 'qty' &&
        !isNaN(newAttribute) &&
        parseInt(newAttribute) !== item.qty
      ) {
        item[attribute] = parseInt(newAttribute);
        update(item.name, item);
      } else if (newAttribute.toUpperCase() !== item[attribute]) {
        item[attribute] = newAttribute.toUpperCase();
        update(item.name, item);
      }
    }
  };

  render() {
    const {
      burgerOpen,
      itemToAdd,
      itemRepeat,
      selectedStore,
      selectedAisle,
    } = this.state;
    const {
      remove,
      list,
      dragStoreEnd,
      isLoading,
      print,
      clear,
      createGithubIssue,
    } = this.props;

    const grouped_list = _.groupBy(list, 'store');
    const group_names = _.uniq(_.map(list, 'store')).sort();

    _.forEach(STORES, (v, k) => {
      if (!group_names.includes(k)) {
        group_names.push(k);
      }
    });

    return (
      <>
        {isLoading ? (
          SpinnerOverlay
        ) : (
          <>
            <Navbar color='dark' fixed='top' active={burgerOpen}>
              <Navbar.Brand>
                <Navbar.Item>
                  <Heading size={3} className='has-text-primary'>
                    Pierre
                  </Heading>
                </Navbar.Item>
                {list.length > 0 && (
                  <Navbar.Item
                    renderAs='div'
                    title='Print List'
                    className='ml clickable'
                    onClick={(e) => {
                      window.confirm(
                        'Are you sure you want to print the list?'
                      ) && print(e);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={['fa', 'print']}
                      className='has-text-primary'
                    />
                  </Navbar.Item>
                )}
                <Navbar.Item
                  renderAs='div'
                  className='clickable'
                  title='Clear Lists'
                  onClick={(e) => {
                    window.confirm(
                      'Are you sure you want to clear the list?'
                    ) &&
                      window.confirm(
                        'Are you really really sure you want to clear the list?'
                      ) &&
                      clear();
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fa', 'broom']}
                    className='has-text-primary'
                  />
                </Navbar.Item>
                <Navbar.Item
                  renderAs='div'
                  title='Add Github Issue'
                  className='clickable'
                  onClick={(e) => {
                    createGithubIssue();
                  }}
                >
                  <FontAwesomeIcon
                    icon={['fa', 'ticket-alt']}
                    className='has-text-primary'
                  />
                </Navbar.Item>
              </Navbar.Brand>
            </Navbar>
            <DragDropContext
              onDragEnd={(e) => {
                dragStoreEnd(e);
              }}
            >
              <Panel>
                <Box>
                  <Field kind='addons'>
                    <Control className='is-expanded'>
                      <Input
                        onKeyPress={(e) => {
                          this.handleKeyPress(e);
                        }}
                        className={itemRepeat}
                        value={itemToAdd}
                        placeholder='Add Item'
                        type='text'
                        onChange={(e) => {
                          this.setState({ itemToAdd: e.target.value });
                        }}
                      />
                    </Control>
                    <Control className='mobile-item-hide'>
                      <span className='select'>
                        <select
                          value={selectedStore}
                          onChange={(e) => {
                            this.setState({ selectedStore: e.target.value });
                          }}
                        >
                          {Object.keys(STORES).map((k) => {
                            return (
                              <option key={`store-option-${k}`} value={k}>
                                {k}
                              </option>
                            );
                          })}
                        </select>
                      </span>
                    </Control>
                    <Control className='mobile-item-hide'>
                      <Input
                        onKeyPress={(e) => {
                          this.handleKeyPress(e);
                        }}
                        value={selectedAisle || ''}
                        placeholder='Aisle'
                        type='text'
                        onChange={(e) => {
                          this.setState({ selectedAisle: e.target.value });
                        }}
                      />
                    </Control>
                    <Control>
                      <Button
                        renderAs='button'
                        onClick={() => {
                          this.addItem();
                        }}
                      >
                        <FontAwesomeIcon icon={['fa', 'plus']} />
                      </Button>
                    </Control>
                    <Control className='mobile-item-hide'>
                      <Button renderAs='button'>
                        <FontAwesomeIcon
                          icon={['fa', 'ban']}
                          onClick={() => {
                            this.setState({
                              itemToAdd: '',
                              itemRepeat: '',
                              selectedStore: 'Other',
                              selectedAisle: null,
                            });
                          }}
                        />
                      </Button>
                    </Control>
                  </Field>
                </Box>
                <div className='store-panels'>
                  <div className='columns is-multiline'>
                    {group_names.map((group) => (
                      <Droppable
                        key={`DROPPABLE-TOP-${group}`}
                        droppableId={group}
                        type='STORE'
                      >
                        {(provDrop, snapDrop) => (
                          <div
                            ref={provDrop.innerRef}
                            {...provDrop.droppableProps}
                            className='column store-panel is-4'
                            key={`Store-Panel-${group}`}
                          >
                            <div className='panel'>
                              <p className='panel-heading'>
                                <span className='store-panel-header-item'>
                                  {STORES[group]}
                                </span>
                                <span className='store-panel-header-item ml-3'>
                                  {group}
                                </span>
                              </p>

                              {grouped_list[group] &&
                                grouped_list[group].map((item, idx) => (
                                  <Draggable
                                    key={`DRAGGABLE-TOP-${item.name}`}
                                    draggableId={item.id}
                                    index={idx}
                                  >
                                    {(provDrag, snapDrag) => (
                                      <div
                                        ref={provDrag.innerRef}
                                        {...provDrag.draggableProps}
                                        {...provDrag.dragHandleProps}
                                        className='panel-block'
                                        key={`Ptore-Panel-Block-${item.name}`}
                                      >
                                        <span
                                          className='panel-icon'
                                          onClick={() => {
                                            this.changeItem(
                                              `How many ${item.name}'s would you like?`,
                                              item,
                                              'qty'
                                            );
                                          }}
                                        >
                                          {item.qty}
                                        </span>
                                        <span
                                          className='item-name'
                                          title={item.name}
                                          onClick={() => {
                                            this.changeItem(
                                              'What would you like to change the name to?',
                                              item,
                                              'name'
                                            );
                                          }}
                                        >
                                          {item.name}
                                        </span>

                                        <span className='store-panel-icons'>
                                          <FontAwesomeIcon
                                            color={
                                              item.aisle !== 'OTHER'
                                                ? '#f7dd57'
                                                : '#878787'
                                            }
                                            title={item.aisle}
                                            icon={['fa', 'tag']}
                                            className='clickable'
                                            onClick={() => {
                                              this.changeItem(
                                                'What would you like the aisle to be?',
                                                item,
                                                'aisle'
                                              );
                                            }}
                                          />
                                          <FontAwesomeIcon
                                            icon={['fa', 'trash-alt']}
                                            color='#f44336'
                                            className='clickable'
                                            onClick={() => {
                                              window.confirm(
                                                `Are you sure you want to remove ${item.name}?`
                                              ) && remove(item);
                                            }}
                                          />
                                        </span>
                                        {provDrag.placeholder}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                            </div>
                            {provDrop.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                </div>
                )
              </Panel>
            </DragDropContext>
          </>
        )}
      </>
    );
  }
}

export default List;
