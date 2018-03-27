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
import Icon from "../../components/Icon";
import GenderIcon from "../../components/GenderIcon";
import Text from "../../components/Text";

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
        const gender = this.getFormattedGender();
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
                            <b><Icon name="mail"/><Text id='email'/></b>: {info.email}
                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='intergender'/><Text id='gender'/></b>: {gender}<GenderIcon gender={gender}/>
                        </GridColumn>
                    </Grid>
                    <Divider/>
                    <Grid>
                        <GridColumn computer={8} tablet={8} mobile={14}>
                            <b><Icon name='clock'/><Text id='created.at'/></b>: <Date value={info.createdAt} year='numeric'
                                                                         month='long'
                                                                         day='numeric' weekday='long'/>

                        </GridColumn>
                        <GridColumn computer={8} tablet={8} mobile={14}>

                            <b><Icon name='clock'/><Text id='updated.at'/></b>: <Date value={info.updatedAt} year='numeric'
                                                                         month='long'
                                                                         day='numeric' weekday='long'/>
                        </GridColumn>
                    </Grid>
                    <Divider/>
                    <Button color='red' icon='remove user' type='submit' onClick={this.onClickDeleteAccountButton}>
                        <Text id='delete.user'/>
                    </Button>
                    <ConfirmationModal
                        open={deleteUserModalOpened}
                        content='delete.user.confirmation'
                        onCancel={this.handleCancelDelete}
                        onConfirm={this.handleConfirmDelete}
                        cancelButton='cancel'
                        confirmButton='confirm'
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
