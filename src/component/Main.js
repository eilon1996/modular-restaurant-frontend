import React, { useEffect } from 'react';
// the next comment allow the compiler to ignore the problem
// eslint-disable-next-line
import Menu from './Menu';
import Contact from './Contact';
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




const mapStateToProps = state => {
  console.log("mapStateToProps", state.content);
  return {
    //myContent: state.myContent
  }
}

const mapDispatchToProps = dispatch => {

  /*   console.log("mapDispatchToProps")
    return {
      fetchMyContent: (id) => dispatch(fetchMyContent(id)),
    } */
};

function Main(props) {

 // const [didDispatch, setDidDispatch] = useState(false)
  const { myContent } = useSelector(store => store.myContent);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("main useEffect")
    if (myContent === null) {
      //setDidDispatch(true);
      dispatch(loginToken());
    }
  }, []);

  if (myContent === null){
    return(<LoadingPage/>)
  }

  const HeaderPart = () => {
    return (<Header />);
  };

  const FooterPart = () => {
    return (<Footer />);
  };

  return (
    <div>
      <HeaderPart />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch location={props.location}>
            <Route path='/home' component={() => <Home />} />
            <Route exact path='/aboutus' component={() => <About />} />
            <Route exact path='/menu' component={() => <Menu />} />
            <Route path='/menu/:id' component={({ match }) => <DishDetail id={parseInt(match.params.id, 10)} />} />
            <Route exact path='/contactus' component={() =>
              <Contact resetFeedbackForm={props.resetFeedbackForm}
                postFeedback={props.postFeedback} />} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <FooterPart />
    </div>
  );

}
// this connect the main to the redux store and allow accsess to its fields
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((Main)));