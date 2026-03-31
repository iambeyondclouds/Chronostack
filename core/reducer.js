function reducer(state, event) {
  const currentCount = state.count ?? 0;

  if (event.type === "ADD") {
    return { count: currentCount + event.payload };
  }

  if (event.type === "SUB") {
    return { count: currentCount - event.payload };
  }

  return { ...state }; // always return new object
}

module.exports = reducer;