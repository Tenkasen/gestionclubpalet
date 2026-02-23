import vine from '@vinejs/vine'

export const createDayValidator = vine.compile(
  vine.object({
    date: vine.date({
      formats: ['DD/MM/YYYY', 'DD MM YYYY', 'DD-MM-YYYY'],
    }),
  })
)
