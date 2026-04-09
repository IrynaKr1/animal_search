import { Link } from 'react-router-dom';
import { PiPawPrintDuotone, PiMagnifyingGlassDuotone } from 'react-icons/pi';
import styles from './HomePage.module.scss';
import petsImage from './pets.jpg';

function HomePage () {
  return (
    <main className={styles.home}>
      {/* About us section */}
      <section className={styles.about_us}>
        <div>
          <h1>
            Your local search service for
            <span> lost animals</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam eaque ipsa.
          </p>
        </div>
        <div>
          <img src={petsImage} alt='A dog and a cat' className={styles.image} />
        </div>
      </section>

      {/* Cards section */}

      <section>
        <Link to='/pets/create'>
          <div>
            <PiPawPrintDuotone />
          </div>
          <h2>Find My Pet</h2>
          <p>
            If you would like to submit a missing pet report, please click here
            to complete the form.
          </p>
        </Link>

        <Link to='/pets'>
          <div>
            <PiMagnifyingGlassDuotone />
          </div>
          <h2>Pets List</h2>
          <p>
            Jeżeli chcesz znaleźć dane właściciela zagubionego zwierzaka —
            przejrzyj listę zgłoszeń.
          </p>
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
