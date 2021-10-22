import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import fetchImages from '../../services/imageApi'


export default class ImageGallery extends Component {


    state = {
        picture: null,
        error: null,
        status: 'idle',
        pictures: []

    }



    componentDidUpdate(prevProps, prevState) {
        const myKey = '23171615-fcdc729843fe7af43a640cf8d'
        const { pictureName } = this.props

        if (prevProps.pictureName !== this.props.pictureName) {

            this.setState({ status: 'pending' })
            // fetch(`https://pixabay.com/api/?q=${this.props.pictureName}&page=1&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
            //     .then(response => {
            //         if (response.ok) {
            //             return response.json()
            //         }
            //         return Promise.reject(
            //             new Error(`nothing found &{this.props.pictireName}`),
            //         );
            //     })
            fetchImages(pictureName)
                // return Promise.reject(
                //     new Error(`nothing found &{this.props.pictureName}`),
                // );
                .then(picture => this.setState({ picture, status: 'resolved' }))
                .catch(error => this.setState({ error, status: 'rejected' }))
            console.log(this.state.picture)

        }
    }

    render() {

        const { picture, error, status } = this.state
        if (status === 'idle') {
            return <div> Enter something</div>
        }
        if (status === 'pending') {
            return <div>LOADING...</div>
        }
        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }
        if (status === 'resolved') {
            return <ul className="ImageGallery">
                {/* {picture.map((picture) => (
                    <ImageGalleryItem
                        largeImageURL={picture.largeImageURL}
                    />

                ))} */}

                <ImageGalleryItem
                // largeImageURL={picture.hits[0].webformatURL}
                />
            </ul>
        }
    }

}