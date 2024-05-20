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

    const newToken = response.headers.authorization?.split(' ')[1]

    return {
      data: response.data.data,
      newToken
    }
  } catch (e) {
    return {
      data: {
        result: 'Something went wrong'
      },
      newToken: null
    }
  }
}
