import styles from './NotFoundBlock.module.scss';
import { useNavigate } from 'react-router-dom';

export const NotFoundBlock:React.FC = () => {
  const navigate = useNavigate();

  const backBtn = () => {
    navigate(-1);
  };
  return (
    <div className={styles.root}>
      <h1 className={styles.root}>
        {' '}
        <span>🙃</span> Ничего не найдено{' '}
        <p className={styles.descr}>К сожалению, данная страница не найдена.</p>
        <button className="button button--outline button--add" onClick={backBtn}>
          Назад
        </button>
      </h1>
    </div>
  );
};
