import vine from '@vinejs/vine'

export const createDayValidator = vine.compile(
  vine.object({
    date: vine.date().beforeOrEqual('today'),
  })
)
