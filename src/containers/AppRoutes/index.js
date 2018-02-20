import React from 'react';
import {Route} from 'react-router-dom';

import HomeContainer from '../Home/index';
import SignInContainer from '../SignIn/index';
import SignUpContainer from '../SignUp/index';
import {ROLE_ADMIN, ROLE_USER} from '../../config';
import {WithAuth, WithoutAuth} from '../../utils/security';

export default () => (
    <div>
        <Route exact path='/' component={WithAuth(HomeContainer, [ROLE_ADMIN, ROLE_USER])}/>
        <Route path='/login' component={WithoutAuth(SignInContainer)}/>
        <Route path='/sign-up' component={WithoutAuth(SignUpContainer)}/>
    </div>
);