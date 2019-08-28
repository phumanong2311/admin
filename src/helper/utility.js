let formatDate = (strDate) => {
  var date = new Date(strDate)
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  )
}

export {
  formatDate
}
