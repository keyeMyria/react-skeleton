import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoutes from '../AppRoutes';
import {withRouter} from 'react-router-dom';
import Notifications from 'react-notification-system-redux';
import MenuContainer from '../Menu';

class App extends Component {
    render() {
        const {notifications, logged} = this.props;
        return (
            <div>
                {logged && <MenuContainer/> }
                <AppRoutes/>
                <Notifications notifications={notifications}/>
            </div>
        );
    }
}

const mapStateToProps = ({notifications, authenticationReducer}) => {
    return {
        notifications: notifications,
        logged: authenticationReducer.logged
    }
};

export default withRouter(connect(
    mapStateToProps
)(App));

  