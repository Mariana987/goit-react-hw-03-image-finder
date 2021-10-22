import { Component } from 'react';
import './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery';



export default class App extends Component {
  state = {
    pictureName: '',
  };

  handleFormSubmit = pictureName => {
    this.setState({ pictureName })
  }

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



