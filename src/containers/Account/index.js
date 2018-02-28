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

class AccountContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAccountInfo());
    }

    render() {
        const {match} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Title id='registration'/>
                    <Container>
                        <Route exact match={match} path='/' component={AccountInfo}/>
                        <Route exact match={match} path='/edit' component={EditAccountInfo}/>
                        <Route exact match={match} path='/edit/password' component={EditPassword}/>
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