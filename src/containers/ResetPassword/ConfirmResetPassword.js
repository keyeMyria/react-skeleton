import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid, {GridColumn} from "../../components/Grid";
import Container from "../../components/Container";
import Message from "../../components/Message";
import Form, {FormField, FormGroup, Input} from "../../components/Form";
import Title from "../../components/Title";
import Button from "../../components/Button";
import {onChangeResetPasswordPasswordField} from "../../redux/modules/account/resetPassword";
import {resetPassword} from "../../redux/modules/account/resetPassword";
import Text from "../../components/Text";
import Icon from "../../components/Icon";

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
        const {successMessage, errorMessage, isIncomplete} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Container>
                        <Title id='login'/>
                        {successMessage &&
                        <div>
                            <Message success><Icon name='info'/>{successMessage}</Message>
                            <div><Text id='redirecting'/></div>
                        </div>
                        }
                        {errorMessage && <Message error>{errorMessage}</Message>}
                        {!successMessage &&
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup widths='equal'>
                                <FormField>
                                    <Input
                                        labelid='password'
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
                                        labelid='password.confirmation'
                                        type='password'
                                        name='passwordConfirmation'
                                        placeholderid='password.confirmation'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                            </FormGroup>
                            <Button primary type='submit' disabled={isIncomplete}>Change
                                password</Button>
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
            formData: resetPasswordReducer['formData'],
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
