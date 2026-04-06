function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
let  state = {count:0};
const action = {type:"increment"}

const action2 = {type:"decrement"}
state=counterReducer(state,action);
state=counterReducer(state,action);
state=counterReducer(state,action);
state=counterReducer(state,action2);
console.log(state);


