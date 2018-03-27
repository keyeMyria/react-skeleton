import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid, {GridColumn} from "../../components/Grid";
import Container from "../../components/Container";
import Form, {FormField, FormGroup, Input} from "../../components/Form";
import Title from "../../components/Title";
import Message from "../../components/Message";
import {onChangeResetPasswordEmailField, requestResetPassword} from "../../redux/modules/resetPassword";
import Button from "../../components/Button";
import ErrorsContainer from "../../components/ErrorsContainer";
import Text from "../../components/Text";
import Icon from "../../components/Icon";

class ResetPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(onChangeResetPasswordEmailField(value))
    }

    onSubmit() {
        const {dispatch, email} = this.props;
        dispatch(requestResetPassword(email));
    }

    render() {
        const {successMessage, errors, isIncomplete} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Container>
                        <Title id='login'/>
                        {successMessage && <Message info><Icon name='info'/>{successMessage}</Message>}
                        {errors && <ErrorsContainer errors={errors}/>}
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup widths='equal'>
                                <FormField width={2}>
                                    <Input
                                        labelid='email'
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        onChange={this.onChange}
                                    />
                                </FormField>
                            </FormGroup>
                            <Button primary type='submit' disabled={isIncomplete}><Text id='send.email'/></Button>
                        </Form>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({resetPasswordReducer}) => {
    return {
        email: resetPasswordReducer['email'],
        successMessage: resetPasswordReducer['successMessage'],
        errors: resetPasswordReducer['errors']
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
)(ResetPasswordContainer));
