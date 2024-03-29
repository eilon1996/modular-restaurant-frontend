import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col, Row } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import EditBox from './EditBox';
import MultiSelect from "react-multi-select-component";
import { patchContent } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import {getFullImgUrl} from "../shared/sharedFunctions";
import '../style-css/dishDetail.css';

const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len)
const minLength = (len) => val => !(val) || (val.length >= len)




function DishDetail(props) {

    const {dishes} = useSelector(store => store.dishes);
    const {id} = useSelector(store => store.credentials.credentials);
    const dispatch = useDispatch()

    const [render, setRender] = useState(0);


    console.log("dishes:", dishes, "props.id", props.id)
    const Dish = () => {

        const [selected, setSelected] = useState(() => {
            var value = []
            if (dishes !== null) {
                if (dishes[props.id]["label"].indexOf("Hot") > -1)
                    value.push({ label: "Hot 🌶", value: "Hot 🌶" });

                if (dishes[props.id]["label"].indexOf("Vegan") > -1)
                    value.push({ label: "Vegan 🌱", value: "Vegan 🌱" });
            }
            return value;
        })

        const labels = selected.length === 2 ? <span>Hot 🌶 &amp; Vegan 🌱</span> : null;

        const options = [
            { label: "Hot 🌶", value: "Hot 🌶" },
            { label: "Vegan 🌱", value: "Vegan 🌱" }
        ]

        useEffect(() => {
            if (dishes !== null && selected.map(label => label.label).join(",") !== dishes[props.id]["label"]) {
                dishes[props.id]["label"] = selected.map(label => label.label).join(",");

                const path = id+"/dishes/"+props.id+"/label";
                dispatch(patchContent(path ,dishes[props.id]['label'], dishes, id,"dishes"));
            }
        }, [selected])

        return (
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                <Card>
                    <CardImg top src={getFullImgUrl(id, "dishes", dishes[props.id].image)} alt={dishes[props.id].title.text} />
                    <CardBody>
                        <div>
                            {labels}
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={(event) => setSelected(Object.values(event))}
                                labelledBy={"Select"}
                                selectedValues={selected}
                            />
                            <EditBox field="description" type="dishes" itemId={props.id} />
                        </div>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

    const Comments = () => {

        return (
            dishes ?
                dishes[props.id].comments ?
                    <Stagger in>{
                        Object.keys(dishes[props.id].comments).map((key) => (dishes[props.id].comments[key]?
                            <Fade in key={key}>
                                <li className="list-unstyled">
                                    <p>
                                        {dishes[props.id].comments[key].comment} <br />
                                --{dishes[props.id].comments[key].author},
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                                            .format(new Date(Date.parse(dishes[props.id].comments[key].date)))}
                                    </p>
                                </li>
                            </Fade>
                            :
                            <div></div>
                        ))
                        }</Stagger>
                    :
                    <Stagger in><li><p>be the first to comment!</p></li></Stagger>
                :
                <Stagger in><li><p>loading comments...</p></li></Stagger>
        )
    }


    const AddComment = () => {

        const [isModalOpen, setIsModalOpen] = useState(false);

        const [rating, setRating] = useState(5);
        const [author, setAuthor] = useState("");
        const [comment, setComment] = useState("");



        function handleSubmit(values) {
            setIsModalOpen(!isModalOpen);
            const amount = dishes[props.id]["comments"].length;
            let newComment = { "author": values.author, "comment": values.comment, "date": new Date().toISOString(), "id": amount, "rating": values.rating }
            dishes[props.id].comments[amount] = newComment;

            var d = new Date();
            var commentId = "ID"+d.getTime();
            
            const path = id+"/dishes/"+props.id+"/comments/"+commentId;
            dispatch(patchContent(path ,newComment, dishes, id,"dishes"));

            setRender(render + 1);
        }


        return (
            <React.Fragment>
                    <button outline onClick={() => setIsModalOpen(!isModalOpen)} className='btn mr-auto mt-4'
                    style={{backgroundColor:"#ababab"}}>
                        <span className='fa fa-pencil fa-lg'> Submit Comment</span>
                    </button>
                    <Modal outline isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                        <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>Submit Comment</ModalHeader>
                        <ModalBody>

                            <LocalForm onSubmit={(values) => handleSubmit(values)}>

                            <Row className="form-group">
                                    <Label htmlFor="author" md={{ size: 12 }}>Your Name</Label>
                                    <Col md={{ size: 12 }}>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                            className="form-control" onChange={(event) => setAuthor(event.target.value)}
                                            validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                            value={author} />
                                        <Errors className="text-danger" model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Requierd ',
                                                minLength: 'Must be greater than 2 characters ',
                                                maxLength: 'Must be 15 characters or less '
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 12 }}>
                                        <span>rate the meal    </span>
                                        <Control.select model=".rating" name="rating" className="select"
                                            value={rating} onChange={(event) => setRating(event.target.value)}
                                            >
                                            <option>  5  </option>
                                            <option>  4  </option>
                                            <option>  3  </option>
                                            <option>  2  </option>
                                            <option>  1  </option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={{ size: 12 }}>Comment</Label>
                                    <Col md={{ size: 12 }}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6" className="form-control" value={comment}
                                            onChange={(event) => setComment(event.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 12 }}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </React.Fragment>
        );

    }

    return (
        <div className="container">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dishes[props.id].title.text}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <EditBox type="dishes" field="title" itemId={props.id} />
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Dish />
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <h4>comments</h4>
                            <ul className="list-gruop">
                                <Comments />
                            </ul>

                            <div className="row">
                                <AddComment />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default DishDetail;