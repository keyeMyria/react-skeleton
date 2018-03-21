import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../../components/Button";
import Image from "../../components/Image";
import Divider from "../../components/Divider";
import {GridColumn} from "../../components/Grid";
import Grid from "../../components/Grid";
import Date from "../../components/Date";
import Header, {HeaderContent} from "../../components/Header";
import {getUser} from "../../redux/modules/adminUser";

class UserInfoContainer extends Component {

    constructor() {
        super();
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
        this.getFormattedGender = this.getFormattedGender.bind(this);
    }

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(getUser(match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorCode === 400) {
            nextProps.history.push('/admin-panel/users');
        }
    }
    onClickDeleteAccountButton() {
    }

    getFormattedGender() {
        const {gender} = this.props.info;
        return gender ? gender.charAt(0) + gender.slice(1).toLowerCase() : '';
    }

    render() {
        const {info} = this.props;
        return (
            <div>
                <Header size="huge" textAlign='center'>
                    <HeaderContent>
                        <Image src={info.avatar} size='small' alt="Avatar" avatar/>
                        <br/>
                        <b>{info.name}</b>
                    </HeaderContent>
                </Header>
                <Divider/>
                <Grid>
                    <GridColumn computer={8} tablet={8} mobile={14}>
                        <p>
                            <b>Email</b>: {info.email}
                        </p>
                        <p>
                            <b>Gender</b>: {this.getFormattedGender()}
                        </p>
                    </GridColumn>
                </Grid>
                <Grid>
                    <GridColumn computer={8} tablet={8} mobile={14}>
                        <b>Created at</b>: <Date value={info.createdAt} year='numeric' month='long' day='numeric' weekday='long'/>

                    </GridColumn>
                    <GridColumn computer={8} tablet={8} mobile={14}>

                        <b>Updated at</b>: <Date value={info.updatedAt} year='numeric' month='long' day='numeric' weekday='long'/>
                    </GridColumn>
                </Grid>
                <Button color='red' icon='remove user' type='submit' content='Delete account' onClick={this.onClickDeleteAccountButton}/>
            </div>
        );
    }
}

const mapStateToProps = ({adminUserReducer}) => {
    return {
        info: adminUserReducer['info'],
        errorCode: adminUserReducer['errorCode']
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
)(UserInfoContainer));
