import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Menu, {MenuItem} from '../../components/Menu';
import Icon from '../../components/Icon';

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
                    Main page
                </MenuItem>
                <MenuItem active={title === 'users'} onClick={this.onClickUserMenuOption}>
                    <Icon name='user'/>
                    Users
                </MenuItem>
            </Menu>
        );
    }
}

const mapStateToProps = ({adminMenuReducer}) => {
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
