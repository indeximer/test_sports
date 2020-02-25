import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

/* Components */
import ErrorBoundary from './ErrorBoundary'
import MatchList from '../MatchList'
import Adversary from '../MatchList/Adversary'
import Championship from '../MatchList/Championship'

const routeList = [
  {
    path: '/',
    component: MatchList,
    exact: true
  },
  {
    path: '/adversary/:adversaryId',
    component: Adversary,
    exact: false
  },
  {
    path: '/championship/:championshipId',
    component: Championship,
    exact: false
  }
]

const RouteBuilder = route => {
  return (
    <ErrorBoundary>
      <Route
            exact={!!route.exact}
            path={route.path}
            render={props => (<route.component {...props} />)} />
    </ErrorBoundary>
    
  )
}

const Routes = props => {
  return (
    <Switch>
      {routeList.map((route, key) => {
          return <RouteBuilder key={key} {...route} />
        }  
      )}
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default withRouter(Routes)