# Datasource concepts
Init:

```js
c.datasource.init('engagements', engagementList, schema)
```

Set:

```js
let engagementsDS = c.datasource.engagements
if (engagementsDS.exists(e.id)) {
  engagementsDS.update(e)
} else {
  engagementsDS.add(e)
}
```

Set multiple, update if exists

```js
c.datasource.engagements.upsert(engagementList)
```

Unset:

```js
c.datasource.engagements.remove(e.id)
```

Get:

```js
let list = c.datasource.engagements.list((item, index, id) => item)

let item = c.datasource.engagements.get(id)
```

Hash (change after each update):

> use for checking if newly updated or set key to the Listing components

```js
c.datasource.engagements.hash
```

Listen to the changes:

```js
c.datasource.engagements.on('change', (changedItems, newHash) => {})
```

Subscribe to component

```jsx
export default withDatasource(Component, (datasource) => {
  return {
    engagements: datasource.engagements
  }
}
c.datasource.engagements.setCurrent(someID)
c.datasource.engagement.current()
```

```jsx
const formModel = new Model(todoModel)
formModel.initFromDatasource(c.datasource.todos.get(1))
const tableModel = new TableModel(todoListModel)
tableModel.initFromDatasource(c.datasource.todos.list())
<Table model={tableModel} />

let demo = {
 name: {},
 numberOfRequest: {
    value: (model) => c.datasoure.requests.list((r) => r.todoId === model.id).length
 }
}

<Parent>
  <Child key={this.state.datasource.hash} />
</Parent>
```
