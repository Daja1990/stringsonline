import Forside from '../Pages/Forside/Forside';
import Kassen from '../Pages/Kassen/Kassen';
import Betingelser from '../Pages/Betingelser/Betingelser';
import Login from '../Pages/Login/Login';
import ItemDetail from '../Pages/ItemDetail/ItemDetail';
import SpecificItemDetail from '../Pages/SpecificItemDetail/SpecificItemDetail';
import GuitarPage from '../Pages/GuitarPage/GuitarPage';
import Cart from '../Pages/Cart/Cart';
import SearchResult from '../Pages/SearchResult/SearchResult';

const routes = [
    {
        name: 'Forside',
        path: '/',
        exact: true,
        component: Forside
    },
    {
        name: 'Salgs- og handelsbetingelser',
        path: '/Salg',
        exact: true,
        component: Betingelser
    },
    {
        name: 'Kassen',
        path: '/Kassen',
        exact: true,
        component: Kassen,
        hidden: true
    },
    {
        name: 'Login',
        path: '/Login',
        exact: true,
        component: Login,
        hidden: true
    },
    {
        name: 'Cart',
        path: '/Cart',
        exact: true,
        component: Cart,
        hidden: true
    },
    {
        name: 'ItemDetail',
        path: '/product/:id',
        exact: true,
        component: ItemDetail,
        hidden: true
    },
    {
        name: 'GuitarPage',
        path: '/guitarpage/:id',
        exact: true,
        component: GuitarPage,
        hidden: true
    },
    {
        name: 'SpecificItemDetail',
        path: '/specificproduct/:id',
        exact: true,
        component: SpecificItemDetail,
        hidden: true
    },
    {
        name: 'SearchResult',
        path: '/searchresult/:comment',
        exact: true,
        component: SearchResult,
        hidden: true
    },
];

export default routes;