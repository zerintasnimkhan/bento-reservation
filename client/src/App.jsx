import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./Pages/First";
//import InfoForm from './Pages/InfoForm';
import Info from "./Pages/Info";
import Reserve from "./Pages/Reserve";
import RestaurantInfo from "./Pages/RestaurantInfo";
import RestaurantList from "./Pages/RestaurantList";
import RestaurantCard from "./components/RestaurantCard.component";
import SearchBar from "./components/SearchBar.component";
import CategoryList from "./components/CategoryList.component";
import Thanks from "./Pages/Thanks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<First />} /> */}
        <Route path="/info/:restaurantId/:userId" element={<Info />} />
        <Route path="/" element={<Reserve />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantInfo />} />
        <Route
          path="/restaurant-list"
          element={
            <RestaurantList/>           
          }
        />
        <Route path="/card" element={<RestaurantCard />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
