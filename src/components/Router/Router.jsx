import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import { AuthRoute } from "../Auth/Auth";
import './Router.scss';

export default function Router(props) {

    return (
        <Switch>
            {routes.reduce((reducedRoutes, route) => {
                // console.log(route)
                if(route.privileged) {
                    reducedRoutes.push(
                        <AuthRoute 
                            key={route.path} 
                            path={route.path} 
                            exact={route.exact} 
                            component={route.component} 
                        />                            
                    )
                } else {
                    reducedRoutes.push(
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    )
                }    
                return reducedRoutes;            
            }, [])}
            <Route render={() => <div>
            <div className="errorwrapper">
            <h1>Siden du forsøger at tilgå findes ikke. Vend tilbage til Forsiden og forsøg igen!</h1>

            <img className="fourofour" alt="Qries" src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png" />
            
            </div>
            </div>
            } />
        </Switch>
    )
}
