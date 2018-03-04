import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../../components/Button";

class AccountInfoContainer extends Component {

    constructor() {
        super();
        this.onClickEditCredentialsButton = this.onClickEditCredentialsButton.bind(this);
        this.onClickChangePasswordButton = this.onClickChangePasswordButton.bind(this);
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
    }

    onClickEditCredentialsButton() {
        const {history} = this.props;
        history.push('/account/edit');
    }

    onClickChangePasswordButton() {
        const {history} = this.props;
        history.push('/account/edit/password');
    }

    onClickDeleteAccountButton() {
        const {history} = this.props;
        history.push('/account/delete');
    }

    render() {
        const {info, language} = this.props;
        return (
            <div>
                <b>{info.name}</b>
                <p>Name: {info.name}</p>
                <p>Email: {info.email}</p>
                <p>Gender: {info.gender}</p>
                <p>Language: {language}</p>
                <p>Created at: {new Date(info.createdAt).toString()}</p>
                <Button primary type='submit' onClick={this.onClickEditCredentialsButton}>Edit credentials</Button>
                <Button primary type='submit' onClick={this.onClickChangePasswordButton}>Change password</Button>
                <Button color='red' type='submit' onClick={this.onClickDeleteAccountButton}>Delete account</Button>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        language: accountReducer['language']

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
)(AccountInfoContainer));
