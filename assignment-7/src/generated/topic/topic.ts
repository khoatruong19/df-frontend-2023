/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import useSwr from 'swr'
import type { SWRConfiguration, Key } from 'swr'
import type { TopicsResponse, ErrorResponse } from '../model'
import { customInstance } from '../../lib/custom-instance'

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never

/**
 * Get all topics
 * @summary Get all topics
 */
export const getTopics = (options?: SecondParameter<typeof customInstance>) => {
  return customInstance<TopicsResponse>(
    { url: `/topics`, method: 'get' },
    options,
  )
}

export const getGetTopicsKey = () => [`/topics`] as const

export type GetTopicsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getTopics>>
>
export type GetTopicsQueryError = ErrorResponse

/**
 * @summary Get all topics
 */
export const useGetTopics = <TError = ErrorResponse>(options?: {
  swr?: SWRConfiguration<Awaited<ReturnType<typeof getTopics>>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  request?: SecondParameter<typeof customInstance>
}) => {
  const { swr: swrOptions, request: requestOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (() => (isEnabled ? getGetTopicsKey() : null))
  const swrFn = () => getTopics(requestOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  )

  return {
    swrKey,
    ...query,
  }
}
