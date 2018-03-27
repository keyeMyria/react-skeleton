import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editAccountInfo, setEditAccountFormFieldValue} from "../../redux/modules/account";
import Button from "../../components/Button";
import {FormField, FormGroup, Input, Select} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";
import EditAvatar from "./EditAvatar";
import Text from "../../components/Text";

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE', icon: 'man'},
    {key: 'female', value: 'FEMALE', icon: 'woman'}
];

const LANGUAGE_OPTIONS = [
    {key: 'english', value: 'EN', flag: 'gb'},
    {key: 'spanish', value: 'ES', flag: 'es'},
    {key: 'japanese', value: 'JA', flag: 'jp'},
    {key: 'french', value: 'FR', flag: 'fr'}

];

class EditAccountInfoContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitEditCredentialsButton = this.onClickExitEditCredentialsButton.bind(this);
    }

    onSubmit() {
        const {dispatch, info} = this.props;
        dispatch(editAccountInfo(info));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setEditAccountFormFieldValue(field, value));
    }

    onClickExitEditCredentialsButton() {
        const {history} = this.props;
        history.push('/account');
    }

    render() {
        const {info, language, error, errors, incompleteForm} = this.props;
        return (
            <div>
                <EditAvatar/>
                {error && <ErrorsContainer errors={errors}/>}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                labelid='email'
                                icon='at'
                                type='email'
                                name='email'
                                value={info.email}
                                placeholderid='email'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                labelid='name'
                                icon='info'
                                type='text'
                                name='name'
                                value={info.name}
                                placeholderid='name'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField>
                            <b><Text id='gender'/></b>
                            <Select
                                type='select'
                                name='gender'
                                value={info.gender}
                                placeholderid='gender'
                                options={GENDER_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField>
                            <b><Text id='language'/></b>
                            <Select
                                type='select'
                                name='language'
                                value={language}
                                placeholderid='language'
                                options={LANGUAGE_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Button type='submit' onClick={this.onClickExitEditCredentialsButton}><Text id='cancel'/></Button>
                    <Button primary type='submit' disabled={incompleteForm}><Text id='confirm'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        language: accountReducer['language'].toUpperCase(),
        incompleteForm: accountReducer['incompleteForm']
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccountInfoContainer);
