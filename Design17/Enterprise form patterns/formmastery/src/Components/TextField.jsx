export const TextField = ({lbl,handleChange,form,field,error})=>{
    return <>
     <label name="lblemail">{lbl} </label>
    <input type="text" name={field} onChange={handleChange} value={form[field]}></input>
    {error? <p>error</p> : null }
    </>

}