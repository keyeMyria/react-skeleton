import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeActivePage} from "../../redux/modules/administration/adminMenu";

class MainPageContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeActivePage('home'));
    }

    render() {
        return (
            <div>Hello, this is the administrator panel. For now the functionality that this panel offers you consists in administrate the users of the application</div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapDispatchToProps
)(MainPageContainer));
