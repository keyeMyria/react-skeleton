import AccountInfo from "./AccountInfo";
import EditPassword from "./EditPassword";
import EditAccountInfo from "./EditAccountInfo";

const ACCOUNT_URI = '/account';

export default () => (
                <Route exact match={match} path={ACCOUNT_URI} component={AccountInfo}/>
                <Route exact path={`${ACCOUNT_URI}/edit`} component={EditAccountInfo}/>
                <Route exact path='/edit/password' component={EditPassword}/>
);