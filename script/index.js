function loadCategoric() {
  //1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert promise to json
    .then((res) => res.json())
    // sent to data displayCategoric
    .then((data) => displayCategoric(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategoric(categories) {
  //   get the container
  const categoriesContainer = document.getElementById("category-container");
  //  loop operation on array of object
  for (const cat of categories) {
    // create element
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
  <button class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
  `;
    //   append child
    categoriesContainer.append(categoriesDiv);
  }
}

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

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
    <div class="card  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="photos" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    
    `;
    videosContainer.append(videoCard);
  });
};

loadCategoric();
loadVideos();
