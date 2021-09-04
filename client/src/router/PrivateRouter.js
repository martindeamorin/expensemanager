import { Route, Redirect } from 'react-router-dom';
import { useStore } from '../store/StoreProvider';

export default function PrivateRoute({component: Component, ...rest}) {
    const store = useStore();
    return (
        <Route {...rest}>
            {store.user ? <Component /> : <Redirect to={{ pathname: ''}} />}
        </Route>
    )
}
