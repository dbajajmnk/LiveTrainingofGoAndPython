// components/ProductForm.jsx
export const ProductForm = ({handlers}) => {
    return (
        <form style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
            <h3>Add New Course</h3>
            <input type="text" name="title" placeholder="Enter Course Title" onChange={handlers[0]} />
            <input type="text" name="duration" placeholder="Enter Course Duration" onChange={handlers[1]}/>
            <input type="text" name="price" placeholder="Enter Course price" onChange={handlers[2]}/>
            <input type="text" name="discount" placeholder="Enter Course Discount" onChange={handlers[3]}/>
            
            
            <button type="submit" onClick={handlers[4]}>Submit</button>
            <button type="button" onClick={handlers[5]}>reset</button>
        </form>
    );
};
