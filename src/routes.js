import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';

import HomeContainer from './containers/Home';
import SignInContainer from './containers/SignIn';
import SignUpContainer from './containers/SignUp';
import {ROLE_ADMIN, ROLE_USER} from './config';
import {WithAuth, WithoutAuth} from './utils/security';
import {connect} from "react-redux";
import Notifications from "react-notification-system-redux";
import {clearAuthStorage, isUserLogged} from "./utils/storage";
import {push} from "react-router-redux";

class RoutesComponent extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (!isUserLogged()) {
            clearAuthStorage();
            dispatch(push('/login'));
        }
    }

    render() {
        const {notifications} = this.props;
        return (
            <div>
                <Route exact path='/' component={WithAuth(HomeContainer, [ROLE_ADMIN, ROLE_USER])}/>
                <Route path='/login' component={WithoutAuth(SignInContainer)}/>
                <Route path='/sign-up' component={WithoutAuth(SignUpContainer)}/>
                <Notifications notifications={notifications}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications
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
)(RoutesComponent));
