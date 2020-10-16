import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem, Collapse, CardBody, CardText } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { Link } from 'react-router-dom';
import Loading from './Loading'
import { useSelector, useDispatch } from 'react-redux';
import { putContent } from '../redux/ActionCreators';
import UploadS3 from './UploadS3';

import '../style-css/menu.css';

const Menu = (props) => {

    const { myContent, isLoading } = useSelector(store => store.myContent);
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
            const amount = myContent.dishes.length;
            let newDish = JSON.parse(JSON.stringify(myContent.dishes[amount - 1]));

            newDish.title.text = title;
            newDish.label = selected.map(label => label.label).join();
            newDish.description.text = description;
            newDish.id = amount;
            newDish.comments = null;
            newDish.image = imgUrl;
            myContent.dishes[amount] = newDish;
            setShowForm(false);
            dispatch(putContent(myContent));
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
                                <UploadS3 type={"dishes"} itemId={Object.keys(myContent.dishes).length} contentId={myContent.id} imgUrl={imgUrl} setImgUrl={setImgUrl} />
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

    function deleteDish(id) {
        let ans = window.confirm(myContent.dishes[id].title.text + " is going to be deleted");
        if (ans === false) return; // do nothing

        let newDishes = [];
        for (let i = 0; i < id; i++) {
            newDishes.push(myContent.dishes[i])
        }
        for (let i = id; i < myContent.dishes.length - 1; i++) {
            myContent.dishes[i + 1].id = i;
            newDishes.push(myContent.dishes[i + 1])
        }
        myContent.dishes = newDishes
        dispatch(putContent(myContent));
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
            {(isLoading || myContent === null) ?
                <div className="row">
                    <div className="col-12 col-md-5 m-1"> <Loading /> </div>
                    <div className="col-12 col-md-5 m-1"> <Loading /> </div>
                </div>
                :
                <div className="row">
                    {myContent.dishes.map((dish) => (
                        <Card className="col-6 col-md-4 menu-card" key={dish.id}>
                            <Link to={`/menu/${dish.id}`}>
                                <CardImg width="100%" src={dish.image} alt={dish.title.text} />
                            </Link>
                            <CardImgOverlay className="menu-overlay">
                                <Link href={`/menu/${dish.id}`}> <span style={{ color: "black", fontFamily: dish.title.fontFamily, fontSize: dish.title.fontSize }}>{dish.title.text}</span></Link>
                            </CardImgOverlay>
                            <CardImgOverlay  className="menu-overlay-button">
                                <button className=" menu-delete-button btn btn-default" onClick={() => deleteDish(dish.id)} style={{ marginLeft: "auto" }}><span className="fa fa-times"></span></button>
                            </CardImgOverlay>
                        </Card>
                    ))}
                    <AddDish />
                </div>
            }
        </div>
    );
}


export default Menu;