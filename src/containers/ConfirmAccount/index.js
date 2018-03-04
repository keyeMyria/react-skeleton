import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {confirmAccount} from "../../redux/modules/confirmAccount";
import Grid, {GridColumn} from "../../components/Grid";
import Container from "../../components/Container";
import Message from "../../components/Message";

class ConfirmAccountContainer extends Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(confirmAccount(match.params.token));
    }

    componentDidMount() {
        const {history} = this.props;
        setTimeout(() => {
            history.push('/welcome');
        }, 7000);
    }

    render() {
        const {confirmed, successMessage, errorMessage} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Container>
                        {confirmed ? <Message success>{successMessage}</Message> : <Message error>{errorMessage}</Message>}
                        <div>Redirecting...</div>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({confirmAccountReducer}) => {
    return {
        confirmed: confirmAccountReducer['confirmed'],
        successMessage: confirmAccountReducer['successMessage'],
        errorMessage: confirmAccountReducer['errorMessage']
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
)(ConfirmAccountContainer));
