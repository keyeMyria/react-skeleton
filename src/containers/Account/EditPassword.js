import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from "../../components/Button";
import {FormField, FormGroup, Input} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";
import Text from "../../components/Text";
import {changePassword, setChangePasswordFormFieldValue} from "../../redux/modules/account/changePassword";

class EditPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitChangePassword = this.onClickExitChangePassword.bind(this);
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        dispatch(changePassword(formData));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setChangePasswordFormFieldValue(field, value));
    }

    onClickExitChangePassword() {
        const {history} = this.props;
        history.push('/account');
    }

    render() {
        const {errorMessage, errors, incompletePasswordForm, passwordsNotMatching, formData} = this.props;
        return (
            <div>
                {passwordsNotMatching
                    ? <ErrorsContainer message={<Text id='passwords.not.matching'/>} />
                    : <ErrorsContainer message={errorMessage} errors={errors}/>
                }
                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                labelid='old.password'
                                name='oldPassword'
                                placeholderid='old.password'
                                value={formData.oldPassword}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                labelid='new.password'
                                name='password'
                                placeholderid='new.password'
                                value={formData.password}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                labelid='new.password.confirmation'
                                name='passwordConfirmation'
                                placeholderid='new.password.confirmation'
                                value={formData.passwordConfirmation}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Button primary type='submit' disabled={incompletePasswordForm}><Text id="confirm"/></Button>
                    <Button type='submit' onClick={this.onClickExitChangePassword}><Text id="cancel"/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {changePasswordReducer} = accountReducers;
    return {
        formData: changePasswordReducer['formData'],
        incompletePasswordForm: changePasswordReducer['incompletePasswordForm'],
        errorMessage: changePasswordReducer['errorMessage'],
        errors: changePasswordReducer['errors'],
        passwordsNotMatching: changePasswordReducer['passwordsNotMatching']
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
