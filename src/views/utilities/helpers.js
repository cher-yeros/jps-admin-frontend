import { toast } from "react-toastify";

// export const uploadToServer = async (folder, image) => {
//   if (!image) return;

//   const formData = new FormData();
//   formData.append("picture", image?.file);

//   const url = "https://api2.jpstvethiopia.com/api/upload-file/" + folder;
//   //   const url2 = "http://localhost:4000/api/upload-file/" + folder;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });
//     const data = await response.json();

//     return data?.fileName;
//     // toast.success("Upload successful: " + data.message);
//   } catch (error) {
//     console.error("Upload failed", error);
//     toast.error("Upload failed");
//   }
// };

export const uploadToServer = async (folder, image, onProgress) => {
  if (!image) return;

  const formData = new FormData();
  formData.append("picture", image?.file);

  const url = "https://api2.jpstvethiopia.com/api/upload-file/" + folder;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentCompleted = Math.round((event.loaded / event.total) * 100);
        onProgress(percentCompleted); // Call the callback function with progress value
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        resolve(response?.fileName);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    xhr.send(formData);
  });
};
