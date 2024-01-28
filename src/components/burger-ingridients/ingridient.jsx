import styles from '../burger-constructor/order/order.module.css'
import PropTypes from 'prop-types';

const Ingridient = ({ ingredient }) => {
    return (
        <>
            <div >
                <div>
                    <div className="pt-10">
                        <p style={{ textAlign: 'start' }} className="text text_type_main-large pl-10">Детали ингридиента</p>
                    </div>
                    <div>
                        <div>
                            <img src={ingredient.image_large} alt={ingredient.name} />
                        </div>
                        <p className="text text_type_main-medium">{ingredient.name}</p>
                    </div>
                </div>
                <div className="text text_type_main-small text_color_inactive" style={{ display: 'inline-flex' }}>
                    <div className={styles.item}>
                        <p>Каллории,калл</p>
                        <p className="text text_type_digits-default">{ingredient.calories}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Белки,г</p>
                        <p className="text text_type_digits-default">{ingredient.proteins}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Жиры,г</p>
                        <p className="text text_type_digits-default ">{ingredient.fat}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Углеводы,г</p>
                        <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

Ingridient.propTypes = {
    ingredient: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }).isRequired,
};

export default Ingridient;