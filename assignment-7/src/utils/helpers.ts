export const validatePageParam = (pageParam: string, totalPages: number) => {
  let formatPageParam = Number(pageParam) || 1
  if (formatPageParam < 1 || formatPageParam > totalPages) formatPageParam = 1

  return formatPageParam
}
