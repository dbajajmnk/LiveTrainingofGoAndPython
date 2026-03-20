import {CourseCard} from './Course'
const CourseList =(props)=>{
    let cards;
   
    cards = props.items.map((value)=>{
        return CourseCard({...value})
    })
   
    
            //cards[i]=<li>CourseCard({...items[i]})</li>
    
    return <ul>{cards}</ul>
}

export default CourseList