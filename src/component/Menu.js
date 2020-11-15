import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem, Collapse, CardBody, CardText } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchContent } from '../redux/ActionCreators';
import UploadS3 from './UploadS3';

import '../style-css/menu.css';

const Menu = (props) => {

    const {id} = useSelector(store => store.credentials.credentials);
    const store = useSelector(store => store);
    const {dishes} = useSelector(store => store.dishes);
    const [render, setRender] = useState(0);
    const dispatch = useDispatch()

    const AddDish = () => {

        const [showForm, setShowForm] = useState(false);
        const [title, setTitle] = useState();
        const [selected, setSelected] = useState([]);
        const [description, setDescription] = useState();
        const [imgUrl, setImgUrl] = useState();

        useEffect(() => {
            console.log("useEffect, ", imgUrl);
        }, [imgUrl, setImgUrl])

        const options = [
            { label: "Hot 🌶", value: "Hot 🌶" },
            { label: "Vegan 🌱", value: "Vegan 🌱" }
        ]

        function handleSubmit(event) {
            const amount = dishes.length;
            let newDish = JSON.parse(JSON.stringify(dishes[amount - 1]));

            newDish.title.text = title;
            newDish.label = selected.map(label => label.label).join();
            newDish.description.text = description;
            newDish.id = amount;
            newDish.comments = null;
            newDish.image = imgUrl;
            dishes[amount] = newDish;
            setShowForm(false);
            dispatch(patchContent(id,"dishes",dishes));
            setTitle("");
            setSelected([]);
            setDescription("");
            setRender(render + 1);
            event.preventDefault()
        }

        return (
            <div className="col-6 col-md-4 menu-card"  >
                <button className="btn btn-primary" style={{ display: showForm ? "none" : "block" }} onClick={() => setShowForm(!showForm)}>add dish</button>

                <Collapse isOpen={showForm} navbar>
                    <Card>
                        <CardBody>
                            <form onSubmit={(event) => handleSubmit(event)} className="addDish-form">
                                <input value={title} onChange={(event) => setTitle(event.target.value)} name="title" placeholder="dish name" />
                                <UploadS3 type={"dishes"} itemId={Object.keys(dishes).length} contentId={id} imgUrl={imgUrl} setImgUrl={setImgUrl} />
                                <CardText>
                                    <span>{(selected && selected.length === 2) ? <span>Hot 🌶 &amp; Vegan 🌱</span> : null}</span>
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={(event) => setSelected(Object.values(event))}
                                        labelledBy={"Select"}
                                        selectedValues={selected}
                                    />
                                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} name="description" placeholder="dish description" />
                                </CardText>
                                <button className="btn btn-light" type="button" onClick={() => setShowForm(!showForm)}>cancel</button>
                                <button className="btn btn-primary" type="submit">add</button>
                            </form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

    function deleteDish(dishId) {
        let ans = window.confirm(dishes[dishId].title.text + " is going to be deleted");
        if (ans === false) return; // do nothing
        let newDishes = [];
        for (let i = 0; i < dishId; i++) {
            newDishes.push(dishes[i])
        }
        for (let i = dishId; i < dishes.length - 1; i++) {
            dishes[i + 1].id = i;
            newDishes.push(dishes[i + 1])
        }
        dispatch(patchContent(id,"dishes",newDishes));
        setRender(render + 1);
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>menu</h3> <hr />
                </div>
            </div>
                <div className="row">
                    {dishes.map((dish) => (
                        true ?
                            <div className="col-6 col-md-4 menu-card">
                                <Link to={`/menu/${dish.id}`} key={dish.id}>
                                    <CardImg width="100%" src={dish.image} alt={dish.title.text} />
                                    <CardImgOverlay>
                                    <span style={{ color: "black", fontFamily: dish.title.fontFamily, fontSize: dish.title.fontSize }}>{dish.title.text}</span>
                                    </CardImgOverlay>
                                </Link>     
                                <button className=" menu-delete-button btn btn-default" onClick={() => deleteDish(dish.id)} style={{ marginLeft: "auto" }}><span className="fa fa-times"></span></button>
                               
                            </div>
                            :
                            <Card className="col-6 col-md-4 menu-card" key={dish.id}>
                                <Link to={`/menu/${dish.id}`}>
                                    <CardImg width="100%" src={dish.image} alt={dish.title.text} />
                                </Link>
                                <CardImgOverlay className="menu-overlay">
                                    <Link href={`/menu/${dish.id}`}> <span style={{ color: "black", fontFamily: dish.title.fontFamily, fontSize: dish.title.fontSize }}>{dish.title.text}</span></Link>
                                </CardImgOverlay>
                                <CardImgOverlay className="menu-overlay-button">
                                    <button className=" menu-delete-button btn btn-default" onClick={() => deleteDish(dish.id)} style={{ marginLeft: "auto" }}><span className="fa fa-times"></span></button>
                                </CardImgOverlay>
                            </Card>
                    ))}
                    <AddDish />
                </div>
        </div>
    );
}


export default Menu;