import styles from './header.module.css';
import LogoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Link to={'/'}>
            <header className={styles.container} >
                <img src={LogoImg} alt="logo" />
            </header>
        </Link>
    );
}

export default Header;