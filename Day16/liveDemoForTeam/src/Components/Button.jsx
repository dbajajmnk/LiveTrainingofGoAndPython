const Button = (props)=>{
    return <button  onClick={props.handler}>{props.label}</button>
}


const ButtonI = ({handler,label})=>{
    return <button  onClick={handler}>{label}</button>
}
export {ButtonI, Button}