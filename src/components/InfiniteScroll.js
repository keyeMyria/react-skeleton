import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroller';


export default props => (
    <ReactInfiniteScroll
        pageStart={props.initialPage}
        hasMore={props.isLast}
        loadMore={props.onLoadMoreItems}
        {...props}
    />
);