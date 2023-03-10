import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Form/Form.css";

const UploadImage = ({onChange}) => {
 const [savePicture, setSavePicture] = useState("");

  const fileUpload = useRef(null);

  // upload image
  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setSavePicture(uploaded)
  }

  function uploadImage() {
    if(!savePicture) {
      alert('please upload a image first')
    } else {
      console.log(fileUpload.current.files[0]
        )
      let formData = new FormData();
      formData.append('image', savePicture);

    let configurasi = {
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data',
    },
  };

    axios.post(`${BASE_URL}/api/v1/upload-image`, 
    formData, configurasi
    )
    .then(function (response) {
      console.log(response);
      onChange(response.data.url)
    })
    .catch(function (error) {
      console.log(error);
    })
  
    .then((response) => {
      console.log(response)
      alert('Upload Picture successful !!')
    }).catch((error) => {
      console.error(error)
      alert('Upload Picture Failed !!')
    })
    }
  }

  return (
    <>
    <div className="d-flex" >
        <div className="input-field">
            <input
                type="file"
                ref={fileUpload}
                id="formFile"
                onChange={handleUploadChange}
                accepts="image/*" 
                className="add-input"
            />
            
            </div>
        <button
            className="btn-upload"
            type="button"
            id="inputGroupFileAddon04"
            onClick={uploadImage}
        >
            Upload
        </button>
    </div>
    </>
  );
};

export default UploadImage;

