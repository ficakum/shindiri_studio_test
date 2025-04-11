import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_RICK_AND_MORTY_API_LINK,
});
