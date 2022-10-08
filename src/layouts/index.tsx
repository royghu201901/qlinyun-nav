import { Outlet } from 'umi';
import styles from './index.less';
import MyNav from './components/MyNav'

export default function Layout() {
  return (
    <div>
      <img src="https://i.loli.net/2021/06/25/GzfZAoDdp89MQNY.jpg" alt="bg.jpg" className={styles.bg} draggable="false" />
      <MyNav />
      <Outlet />
    </div>
  );
}
