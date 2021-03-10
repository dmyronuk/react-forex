interface BaseAction { type: string }

export function createReducer<T, S extends BaseAction>(
  initialState: T,
  handlers: { [key: string]: (state: T, action: S) => T }
) {
  return (state = initialState, action: S): T => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}