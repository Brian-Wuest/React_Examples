import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
