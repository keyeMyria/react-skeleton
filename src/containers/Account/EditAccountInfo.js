import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    editAccountInfo, exitEditAccountInfo,
    setEditAccountFormFieldValue
} from "../../redux/modules/account";
import Button from "../../components/Button";
import {FormField, FormGroup, Input, Select} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";


const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE'},
    {key: 'female', value: 'FEMALE'}
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
        const {dispatch} = this.props;
        dispatch(exitEditAccountInfo());
    }

    render() {
        const {info, error, errors, incompleteForm} = this.props;
        return (
            <div>
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
        incompleteForm: accountReducer['incompleteForm']
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
)(EditAccountInfoContainer));
