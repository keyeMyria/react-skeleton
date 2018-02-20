import React, {Component} from 'react';
import {connect} from 'react-redux';

import Menu, {MenuItem, MenuGroup} from '../../components/Menu';
import Dropdown, {DropdownMenu, DropdownItem} from '../../components/Dropdown';

import {logout} from '../../redux/modules/authentication';
import Text from '../../components/Text';

class MenuContainer extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        const {dispatch} = this.props;
        dispatch(logout());
    }

    render() {
        return (
            <Menu inverted color='blue'>
                <MenuItem active>
                    <Text id='home'/>
                </MenuItem>
                <MenuGroup position='right'>
                    <Dropdown item text='language'>
                        <DropdownMenu>
                            <DropdownItem><Text id='english'/></DropdownItem>
                            <DropdownItem><Text id='spanish'/></DropdownItem>
                            <DropdownItem><Text id='french'/></DropdownItem>
                            <DropdownItem><Text id='japanese'/></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <MenuItem onClick={this.logout}>
                        <b><Text id='logout'/></b>
                    </MenuItem>
                </MenuGroup>
            </Menu>
        );
    }

}

const mapStateToProps = state => {
    return {
        logged: state.authenticationReducer.logged
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContainer);
