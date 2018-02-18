import React from 'react';

import {Grid as GridSemantic} from 'semantic-ui-react';

export default props => (
    <GridSemantic {...props}/>
);

export const GridColumn = props => (
    <GridSemantic.Column {...props}/>
);