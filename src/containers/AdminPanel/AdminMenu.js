import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Menu, {MenuItem} from '../../components/Menu';
import Icon from '../../components/Icon';
import Text from "../../components/Text";

class AdminMenu extends Component {

    constructor() {
        super();
        this.onClickMainPageButton = this.onClickMainPageButton.bind(this);
        this.onClickUserMenuOption = this.onClickUserMenuOption.bind(this);
    }

    onClickMainPageButton() {
        const {history} = this.props;
        history.push('/admin-panel');
    }

    onClickUserMenuOption() {
        const {history} = this.props;
        history.push('/admin-panel/users');
    }

    render() {
        const {title} = this.props;
        return (
            <Menu icon='labeled'>
                <MenuItem active={title === 'home'} onClick={this.onClickMainPageButton}>
                    <Icon name='home'/>
                    <Text id='main.page'/>
                </MenuItem>
                <MenuItem active={title === 'users'} onClick={this.onClickUserMenuOption}>
                    <Icon name='user'/>
                    <Text id='users'/>
                </MenuItem>
            </Menu>
        );
    }
}

const mapStateToProps = ({adminReducers}) => {
    const {adminMenuReducer} = adminReducers;
    return {
        title: adminMenuReducer['active']
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
)(AdminMenu));
