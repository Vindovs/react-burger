import proptypes from 'prop-types';

export const DataType = proptypes.shape({
    _id: proptypes.string.isRequired,
    name: proptypes.string.isRequired,
    type: proptypes.string.isRequired,
    proteins: proptypes.number,
    fat: proptypes.number,
    carbohydrates:  proptypes.number,
    calories: proptypes.number,
    price: proptypes.number,
    image: proptypes.string,
    image_mobile: proptypes.string,
    image_large: proptypes.string,
    __v: proptypes.number    
 });