import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Text from '../../components/Text';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Message from '../../components/Message';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';
import Form, {Checkbox, FormField, FormGroup, Input} from '../../components/Form';
import Title from '../../components/Title';
import {setSignInFormFieldValue, signIn} from '../../store/modules/auth/session';
import PropTypes from 'prop-types';

class SignInContainer extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        let loginCredentials = {
            email: formData.email,
            password: formData.password,
            remember: formData.remember
        };
        dispatch(signIn(loginCredentials));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setSignInFormFieldValue(field, value));
    }

    render() {
        const {errorMessage, incompleteForm, formData} = this.props;
        return (
            <Grid centered>
                <GridColumn textAlign='center'>
                    <Container>
                        {errorMessage && <Message negative>{errorMessage}</Message>}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup widths='equal'>
                                <Title id='login'/>
                                <FormField width={2}>
                                    <Input
                                        icon='at'
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        value={formData.email}
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={2}>
                                    <Input
                                        icon='lock'
                                        type='password'
                                        name='password'
                                        placeholderid='password'
                                        value={formData.password}
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={1}>
                                    <Checkbox value={formData.remember} name='remember' labelid='remember.me' onChange={this.onChange}/>
                                </FormField>
                                <FormField width={1}>
                                    <Button primary type='submit' disabled={incompleteForm}><Text id='login'/></Button>
                                </FormField>
                                <FormField width={1}>
                                    <Text id='not.remember.password' values={{
                                        icon: <Icon name='help'/>,
                                        link: <Link to='/reset-password'><Text id='here'/></Link>
                                    }}/>
                                </FormField>
                            </FormGroup>

                        </Form>
                    </Container>
                </GridColumn>
            </Grid>
        )
    }
}

const mapStateToProps = ({authReducers}) => {
    const {sessionReducer} = authReducers;
    return {
        formData: sessionReducer.formData,
        incompleteForm: sessionReducer.incompleteForm,
        errorMessage: sessionReducer.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

SignInContainer.propTypes = {
    formData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        remember: PropTypes.bool
    }),
    incompleteForm: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContainer));
