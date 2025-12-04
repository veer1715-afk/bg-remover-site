const uploadBox = document.getElementById("uploadBox");
const inputFile = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const resultBox = document.getElementById("result");
const downloadBtn = document.getElementById("downloadBtn");
const removeBtn = document.getElementById("removeBtn");

uploadBox.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", async function () {
  let file = this.files[0];

  if (!file) return;

  previewImg.src = URL.createObjectURL(file);
  resultBox.style.display = "none";
  removeBtn.innerText = "Removing Background...";

  let formData = new FormData();
  formData.append("image_file", file);

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "mRXUVPkLyKuzJRQfPRw2XFBF"
      },
      body: formData
    });

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    document.getElementById("outputImg").src = imageUrl;
    resultBox.style.display = "block";

    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "bg-removed.png";
      link.click();
    };

    removeBtn.innerText = "Remove Background";

  } catch (error) {
    alert("Error removing background. Check API key.");
    removeBtn.innerText = "Remove Background";
  }
});
