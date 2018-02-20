import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoutes from '../AppRoutes';
import {withRouter} from "react-router-dom";
import Notifications from "react-notification-system-redux";

class App extends Component {
    render() {
        const {notifications} = this.props;
        return (
            <div>
                <AppRoutes/>
                <Notifications notifications={notifications}/>
            </div>
        );
    }
}

const mapStateToProps = ({notifications}) => {
    return {
        notifications: notifications
    }
};

export default withRouter(connect(
    mapStateToProps
)(App));

  