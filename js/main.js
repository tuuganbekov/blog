getPostsFromApi = () => {

    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(response => {
            sessionStorage.setItem('blogResponse', JSON.stringify(response));
        });
};

getPostsFromApi();

renderPosts = () => {
    const posts = JSON.parse(sessionStorage.getItem('blogResponse'));
    let postHTML = '';
    posts.map((post, index) => {
        postHTML += `
        <div class="wrap__post">
            <span class="post__date">${post.date}</span>
            <img src="${post.img}" alt="post image" class="post__img">
            <h2><a href="#" class="post__title">${post.title}</a></h2>
            <span class="post__author">BY <a href="#" class="author__link">${post.author}</a>/ ${post.views} VIEWS</span>
            <p class="post__text">${post.description}</p>
        </div>
        `;
    })
    const postSectionElement = document.getElementById('post-section');
    postSectionElement.innerHTML = postHTML;
}

renderPosts();

onSearchBtnClick = (event) => {
    const searchInput = document.getElementById('aside-search');
    const oldPosts = JSON.parse(sessionStorage.getItem('blogResponse'));
    let newPosts = [];
    oldPosts.map(post => {
        if (post.title === searchInput.value) {
            newPosts.push(post)
            console.log(searchInput.value.length);
        }
    });
    sessionStorage.setItem('blogResponse', JSON.stringify(newPosts));
    renderPosts();
    newPosts = [];
    getPostsFromApi();
}

const onSearchBtnElement = document.getElementById('searchBtn');
onSearchBtnElement.addEventListener('click', onSearchBtnClick);

onTagButtonClick = (event) => {
    const oldPosts = JSON.parse(sessionStorage.getItem('blogResponse'));
    let newPosts = [];
    oldPosts.map(post => {
        if (post.tag === event) {
            newPosts.push(post);
        }
    });
    console.log(oldPosts);
    sessionStorage.setItem('blogResponse', JSON.stringify(newPosts));
    renderPosts();
    newPosts = [];
    getPostsFromApi();
}