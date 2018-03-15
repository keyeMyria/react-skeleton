import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {editAvatar, onChangeAvatar} from "../../redux/modules/account";
import Button from "../../components/Button";
import Modal, {ModalContent, ModalDescription, ModalHeader} from "../../components/Modal";
import {GridColumn} from "../../components/Grid";
import Grid from "../../components/Grid";
import Image from "../../components/Image";

class EditPasswordContainer extends Component {

    constructor() {
        super();
        this.onEditAvatar = this.onEditAvatar.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);

    }

    onEditAvatar() {
        const {dispatch, newAvatar} = this.props;
        dispatch(editAvatar(newAvatar));
    }

    onChangeAvatar(event) {
        const {dispatch} = this.props;
        let fileList = event.target.files;
        dispatch(onChangeAvatar(fileList[0]));
    }

    render() {
        const {newAvatar, info} = this.props;
        return (
            <div>
                <Grid centered>
                    <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                        <Image src={info.avatar} size='small' alt="registration" avatar/>
                    </GridColumn>
                    <GridColumn computer={4} tablet={12} mobile={14} textAlign='center'>
                        <Modal trigger={<Button>Edit avatar</Button>}>
                            <ModalHeader>Select a Photo</ModalHeader>
                            <ModalContent image>
                                <ModalDescription>
                                    <input type="file" onChange={this.onChangeAvatar}/>
                                    <p>Is it okay to use this photo?</p>
                                    <Button primary onClick={this.onEditAvatar} disabled={!newAvatar}>OK</Button>
                                </ModalDescription>
                            </ModalContent>
                        </Modal>
                    </GridColumn>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        newAvatar: accountReducer['newAvatar']
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
)(EditPasswordContainer));
