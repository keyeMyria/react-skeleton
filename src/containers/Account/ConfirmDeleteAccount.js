import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid, {GridColumn} from "../../components/Grid";
import Container from "../../components/Container";
import Message from "../../components/Message";
import Text from "../../components/Text";
import {deleteAccount} from "../../redux/modules/account/deleteAccount";

class ConfirmDeleteAccountContainer extends Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(deleteAccount(match.params.token));
    }

    componentDidMount() {
        const {history} = this.props;
        setTimeout(() => {
            history.push('/welcome');
        }, 7000);
    }

    render() {
        const {successMessage, errorMessage} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Container>
                        {successMessage && <Message success>{successMessage}</Message>}
                        {errorMessage && <Message error>{errorMessage}</Message>}
                        <div><Text id='redirecting'/></div>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {deleteAccountReducer} = accountReducers;
    return {
        successMessage: deleteAccountReducer['successMessage'],
        errorMessage: deleteAccountReducer['errorMessage']
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
)(ConfirmDeleteAccountContainer));
