import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from "../../components/Button";
import {FormField, FormGroup, Input, Select} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";
import EditAvatar from "./EditAvatar";
import Text from "../../components/Text";
import {
    editAccountInfo, setEditAccountFormFieldValue,
    setInitialAccountInfo
} from "../../redux/modules/account/editAccountInfo";

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

    componentWillMount() {
        const {dispatch, info, language} = this.props;
        dispatch(setInitialAccountInfo({...info, language: language}));

    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        dispatch(editAccountInfo(formData));
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
        const {formData, errorMessage, errors, incompleteForm} = this.props;
        return (
            <div>
                <EditAvatar/>
                {errorMessage && <ErrorsContainer errors={errors}/>}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                labelid='email'
                                icon='at'
                                type='email'
                                name='email'
                                value={formData.email}
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
                                value={formData.name}
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
                                value={formData.gender}
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
                                value={formData.language}
                                placeholderid='language'
                                options={LANGUAGE_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Button primary type='submit' disabled={incompleteForm}><Text id='confirm'/></Button>
                    <Button type='submit' onClick={this.onClickExitEditCredentialsButton}><Text id='cancel'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {accountInfoReducer, editAccountInfoReducer} = accountReducers;
    return {
        info: accountInfoReducer['info'],
        language: accountInfoReducer['language'].toUpperCase(),
        incompleteForm: editAccountInfoReducer['incompleteForm'],
        formData: editAccountInfoReducer['formData']

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
