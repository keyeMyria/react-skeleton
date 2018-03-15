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

import {signIn, setSignInFormFieldValue} from '../../redux/modules/authentication';

class SignInContainer extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        const {dispatch, email, password, remember} = this.props;
        let loginCredentials = {
            email: email,
            password: password,
            remember: remember
        };
        dispatch(signIn(loginCredentials));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setSignInFormFieldValue(field, value));
    }

    render() {
        const {error, incompleteSignInForm} = this.props;

        return (
            <Grid centered>
                <GridColumn textAlign='center'>
                    <Container>
                        {error && <Message negative>{error}</Message>}
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup widths='equal'>
                                <Title id='login'/>
                                <FormField width={2}>
                                    <Input
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={2}>
                                    <Input
                                        type='password'
                                        name='password'
                                        placeholderid='password'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={1}>
                                    <Checkbox name='remember' labelid="remember.me" onChange={this.onChange}/>
                                </FormField>
                                <FormField width={1}>

                                    <Button primary type='submit' disabled={incompleteSignInForm} size="big"><Text id='login'/></Button>
                                </FormField>
                                <FormField width={1}>
                                    <Text id='not.have.account.yet' values={{
                                        icon: <Icon name='help'/>,
                                        link: <Link to='/reset-password'><Text id='register.here'/></Link>
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

const mapStateToProps = ({authenticationReducer}) => {
    return {
        email: authenticationReducer['email'],
        password: authenticationReducer['password'],
        remember: authenticationReducer['remember'],
        incompleteSignInForm: authenticationReducer.incompleteSignInForm,
        error: authenticationReducer.error

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
)(SignInContainer));
