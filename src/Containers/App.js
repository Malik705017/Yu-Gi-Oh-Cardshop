import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HashRouter,  Switch } from "react-router-dom";
import { requestCards } from '../Redux/actions'

import Layout from './Layout'
import Router from './Router/Router'

const mapStateToProps = state => ({
  cards: state.cardShop.cards,
  isPending: state.cardShop.isPending,
  error: state.cardShop.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestCards: () => dispatch(requestCards())
  }
}

function App(props) {

  const { onRequestCards } = props
  useEffect(onRequestCards,[])

  return <HashRouter>
          <Switch>
            <Layout>
              <Router/>
            </Layout>
          </Switch>
          </HashRouter>
  
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);