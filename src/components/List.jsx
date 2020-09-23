import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Panel,
  Icon,
  Button,
  Form,
  Tag,
  Navbar,
  Heading,
  Columns,
} from 'react-bulma-components';
import { faColumns } from '@fortawesome/free-solid-svg-icons';
const { Input, Control } = Form;

class List extends React.Component {
  state = { search: '' };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;

    return (
      <>
        <Navbar color='dark' fixed='top'>
          <Navbar.Brand>
            <Navbar.Item>
              <Heading size={3} className='has-text-primary'>
                Pierre
              </Heading>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container position='end'>
              <Navbar.Item href='#'>
                <FontAwesomeIcon
                  icon={['fa', 'broom']}
                  className='has-text-primary'
                />
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
        <Panel>
          <Panel.Block>
            <Control>
              <Input
                type='text'
                placeholder='Filter'
                value={search}
                onChange={(e) => {
                  this.handleSearchChange(e);
                }}
              />
            </Control>
          </Panel.Block>

          {/* {this.props.list.map((item) => ( */}
          <Panel.Block>
            <Columns.Column size={6}>Hey</Columns.Column>
            <Columns.Column size={6}>
              <Tag.Group gapless className='is-pulled-right'>
                <Tag
                  color='primary'
                  size='medium'
                  rounded
                  className='is-unselectable'
                >
                  2
                </Tag>
                <Tag size='medium' color='dark' rounded>
                  <FontAwesomeIcon
                    icon={['fa', 'pencil-alt']}
                    className='clickable'
                  />
                </Tag>
              </Tag.Group>
            </Columns.Column>
          </Panel.Block>
          {/* ))} */}
        </Panel>
      </>
    );
  }
}

export default List;
