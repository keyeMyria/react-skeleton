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
import Flag from "../../components/Flag";
import Loader from "../../components/Loader";

class AccountInfoContainer extends Component {

    constructor() {
        super();
        this.onClickEditCredentialsButton = this.onClickEditCredentialsButton.bind(this);
        this.onClickChangePasswordButton = this.onClickChangePasswordButton.bind(this);
        this.onClickDeleteAccountButton = this.onClickDeleteAccountButton.bind(this);
        this.getFormattedGender = this.getFormattedGender.bind(this);
    }

    onClickEditCredentialsButton() {
        const {history} = this.props;
        history.push('/account/edit');
    }

    onClickChangePasswordButton() {
        const {history} = this.props;
        history.push('/account/edit/password');
    }

    onClickDeleteAccountButton() {
        const {history} = this.props;
        history.push('/account/delete');
    }

    getFormattedGender() {
        const {gender} = this.props.info;
        return gender.charAt(0) + gender.slice(1).toLowerCase();
    }

    render() {
        const {info, language, loading} = this.props;
        const gender = this.getFormattedGender();
        return (
            <div>
                {loading ? <Loader active inline='centered'/> :
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
                                <p>
                                    <b>Email</b>: {info.email}
                                </p>
                                <p>
                                    <b>Gender</b>: {gender}
                                </p>
                            </GridColumn>
                            <GridColumn computer={4} tablet={4} mobile={14}>
                                <b>Language</b>:
                                <Flag name={language}/>
                            </GridColumn>
                        </Grid>
                        <Grid>
                            <GridColumn computer={8} tablet={8} mobile={14}>
                                <b>Created at</b>: <Date value={info.createdAt} year='numeric' month='long'
                                                         day='numeric' weekday='long'/>

                            </GridColumn>
                            <GridColumn computer={8} tablet={8} mobile={14}>

                                <b>Updated at</b>: <Date value={info.updatedAt} year='numeric' month='long'
                                                         day='numeric' weekday='long'/>
                            </GridColumn>
                        </Grid>
                        <Button primary icon='edit' content='Edit credentials' type='submit'
                                onClick={this.onClickEditCredentialsButton}/>
                        <Button primary icon='edit' type='submit' content='Edit password'
                                onClick={this.onClickChangePasswordButton}/>
                        <Button color='red' icon='remove user' type='submit' content='Delete account'
                                onClick={this.onClickDeleteAccountButton}/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({accountReducer}) => {
    return {
        info: accountReducer['info'],
        language: accountReducer['language'],
        loading: accountReducer['loading']
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
)(AccountInfoContainer));
