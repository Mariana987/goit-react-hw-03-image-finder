export default function ImageGalleryItem({ picture: { webformatURL } }) {
    return (
        <li className="ImageGalleryItem">
            <img src={webformatURL}
                alt=""
                className="ImageGalleryItem-image" />
        </li>
    )
}

























// import PropTypes from "prop-types";
// export default function ImageGalleryItem({
//     webformatURL,
//     onOpen,
//     largeImageURL,
// }) {
//     return (
//         <li className="ImageGalleryItem" onClick={() => onOpen(largeImageURL)}>
//             <img src={webformatURL} alt="nice" className="ImageGalleryItem-image" />
//         </li>
//     );
// }

// ImageGalleryItem.propTypes = {
//     webformatURL: PropTypes.string,
//     onOpen: PropTypes.func,
//     largeImageURL: PropTypes.string,
// };