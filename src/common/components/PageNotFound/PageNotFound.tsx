import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';
import { Path } from '../../routing/paths.ts';

export const PageNotFound = () => (
  <Container className={styles.page}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>Page not found</h2>
    <p className={styles.description}>Похоже, такой страницы не существует.</p>
    <Button className={styles.button} variant="contained" component={Link} to={Path.Main}>
      Вернуться на главную
    </Button>
  </Container>
);
