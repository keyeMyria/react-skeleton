import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';
import SignInContainer from './SignIn';
import SignUpContainer from './SignUp';

import {signIn, setSignInFormFieldValue} from '../../redux/modules/authentication';

class WelcomeContainer extends React.Component {

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
        return (
            <div>
                <SignInContainer/>
                <Grid centered>
                    <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                        <Container>
                            <SignUpContainer/>
                        </Container>
                    </GridColumn>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({authenticationReducer}) => {
    return {
        email: authenticationReducer['email'],
        password: authenticationReducer['password'],
        remember: authenticationReducer['remember'],
        isIncomplete: authenticationReducer.isIncomplete,
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
)(WelcomeContainer));
