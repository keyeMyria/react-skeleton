import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import Message from '../../components/Message';
import {confirmChangeEmail} from '../../store/modules/account/changeEmail';

class ConfirmChangeEmailContainer extends Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(confirmChangeEmail(match.params.token));
    }

    componentDidMount() {
        const {history} = this.props;
        setTimeout(() => {
            history.push('/account');
        }, 7000);
    }

    render() {
        const {successMessage, errorMessage} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={14} tablet={14} mobile={14} textAlign='center'>
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
    const {changeEmailReducer} = accountReducers;
    return {
        successMessage: changeEmailReducer.successMessage,
        errorMessage: changeEmailReducer.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

ConfirmChangeEmailContainer.propTypes = {
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmChangeEmailContainer);
