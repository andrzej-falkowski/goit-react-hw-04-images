import axios from "axios";
import { Component } from "react";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import styles from "./App.module.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      apiKey: "43601558-493cea9937d74fa86e08084b6",
      query: "",
      images: [],
      isLoading: false,
      page: 1,
      totalPages: null,
    };
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    await axios
      .get(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then((res) => {
        const { data } = res;
        const totalHits = Math.ceil(data.totalHits / 12);
        // console.log(totalHits);
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          totalPages: totalHits,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  // componentDidMount() {
  //   this.fetchImages();
  // }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSearch = (searchQuery) => {
    this.setState({
      images: [],
      page: 1,
      query: "",
      query: searchQuery,
    });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      // isLoading: true,
      ...prevState,
      page: prevState.page + 1,
    }));
    // console.log(this.state.page);
  };

  render() {
    const { page, totalPages, isLoading} =
      this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery {...this.state} />
        {totalPages > page && <Button onButtonClick={this.loadMore} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}
