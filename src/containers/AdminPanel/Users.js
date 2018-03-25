import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsers, setEmailValue} from '../../redux/modules/adminUsers';
import {List} from 'semantic-ui-react';
import Button from '../../components/Button';
import Image from '../../components/Image';
import InfiniteScroll from '../../components/InfiniteScroll';
import {Input} from '../../components/Form';
import Form from '../../components/Form';
import Container from "../../components/Container";
import {changeActivePage} from "../../redux/modules/adminMenu";
import Loader from "../../components/Loader";

class UsersContainer extends Component {

    constructor() {
        super();
        this.onClickOpenUserDetails = this.onClickOpenUserDetails.bind(this);
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
        this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
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

    render() {
        const {isLast, users} = this.props;
        return (
            <InfiniteScroll
                page={0}
                loadMore={this.loadMoreUsers}
                last={!isLast}
                loader={<Loader active inline='centered' key={0}/>}
            >
                <Container>
                    Search
                    <Form onSubmit={this.onSubmitSearch}>
                        <Input onChange={this.onChangeEmailInput} icon='search' placeholderid='search'/>
                    </Form>
                </Container>
                {users.length === 0 ?
                    <span>No users</span>
                    :
                    <div>
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
        email: adminUsersReducer['email']
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
