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
import {openDeleteUserModal, getUser, closeDeleteUserModal, deleteUser} from "../../redux/modules/adminUser";
import ConfirmationModal from "../../components/ConfirmationModal";
import Loader from "../../components/Loader";

class UserInfoContainer extends Component {

    constructor() {
        super();
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
        this.getFormattedGender = this.getFormattedGender.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
    }

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(getUser(match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorCode === 400 || nextProps.deleted) {
            nextProps.history.push('/admin-panel/users');
        }
    }

    onClickDeleteAccountButton() {
        const {dispatch} = this.props;
        dispatch(openDeleteUserModal());
    }

    getFormattedGender() {
        const {gender} = this.props.info;
        return gender ? gender.charAt(0) + gender.slice(1).toLowerCase() : '';
    }

    handleConfirmDelete() {
        const {dispatch, match} = this.props;
        dispatch(deleteUser(match.params.id));
    }

    handleCancelDelete() {
        const {dispatch} = this.props;
        dispatch(closeDeleteUserModal());
    }

    render() {
        const {info, deleteUserModalOpened, loading} = this.props;
        return loading
            ? <Loader active inline='centered'/>
            : (
                <div>
                    <Header size="huge" textAlign='center'>
                        <HeaderContent>
                            <Image src={info.avatar} size='small' alt="avatar" avatar/>
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
                            <b>Created at</b>: <Date value={info.createdAt} year='numeric' month='long'
                                                     day='numeric' weekday='long'/>

                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>

                            <b>Updated at</b>: <Date value={info.updatedAt} year='numeric' month='long'
                                                     day='numeric' weekday='long'/>
                        </GridColumn>
                    </Grid>
                    <Button color='red' icon='remove user' type='submit' content='Delete account'
                            onClick={this.onClickDeleteAccountButton}/>
                    <ConfirmationModal
                        open={deleteUserModalOpened}
                        content='Are you sure you want to delete this user?'
                        onCancel={this.handleCancelDelete}
                        onConfirm={this.handleConfirmDelete}
                    />
                </div>
            );
    }
}

const mapStateToProps = ({adminUserReducer}) => {
    return {
        info: adminUserReducer['info'],
        errorCode: adminUserReducer['errorCode'],
        deleteUserModalOpened: adminUserReducer['deleteUserModalOpened'],
        deleted: adminUserReducer['deleted'],
        loading: adminUserReducer['loading']
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
