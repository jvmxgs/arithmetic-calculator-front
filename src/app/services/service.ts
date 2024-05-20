import axios from '../utils/axiosConfig'

export async function post (token: string, url: string, payload: object) {
  try {
    const response = await axios.post(
      url,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data.data
  } catch (e) {
    return {
      result: 'Something went wrong'
    }
  }
}
