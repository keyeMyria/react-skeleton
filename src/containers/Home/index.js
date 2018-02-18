import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';

import Title from '../../components/Title';
import MenuContainer from '../Menu';

class HomeContainer extends Component {

    render() {
        return (
            <div>
                <MenuContainer/>
                <Grid centered>
                    <GridColumn computer={12} tablet={12} mobile={14} textAlign='center'>
                        <Container>
                            <Title id='home'/>
                        </Container>
                    </GridColumn>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userRoles: state.authenticationReducer.userRoles
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
)(HomeContainer));
