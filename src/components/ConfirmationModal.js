import React from 'react';
import {Confirm} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';

export default injectIntl(props => (
    <Confirm
        {...props}
        content={props.intl.formatMessage({id: props.content})}
        cancelButton={props.intl.formatMessage({id: props.cancelButton})}
        confirmButton={props.intl.formatMessage({id: props.confirmButton})}
    />
));
