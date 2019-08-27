// let { hasPermission } = require('./permissions.util')

const hasPermission = (role = [], key) => role.find(el => el.key === key)

let init = (permissions) => {
  let menu = [
    {
      key: 'account',
      title: 'Account',
      childItem: [
        { text: 'New', link: '/account/add', permission: hasPermission(permissions.account.role, 'ACCOUNTADD') },
        { text: 'List', link: '/account', permission: hasPermission(permissions.account.role, 'ACCOUNTVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermission(permissions.account.role, 'ACCOUNTVIEW')
    },
    {
      key: 'category',
      title: 'Category',
      childItem: [
        { text: 'New', link: '/category/add', permission: hasPermission(permissions.category.role, 'CATEGORYADD') },
        { text: 'List', link: '/category', permission: hasPermission(permissions.category.role, 'CATEGORYVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermission(permissions.category.role, 'CATEGORYVIEW')
    },
    {
      key: 'post',
      title: 'Post',
      childItem: [
        { text: 'New', link: '/post/add', permission: hasPermission(permissions.post.role, 'POSTADD') },
        { text: 'List', link: '/post', permission: hasPermission(permissions.post.role, 'POSTVIEW') }
      ],
      icon: 'fa fa-book',
      permission: hasPermission(permissions.post.role, 'POSTVIEW')
    }
  ]
  let menuData = []
  menu.forEach((el) => {
    if (el.permission) {
      let child = []
      if (el.childItem && el.childItem.length) {
        el.childItem.forEach(c => {
          if (c.permission) child.push(c)
        })
      }
      el.childItem = child
      menuData.push(el)
    }
  })
  return menuData
}

module.exports = (permissions) => init(permissions)