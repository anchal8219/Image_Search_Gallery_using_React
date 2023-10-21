import { Button, Form } from "react-bootstrap";
import "./index.css";
import { useCallback, useEffect, useRef, useState } from "react";
// import { AxiosContext } from "react-axios/lib/components/AxiosProvider";
import axios from "axios";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 24;
//we use axios to call the api and without api key , the api will not work

function App() {
  // console.log('key',process.env.REACT_APP_API_KEY);
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
      );
      // console.log('result',result .data)
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, page]);

  const resetSearch = (event) => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault(); //to avoid page refresh everytime
    // console.log(searchInput.current.value);
    resetSearch();
  };

  // const handleSelection = (selection)=>{
  //   searchInput.current.value = selection;
  //   fetchImages;
  // }
  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          {/* //here we used inside form bcz we don't have any submit button to do enter so to automatically do it, we used that         */}
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="images">
  {images.map((image) => (
    <div key={image.id} className="image">
      <img src={image.urls.small} alt={image.alt_description} />
      <div className="info-container">
        <div className="username">{image.user.username}</div>
        <div className="likes">
          <i className="fa fa-thumbs-up"></i> {image.likes}
        </div>
      </div>
    </div>
  ))}
</div>





      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}
export default App;
