import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useSelector, useDispatch } from 'react-redux';
import { patchContent } from '../redux/ActionCreators'

import '../style-css/editBox.css';
const EditBox = ({ type, itemId, field }) => {
    //type    head/dishes/staff
    //id      0/1/2..
    //field   title/description

    const  [contentType, id]  = useSelector(store => [store[type][type], store.credentials.credentials.id]);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const [fontFamily, setFontFamily] = useState(() => {
        if (contentType)
            return (contentType[itemId][field].fontFamily);

        return null;
    });

    const [fontSize, setFontSize] = useState(() => {
        if (contentType) {
            const size = contentType[itemId][field].fontSize;
            
            console.log('font size of ',type, field, " is ", size);
            if (typeof size == "string" && size.indexOf("px") > -1)
                return (size.slice(0, size.length - 2)); // to remove the "px" if exist
            else
                return (parseInt(size))
        }
        return null;
    })

    const [debouncedFontSize] = useDebounce(fontSize, 750);
    useEffect(() => {
        if (contentType !== null && fontSize !== undefined && fontSize !== contentType[itemId][field].fontSize) {
            console.log("debounce");
            contentType[itemId][field].fontSize = fontSize;
            dispatch(patchContent(id,type,contentType));
        }
    }, [debouncedFontSize]);
    const [text, setText] = useState(() => {
        if (contentType)
            return (contentType[itemId][field].text);

        return null;
    })


    var placeHolder = type + field;

    function handleSubmit(event) {
        event.preventDefault();
        contentType[itemId][field].text = text;
        contentType[itemId][field].fontFamily = fontFamily
        dispatch(patchContent(id,type,contentType));
        setEdit(false)
    }

    return (
            edit ?
                <form onSubmit={(event) => handleSubmit(event)} className={"editBox "+type + "-" + field}>
                    {field === "title" ?
                        <input style={{ fontSize: fontSize + "px" }} value={text} onChange={(event) => setText(event.target.value)}
                            placeholder={placeHolder} className={fontFamily} />
                        :
                        <textarea style={{ fontSize: fontSize + "px" }} value={text} onChange={(event) => setText(event.target.value)}
                            placeholder={placeHolder} className={fontFamily} />
                    }
                    <div className="lower edit">
                    <select value={fontFamily} onChange={(event) => setFontFamily(event.target.value)}>
                        <option value="sofia" className="sofia">Sofia</option>
                        <option value="indieFlower" className="indieFlower">Indie Flower</option>
                        <option value="courgette" className="courgette">Courgette</option>
                        <option value="courierPrime" className="courierPrime">Courier Prime</option>
                        <option value="secularOne" className="secularOne">Secular One</option>
                        <option value="architectsDaughter" className="architectsDaughter">Architects Daughter</option>
                        <option value="sacramento" className="sacramento">Sacramento</option>
                    </select>
                    <button className="edit-save btn btn-secondary" type="submit" >save</button>
                    </div>
                </form>
                :
                <div className={"editBox "+type + "-" + field}>
                    <span className={fontFamily} style={{ fontSize: fontSize + "px" }}>{text}</span>
                    <div className="lower save" >
                        <button className="edit-save btn btn-secondary"
                            onClick={() => setEdit(true)}>edit</button>
                        <button className="edit-save-arrow btn btn-secondary"
                            onClick={() => { fontSize < 70 && setFontSize(fontSize + 2) }}>
                            <span className="fa fa-angle-up"></span>
                        </button>
                        <button className="edit-save-arrow btn btn-secondary"
                            onClick={() => { fontSize > 8 && setFontSize(fontSize - 2) }}>
                            <span className="fa fa-angle-down"></span>
                        </button>
                    </div>
                </div>

    )
}

export default EditBox;