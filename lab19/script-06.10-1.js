function loadPostsWithFetch(limit) {
    return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Error loading data");
            }
        })
        .then(results => results.slice(0, limit))
}

function loadUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
}

function loadPostsWithXmlHttpRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.open("GET", url);

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error("Error!"));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Error!"));
        }

        xhr.send();
    });
}

// loadPostsWithXmlHttpRequest("https://jsonplaceholder.typicode.com/posts")
//     .then(data => console.table(data))
//     .catch(error => console.error(error));

// loadPostsWithFetch(100).then(data => {
//     console.log("POSTS");
//     console.table(data);
// });
// loadUsers().then(data => {
//     console.log("USERS");
//     console.table(data);
// });

Promise.allSettled([
    loadPostsWithFetch(100),
    loadUsers(),
])
    // .then(data => console.log(data))
    // .catch(er => console.error(er))

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

Promise.race([
    loadPostsWithFetch(100),
    wait(1)
]).then(data => console.log(data))

const p = Promise.resolve("I am resolved");
const p1 = Promise.reject("I am rejected");

new Promise((resolve) => resolve("I am resolved"));

console.log(p, p1);