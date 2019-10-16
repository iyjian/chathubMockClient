module.exports = () => {
  return actionBody => {
    console.log('i am getting a send text message command', actionBody)
    return {}
  }
}