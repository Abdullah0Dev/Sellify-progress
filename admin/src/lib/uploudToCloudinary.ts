// => blob url => upload to cloudinary => return the url

export const uploadToCloudinary = async (
  blobUrl: string
): Promise<string | null> => {
  // fetch and gets its res
  const blob = await fetch(blobUrl).then((res) => res.blob());

  // form data
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", "dev_preset"); // preset...

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/drglfiyhj/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    // return the url
    return data.secure_url; //. =>
  } catch (error) {
    console.error("Upload Failed: ", error);
    return null;
  }
};
