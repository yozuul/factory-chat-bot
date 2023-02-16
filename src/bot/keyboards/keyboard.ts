import { Markup } from 'telegraf';
export const backKeyboard = Markup.keyboard([
   Markup.button.callback('👈 Назад', 'back')
]).resize()
// STARTED
export const adminStartedKeyboard = [
   Markup.button.callback('Участки', 'areas'),
   Markup.button.callback('Каналы', 'channels'),
   Markup.button.callback('✉️ Тест рассылки', 'test'),
]
// AREAS
export const addNewAreaKeyboard = [
   Markup.button.callback('➕ Новый участок', 'newArea'),
   Markup.button.callback('📞 Изменить телефон', 'editPhone'),
   Markup.button.callback('👈 Назад', 'back'),
]
export const areaEditKeyboard = [
   Markup.button.callback('❌ Удалить участок', 'deleteArea'),
   Markup.button.callback('👈 Назад', 'back'),
]
export const areasListKeyboard = (data) => {
   const keyboardData = { inline_keyboard: [] }
   for (let item of data) {
      keyboardData.inline_keyboard.push([{
            text: item.name, callback_data: `area_${item.id}`
         },
      ])
   }
   return keyboardData
}
// CHANNELS
export const addNewCHannelKeyboard = [
   // Markup.button.callback('➕ Новый канал', 'newArea'),
   Markup.button.callback('👈 Назад', 'back'),
]
export const channelEditKeyboard = [
   // Markup.button.callback('📝 Изменить права', 'editChannel'),
   Markup.button.callback('❌ Удалить канал', 'deleteChannel'),
   Markup.button.callback('👈 Назад', 'back'),
]
export const channelsListKeyboard = (data) => {
   const keyboardData = { inline_keyboard: [] }
   for (let item of data) {
      keyboardData.inline_keyboard.push([{
            text: item.name, callback_data: `channel_${item.id}`
         },
      ])
   }
   return keyboardData
}