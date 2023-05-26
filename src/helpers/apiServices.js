const baseURL = "https://backend-reacttracker.onrender.com";
// const baseURL = "http://localhost:4000";
export function fetchData(endpoint, options) {
  return fetch(`${baseURL}/${endpoint}`, options)
    .then(response => response.json())
    .catch(error => {

    console.log(error);
    });
}
