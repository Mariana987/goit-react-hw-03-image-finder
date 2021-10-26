import { Component } from 'react';
import PropTypes from "prop-types";
import ImageGalleryItem from '../ImageGalleryItem';
import fetchImages from '../../services/imageApi';
import Spinner from '../Loader/Loader'
import LoadMoreBtn from '../Button'
import Modal from '../Modal'


export default class ImageGallery extends Component {
    state = {
        pictureName: null,
        error: null,
        status: 'idle',
        pictures: [],
        baseApi: "https://pixabay.com/api/",
        myKey: '23171615-fcdc729843fe7af43a640cf8d',
        page: 1,
        largeUrl: " ",
        showModal: false,
    }

    componentDidUpdate(prevProps, prevState) {
        const { baseApi, myKey, page } = this.state;
        const { pictureName } = this.props;

        if (prevProps.pictureName !== this.props.pictureName) {

            this.setState({ status: 'pending' });
            this.setState({ pictures: [] });
            this.setState({ page: 1 })

            fetchImages(pictureName, baseApi, myKey, page)
                .then((pictures) => {
                    if (pictures.length === 0) {
                        return this.setState({ status: 'rejected' });

                    }
                    this.getPictures(pictures);

                })

                .then(this.setState({ status: 'resolved' }))
                .catch((error) => this.setState({ error, status: 'rejected' }));


        }
        else if (prevState.page !== this.state.page && this.state.page !== 1) {
            this.setState({ status: 'pending' });

            fetchImages(pictureName, baseApi, myKey, page)
                .then((pictures) => this.getPictures(pictures))
                .then(this.setState({ status: 'resolved' }))
                .then(() => window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                })
                )
                .catch((error) => this.setState({ error, status: 'rejected' }))
        }
    }


    getPictures = (arr) => {
        const newArr = arr.map((picture) => {
            return {
                id: picture.id,
                webformatURL: picture.webformatURL,
                largeImageURL: picture.largeImageURL
            };
        });

        this.setState({
            pictures: [...this.state.pictures, ...newArr],
        });
    };
    onLoadMoreBtn = () => {
        this.setState({
            page: this.state.page + 1,
        })
    }
    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }))
    };
    takeModalPicture = (url) => {
        this.setState({ largeUrl: url, showModal: true })
    };

    render() {

        const { pictures, status, largeUrl, showModal } = this.state

        if (status === 'idle') {
            return <h1 className="title"> Enter what are you looking for.</h1>
        }
        if (status === 'pending') {
            return <Spinner />

        }
        if (status === 'rejected') {
            return <h1 className="title">
                By searching "{this.props.pictureName}" nothing found, sorry.<br />
                Try enter something else
            </h1>
        }
        if (status === 'resolved') {
            return (
                <div>
                    <ul className="ImageGallery">
                        {pictures.map((picture) => (
                            <ImageGalleryItem
                                key={picture.id}
                                webformatURL={picture.webformatURL}
                                largeImageURL={picture.largeImageURL}
                                onOpen={this.takeModalPicture}
                            />
                        ))}
                    </ul>
                    {showModal && (
                        <Modal onClose={this.toggleModal}>
                            <img src={largeUrl} alt="modal-img" />
                        </Modal>
                    )
                    }
                    <LoadMoreBtn onLoadMoreBtn={this.onLoadMoreBtn} />
                </div >
            )
        }
    }

}


ImageGallery.propTypes = {
    inputValue: PropTypes.string,
};