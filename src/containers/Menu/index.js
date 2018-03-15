import React, {Component} from 'react';
import {connect} from 'react-redux';

import Menu, {MenuItem, MenuGroup} from '../../components/Menu';
import Dropdown, {DropdownMenu, DropdownItem} from '../../components/Dropdown';

import {logout} from '../../redux/modules/authentication';
import Text from '../../components/Text';
import {withRouter} from "react-router-dom";

class MenuContainer extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.onClickAccountOption = this.onClickAccountOption.bind(this);
        this.onClickHomeOption = this.onClickHomeOption.bind(this);
    }

    logout() {
        const {dispatch} = this.props;
        dispatch(logout());
    }

    onClickAccountOption() {
        const {history} = this.props;
        history.push('/account');
    }

    onClickHomeOption() {
        const {history} = this.props;
        history.push('/');
    }

    render() {
        const {title} = this.props;
        return (
            <Menu inverted color='blue'>
                <MenuItem active>
                    <Text id={title}/>
                </MenuItem>
                <MenuGroup position='right'>
                    <Dropdown item icon='bars'>
                        <DropdownMenu>
                            <DropdownItem onClick={this.onClickHomeOption}><Text id='home'/></DropdownItem>
                            <DropdownItem onClick={this.onClickAccountOption}><Text id='account'/></DropdownItem>
                            <DropdownItem onClick={this.logout}><Text id='logout'/></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </MenuGroup>
            </Menu>
        );
    }

}

const mapStateToProps = ({menuReducer}) => {
    return {
        title: menuReducer['title']
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContainer));
