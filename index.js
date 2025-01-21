 const apiKey = "f6751f4309cf46ef8c6bb226a841d47c";

 const blogContainer = document.getElementById("blogContainer");
 const searchField = document.getElementById("searchInput");
 const searchButton = document.getElementById("searchButton")

 async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-21 &pageSize=15&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl) ;
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error)
        return []
    }
 }

 searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles)
        } catch (error) {
            console.log("Error fetching news by query", error)
        }
    }
 })

 async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&from=2024-12-21&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("error fetching random news", error)
    }
 }

 function displayBlog(articles){
      blogContainer.innerHTML = '';
      articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blogCard")
        const img = document.createElement('img');
        img.src = article.urlToImage
        img.alt = article.title 
        const title = document.createElement("h2")
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "....." : article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p")
        const truncatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "....." : article.description;
        description.textContent = truncatedDescription;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard)
      })
 }

 (async () => {
    try {
        const articles = await fetchRandomNews()
        displayBlog(articles)
    } catch (error) {
        console.error("Error fetching random news", error)
    }
 })();