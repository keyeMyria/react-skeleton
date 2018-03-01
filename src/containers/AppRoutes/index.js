import React from 'react';
import {Route} from 'react-router-dom';

import HomeContainer from '../Home';
import AccountContainer from '../Account';
import WelcomeContainer from '../Welcome';
import ConfirmAccountContainer from '../ConfirmAccount';

import {ROLE_ADMIN, ROLE_USER} from '../../config';
import {WithAuth, WithoutAuth} from '../../utils/security';

export default () => (
    <div>
        <Route exact path='/' component={WithAuth(HomeContainer, [ROLE_ADMIN, ROLE_USER])}/>
        <Route path='/welcome' component={WithoutAuth(WelcomeContainer)}/>
        <Route path='/account' component={WithAuth(AccountContainer, [ROLE_ADMIN, ROLE_USER])}/>
        <Route path='/confirm-account/:token' component={WithoutAuth(ConfirmAccountContainer)}/>
    </div>
);