import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteAccountRequest,} from "../../redux/modules/account";
import Button from "../../components/Button";
import Message from "../../components/Message";


class DeleteAccountContainer extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitDeleteAccount = this.onClickExitDeleteAccount.bind(this);
    }

    onSubmit() {
        const {dispatch} = this.props;
        dispatch(deleteAccountRequest());
    }

    onClickExitDeleteAccount() {
        const {history} = this.props;
        history.push('/account');
    }

    render() {
        const {successMessage, errorMessage} = this.props;
        return (
            <div>
                {successMessage && <Message success>{successMessage}</Message>}
                {errorMessage && <Message error>{errorMessage}</Message>}
                aaa
                <Button primary type='submit' onClick={this.onClickExitDeleteAccount}>Cancel</Button>
                <Button color='red' onClick={this.onSubmit}>Delete account</Button>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        successMessage: accountReducer['successMessage'],
        errorMessage: accountReducer['errorMessage']
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
)(DeleteAccountContainer));
