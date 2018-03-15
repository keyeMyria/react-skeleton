import React, {Component} from 'react';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';

import Title from '../../components/Title';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {changeTitle} from '../../redux/modules/menu';

class HomeContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeTitle('home'));
    }

    render() {
        return (
            <div>
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

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapDispatchToProps
)(HomeContainer));
