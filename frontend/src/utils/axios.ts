import axios from "axios";


export const authAxios = (token: string | null) => (
  axios.create({
    'headers': {
      Authorization: `Token ${token}`
    }
  })
);