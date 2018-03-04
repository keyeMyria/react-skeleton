import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid, {GridColumn} from "../../components/Grid";
import Container from "../../components/Container";
import Message from "../../components/Message";
import Form, {FormField, FormGroup, Input} from "../../components/Form";
import Title from "../../components/Title";
import Button from "../../components/Button";
import {onChangeResetPasswordPasswordField} from "../../redux/modules/resetPassword";
import {resetPassword} from "../../redux/modules/resetPassword";

class ConfirmResetPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(onChangeResetPasswordPasswordField(field, value));
    }

    onSubmit() {
        const {dispatch, match, password, passwordConfirmation} = this.props;
        dispatch(resetPassword(match.params.token, password, passwordConfirmation));
    }

    componentWillUpdate(nextProps) {
        const {successMessage, history} = nextProps;
        successMessage && setTimeout(() => {
            history.push('/welcome');
        }, 7000);
    }

    render() {
        const {successMessage, errorMessage, isIncomplete} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Container>
                        {successMessage &&
                        <div>
                            <Message success>{successMessage}</Message>
                            <div>Redirecting...</div>
                        </div>
                        }
                        {errorMessage && <Message error>{errorMessage}</Message>}
                        {!successMessage &&
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <Title id='login'/>
                            <FormGroup widths='equal'>
                                <FormField>
                                    <Input
                                        type='password'
                                        name='password'
                                        placeholderid='password'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                            </FormGroup>
                            <FormGroup widths='equal'>
                                <FormField>
                                    <Input
                                        type='password'
                                        name='passwordConfirmation'
                                        placeholderid='password.confirmation'
                                        onChange={this.onChange}
                                    />
                                    <Button primary type='submit' disabled={isIncomplete} size="big">Change
                                        password</Button>
                                </FormField>
                            </FormGroup>
                        </Form>
                        }
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const
    mapStateToProps = ({resetPasswordReducer}) => {
        return {
            password: resetPasswordReducer['password'],
            passwordConfirmation: resetPasswordReducer['passwordConfirmation'],
            successMessage: resetPasswordReducer['successMessage'],
            errorMessage: resetPasswordReducer['errorMessage'],
            isIncomplete: resetPasswordReducer['isIncomplete']
        }
    };

const
    mapDispatchToProps = dispatch => {
        return {
            dispatch
        }
    };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmResetPasswordContainer));
