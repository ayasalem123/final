import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function Carouselcomponent({ carouselelement }) {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          //className="d-block w-50"
          width="500"
          height="300"
          src={carouselelement[0].img}
          alt={carouselelement[0].title}
        />
        <Carousel.Caption>
          <Link style={{ color: 'blue', fontSize: '25px' }} to={'/register'}>
            {carouselelement[0].body}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          //className="d-block w-50"
          width="500"
          height="300"
          src={carouselelement[1].img}
          alt={carouselelement[1].title}
        />

        <Carousel.Caption>
          <Link to={'/reviews'} style={{ color: 'blue', fontSize: '25px' }}>
            {carouselelement[1].body}
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselcomponent;
