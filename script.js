const burger = document.querySelector(".ham");
const navmenu = document.querySelector(".acc-hidden");
const closeicon = document.querySelector(".close");
const toolcards = document.querySelector(".tool_cards");
const filters = document.querySelector(".filters");
const productcard = document.querySelector("#productcard");
const totalTools = document.querySelector("#total");
const totalToolscontainer = document.querySelector(".total_tools");
const filterbtn = document.querySelectorAll(".filterbtn");
const savedcards = document.querySelector(".saved_cards");
const searchkey = document.querySelector(".searchbar_input");
const saved = document.querySelector(".saved");
const savedicon = saved.querySelector("img");
//
//
//
//
var Segments = [
  {
    id: "1es23",
    displayName: "Office platforms",
    segtype: "Accounting",
    icon: "computer.svg",
  },
  {
    id: "1xs2e",
    displayName: "Advanced settings",
    segtype: "Article types",
    icon: "cog.svg",
  },
  {
    id: "xs2e1",
    displayName: "Data",
    segtype: "General",
    icon: "servers.svg",
  },
  {
    id: "xf2e1",
    displayName:
      "Business workflows Business workflows Business workflows Business workflows",
    segtype: "All workflows",
    icon: "businessworkflow.svg",
  },
];

//
//
document.addEventListener("DOMContentLoaded", () => {
  totaltools();
  displayProduct();
  loadSegments();
  addStyleToBookmark();
});
saved.addEventListener("click", () => {
  if (toolcards.style.display == "flex") {
    localStorage.setItem("toolcardDisplay", "none");
    localStorage.setItem("savedcardDisplay", "flex");
    window.location.reload();
  } else {
    localStorage.setItem("toolcardDisplay", "flex");
    localStorage.setItem("savedcardDisplay", "none");
    window.location.reload();
  }
});

if (localStorage.getItem("savedcardDisplay") == "none") {
  savedicon.src =
    "https://gist.githack.com/ManojSreekumarK/c910dfc0bde5ceb9f29960ae524a9aa7/raw/e6898b177645160c1d46e14826400dc05ca2a365/bookmark2.svg";
} else {
  savedicon.src =
    "https://gist.githack.com/ManojSreekumarK/9517e02e360a00c43b9a0823eb611ee8/raw/3b19a947877d131ae21178cdb22992f7a47901f6/uturn.svg";
}
// //////////////////////////responsive menu////////////////////////////////////////
burger.addEventListener("click", function () {
  navmenu.style.left = "0";
  navmenu.style.boxShadow = `0 -24px 38px rgba(40, 40, 40, 0.12),
  0 -9px 46px rgba(40, 40, 40, 0.08), 0 -11px 15px rgba(40, 40, 40, 0.04)`;
  document.body.style.overflow = "hidden";
});

closeicon.addEventListener("click", function () {
  navmenu.style.left = "-100%";
  navmenu.style.boxShadow = "none";
  document.body.style.overflow = "auto";
});
//
//
// //////////////////////////////////////get products from api//////////////////////////
//
//
//
function getProducts() {
  return fetch("https://mocki.io/v1/6f46c778-2ec4-4690-9dcb-de755e0298e7")
    .then((response) => response.json())
    .then((data) => {
      // Access each object in the JSON
      // data.forEach((item) => {
      //   console.log(item);
      // });
      return data;
    })
    .catch((error) => console.error(error));
}
//
//
// ///////////////////////to load product card  on new tab//////////////////////////////////
//
//
//
function productpage(id) {
  localStorage.setItem("toolcardDisplay", "none");
  localStorage.setItem("filtersDisplay", "none");
  localStorage.setItem("productcardDisplay", "flex");
  localStorage.setItem("totalDisplay", "none");
  localStorage.setItem("pkey", id);
  window.open(window.location.href + "#productcard", "_blank");
}
if (toolcards) {
  toolcards.style.display = localStorage.getItem("toolcardDisplay");
}
if (filters) {
  filters.style.display = localStorage.getItem("filtersDisplay");
}
if (productcard) {
  productcard.style.display = localStorage.getItem("productcardDisplay");
}
if (savedcards) {
  savedcards.style.display = localStorage.getItem("savedcardDisplay");
}
if (totalToolscontainer) {
  totalToolscontainer.style.display = localStorage.getItem("totalDisplay");
}

localStorage.setItem("toolcardDisplay", "flex");
localStorage.setItem("filtersDisplay", "flex");
localStorage.setItem("productcardDisplay", "none");
localStorage.setItem("savedcardDisplay", "none");
localStorage.setItem("totalDisplay", "block");
//
//
////////////////////////// to load content inside product card  on new tab//////////////////////////
//
//
//
function displayProduct() {
  idx = localStorage.getItem("pkey");
  getProducts()
    .then((data) => {
      const item = data.find((item) => item.productId == idx);
      if (item) {
        productcard.innerHTML += ` <h2>${item.productName}</h2>
          <p>${item.description}</p>
          <a>more</a>`;
      }
    })
    .catch((error) => console.error(error));
  localStorage.setItem("pkey", "00");
}

// for (let key in localStorage) {
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }

//
//
///////////////// display  tool count////////////////////////////////////
//
//
//

function totaltools() {
  if (savedcards.style.display == "none") {
    getProducts().then((data) => {
      let total = data.length;
      if (totalTools) {
        totalTools.innerText = total;
      }
    });
  } else {
    totalTools.innerText = "Saved";
  }
  if (productcard.style.display == "flex") {
    totalTools.innerText = "Product";
  }
}

function toolcount(seg) {
  let total = 0;
  if (savedcards.style.display == "none") {
    getProducts().then((data) => {
      data.forEach((item) => {
        if (item.segmentId == seg) {
          total++;
        }
      });
      if (totalTools) {
        totalTools.innerText = total;
      }
    });
  } else {
    totalTools.innerText = "Saved";
  }
}
//
//
/////////////////////// Adding book mark style ////////////////////////////////////
//
//
//

function addStyleToBookmark() {
  let savedTools = JSON.parse(localStorage.getItem("savedTools")) || [];
  console.log("Saved elements: " + JSON.stringify(savedTools));
  savedTools.forEach((item) => {
    let element = document.querySelector(`[data-id="${item}"]`);
    if (element) {
      element.classList.add("bookmark_active");
    }
  });
}
function addStyleToProBookmark() {
  let savedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
  console.log("Saved elements: " + JSON.stringify(savedProducts));
  savedProducts.forEach((item) => {
    let element = document.querySelector(`[data-id="${item.productid}"]`);
    if (element) {
      element.classList.add("bookmark_active");
    } else {
      console.log("not found");
    }
  });
}
//
//
/////////////////////// Adding bookmarked items to local storage ////////////////////////////////////
//
//
//
function segbookmark(id) {
  let elementId = id;
  let savedTools = JSON.parse(localStorage.getItem("savedTools")) || [];
  if (savedTools.includes(elementId)) {
    // Remove the elementId from the array if it already exists
    savedTools.splice(savedTools.indexOf(elementId), 1);
    localStorage.setItem("savedTools", JSON.stringify(savedTools));
    console.log("Element ID removed: " + elementId);
    let element = document.querySelector(`[data-id="${elementId}"]`);
    element.classList.remove("bookmark_active");
  } else {
    // Add the elementId to the array if it doesn't exist
    savedTools.push(elementId);
    localStorage.setItem("savedTools", JSON.stringify(savedTools));
    console.log("Element ID saved: " + elementId);
    let element = document.querySelector(`[data-id="${elementId}"]`);
    if (element) {
      element.classList.add("bookmark_active");
    }
  }
}
function probookmark(productid, segmentid) {
  let savedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
  let pair = { productid: productid, segmentid: segmentid };
  if (
    savedProducts.some(
      (item) => item.productid === productid && item.segmentid === segmentid
    )
  ) {
    // Remove the pair from the array if it already exists
    savedProducts = savedProducts.filter(
      (item) => !(item.productid === productid && item.segmentid === segmentid)
    );
    localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
    console.log("Pair removed: ", pair);
    let element = document.querySelector(`[data-id="${productid}"]`);
    element.classList.remove("bookmark_active");
  } else {
    // Add the pair to the array if it doesn't exist
    savedProducts.push(pair);
    localStorage.setItem("savedProducts", JSON.stringify(savedProducts));
    console.log("Pair saved: ", pair);
    let element = document.querySelector(`[data-id="${productid}"]`);
    if (element) {
      element.classList.add("bookmark_active");
    }
  }
}
//
//
/////////////////////// Main product page display ////////////////////////////////////
//
//
// intial segment loading function (All)
function loadSegments() {
  filterbtn[0].classList.add("filter_active");
  Segments.forEach((item) => {
    if (toolcards) {
      toolcards.innerHTML += `<div id="${item.id}" class="tool_card">
  <div class="tool_icon_container">
    <img
      src="./assets/icons/${item.icon}"
      alt="${item.displayName}"
    />
  </div>
  <div class="tool_card_content">
    <span
      >${item.displayName}
    </span>
    <h2>${item.segtype}</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      Voluptate autem aperiam distinctio, itaque aut suscipit
      minus iste vero sequi, architecto laudantium assumenda, nemo
      vitae dolores accusantium esse. Veniam distinctio molestiae
      esse quidem debitis.
    </p>
  </div>
  <div class="bk">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="bookmark"
      data-id="${item.id}"
      onclick="segbookmark('${item.id}')"
      fill="none"
      viewBox="0 0 24 24 "
      stroke-width="1.5"
      stroke="#a7a7a7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  </div>
</div>`;
    }
  });
}
//
//
///////////////////////intial segment loading function ( segments wise) ////////////////////////////////////
//
//
//
function loadproducts(segmentid) {
  getProducts().then((data) => {
    data.forEach((item) => {
      if (item.segmentId == segmentid) {
        if (toolcards) {
          toolcards.innerHTML += `<div id="${item.productId}" class="tool_card" >
        <div class="tool_card_content" onclick="productpage('${item.productId}')">
  
          <h2>${item.productName}</h2>
          <p>
          ${item.description}
          </p>
        </div>
        <div class="bk">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="bookmark"
            data-id="${item.productId}"
            onclick="probookmark('${item.productId}','${item.segmentId}')"
            fill="none"
            viewBox="0 0 24 24 "
            stroke-width="1.5"
            stroke="#a7a7a7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </div>
      </div>`;
        }
      }
    });
    addStyleToProBookmark();
    toolcount(segmentid);
  });
}

//
//
/////////////////////// Main product page display iteration////////////////////////////////////
//
//
//
for (let i = 0; i < filterbtn.length; i++) {
  filterbtn[i].addEventListener("click", function () {
    let changeActive = document.querySelector(".filter_active");
    if (changeActive) {
      changeActive.classList.remove("filter_active");
    }
    filterbtn[i].classList.add("filter_active");

    if (toolcards) {
      toolcards.innerHTML = ``;
    }

    if (i === 0) {
      loadSegments();
      addStyleToBookmark();
      totaltools();
    } else if (i === 1 && toolcards) {
      loadproducts("1es23");
    } else if (i === 2 && toolcards) {
      loadproducts("1xs2e");
    } else if (i === 3 && toolcards) {
      loadproducts("xs2e1");
    } else if (i === 4 && toolcards) {
      loadproducts("xf2e1");
    }
  });
}

function savedsegload() {
  filterbtn[0].classList.add("filter_active");
  let savedTools = JSON.parse(localStorage.getItem("savedTools")) || [];
  for (y = 0; y < savedTools.length; y++) {
    for (x = 0; x < Segments.length; x++) {
      var Segment = Segments[x];
      if (savedTools[y] === Segment.id) {
        if (savedcards) {
          savedcards.innerHTML += `<div id="${Segment.id}" class="tool_card">
      <div class="tool_icon_container">
        <img
          src="./assets/icons/${Segment.icon}"
          alt="${Segment.displayName}"
        />
      </div>
      <div class="tool_card_content">
        <span
          >${Segment.displayName}
        </span>
        <h2>${Segment.segtype}</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptate autem aperiam distinctio, itaque aut suscipit
          minus iste vero sequi, architecto laudantium assumenda, nemo
          vitae dolores accusantium esse. Veniam distinctio molestiae
          esse quidem debitis.
        </p>
      </div>
     
    </div>`;
        }
      }
    }
  }
}
savedsegload();
function savedproload(segmentid) {
  let savedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
  getProducts().then((data) => {
    const filteredProducts = data.filter((item) => {
      return savedProducts.some(
        (savedItem) =>
          savedItem.segmentid == segmentid &&
          item.segmentId == segmentid &&
          savedItem.productid == item.productId
      );
    });

    filteredProducts.forEach((item) => {
      if (savedcards) {
        savedcards.innerHTML += `<div id="${item.productId}" class="tool_card">
              <div class="tool_card_content">
                <h2>${item.productName}</h2>
                <p>${item.description}</p>
              </div>
            </div>`;
      }
    });
  });
}

for (let i = 0; i < filterbtn.length; i++) {
  filterbtn[i].addEventListener("click", function () {
    let changeActive = document.querySelector(".filter_active");
    if (changeActive) {
      changeActive.classList.remove("filter_active");
    }
    filterbtn[i].classList.add("filter_active");

    j = i;
    if (savedcards) {
      savedcards.innerHTML = ``;
    }

    if (i === 0) {
      savedsegload();
    } else if (i === 1) {
      savedproload("1es23");
    } else if (i === 2) {
      savedproload("1xs2e");
    } else if (i === 3) {
      savedproload("xs2e1");
    } else if (i === 4) {
      savedproload("xf2e1");
    }
  });
}
// search

if (toolcards) {
  searchkey.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log(searchkey.value);
      if (toolcards) {
        toolcards.innerHTML = ``;
        let changeActive = document.querySelector(".filter_active");
        if (changeActive) {
          changeActive.classList.remove("filter_active");
        }
      }
      getProducts().then((data) => {
        const searchTerm = searchkey.value.toLowerCase();
        const matchingProducts = data.filter((item) => {
          return item.productName.toLowerCase().includes(searchTerm);
        });
        if (matchingProducts.length > 0) {
          console.log("Matching products:", matchingProducts);
          filterbtn[0].classList.add("filter_active");
          for (x = 0; x < matchingProducts.length; x++) {
            var matchingProduct = matchingProducts[x];
            for (y = 0; y < Segments.length; y++) {
              if (matchingProduct.segmentId == Segments[y].id) {
                if (y == 3) {
                  Segments[y].displayName = "More";
                }
                if (toolcards) {
                  toolcards.innerHTML += `<div id="${matchingProduct.productId}" class="tool_card">
          <div class="tool_card_content">
          <span>${Segments[y].displayName}</span>
            <h2>${matchingProduct.productName}</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptate autem aperiam distinctio, itaque aut suscipit
              minus iste vero sequi, architecto laudantium assumenda, nemo
              vitae dolores accusantium esse. Veniam distinctio molestiae
              esse quidem debitis.
            </p>
          </div>
          <div class="bk">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="bookmark"
              data-id="${matchingProduct.productId}"
              onclick="probookmark('${matchingProduct.productId}','${matchingProduct.segmentId}')"
              fill="none"
              viewBox="0 0 24 24 "
              stroke-width="1.5"
              stroke="#a7a7a7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
        </div>`;
                }
              }
            }
          }
          searchkey.value = "";
        } else {
          console.log("Result not found");
          if (toolcards) {
            toolcards.innerHTML += `<h1>Result not found</h1>`;
          }
          searchkey.value = "";
        }
        addStyleToProBookmark();
      });
    }
  });
}
if (savedcards) {
  searchkey.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log(searchkey.value);
      if (savedcards) {
        savedcards.innerHTML = ``;
        let changeActive = document.querySelector(".filter_active");
        if (changeActive) {
          changeActive.classList.remove("filter_active");
        }
      }
      getProducts().then((data) => {
        const searchTerm = searchkey.value.toLowerCase();
        const matchingProducts = data.filter((item) => {
          return item.productName.toLowerCase().includes(searchTerm);
        });
        if (matchingProducts.length > 0) {
          console.log("Matching products:", matchingProducts);
          filterbtn[0].classList.add("filter_active");
          for (x = 0; x < matchingProducts.length; x++) {
            var matchingProduct = matchingProducts[x];
            for (y = 0; y < Segments.length; y++) {
              if (matchingProduct.segmentId == Segments[y].id) {
                if (y == 3) {
                  Segments[y].displayName = "More";
                }
                if (savedcards) {
                  savedcards.innerHTML += `<div id="${matchingProduct.productId}" class="tool_card">
            <div class="tool_card_content">
            <span>${Segments[y].displayName}</span>
              <h2>${matchingProduct.productName}</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptate autem aperiam distinctio, itaque aut suscipit
                minus iste vero sequi, architecto laudantium assumenda, nemo
                vitae dolores accusantium esse. Veniam distinctio molestiae
                esse quidem debitis.
              </p>
            </div>
            
          </div>`;
                }
              }
            }
          }
          searchkey.value = "";
        } else {
          console.log("Result not found");
          if (savedcards) {
            savedcards.innerHTML += `<h1>Result not found</h1>`;
          }
          searchkey.value = "";
        }
      });
    }
  });
}
