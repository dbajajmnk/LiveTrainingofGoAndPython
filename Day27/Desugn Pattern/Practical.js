class Subject {
  constructor(){
    this.observers= [];
  }
  subscribe (observer) {
    this.observers.push(observer);
  }
  unSubscribe(removeObserver) {
    this.observers = observers.filter((observer)=> observer!=removeObserver)
  }
  notify(data) {
    this.observers.forEach(element => {
      element (data);
    });
  }
}