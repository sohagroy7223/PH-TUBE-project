function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (const btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategoric() {
  //1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert promise to json
    .then((res) => res.json())
    // sent to data displayCategoric
    .then((data) => displayCategoric(data.categories));
}

function loadVideos(inputText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoricVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickButton = document.getElementById(`btn-${id}`);
      clickButton.classList.add("active");
      displayVideos(data.category);
    });
};

const loadVideoDetails = (video_id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

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

const displayVideoDetails = (video) => {
  // console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="thumbnail" />
  </figure>
  <div class="card-body ">
    <h2 class="card-title">${video.title}</h2>
    </div>
  </div>
</div>
  `;
};

function displayCategoric(categories) {
  //   get the container
  const categoriesContainer = document.getElementById("category-container");
  //  loop operation on array of object
  for (const cat of categories) {
    // console.log(cat);
    // create element
    const categoriesDiv = document.createElement("div");
    categoriesDiv.innerHTML = `
  <button id="btn-${cat.category_id}" onclick="loadCategoricVideos(${cat.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
  `;
    //   append child
    categoriesContainer.append(categoriesDiv);
  }
}

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.innerHTML = `
       <div class="py-20 col-span-full text-center flex flex-col items-center">
            <img class="w-[110px]" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold ">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
       <div class="card  shadow-sm">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${
                  video.thumbnail
                }" alt="photos" />
                <p class="absolute bottom-3 text-sm text-white bg-black rounded-md px-1 right-2">3hrs 56 min ago</p>
            </figure>
            <div class="flex gap-4 py-3 px-1">
                <div>
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-lg font-semibold">${video.title}</h2>
                    <div class="flex gap-1 ">
                        <p class="text-gray-500 text-sm">${
                          video.authors[0].profile_name
                        }</p>
                        ${
                          video.authors[0].verified == true
                            ? `<img class="w-5 h-5"
                            src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">`
                            : ""
                        }
                    </div>
                    <p class="text-gray-500 text-sm">${
                      video.others.views
                    } views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${
              video.video_id
            }')" class="btn btn-block">video details</button>
        </div>
    
    `;
    videosContainer.append(videoCard);
  });
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

loadCategoric();
