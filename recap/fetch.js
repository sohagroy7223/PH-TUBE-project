// btn category load by fetch here***************

function loadCategoric() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoric(data.categories));
}

// video category load by fetch here***************

function loadVideosCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideoCategories(data.videos));
}

// video necessary title***************
// authors
// :
// [{…}]
// category_id
// :
// "1001"
// description
// :
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// :
// {views: '100K', posted_date: '16278'}
// thumbnail
// :
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// :
// "Shape of You"
// video_id
// :
// "aaaa"
// authors
// :
// Array(1)
// 0
// :
// profile_name
// :
// "Olivia Mitchell"
// profile_picture
// :
// "https://i.ibb.co/D9wWRM6/olivia.jpg"
// verified
// :
// ""

// display video categories************
function displayVideoCategories(videos) {
  // parent div where append the child/value*********
  const videosContainer = document.getElementById("videos-container");
  for (const video of videos) {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    `;
    videosContainer.append(videoCard);
  }
}

// btn category display****************

function displayCategoric(categories) {
  // parent div where append the child/value*********
  const categoriesContainer = document.getElementById("category-container");

  for (const cat of categories) {
    // console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
     <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
   
    `;
    categoriesContainer.append(categoryDiv);
  }
}

loadCategoric();
loadVideosCategories();
