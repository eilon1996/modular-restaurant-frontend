import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem, Collapse, CardBody} from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchContent, deleteContent } from '../redux/ActionCreators';
import UploadS3 from './UploadS3';
import {getFullImgUrl} from "../shared/sharedFunctions";
import { useAlert } from 'react-alert'

import '../style-css/menu.css';

const Menu = (props) => {

    const {id} = useSelector(store => store.credentials.credentials);
    const {dishes} = useSelector(store => store.dishes);
    const [render, setRender] = useState(0);
    const dispatch = useDispatch()

    const AddDish = () => {

        const [showForm, setShowForm] = useState(false);
        const [title, setTitle] = useState();
        const [selected, setSelected] = useState([]);
        const [description, setDescription] = useState();
        const [imgUrl, setImgUrl] = useState();
        const alert = useAlert()

        useEffect(() => {
        }, [imgUrl, setImgUrl])

        const options = [
            { label: "Hot 🌶", value: "Hot 🌶" },
            { label: "Vegan 🌱", value: "Vegan 🌱" }
        ]

        function handleSubmit(event) {
            
            if(id === "0"){
                alert.show("you have to signup first")
                event.preventDefault()
            }
            else{
                let newDish = JSON.parse(JSON.stringify(Object.values(dishes)[0]));

                newDish.title.text = title;
                newDish.label = selected.map(label => label.label).join(",");
                newDish.description.text = description;
                var d = new Date();
                var dishId = "ID"+d.getTime();
                
                newDish.comments = null;
                newDish.image = imgUrl;
                dishes[dishId] = newDish;
                setShowForm(false);
                
                
                const path = id+"/dishes/"+dishId;
                dispatch(patchContent(path ,newDish, dishes, id,"dishes"));

                setTitle("");
                setSelected([]);
                setDescription("");
                setRender(render + 1);
                event.preventDefault()
            }
        }

        return (
            <div className="col-6 col-md-4 menu-card"  >
                <button className="btn btn-primary" style={{ display: showForm ? "none" : "block" }} onClick={() => setShowForm(!showForm)}>add dish</button>

                <Collapse isOpen={showForm} navbar>
                    <Card>
                        <CardBody>
                            <form onSubmit={(event) => handleSubmit(event)} className="addDish-form">
                                <input value={title} onChange={(event) => setTitle(event.target.value)} name="title" placeholder="dish name" />
                                <UploadS3 type={"dishes"} userId={id} imgUrl={imgUrl} setImgUrl={setImgUrl} />
                                <div>
                                    <span>{(selected && selected.length === 2) ? <span>Hot 🌶 &amp; Vegan 🌱</span> : null}</span>
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={(event) => setSelected(Object.values(event))}
                                        labelledBy={"Select"}
                                        selectedValues={selected}
                                    />
                                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} name="description" placeholder="dish description"/>
                                </div>
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

        var newDishes = {}
        for(var key of Object.keys(dishes)){
            if(key !== dishId)
            newDishes[key] = dishes[key];
        }

        const path = id+"/dishes/"+dishId;
        dispatch(deleteContent(path ,newDishes, id,"dishes"));
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
                    {Object.keys(dishes).map((key) => (dishes[key]?  // check if dishe not null
                        <div className="col-6 col-md-4 menu-card" key={key}>
                            <Link to={`/menu/${key}`}>
                                <CardImg width="100%" src={getFullImgUrl(id, "dishes", dishes[key].image)} alt={dishes[key].title.text} />
                                <CardImgOverlay>
                                <span style={{ color: "black", fontFamily: dishes[key].title.fontFamily, fontSize: dishes[key].title.fontSize }}>{dishes[key].title.text}</span>
                                </CardImgOverlay>
                            </Link>     
                            <button className=" menu-delete-button btn btn-default" onClick={() => deleteDish(key)} style={{ marginLeft: "auto" }}><span className="fa fa-times"></span></button>
                            
                        </div>
                        :
                        <div></div>
                    ))}
                    <AddDish />
                </div>
        </div>
    );
}


export default Menu;