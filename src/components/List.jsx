import { STORES } from '../utils/utils';
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
  Modal,
} from 'react-bulma-components';
const { Input, Control, Field, Label } = Form;

class List extends React.Component {
  state = {
    itemToAdd: '',
    itemRepeat: '',
    itemEditRepeat: '',
    burgerOpen: false,
    showUpdateModal: false,
    itemToEdit: null,
    itemToEditPrevName: '',
    confirmModal: {
      show: false,
      message: '',
      okFn: () => {},
      cancelFn: () => {},
    },
  };

  handleItemChange = (e) => {
    this.setState({ itemToAdd: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.addItem();
    }
  };

  addItem = () => {
    const { itemNames, add } = this.props;
    const { itemToAdd } = this.state;

    if (!itemNames.includes(itemToAdd.toUpperCase()) && itemToAdd) {
      add(itemToAdd);
      this.setState({ itemToAdd: '', itemRepeat: '' });
    } else {
      this.setState({ itemRepeat: 'is-danger' });
    }
  };

  openUpdateModal = (item) => {
    this.setState({
      itemToEdit: JSON.parse(JSON.stringify(item)),
      itemToEditPrevName: item.name,
      showUpdateModal: true,
    });
  };

  updateItem = () => {
    const { itemNames, update } = this.props;
    const { itemToEdit, itemToEditPrevName } = this.state;

    const itemNamesNew = itemNames.filter(
      (item) => item !== itemToEditPrevName
    );

    if (
      !itemNamesNew.includes(itemToEdit.name.toUpperCase()) &&
      itemToEdit.name
    ) {
      itemToEdit.name = itemToEdit.name.toUpperCase();
      itemToEdit.aisle = itemToEdit.aisle.toUpperCase();
      itemToEdit.qty = parseInt(itemToEdit.qty);
      update(itemToEditPrevName, itemToEdit);
      this.setState({
        itemToEditPrevName: '',
        itemToEdit: null,
        showUpdateModal: false,
        itemEditRepeat: '',
      });
    } else {
      this.setState({ itemEditRepeat: 'is-danger' });
    }
  };

  openClearConfirm = () => {
    const { clear } = this.props;
    this.setState({
      confirmModal: {
        show: true,
        message: 'Are you sure you want to clear the list?',
        okFn: () => {
          this.closeConfirmModal();
          clear();
        },
        cancelFn: this.closeConfirmModal,
      },
    });
  };

  openPrintConfirm = () => {
    const { print } = this.props;
    this.setState({
      confirmModal: {
        show: true,
        message: 'Are you sure you want to print the list?',
        okFn: (e) => {
          print(e);
          this.closeConfirmModal();
        },
        cancelFn: this.closeConfirmModal,
      },
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModal: {
        show: false,
        message: '',
        okFn: () => {},
        cancelFn: () => {},
      },
    });
  };

  render() {
    const {
      burgerOpen,
      itemToAdd,
      itemRepeat,
      itemEditRepeat,
      showUpdateModal,
      itemToEdit,
      confirmModal,
    } = this.state;
    const { remove, list } = this.props;

    const grouped_list = _.groupBy(list, 'store');
    const group_names = _.uniq(_.map(list, 'store')).sort();

    return (
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
                className='ml'
                onClick={() => {
                  this.openPrintConfirm();
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
              onClick={() => {
                this.openClearConfirm();
              }}
            >
              <FontAwesomeIcon
                icon={['fa', 'broom']}
                className='has-text-primary'
              />
            </Navbar.Item>
          </Navbar.Brand>
        </Navbar>
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
                    this.handleItemChange(e);
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
              <Control>
                <Button renderAs='button'>
                  <FontAwesomeIcon
                    icon={['fa', 'ban']}
                    onClick={() => {
                      this.setState({ itemToAdd: '' });
                    }}
                  />
                </Button>
              </Control>
            </Field>
          </Box>

          <div className='store-panels'>
            <div className='columns is-multiline'>
              {group_names.map((group) => (
                <div
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

                    {grouped_list[group].map((item) => (
                      <div
                        className='panel-block'
                        key={`Ptore-Panel-Block-${item.name}`}
                      >
                        <span className='panel-icon'>{item.qty}</span>
                        {item.name}

                        <span className='store-panel-icons'>
                          {item.aisle !== 'OTHER' && (
                            <FontAwesomeIcon
                              color='#f7dd57'
                              icon={['fa', 'tag']}
                              className='clickable'
                            />
                          )}
                          <div class='dropdown is-hoverable'>
                            <div class='dropdown-trigger'>
                              <FontAwesomeIcon
                                icon={['fa', 'bars']}
                                className='clickable'
                              />
                            </div>
                            <div
                              class='dropdown-menu'
                              id='dropdown-menu'
                              role='menu'
                            >
                              <div class='dropdown-content'>
                                <div
                                  class='dropdown-item'
                                  onClick={() => {
                                    this.openUpdateModal(item);
                                  }}
                                >
                                  Move
                                  <FontAwesomeIcon
                                    icon={['fa', 'exchange-alt']}
                                    className='clickable is-pulled-right'
                                  />
                                </div>
                                <div
                                  class='dropdown-item'
                                  onClick={() => {
                                    this.openUpdateModal(item);
                                  }}
                                >
                                  Edit
                                  <FontAwesomeIcon
                                    icon={['fa', 'wrench']}
                                    className='clickable is-pulled-right'
                                  />
                                </div>
                                <div
                                  class='dropdown-item'
                                  onClick={() => {
                                    remove(item);
                                  }}
                                >
                                  Remove
                                  <FontAwesomeIcon
                                    icon={['fa', 'trash-alt']}
                                    className='clickable is-pulled-right'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Modal
          show={showUpdateModal}
          onClose={() =>
            this.setState({
              showUpdateModal: false,
              itemToEdit: null,
              itemToEditPrevName: '',
            })
          }
        >
          <Modal.Content>
            {itemToEdit && (
              <Box style={{ margin: '3em' }}>
                <Field>
                  <Label>Item Name</Label>
                  <Control>
                    <Input
                      className={itemEditRepeat}
                      placeholder='Item Name'
                      value={itemToEdit.name}
                      onChange={(e) => {
                        itemToEdit.name = e.target.value;
                        this.setState({ itemToEdit });
                      }}
                    />
                  </Control>
                </Field>

                <Field>
                  <Label>Quantity</Label>
                  <Control>
                    <Input
                      min={1}
                      type='number'
                      value={itemToEdit.qty}
                      onChange={(e) => {
                        itemToEdit.qty = e.target.value;
                        this.setState({ itemToEdit });
                      }}
                    />
                  </Control>
                </Field>
                <Field>
                  <Label>Store</Label>
                  <Control className='is-expanded'>
                    <div className='select is-fullwidth'>
                      <select
                        value={itemToEdit.store}
                        onChange={(e) => {
                          itemToEdit.store = e.target.value;
                          this.setState({ itemToEdit });
                        }}
                      >
                        {Object.keys(STORES).map((key) => (
                          <option key={`Store-Option-${key}`} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Control>
                </Field>
                <Field>
                  <Label>Aisle</Label>
                  <Control>
                    <Input
                      placeholder='Aisle'
                      value={itemToEdit.aisle}
                      onChange={(e) => {
                        itemToEdit.aisle = e.target.value;
                        this.setState({ itemToEdit });
                      }}
                    />
                  </Control>
                </Field>
                <Field className='is-grouped is-grouped-centered'>
                  <Control>
                    <Button color='success' onClick={() => this.updateItem()}>
                      Update
                    </Button>
                  </Control>
                  <Control>
                    <Button
                      color='danger'
                      onClick={() =>
                        this.setState({
                          showUpdateModal: false,
                          itemToEdit: null,
                          itemToEditPrevName: '',
                        })
                      }
                    >
                      Cancel
                    </Button>
                  </Control>
                </Field>
              </Box>
            )}
          </Modal.Content>
        </Modal>

        <Modal show={confirmModal.show} onClose={confirmModal.cancelFn}>
          <Modal.Content>
            {confirmModal.show && (
              <Box style={{ margin: '3em' }}>
                <h3 className='title is-3 has-text-centered'>
                  {confirmModal.message}
                </h3>
                <Field className='is-grouped is-grouped-centered'>
                  <Control>
                    <Button
                      color='success'
                      onClick={(e) => confirmModal.okFn(e)}
                    >
                      Yes
                    </Button>
                  </Control>
                  <Control>
                    <Button
                      color='danger'
                      onClick={() => confirmModal.cancelFn()}
                    >
                      No
                    </Button>
                  </Control>
                </Field>
              </Box>
            )}
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default List;
