// Remove 'export default' and add 'export' to each constant
export const Button = (props) => {
    return <button onClick={props.handler}>{props.label}</button>
}

export const ButtonI = ({handler, label}) => {
    return <button onClick={handler}>{label}</button>
}
