import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { toast } from "react-toastify";
import InputComponent from "../../input";
import FileInput from "../common/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async() => {
      if(title && desc && displayImage && bannerImage){
          setLoading(true);
        try {
            const bannerImageRef = ref(
              storage,
              `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            const uploaded = await uploadBytes(bannerImageRef, bannerImage);
            const bannerImageUrl = await getDownloadURL(bannerImageRef);

            const displayImageRef = ref(
                storage,
                `podcasts/${auth.currentUser.uid}/${Date.now()}`
              );
              await uploadBytes(displayImageRef, displayImage);
              const displayImageUrl = await getDownloadURL(bannerImageRef);
              // setting the docs
              const podcastData = {
                title: title,
                description: desc,
                bannerImage: bannerImageUrl,
                displayImage: displayImageUrl,
                createdBy: auth.currentUser.uid,
              };
      
              const docRef = await addDoc(collection(db, "podcasts"), podcastData);
              setTitle("");
              setDesc("");
              setBannerImage(null);
              setDisplayImage(null);
              toast.success("Podcast Created!");
              setLoading(false);
        }
        catch(e){
            toast.error(e.message);
        }
    }
    else{
        toast.error("Please enter All values!");
        setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <div>
      <div className="input-wrapper">
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="title"
          type="text"
          required={true}
        />

        <InputComponent
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <FileInput
          accept={"image/*"}
          id="display-image-input"
          fileHandleFnc={displayImageHandle}
            text={"Display Image Upload"}
        />
        <FileInput
          accept={"image/*"}
          id="banner-image-input"
          fileHandleFnc={bannerImageHandle}
            text={"Banner Image Upload"}
        />
        <Button
          text={loading ? "Loading..." : "Create Podcast"}
          disabled={loading}
          onClick={handlesubmit}
        />
      </div>
    </div>
  );
}

export default CreatePodcastForm;
