import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroller';

export default props => (
    <ReactInfiniteScroll
        {...props}
        pageStart={props.page}
        hasMore={!props.last}
        loadMore={props.loadMore}
    />
);