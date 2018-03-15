import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import {getAccountInfo} from "../../redux/modules/account";
import AccountInfo from "./AccountInfo";
import EditAccountInfo from "./EditAccountInfo";
import EditPassword from "./EditPassword";
import {Route} from "../../utils/router";
import DeleteAccountContainer from "./DeleteAccount";
import ConfirmDeleteAccountContainer from "./ConfirmDeleteAccount";
import {changeTitle} from "../../redux/modules/menu";

class AccountContainer extends Component {

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
                    <Container>
                        <Route exact match={match} path='/' component={AccountInfo}/>
                        <Route exact match={match} path='/edit' component={EditAccountInfo}/>
                        <Route exact match={match} path='/edit/password' component={EditPassword}/>
                        <Route exact match={match} path='/delete' component={DeleteAccountContainer}/>
                        <Route exact match={match} path='/delete/:token' component={ConfirmDeleteAccountContainer}/>
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
)(AccountContainer));
