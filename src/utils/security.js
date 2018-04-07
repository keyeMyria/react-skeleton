import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {userHasRole, isUserLogged} from './user-info';

export const WithAuth = (WrappedComponent, allowedRoles) => {
    return class BaseAuth extends Component {

        render() {
            return userHasRole(allowedRoles) ? <WrappedComponent {...this.props} /> : <Redirect to='/welcome'/>
        }

    }
};

export const WithoutAuth = (WrappedComponent) => {
    return class extends React.Component {

        render() {
            return isUserLogged() ? <Redirect to='/'/> : <WrappedComponent {...this.props} />;
        }


    }
};