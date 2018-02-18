import React from 'react';
import styled from 'styled-components';
import {injectIntl} from 'react-intl';
import Text from './Text';

const Title = styled.h1`
  color: ${props => props.color || 'goldenrod'}
`;

export default injectIntl(props => (
    <Title><Text {...props}/></Title>
));