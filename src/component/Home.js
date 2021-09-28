import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import {useSelector} from 'react-redux';
import {getFullImgUrl} from "../shared/sharedFunctions";



function RenderCard({item, type}) {
    const {id} = useSelector(store => store.credentials.credentials);

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
                <CardImg src={getFullImgUrl(id, type, item.image) } alt={item.title.text} />
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

    const {thePlace} = useSelector(store => store.thePlace);
    const {dishes} = useSelector(store => store.dishes);
    const {staff} = useSelector(store => store.staff);

    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="delete-on-phone col-md-4 p-3">
                    <RenderCard item={dishes[0]} type={"dishes"}/>
                </div>
                <div className="col-12 col-md-4 p-3">
                    <RenderCard item={thePlace[0]} type={"thePlace"}/>
                </div>
                <div className="delete-on-phone col-md-4 p-3">
                    <RenderCard item={staff[0]} type={"staff"} />
                </div>
            </div>
        </div>
    );
}

export default Home;
