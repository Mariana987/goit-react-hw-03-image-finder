import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';


export default class ImageGallery extends Component {


    state = {
        picture: null,
        loading: false,

    }



    componentDidUpdate(prevProps, prevState) {
        const myKey = '23171615-fcdc729843fe7af43a640cf8d'

        if (prevProps.pictureName !== this.props.pictureName) {
            console.log('prevProps.pictureName', prevProps.pictureName)
            console.log('this.props.pictureName', this.props.pictureName)


            this.setState({ loading: true })
            fetch(`https://pixabay.com/api/?q=${this.props.pictureName}&page=1&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(res => res.json())
                .then(picture => this.setState({ picture }))
                .finally(() => this.setState({ loading: false }));
            console.log(this.state.picture)

        }
    }

    render() {

        const { picture, loading } = this.state

        return (
            <ul className="ImageGallery">
                {/* <li className="ImageGalleryItem">
                   
                </li> */}

                {loading && <div>LOADING...</div>}
                {!this.state.pictureName && <div> Enter something</div>}
                {picture && <li><img src={picture.hits[0].largeImageURL} alt="" className="ImageGalleryItem-image" /></li>}
                {/*  */}
            </ul>
        )
    }

}