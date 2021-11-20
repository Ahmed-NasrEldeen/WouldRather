export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const SET_ANSWERED_USER = "SET_ANSWERED_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}
