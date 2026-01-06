function loadCategoric() {
  //1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2. convert promise to json
    .then((res) => res.json())
    // sent to data displayCategoric
    .then((data) => displayCategoric(data.categories));
}

function displayCategoric(categories) {
  //   get the container
  const parent = document.getElementById("category-container");
  //  loop operation on array of object
  for (const cat of categories) {
    console.log(cat);
    // create element
    const categoriesContainer = document.createElement("div");
    categoriesContainer.innerHTML = `
  <button class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
  `;
    //   append child
    parent.append(categoriesContainer);
  }
}

loadCategoric();
