import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppRoutes from '../AppRoutes';
import {withRouter} from 'react-router-dom';
import MenuContainer from '../Menu';

class App extends Component {
    render() {
        const {logged} = this.props;
        return (
            <div>
                {logged && <MenuContainer/> }
                <AppRoutes/>
            </div>
        );
    }
}

const mapStateToProps = ({authenticationReducer}) => {
    return {
        logged: authenticationReducer.logged
    }
};

export default withRouter(connect(
    mapStateToProps
)(App));

  