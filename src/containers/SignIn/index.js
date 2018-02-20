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
import Divider from '../../components/Divider';
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
        const {error, isIncomplete} = this.props;

        return (
            <Grid centered>
                <GridColumn computer={6} tablet={12} mobile={14} textAlign='center'>
                    <Title id='login'/>
                    <Container>
                        {error && <Message negative>{error}</Message>}
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup widths='equal'>
                                <FormField width={6}>
                                    <Input
                                        type='email'
                                        name='email'
                                        placeholderid='email'
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
                            </FormGroup>
                            <FormGroup widths='equal'>
                                <Checkbox name='remember' labelid="remember.me" onChange={this.onChange}/>
                            </FormGroup>
                            <Button primary type='submit' disabled={isIncomplete}><Text id='login'/></Button>
                        </Form>
                        <Divider section/>
                        <Text id='not.have.account.yet' values={{
                            icon: <Icon name='help'/>,
                            link: <Link to='/sign-up'><Text id='register.here'/></Link>
                        }}/>
                    </Container>
                </GridColumn>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        email: state.authenticationReducer['email'],
        password: state.authenticationReducer['password'],
        remember: state.authenticationReducer['remember'],
        isIncomplete: state.authenticationReducer.isIncomplete,
        error: state.authenticationReducer.error

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
