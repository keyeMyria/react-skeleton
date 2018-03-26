import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp, setSignUpFormFieldValue} from '../../redux/modules/authentication';
import Button from '../../components/Button';
import Form, {FormField, FormGroup, Select, Input} from '../../components/Form';
import Title from '../../components/Title';
import ErrorsContainer from '../../components/ErrorsContainer';
import Text from '../../components/Text';

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
        const {dispatch, email, password, passwordConfirmation, gender, name} = this.props;
        let fields = {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            name: name,
            gender: gender
        };
        dispatch(signUp(fields));
    }

    render() {
        const {signUpError, signUpErrors, incompleteSignUpForm} = this.props;
        return (
            <div>
                <Title id='registration'/>
                <p><Text id='registration.instructions'/></p>
                {signUpError && <ErrorsContainer errors={signUpErrors}/>}
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
                    <Button primary type='submit' disabled={incompleteSignUpForm} size="big"><Text id='register'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({authenticationReducer}) => {
    return {
        email: authenticationReducer['email'],
        password: authenticationReducer['password'],
        passwordConfirmation: authenticationReducer['passwordConfirmation'],
        name: authenticationReducer['name'],
        gender: authenticationReducer['gender'],
        incompleteSignUpForm: authenticationReducer.incompleteSignUpForm,
        signUpError: authenticationReducer.signUpError,
        signUpErrors: authenticationReducer.signUpErrors,
        logged: authenticationReducer.logged
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
