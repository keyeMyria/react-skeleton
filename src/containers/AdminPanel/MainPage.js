import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../../components/Button";
import {changeActivePage} from "../../redux/modules/adminMenu";

class MainPageContainer extends Component {

    constructor() {
        super();
        this.onClickAdminUsersButton = this.onClickAdminUsersButton.bind(this);
    }

    onClickAdminUsersButton() {
        const {history} = this.props;
        history.push('/admin-panel/users');
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeActivePage('home'));
    }

    render() {
        return (
            <div><Button primary onClick={this.onClickAdminUsersButton}>Admin users</Button> </div>
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
