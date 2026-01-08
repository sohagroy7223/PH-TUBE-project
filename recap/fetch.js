function loadCategoric() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoric(data.categories));
}
function displayCategoric(categories) {
  const categoriesContainer = document.getElementById("category-container");

  for (const cat of categories) {
    // console.log(cat);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
     <button class="btn btn-sm">${cat.category}</button>
   
    `;
    categoriesContainer.append(categoryDiv);
  }
}

loadCategoric();
