import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserRoles, isUserLogged} from "./storage";

export const WithAuth = (WrappedComponent, allowedRoles) => {
    return class BaseAuth extends Component {

        userHasPermission() {
            let userRoles = getUserRoles();
            if (userRoles) {
                let roleList = userRoles.split(',');
                return roleList.filter(role => {
                    return allowedRoles.indexOf(role) > -1;
                }).length > 0;
            }
            return false;
        }

        render() {
            return this.userHasPermission() ? <WrappedComponent {...this.props} /> : <Redirect to='/login'/>
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