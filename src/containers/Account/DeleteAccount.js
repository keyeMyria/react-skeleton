import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteAccountRequest,} from "../../redux/modules/account";
import Button from "../../components/Button";
import Message, {MessageHeader} from "../../components/Message";
import Icon from "../../components/Icon";
import Text from "../../components/Text";


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
                <Message warning>
                    <MessageHeader><Icon name='warning'/><Text id='delete.account.warning.header'/></MessageHeader>
                    <p><Text id='delete.account.warning.content'/></p>
                </Message>
                <Button type='submit' onClick={this.onClickExitDeleteAccount}><Text id='cancel'/></Button>
                <Button color='red' onClick={this.onSubmit}><Text id='delete.account'/></Button>
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
