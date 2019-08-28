import _ from 'lodash'

const hasPermission = (arrCode = [], currentUser) => {
  console.log(1111111111111111111)
  if (!currentUser || arrCode.length <= 0) return false
  const permissions = currentUser.permissions || null

  if (!permissions) return false

  let arr = []
  Object.keys(permissions).forEach(key => {
    arrCode.forEach(code => {
      const role = permissions[key].role.find(r => r.key === code)
      if (role) arr.push(role.isActive || false)
    })
  })
  if (arr.length <= 0) return false
  return arr.every(element => element)
}

// let routerPermissions = (type, permissions, permissionsUser) => {
//   if (!type) return false
//   return hasPermission(permissions, permissionsUser, type)
// }

export default hasPermission
