import React from 'react';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';

import Title from '../../components/Title';
import MenuContainer from '../Menu';

export default () => (
    <div>
        <MenuContainer/>
        <Grid centered>
            <GridColumn computer={12} tablet={12} mobile={14} textAlign='center'>
                <Container>
                    <Title id='home'/>
                </Container>
            </GridColumn>
        </Grid>
    </div>
);