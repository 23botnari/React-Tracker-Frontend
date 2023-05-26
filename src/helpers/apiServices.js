const baseURL = "https://backend-reacttracker.onrender.com";

export function fetchData(endpoint, options) {
  return fetch(`${baseURL}/${endpoint}`, options)
    .then(response => response.json())
    .catch(error => {

    console.log(error);
    });
}
