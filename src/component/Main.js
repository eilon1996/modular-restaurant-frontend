import React, { useEffect } from 'react';
// the next comment allow the compiler to ignore the problem
// eslint-disable-next-line
import Menu from './Menu';
import About from './About';
import Home from './Home';
import DishDetail from './Dishdetail';
import Header from './Header';
import Footer from './Footer';
import LoadingPage from './LoadingPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { loginToken } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


//set cookies in chrome
// TODO:add re-arange styles - one page/ multi page/ 
// TODO:add feture option squares/ carosel 
// TODO:menu-dishes modal/new page
// TODO:loading page - jumping dots , add content
// TODO: new domain for a user 
// TODO: view mode

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {};

function Main(props) {

  const { page } = useSelector(store => store.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page);
    else {
      dispatch(loginToken());
    }
  }, );

  if (page) {
    if (page === "one") {
      return (
        <div className="onePage">
          <Header />
            <Switch location={props.location}>
              <Route exact path='/home' component={() => 
                  <React.Fragment>
                    <Menu />
                    <About />
                  </React.Fragment>} />
              <Route path='/menu/:id' component={({ match }) => 
                  <DishDetail id={match.params.id} />} />
              <Redirect to="/home" />
            </Switch>
          <Footer />
        </div>
      );
    }

    //else
    
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={props.location.key} classNames="page" timeout={300}>
            <Switch location={props.location}>
              <Route path='/home' component={() => <Home />} />
              <Route exact path='/aboutus' component={() => <About />} />
              <Route exact path='/menu' component={() => <Menu />} />
              <Route path='/menu/:id' component={({ match }) => <DishDetail id={match.params.id} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );

  }

  return (<LoadingPage />)
}
// this connect the main to the redux store and allow accsess to its fields
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Main)));