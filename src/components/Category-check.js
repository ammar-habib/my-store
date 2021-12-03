import {Form} from 'react-bootstrap';


const CategoryCheck = ({category, categoryId, selectCategories, setSelectCategories}) => {
    const addInSelectedCategory = (value) => {
        const category = [...selectCategories]
        !category.includes(value) && category.push(value);
        setSelectCategories(category)
    }
    const removeFromSelectedCategory = (value) => {
        const categories = selectCategories.includes(value) ? selectCategories.filter((category) => category !== value) : selectCategories;
        setSelectCategories(categories)
    }
    const handleSelectedCategory = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        checked ? addInSelectedCategory(value) : removeFromSelectedCategory(value)


    }
    return (
        <Form.Group controlId={categoryId}>
            <Form.Check value={category} type="checkbox" label={category} onChange={handleSelectedCategory} checked={selectCategories.includes(category)}/>
        </Form.Group>
    );
};
export default CategoryCheck;