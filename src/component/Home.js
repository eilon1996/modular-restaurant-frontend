import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import Loading  from './Loading';
import { FadeTransform } from 'react-animation-components';
import {useSelector} from 'react-redux';



function RenderCard({item}) {

    if(item === undefined){
        return(
            <Card>
                <CardBody>
                <CardTitle>item is undifine but also there is no error</CardTitle>
                </CardBody>
            </Card>
        );
    }
    return(
        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)' }}>
            <Card>
                <CardImg src={item.image} alt={item.title.text} />
                <CardBody>
                <CardTitle>{item.title.text}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description.text}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {

    
    const {myContent, isLoading, errMess} = useSelector(store => store.myContent);

    if(isLoading){
        
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
                <div className="col-12 col-md m-1">
                    <Loading />
                </div>
            </div>
        </div>
        );
    }
    if(errMess !== null && errMess !== undefined){
        return (<div>errmess {errMess}</div>)
    }

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="delete-on-phone col-md-4 p-3">
                    <RenderCard item={myContent.dishes[0]}/>
                </div>
                <div className="col-12 col-md-4 p-3">
                    <RenderCard item={myContent.thePlace[0]}/>
                </div>
                <div className="delete-on-phone col-md-4 p-3">
                    <RenderCard item={myContent.staff[0]} />
                </div>
            </div>
        </div>
    );
}

export default Home;
