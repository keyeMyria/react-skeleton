import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Form, {FormField, FormGroup, Select, Input} from '../../components/Form';
import Title from '../../components/Title';
import ErrorsContainer from '../../components/ErrorsContainer';
import Text from '../../components/Text';
import {signUp, setSignUpFormFieldValue} from "../../redux/modules/auth/signUp";

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE', icon: 'man'},
    {key: 'female', value: 'FEMALE', icon: 'woman'}
];

class SignUpContainer extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setSignUpFormFieldValue(field, value));
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        dispatch(signUp(formData));
    }

    render() {
        const {errorMessage, errors, incompleteForm, passwordsNotMatching} = this.props;
        return (
            <div>
                <Title id='registration'/>
                <p><Text id='registration.instructions'/></p>
                {passwordsNotMatching
                    ? <ErrorsContainer message={<Text id='passwords.not.matching'/>}/>
                    : <ErrorsContainer errors={errors} message={errorMessage}/>}

                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='at'
                                type='email'
                                name='email'
                                placeholderid='email'
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField width={6}>
                            <Input
                                icon='info'
                                type='text'
                                name='name'
                                placeholderid='name'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                name='password'
                                placeholderid='password'
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                name='passwordConfirmation'
                                placeholderid='password.confirmation'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths={3}>
                        <FormField>
                            <Select
                                type='select'
                                name='gender'
                                placeholderid='gender'
                                options={GENDER_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Button primary type='submit' disabled={incompleteForm} size="big"><Text id='register'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({authReducers}) => {
    const {signUpReducer} = authReducers;
    return {
        formData: signUpReducer['formData'],
        incompleteForm: signUpReducer.incompleteForm,
        errorMessage: signUpReducer.errorMessage,
        errors: signUpReducer.errors,
        logged: signUpReducer.logged,
        passwordsNotMatching: signUpReducer.passwordsNotMatching
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
)(SignUpContainer));
