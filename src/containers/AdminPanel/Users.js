import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUsers} from "../../redux/modules/adminUsers";
import {List, Loader} from "semantic-ui-react";
import Button from "../../components/Button";
import Image from "../../components/Image";
import InfiniteScroll from "../../components/InfiniteScroll";

class UsersContainer extends Component {

    constructor() {
        super();
        this.onClickOpenUserDetails = this.onClickOpenUserDetails.bind(this);
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
    }

    componentWillMount() {
        const {dispatch, page, size} = this.props;
        dispatch(getUsers(page, size));
    }

    onClickOpenUserDetails(userId) {
        const {history} = this.props;
        history.push(`/admin-panel/users/${userId}`);
    }

    loadMoreUsers(page) {
        const {dispatch, size} = this.props;
        dispatch(getUsers(page, size));
    }

    render() {
        const {isLast, users} = this.props;
        return (
            <InfiniteScroll
                initialPage={0}
                onLoadMoreItems={this.loadMoreUsers}
                isLast={!isLast}
                loader={ <Loader active inline='centered' />}>
                {users.length === 0 && <span>No users</span>}
                <List animated celled verticalAlign='middle' size='big'>
                    {users.map(user => (
                        <List.Item>
                            <List.Content floated='right'>
                                <Button onClick={() => this.onClickOpenUserDetails(user.id)}>View details</Button>
                            </List.Content>
                            <Image avatar src={user.avatar} alt="avatar"/>
                            <List.Content>
                                {user.name} - {user.email}
                            </List.Content>
                        </List.Item>
                    ))
                    }
                </List>
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
        isLast: adminUsersReducer['isLast']
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
