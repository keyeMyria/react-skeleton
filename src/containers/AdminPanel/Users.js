import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {cleanFilters, getUsers, setEmailValue} from '../../redux/modules/adminUsers';
import {List} from 'semantic-ui-react';
import Button from '../../components/Button';
import Image from '../../components/Image';
import InfiniteScroll from '../../components/InfiniteScroll';
import {Input} from '../../components/Form';
import Form from '../../components/Form';
import Container from "../../components/Container";
import {changeActivePage} from "../../redux/modules/adminMenu";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon";
import Text from "../../components/Text";
import Message from "../../components/Message";

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
        const {dispatch, page, size, email} = this.props;
        dispatch(getUsers(page, size, email));
        dispatch(changeActivePage('users'));
    }

    onClickOpenUserDetails(userId) {
        const {history} = this.props;
        history.push(`/admin-panel/users/${userId}`);
    }

    loadMoreUsers(pageToLoad) {
        const {dispatch, size, email, page} = this.props;
        pageToLoad === page && dispatch(getUsers(pageToLoad, size, email));
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
        const {isLast, users, filtered, email} = this.props;
        const searchIcon = filtered
            ? <Icon name='delete' link onClick={this.onClickCleanFilters} />
            : <Icon name='search' link onClick={this.onSubmitSearch} />;
        return (
            <InfiniteScroll
                page={0}
                loadMore={this.loadMoreUsers}
                last={!isLast}
                loader={<Loader active inline='centered' key={0}/>}
            >
                <Container>
                    <Text id='users.search'/>
                    <Form onSubmit={this.onSubmitSearch}>
                        <Input value={email} onChange={this.onChangeEmailInput} icon={searchIcon} placeholderid='filter.by.email'/>
                    </Form>
                </Container>
                {users.length === 0 ?
                    <Message info>
                        <p><Icon name='info'/>{filtered ? <Text id='no.users.with.data.provided'/> : <Text id='no.users'/>}</p>
                    </Message>
                    :
                    <div>
                        {filtered && <p><Text id='result.users.filtered' values={{email: email}}/></p>}
                        <List animated celled verticalAlign='middle' size='big'>
                            {
                                users.map(user => (
                                    <List.Item key={user.id}>
                                        <List.Content floated='right'>
                                            <Button onClick={() => this.onClickOpenUserDetails(user.id)}>View
                                                details</Button>
                                        </List.Content>
                                        <Image avatar src={user.avatar} alt='avatar'/>
                                        <List.Content>
                                            {user.name} - {user.email}
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </div>
                }
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = ({adminUsersReducer}) => {
    return {
        users: adminUsersReducer['users'],
        page: adminUsersReducer['info'],
        size: adminUsersReducer['newAvatar'],
        numberOfPages: adminUsersReducer['numberOfPages'],
        isLast: adminUsersReducer['isLast'],
        email: adminUsersReducer['email'],
        filtered: adminUsersReducer['filtered']
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
