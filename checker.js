async function runChecker() {
   console.log('!!ВЫЗОВ МЕТОДА В ЧЕККЕРЕ!!')
   try {
      const response = await fetch('http://localhost:4444/channels/check', {
      method: 'GET',
      headers: {
         key: 'sadfs8787sdfsjkksd'
      }
   })
   console.log(await response.text())
   } catch (error) {

   }
}
runChecker()