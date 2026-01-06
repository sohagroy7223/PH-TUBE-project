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

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
       <div class="card  shadow-sm">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="photos" />
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
                        <p class="text-gray-500 text-sm">${video.authors[0].profile_name}</p>
                        <img class="w-5 h-5"
                            src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">
                    </div>
                    <p class="text-gray-500 text-sm">${video.others.views} views</p>
                </div>
            </div>
        </div>
    
    `;
    videosContainer.append(videoCard);
  });
};

loadCategoric();
