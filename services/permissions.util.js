let hasPermission = (permissions, currentUser, type) => {
  let isPermissions = false
  if (!permissions) return false
  if (!currentUser) return false
  Object.keys(permissions).forEach(key => {
    permissions[key].forEach(el => {
      if (el.includes(type) && currentUser.includes(type)) {
        isPermissions = true
      }
    })
  })
  return isPermissions
}

exports.hasPermission = hasPermission
