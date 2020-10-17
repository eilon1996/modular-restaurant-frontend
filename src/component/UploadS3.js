import React, { useState } from 'react';
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import '../style-css/uploadS3.css';




const UploadS3 = ({ type, contentId, itemId, imgUrl, setImgUrl }) => {

    const [progress, setprogress] = useState(imgUrl?"showImg":"p0");


    // specify upload params and url for your files
    // responsible for the progress bar
    //const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    //const handleSubmit2 = () => {  console.log("onsubmit");  }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log("uploader", status, meta, file) // turn in to progress bar
        //use the rejected files
        if (status === "removed"){
            console.log("removed");
            setprogress("p0");
            setImgUrl(null);
        }
        if (status === "preparing") setprogress("p1");
        if (status === "done") {
            setprogress("p2");
            var data = new FormData();
            const imgName = "users-"+type+"-"+contentId+":"+itemId+"."+file.name;
            //const imgName = "users-dishes-test1.png";

            console.log("imgName, file", imgName, file)
            data.append('image', file, imgName);

            var config = {
                method: 'POST',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                dirName: 'users/dishes', /* optional, not working */
                crossorigin: true,
                //url: "http://localhost:5001/upload",
                url: "https://warm-fjord-92793.herokuapp.com/upload",
                // add to the end of the url the file name end take it from the backend
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify("axios response", JSON.stringify(response)));
                    setImgUrl(response.data);
                    return true;
                })
                .then((response) => {setprogress("showImg");})
                .catch(function (error) {
                    alert("axios error");
                    console.log("error", error);
                });
//            setprogress("showImg");
        }
    }

    /*
    from github https://github.com/fortana-co/react-dropzone-uploader/blob/master/src/Dropzone.tsx
    Dropzone accept all those parameters as props
      multiple,
      maxFiles,
      minSizeBytes,
      maxSizeBytes,
      onSubmit,
      getUploadParams,
      disabled,
      canCancel,
      canRemove,
      canRestart,
      inputContent,
      inputWithFilesContent,
      submitButtonDisabled,
      submitButtonContent,
      classNames,
      styles,
      addClassNames,
      InputComponent,
      PreviewComponent,
      SubmitButtonComponent,
      LayoutComponent,
    */


    return (
        <div className="DropzoneContainer" id={"container"+progress}
            style={{backgroundImage: `url(${imgUrl})`}}>
            < Dropzone
                //onSubmit={handleSubmit2}
                //getUploadParams={getUploadParams} // responsible for the progress bar
                //onCancel={alert("true")} for some reason it alert on every render
                canRemove={true}
                onChangeStatus={handleChangeStatus}
                accept="image/*"
                maxFiles={1}
                inputContent={(files, extra) => (extra.reject ? 'Only Image is allowed' : 'Drop Image Here')}
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