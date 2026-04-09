import { Link } from 'react-router-dom';
import { PiPawPrintDuotone, PiMagnifyingGlassDuotone } from 'react-icons/pi';
import styles from './HomePage.module.scss';
import petsImage from './pets.jpg';

function HomePage () {
  return (
    <main className={styles.home}>
      {/* About us section */}

      <section className={styles.about_us}>
        <div className={styles.about_us_text}>
          <h1 className={styles.title}>
            Your search service for
            <span className={styles.text_accent}> lost animals</span>
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className={styles.description}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam eaque ipsa.
          </p>
        </div>
        <div className={styles.image_wrapper}>
          <img src={petsImage} alt='A dog and a cat' className={styles.image} />
        </div>
      </section>

      {/* Cards section */}

      <section className={styles.cards}>
        <Link to='/pets/create' className={styles.card}>
          <div className={styles.card_icon}>
            <PiPawPrintDuotone />
          </div>
          <h2 className={styles.card_title}>Find My Pet</h2>
          <p className={styles.card_desc}>
            If you would like to submit a missing pet report, please click here
            to complete the form.
          </p>
        </Link>

        <Link to='/pets' className={styles.card}>
          <div className={`${styles.card_icon} ${styles.card_icon_search}`}>
            <PiMagnifyingGlassDuotone />
          </div>
          <h2 className={styles.card_title}>Pets List</h2>
          <p className={styles.card_desc}>
            If you want to find the owner of a lost pet, please browse the list
            of reports.
          </p>
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
