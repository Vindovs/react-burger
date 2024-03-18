import { DndProvider } from "react-dnd";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex' }} >
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </DndProvider>
    )
}

export default Home;