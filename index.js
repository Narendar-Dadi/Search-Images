
const accessKey = "RdVsTpTxNXsqb26zhPzIjsqsED9E79vzyW8N3LnFH40";
const formElemnt = document.querySelector("form");
const inpEle = document.getElementById("search-text");
const searchresult = document.querySelector(".search-results");
const showBtn = document.getElementById("show-more");

let inpData = "";
let page = 1;

async function searchImage() {
    inpData = inpEle.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    
    const result = data.results;
    console.log(result);

    if (page === 1) {
        searchresult.innerHTML = "";
    }

    result.forEach((res) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
    
        // Create anchor tag
        const imageLink = document.createElement('a');
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
    
        // Create image
        const img = document.createElement('img');
        img.src = res.urls.small;
        img.alt = res.alt_description || "Image";
    
        // Append image inside the link
        imageLink.appendChild(img);
    
        // Create a title link (optional, separate from the image)
        const titleLink = document.createElement('a');
        titleLink.href = res.links.html;
        titleLink.target = "_blank";
        titleLink.textContent = res.alt_description || "View Image";
    
        // Append elements
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(titleLink);
        searchresult.appendChild(imageWrapper);
    });
    

    page++;
    if (page > 1) {
        showBtn.style.display = 'block';
    }
}

formElemnt.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showBtn.addEventListener('click', () => {
    searchImage();
});



const themeToggleIcon = document.getElementById("theme-toggle");
const bodyElement = document.body;

// Check if a theme was previously saved in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    bodyElement.classList.add("dark-mode");
    themeToggleIcon.textContent = "☀️"; // Switch to sun icon for light mode
} else {
    themeToggleIcon.textContent = "🌙"; // Moon icon for dark mode
}

// Event listener for theme toggle
themeToggleIcon.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");
    if (bodyElement.classList.contains("dark-mode")) {
        themeToggleIcon.textContent = "☀️"; // Switch to sun icon
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleIcon.textContent = "🌙"; // Switch to moon icon
        localStorage.setItem("theme", "light");
    }
});
