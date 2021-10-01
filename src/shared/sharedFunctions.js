

export const getFullImgUrl = (userId, type, imageId) => {
    if(!imageId){
        return null;
    }

    if(userId === process.env.REACT_APP_ADMIN_USERNAME){
        return process.env.REACT_APP_S3_URL+"users/"+type+"/0/"+imageId;
    }
    if(imageId.indexOf("0/") !== -1 || imageId.indexOf(process.env.REACT_APP_ADMIN_USERNAME) !== -1){
        return process.env.REACT_APP_S3_URL+"users/"+type+"/"+imageId;
    }
    return process.env.REACT_APP_S3_URL+"users/"+type+"/"+userId+"/"+imageId;
}
