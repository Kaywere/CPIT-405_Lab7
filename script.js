const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "whpYA-FRtN3iRCvoqTZPW9SgZDtOnxQg8E-ZraWyUxk"; 

function clearGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
}

function displayImages(images) {
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ""; 
  
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.urls.small; 
      img.alt = image.alt_description || "Image from Unsplash"; 
      img.style = "width: 100%; max-height: 300px; object-fit: cover;"; 
      imageContainer.appendChild(img);
    });
  }

function fetchUsingXHR() {
  const query = document.getElementById("search-input").value;
  if (!query) return alert("Please enter a search term!");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${API_URL}?query=${query}&client_id=${ACCESS_KEY}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      displayImages(response.results);
    } else {
      alert("Failed to fetch images using XHR");
    }
  };
  xhr.send();
}

function fetchUsingPromises() {
  const query = document.getElementById("search-input").value;
  if (!query) return alert("Please enter a search term!");

  fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch images using Promises");
      return response.json();
    })
    .then((data) => {
      displayImages(data.results);
    })
    .catch((error) => {
      alert(error.message);
    });
}

async function fetchUsingAsync() {
  const query = document.getElementById("search-input").value;
  if (!query) return alert("Please enter a search term!");

  try {
    const response = await fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch images using Async/Await");
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    alert(error.message);
  }
}
