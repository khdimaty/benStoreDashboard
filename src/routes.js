import TableList from "views/TableList/TableList.js";
import BagsPage from "views/TableList/bagsPage.js";
import BagsPagen from "views/TableList/nonconfirmed";
import AddProduct from "views/TableList/addproduct";
import AddCategory from "views/TableList/addcategory";
var dashRoutes = [
  {
    path: "/products",
    name: "products",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/bagsc",
    name: "Bags - pending",
    rtlName: "",
    icon: "shoppingBasket",
    component: BagsPage,
    layout: "/admin"
  },
  {
    path: "/bagsnonc",
    name: "Bags - confirmed",
    rtlName: "",
    icon: "shoppingBasket",
    component: BagsPagen,
    layout: "/admin"
  },
  {
    path: "/create",
    name: "Create Product",
    rtlName: "",
    icon: "create",
    component: AddProduct,
    layout: "/admin"
  },
  {
    path: "/createcat",
    name: "Settings",
    rtlName: "",
    icon: "",
    component: AddCategory,
    layout: "/admin"
  }
];
export default dashRoutes;
