import React, { useState } from 'react';
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import '../style-css/uploadS3.css';


// change the pictures name in S3
// make sure user cant enter problamatic inputs

const UploadS3 = ({ type, userId, imgUrl, setImgUrl }) => {

    const [progress, setprogress] = useState(imgUrl?"showImg":"p0");


    // specify upload params and url for your files
    // responsible for the progress bar
    //const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    //const handleSubmit2 = () => {  console.log("onsubmit");  }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        //use the rejected files
        if (status === "removed"){
            setprogress("p0");
            setImgUrl(null);
        }
        if (status === "preparing") {
            setprogress("p1");
        }
        if (status === "done") {
            setprogress("p2");
            var suffix = file.name.split(".");
            suffix = suffix[suffix.length-1];
            const imgName = "users_"+type+"_"+userId+"_"+suffix;
            //const imgName = "users-dishes-test1.png";

            
                console.log("imgName", imgName, "file", file);
                var data = new FormData();
                data.append('image', file, imgName);

                var config = {
                    method: 'POST',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    dirName: 'users/dishes', /* optional, not working */
                    crossorigin: true,
                    url: process.env.REACT_APP_BASE_URL + "upload",
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify("axios response", JSON.stringify(response.data)));
                        setImgUrl(response.data);
                        return true;
                    })
                    .then((response) => {setprogress("showImg");})
                    .catch(function (error) {
                        console.log("error", error);
                    });
            }
            setprogress("showImg");
        }
    
    function getFullUrl(imageId){
        return process.env.REACT_APP_S3_URL+"users/"+type+"/"+userId+"/"+imageId;
    }


    return (
        <div className="DropzoneContainer" id={"container"+progress}
            style={{backgroundImage: `url(${getFullUrl(imgUrl)})`}}>
            < Dropzone
                //onSubmit={handleSubmit2}
                //getUploadParams={getUploadParams} // responsible for the progress bar
                //onCancel={alert("true")} for some reason it alert on every render
                canRemove={true}
                onChangeStatus={handleChangeStatus}
                accept="image/*"
                maxFiles={1}
                inpatchContent={(files, extra) => (extra.reject ? 'Only Image is allowed' : 'Drop Image Here')}
                styles={{
                    dropzoneReject: { borderColor: '#F19373', backgroundColor: '#F1BDAB' },
                    inputLabel: (files, extra) => (extra.reject ? { color: '#A02800' } : {}),
                }}
                id={"Dropzone"+progress}
            />
            <div className="wrapper" id={"wrapper"+progress}>
                <div className="progress" id={progress}></div>
            </div>
        </div>
    )
}

// to add submit button to the dropzone add in <Dropzone>   onSubmit={handleSubmit}


export default UploadS3;