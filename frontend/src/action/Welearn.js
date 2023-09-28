import { SIGNIN, SIGNOUT } from './action-types'

export const signIn = (userDetails) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", userDetails.token);
        localStorage.setItem("user", JSON.stringify(userDetails));
    }
    return{
    type: SIGNIN,
    payload: userDetails,
}
}

export const signOut = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
    }
    return {
        type: SIGNOUT
    }
}