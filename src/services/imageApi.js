function fetchImages(pictureName) {
    return fetch(`https://pixabay.com/api/?q=${pictureName}&page=1&key=23171615-fcdc729843fe7af43a640cf8d&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response =>
            response.json())
        .then(data => {
            console.log(data.hits)
            return data.hits
        })

    // return Promise.reject(
    //     new Error(`nothing found &{this.props.pictireName}`),
    // );


}







export default fetchImages

















// import axios from "axios";

// export function fetchPictures(inputValue, baseApi, myApiKey, page) {
//     return axios
//         .get(
//             `${baseApi}?q=${inputValue}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=12`
//         )
//         .then((r) => r.data.hits);
// }