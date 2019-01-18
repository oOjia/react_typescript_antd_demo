
import routes from './index';

const allRoutes = routes.reduce((acc: object[], cur: any) => {
  if (cur.route) {
    return acc.concat(cur.route);
  } else {
    return acc.concat(cur);
  }
}, []);
export default allRoutes;