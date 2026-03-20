function CourseCard(props){
    console.log(props);
    return <>
    <h1>{props.title}</h1>
    <p>{props.duration}</p>
    <h3>{props.discount}</h3>
    <h3>{props.price}</h3>
    </>
}

export {CourseCard}