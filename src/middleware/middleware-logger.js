const middlewareLogger = store => next => action => {
  console.log('Original State: ', store.getState());
  console.log('CURRENT ACTION: ', action);
  next(action);
  console.log('new Updated store', store.getState());
};

export default middlewareLogger;