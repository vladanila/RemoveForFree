const root = document.getElementById("root");

const app = document.createElement("div");
app.innerHTML = `
  <h1>🖼️ RemoveForFree</h1>
  <input type="file" id="imageInput" accept="image/*" />
  <button id="uploadBtn">Remove Background</button>
  <div id="previewContainer"></div>
`;
root.appendChild(app);

document.getElementById("uploadBtn").onclick = async () => {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please upload an image");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://removeforfree-backend.onrender.com/remove", {
    method: "POST",
    body: formData
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const img = document.createElement("img");
  img.src = url;
  img.style.maxWidth = "300px";

  const container = document.getElementById("previewContainer");
  container.innerHTML = "";
  container.appendChild(img);
};