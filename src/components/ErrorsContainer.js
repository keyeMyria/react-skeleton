import React from 'react';
import {Message} from 'semantic-ui-react';

export default ({errors}) => (
    errors.map((error, index) => <Message key={index} negative>{error}</Message>)
);