import axios from "axios";
import endpoint from "../redux/routePath";

const getImageUrls = async (params) => {
  const { image, setLoading, setErrors } = params;
  setLoading(true);
  try {
    const formData = new FormData();
    if (Array.isArray(image)) {
      image.map((img) => formData.append("image", img));
    } else {
      console.log("string");
      formData.append("image", image);
      formData.append("image", image.gif);
    }

    // formData.append("gif", uploadImages.gif);
    const response = await axios({
      method: "post",
      url: endpoint.UPLOAD_IMAGE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
    return response.data;
  } catch (error) {
    console.log(error);
    setLoading(false);
    setErrors(true);
  }
};

export default getImageUrls;
