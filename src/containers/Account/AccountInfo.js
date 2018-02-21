import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {openEditAccountInfo} from "../../redux/modules/account";
import Image from "../../components/Image";
import Button from "../../components/Button";

class AccountInfoContainer extends Component {

    constructor() {
        super();
        this.onClickEditCredentialsButton = this.onClickEditCredentialsButton.bind(this);
    }

    onClickEditCredentialsButton() {
        const {dispatch} = this.props;
        dispatch(openEditAccountInfo());
    }

    render() {
        const {info} = this.props;
        return (
            <div>
                <Image src={info.avatar} size='tiny' alt="registration" avatar/>
                <b>{info.name}</b>
                <p>Name: {info.name}</p>
                <p>Email: {info.email}</p>
                <p>Gender: {info.gender}</p>
                <p>Created at: {new Date(info.createdAt).toString()}</p>
                <Button primary type='submit' onClick={this.onClickEditCredentialsButton}>Edit credentials</Button>
            </div>
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
)(AccountInfoContainer));
