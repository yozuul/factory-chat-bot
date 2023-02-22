async function runChecker() {
   const response = await fetch('http://localhost:4000/channels/check', {
      method: 'GET',
      headers: {
         key: 'sadfs8787sdfsjkksd'
      }
   })
   console.log(await response.text())
}
runChecker()