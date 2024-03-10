import styles from '../burger-constructor/order/order.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
const Ingredient = () => {

    const { data } = useSelector((store) => store.data);

    const { id } = useParams();

    const item = useMemo(() => data.find(i => i._id === id), [data, id]);

    return (item &&
        <>
            <div >
                <div>
                    <div className="pt-10">
                        <p className="text text_type_main-large pl-10">Детали ингридиента</p>
                    </div>
                    <div>
                        <div>
                            <img src={item.image_large} alt={item.name} />
                        </div>
                        <p className="text text_type_main-medium">{item.name}</p>
                    </div>
                </div>
                <div className="text text_type_main-small text_color_inactive" style={{ display: 'inline-flex' }}>
                    <div className={styles.item}>
                        <p>Каллории,калл</p>
                        <p className="text text_type_digits-default">{item.calories}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Белки,г</p>
                        <p className="text text_type_digits-default">{item.proteins}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Жиры,г</p>
                        <p className="text text_type_digits-default ">{item.fat}</p>
                    </div>
                    <div className={styles.item}>
                        <p>Углеводы,г</p>
                        <p className="text text_type_digits-default">{item.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Ingredient;