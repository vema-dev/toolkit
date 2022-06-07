import ColorsPage from '../pages/colors.jsx';
import CssPage from '../pages/css.jsx';
import GeneratorsPage from '../pages/generators';
import OtherPage from '../pages/others';

import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: ColorsPage,
  },
  {
    path: '/css/',
    component: CssPage,
  },
  {
    path: '/generators/',
    component: GeneratorsPage,
  },
  {
    path: '/other/',
    component: OtherPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
