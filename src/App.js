import { Component } from 'react';
import './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery';
// import ImageGalleryItem from './components/ImageGalleryItem'


export default class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    console.log(pictureName)
    this.setState({ pictureName })
  }

  // https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12


  render() {
    return (
      <div>
        <Searchbar onSubmitProp={this.handleFormSubmit} />
        <ImageGallery pictureName={this.state.pictureName} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}





// export default class App extends Component {
//   state = {
//     picture: null,
//     loading: false,
//   }

//   // https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12


//   componentDidMount() {
//     this.setState({ losding: true })
//     fetch('https://pixabay.com/api/?key=23171615-fcdc729843fe7af43a640cf8d&q=yellow+flowers&image_type=photo')
//       .then(res => res.json())
//       .then(picture => this.setState({ picture }))
//       .finally(() => this.setState({ losding: false }))

//   }


//   render() {
//     return (
//       <div>
//         {this.state.loading && <h1>Loading</h1>}
//         {this.state.picture && <div>{this.state.picture.totalHits}</div>}
//       </div>
//     );
//   }
// }