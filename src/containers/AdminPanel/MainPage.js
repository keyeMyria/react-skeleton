import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../../components/Button";

class MainPageContainer extends Component {

    constructor() {
        super();
        this.onClickAdminUsersButton = this.onClickAdminUsersButton.bind(this);
    }

    onClickAdminUsersButton() {
        const {history} = this.props;
        history.push('/admin-panel/users');
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
