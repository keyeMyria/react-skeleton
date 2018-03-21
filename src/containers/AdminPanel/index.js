import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import {getAccountInfo} from '../../redux/modules/account';
import MainPageContainer from './MainPage';
import UsersContainer from './Users';
import UserInfoContainer from './UserInfo';
import {Route} from '../../utils/router';
import {changeTitle} from '../../redux/modules/menu';
import Menu, {MenuItem} from '../../components/Menu';
import Icon from '../../components/Icon';

class AdminPanelContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAccountInfo());
        dispatch(changeTitle('account'));
    }

    render() {
        const {match} = this.props;
        return (
            <Grid centered>

                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Title id='account'/>
                    <Menu icon='labeled'>
                        <MenuItem>
                            <Icon name='user' />
                            Users
                        </MenuItem>
                    </Menu>
                    <Container>
                        <Route exact match={match} path='/' component={MainPageContainer}/>
                        <Route exact match={match} path='/users' component={UsersContainer}/>
                        <Route exact match={match} path='/users/:id' component={UserInfoContainer}/>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapDispatchToProps
)(AdminPanelContainer));
