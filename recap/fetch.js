function removeActiveBtn() {
  const activeBtn = document.getElementsByClassName("active");
  for (const btn of activeBtn) {
    btn.classList.remove("active");
  }
}

// btn category load by fetch here***************

function loadCategoric() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoric(data.categories));
}

// video category load by fetch here***************

function loadVideos(searchText) {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveBtn();
      const all = document.getElementById("allBtn");
      all.classList.add("active");
      displayVideo(data.videos);
    });
}

function CategoryVideosID(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const clickBtn = document.getElementById(`btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayVideo(data.category);
    });
}

function showDetailsID(videoId) {
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayShowDetails(data.video));
}

function displayShowDetails(videos) {
  // console.log(videos);
  document.getElementById("show_Modal").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${videos.thumbnail}"
      alt="thumbnail" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${videos.title}</h2>
    <p>${videos.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  
  `;
}

// video necessary title***************
// authors
// :
// category_id
// :
// "1001"
// description
// :
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
function displayVideo(videos) {
  // parent div where append the child/value*********
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.innerHTML = `
       <div class="col-span-full text-center flex flex-col justify-center items-center py-10">
            <img src="../assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
  }

  for (const video of videos) {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
     <div class="card bg-base-100  shadow-sm">
            <figure>
                <img class="w-full h-[150px] object-cover" src="${
                  video.thumbnail
                }" alt="thumbnail" />
            </figure>
            <div class=" flex gap-3">
                <div>
                    <div class="avatar p-2">
                        <div class="ring-primary ring-offset-base-100 w-8  rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="card-title">${video.title}</h2>
                      <p class="flex gap-1 items-center text-gray-500 text-sm">${
                        video.authors[0].profile_name
                      }
                         ${
                           video.authors[0].verified === true
                             ? `<img class="w-5 h-5"
                               src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""`
                             : ``
                         }
                      </p>
                    <p class="text-gray-500 text-sm">${video.others.views}</p>
                </div>
            </div>
            <button onclick="showDetailsID('${
              video.video_id
            }')" class="btn btn-block">show details  </button>
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

     <button id="btn-${cat.category_id}" onclick="CategoryVideosID(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
   
    `;
    categoriesContainer.append(categoryDiv);
  }
}

document
  .getElementById("input-text")
  .addEventListener("keyup", function (event) {
    const input = event.target.value;
    loadVideos(input);
  });

loadCategoric();
