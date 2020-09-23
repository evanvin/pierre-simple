import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Panel,
  Icon,
  Button,
  Form,
  Navbar,
  Heading,
} from 'react-bulma-components';
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
              {/* <img
                src='https://bulma.io/images/bulma-logo.png'
                alt='Bulma: a modern CSS framework based on Flexbox'
                width='112'
                height='28'
              /> */}
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
          <Panel.Block renderAs='a' active>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            bulma
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            react-bulma-components
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            minireset.css
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            jgthms.github.io
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            couds.gidhub.io
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            mojs
          </Panel.Block>

          <Panel.Block renderAs='a' active>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            bulma
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            react-bulma-components
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            minireset.css
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            jgthms.github.io
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            couds.gidhub.io
          </Panel.Block>
          <Panel.Block>
            <Panel.Icon renderAs={Icon} icon='angle-down' />
            mojs
          </Panel.Block>
        </Panel>
      </>
    );
  }
}

export default List;
