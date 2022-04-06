export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
        return dispatch({ type: "CHANGE_USER", value: "ko" })
    }, 2000)
}