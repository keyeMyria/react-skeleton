import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import Message from '../../components/Message';
import Form, {FormField, FormGroup, Input} from '../../components/Form';
import Title from '../../components/Title';
import Button from '../../components/Button';
import {onChangeResetPasswordPasswordField} from '../../store/modules/auth/resetPassword';
import {resetPassword} from '../../store/modules/auth/resetPassword';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import PropTypes from 'prop-types';
import Box from '../../components/Box';

class ConfirmResetPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClickCancelButton = this.onClickCancelButton.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(onChangeResetPasswordPasswordField(field, value));
    }

    onClickCancelButton() {
        const {history} = this.props;
        history.push('/');
    }

    onSubmit() {
        const {dispatch, match, formData} = this.props;
        dispatch(resetPassword(match.params.token, formData));
    }

    componentWillUpdate(nextProps) {
        const {successMessage, history} = nextProps;
        successMessage && setTimeout(() => {
            history.push('/welcome');
        }, 7000);
    }

    render() {
        const {successMessage, errorMessage, isIncomplete, formData, passwordsNotMatching} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Container>
                        <Title id='change.password'/>
                        {passwordsNotMatching && <Message error><Text id='passwords.not.matching'/></Message>}
                        {errorMessage && <Message error>{errorMessage}</Message>}
                        {successMessage ?
                            <div>
                                <Message success><Icon name='info'/>{successMessage}</Message>
                                <Box><Text id='redirecting'/></Box>
                            </div>
                            :
                            <Form onSubmit={this.onSubmit.bind(this)}>
                                <FormGroup widths='equal'>
                                    <FormField>
                                        <Input
                                            labelid='password'
                                            type='password'
                                            name='password'
                                            placeholderid='password'
                                            value={formData.password}
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </FormGroup>
                                <FormGroup widths='equal'>
                                    <FormField>
                                        <Input
                                            labelid='password.confirmation'
                                            type='password'
                                            name='passwordConfirmation'
                                            placeholderid='password.confirmation'
                                            value={formData.passwordConfirmation}
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </FormGroup>
                                <Button primary type='submit' disabled={isIncomplete}><Text id='confirm'/></Button>
                                <Button onClick={this.onClickCancelButton}><Text id='cancel'/></Button>
                            </Form>
                        }
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const
    mapStateToProps = ({accountReducers}) => {
        const {resetPasswordReducer} = accountReducers;
        return {
            formData: resetPasswordReducer.formData,
            isIncomplete: resetPasswordReducer.isIncomplete,
            passwordsNotMatching: resetPasswordReducer.passwordsNotMatching,
            successMessage: resetPasswordReducer.successMessage,
            errorMessage: resetPasswordReducer.errorMessage
        }
    };

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

ConfirmResetPasswordContainer.propTypes = {
    formData: PropTypes.shape({
        password: PropTypes.string.isRequired,
        passwordConfirmation: PropTypes.string.isRequired
    }),
    isIncomplete: PropTypes.bool.isRequired,
    passwordsNotMatching: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmResetPasswordContainer));
