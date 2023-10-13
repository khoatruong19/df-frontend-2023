import Axios, { AxiosRequestConfig } from 'axios'
import { isSSR } from '@dwarvesf/react-utils'
import { getToken } from '../utils/jwt'

const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com/api/v1'
export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL }) // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const token = isSSR() ? undefined : getToken()

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
