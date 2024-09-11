interface ImgurResponse {
  data: {
    link: string;
  };
}

export const uploadToImgur = async (file: string | Blob): Promise<ImgurResponse> => {
  const IMGUR_CLIENT_ID = "b73c45aa9239cb4";
  const formData = new FormData();

  formData.append("image", file);

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
      referrer: "",
    });

    return await response.json() as ImgurResponse;
  } catch (error) {
    return Promise.reject(new Error(error as string));
  }
};
