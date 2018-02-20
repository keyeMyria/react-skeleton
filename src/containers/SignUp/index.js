import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp, setSignUpFormFieldValue} from '../../redux/modules/authentication';
import Button from '../../components/Button';
import Form, {FormField, FormGroup, Select, Input} from '../../components/Form';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import ErrorsContainer from '../../components/ErrorsContainer';
import Text from '../../components/Text';

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE'},
    {key: 'female', value: 'FEMALE'}
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
        const {error, errors, isIncomplete} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Title id='registration'/>
                    <Container>
                        <p><Text id='registration.instructions'/></p>
                        {error && <ErrorsContainer errors={errors}/>}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup widths='equal'>
                                <FormField width={6}>
                                    <Input
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={6}>
                                    <Input
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
                                        type='password'
                                        name='password'
                                        placeholderid='password'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={6}>
                                    <Input
                                        type='password'
                                        name='passwordConfirmation'
                                        placeholderid='password.confirmation'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                            </FormGroup>
                            <FormGroup widths='equal'>
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
                            <Button primary type='submit' disabled={isIncomplete}><Text id='register'/></Button>
                        </Form>
                    </Container>
                </GridColumn>
            </Grid>
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
        isIncomplete: authenticationReducer.isIncomplete,
        error: authenticationReducer.error,
        errors: authenticationReducer.errors,
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
