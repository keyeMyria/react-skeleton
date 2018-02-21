import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import {getAccountInfo} from "../../redux/modules/account";
import AccountInfo from "./AccountInfo";
import EditAccountInfo from "./EditAccountInfo";


class AccountContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getAccountInfo());
    }

    render() {
        const {info, editing} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Title id='registration'/>
                    <Container>
                        {editing ? <EditAccountInfo/> : <AccountInfo info={info}/>}
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        editing: accountReducer['editing']
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
)(AccountContainer));
