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
import AdminMenu from "./AdminMenu";

class AdminPanelContainer extends Component {

    constructor() {
        super();
        this.onClickMainPageButton = this.onClickMainPageButton.bind(this);
        this.onClickUserMenuOption = this.onClickUserMenuOption.bind(this);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAccountInfo());
        dispatch(changeTitle('admin.panel'));
    }

    onClickMainPageButton() {
        const {history} = this.props;
        history.push('/admin-panel');
    }

    onClickUserMenuOption() {
        const {history} = this.props;
        history.push('/admin-panel/users');
    }

    render() {
        const {match} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Title id='account'/>
                    <AdminMenu/>
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
