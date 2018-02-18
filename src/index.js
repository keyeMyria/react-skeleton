import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import {registerLocales} from "./i18n/utils";
import App from './App';

registerLocales();

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
