import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import AppRoutes from './routes';
import {ConnectedRouter} from 'react-router-redux';
import store from './redux/store';
import createBrowserHistory from 'history/createBrowserHistory';
import IntlProvider from './i18n/IntlProvider';

let history = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Provider store={store(history)}>
                <IntlProvider>
                    <ConnectedRouter history={history}>
                        <CookiesProvider>
                            <AppRoutes/>
                        </CookiesProvider>
                    </ConnectedRouter>
                </IntlProvider>
            </Provider>
        );
    }
}
  