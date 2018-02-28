import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    editAccountInfo, setEditAccountFormFieldValue
} from "../../redux/modules/account";
import Button from "../../components/Button";
import {FormField, FormGroup, Input, Select} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";
import EditAvatar from "./EditAvatar";

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE'},
    {key: 'female', value: 'FEMALE'}
];

const LANGUAGE_OPTIONS = [
    {key: 'english', value: 'en'},
    {key: 'spanish', value: 'es'},
    {key: 'japanese', value: 'ja'},
    {key: 'french', value: 'fr'}

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
                    <Button primary type='submit' onClick={this.onClickExitEditCredentialsButton}>Cancel</Button>

                    <Button primary type='submit' disabled={incompleteForm}>Confirm</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        language: accountReducer['language'],
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
