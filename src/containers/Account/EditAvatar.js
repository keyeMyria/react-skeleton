import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {editAvatar, onChangeAvatar} from "../../redux/modules/account";
import Button from "../../components/Button";
import Modal, {ModalContent, ModalDescription, ModalHeader} from "../../components/Modal";
import Image from "../../components/Image";
import Header, {HeaderContent} from "../../components/Header";
import Text from "../../components/Text";

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
                <Header size="huge" textAlign='center'>
                    <HeaderContent>
                        <Image src={info.avatar} size='small' alt='avatar' avatar/>
                        <Modal trigger={<Button primary content='Edit avatar' icon='edit'/>}>
                            <ModalHeader><Text id='select.a.photo'/></ModalHeader>
                            <ModalContent image>
                                <ModalDescription>
                                    <input type="file" onChange={this.onChangeAvatar}/>
                                    <p>{newAvatar &&<Text id="photo.confirmation"/>}</p>
                                    <Button primary onClick={this.onEditAvatar} disabled={!newAvatar}><Text id="confirm"/></Button>
                                </ModalDescription>
                            </ModalContent>
                        </Modal>
                    </HeaderContent>
                </Header>
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
