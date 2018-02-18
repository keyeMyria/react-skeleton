import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';

export default injectIntl(props => (
    <Dropdown {...props} text={props.intl.formatMessage({id: props.text})}/>
));

export const DropdownMenu = props => (
    <Dropdown.Menu {...props}/>
);

export const DropdownItem = props => (
    <Dropdown.Item {...props}/>
);