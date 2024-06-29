import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import styles from "./App.module.scss";

export default function App() {

  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const apiKey = "43601558-493cea9937d74fa86e08084b6";

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      await axios
        .get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
        )
        .then((res) => {
          const { data } = res;
          const totalHits = Math.ceil(data.totalHits / 12);
          // console.log(totalHits);
          // console.log(page)
          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotalPages(totalHits);
        })
        .finally(() => {
          setIsLoading(false)
        });
    };
    fetchImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setImages([]);
    setPage(1);
    setQuery("");
    setQuery(searchQuery)
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} />
      {totalPages > page && <Button onButtonClick={loadMore} />}
      {isLoading && <Loader />}
    </div>
  );
}