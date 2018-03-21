import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {changePassword, setChangePasswordFormFieldValue} from "../../redux/modules/account";
import Button from "../../components/Button";
import {FormField, FormGroup, Input} from "../../components/Form";
import Form from "../../components/Form";
import ErrorsContainer from "../../components/ErrorsContainer";


class EditPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitChangePassword = this.onClickExitChangePassword.bind(this);
    }

    onSubmit() {
        const {dispatch, newPasswordInfo} = this.props;
        dispatch(changePassword(newPasswordInfo));
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
        const {error, errors, incompletePasswordForm} = this.props;
        return (
            <div>
                {error && <ErrorsContainer errors={errors}/>}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                type='password'
                                ref="password"
                                label='Old password'
                                name='oldPassword'
                                placeholderid='password'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                type='password'
                                label='New password'
                                name='password'
                                placeholderid='password'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                type='password'
                                label='New password confirmation'
                                name='passwordConfirmation'
                                placeholderid='password'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Button type='submit' onClick={this.onClickExitChangePassword}>Cancel</Button>

                    <Button primary type='submit' disabled={incompletePasswordForm}>Confirm</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        newPasswordInfo: accountReducer['newPasswordInfo'],
        incompletePasswordForm: accountReducer['incompletePasswordForm']
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
