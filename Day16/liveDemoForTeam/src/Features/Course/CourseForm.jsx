const ProductForm=({handlers,values})=>{

    return <form>
        <input type="text" name="title" hint="Enter Course Tilte" value={values[0]} onChange={((e)=>handlers[0](e))}></input>
        <input type="text" name="duration" hint="Enter Course Duration" value={values[1]} onChange={((e)=>handlers[1][e])}></input>
        <input type="text" name="price" hint="Enter Course Price" value={values[2]} onChange={((e)=>handlers[2][e])}></input>
        <input type="text" name="discount" hint="Enter Course Discount" value={values[3]} onChange={((e)=>handlers[3][e])}></input>
        <button onClick={((e)=>handlers[4](e))}>Submit</button>
        <button onClick={((e)=>handlers[5](e))} >Reset</button>
        </form>

}
export default ProductForm;