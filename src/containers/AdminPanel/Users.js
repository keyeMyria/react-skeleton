import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {cleanFilters, getUsers, setEmailValue} from '../../redux/modules/adminUsers';
import {Item, Rail, Sticky} from 'semantic-ui-react';
import Button from '../../components/Button';
import InfiniteScroll from '../../components/InfiniteScroll';
import {Input} from '../../components/Form';
import Form from '../../components/Form';
import Container from "../../components/Container";
import {changeActivePage} from "../../redux/modules/adminMenu";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Message from "../../components/Message";
import Image from "../../components/Image";
import Header from "../../components/Header";

class UsersContainer extends Component {

    constructor() {
        super();
        this.onClickOpenUserDetails = this.onClickOpenUserDetails.bind(this);
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
        this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.onClickCleanFilters = this.onClickCleanFilters.bind(this);
    }

    componentWillMount() {
        const {dispatch, pageToLoad, size, email} = this.props;
        dispatch(changeActivePage('users'));
        dispatch(getUsers(pageToLoad, size, email));
    }

    onClickOpenUserDetails(userId) {
        const {history} = this.props;
        history.push(`/admin-panel/users/${userId}`);
    }

    loadMoreUsers() {
        const {dispatch, size, email, users, page} = this.props;
        users.length > 0 && dispatch(getUsers(page + 1, size, email));
    }

    onChangeEmailInput(field, value) {
        const {dispatch} = this.props;
        dispatch(setEmailValue(value));
    }

    onSubmitSearch() {
        const {dispatch, page, size, email} = this.props;
        dispatch(getUsers(page, size, email));
    }

    onClickCleanFilters() {
        const {dispatch} = this.props;
        dispatch(cleanFilters());
    }

    render() {
        const {isLast, users, filtered, email, loading} = this.props;
        const searchIcon = filtered
            ? <Icon name='delete' link onClick={this.onClickCleanFilters} />
            : <Icon name='search' link onClick={this.onSubmitSearch} />;
        return (
            <InfiniteScroll
                page={-1}
                loadMore={this.loadMoreUsers}
                last={isLast}
                loader={<Loader active inline='centered' key={0}/>}
            >
                <Container>
                    <Text id='users.search'/>
                    <Form onSubmit={this.onSubmitSearch}>
                        <Input value={email} onChange={this.onChangeEmailInput} icon={searchIcon} placeholderid='filter.by.email'/>
                    </Form>
                </Container>
                {users.length === 0 && !loading ?
                    <Message info>
                        <p><Icon name='info'/>{filtered ? <Text id='no.users.with.data.provided'/> : <Text id='no.users'/>}</p>
                    </Message>
                    :
                    <div>
                        {filtered && <p><Text id='result.users.filtered' values={{email: email}}/></p>}
                        <Item.Group divided>
                            {
                                users.map(user => (
                                    <Item key={user.id}>
                                        <Item.Image avatar size='tiny' src={user.avatar} alt='avatar'/>
                                        <Item.Content floated='right'>
                                            <Item.Header as='a' onClick={() => this.onClickOpenUserDetails(user.id)}>
                                                {user.name}
                                            </Item.Header>
                                            <Item.Meta>
                                                <span>{user.email}</span>
                                            </Item.Meta>
                                            <Button icon labelPosition='left' floated='right' primary onClick={() => this.onClickOpenUserDetails(user.id)}>
                                                <Icon name='info' />
                                                View details
                                            </Button>
                                        </Item.Content>
                                    </Item>
                                ))
                            }
                        </Item.Group>
                    </div>
                }
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = ({adminUsersReducer}) => {
    return {
        users: adminUsersReducer['users'],
        page: adminUsersReducer['page'],
        size: adminUsersReducer['size'],
        numberOfPages: adminUsersReducer['numberOfPages'],
        isLast: adminUsersReducer['isLast'],
        email: adminUsersReducer['email'],
        filtered: adminUsersReducer['filtered'],
        loading: adminUsersReducer['loading']
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
)(UsersContainer));
