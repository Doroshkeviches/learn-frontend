# [Render-props] Render-prop: почему на него все забивают и плодят ненужные компоненты?



## Что такое render-props?
Render-prop — это паттерн в React, который позволяет передавать ReactNode в компонент и управлять его рендерингом.

## Когда стоит использовать?
Любой повторяющийся функционал в вашем приложении следует выносить в отдельную сущность. Это помогает избежать дублирования кода и упрощает поддержку проекта.

Часто в проектах встречаются похожие по UI компоненты, которые немного отличаются по наполнению или передаваемым значениям. Вместо того чтобы плодить кучу компонентов (PostsList, UsersList), можно сделать один универсальный компонент, используя render-prop.

## Пример использования
Представим, что у нас есть стилизованный список, который в разных частях приложения должен отображать разные данные.

## Проблема:
```typescript
interface ListProps {
    items: IItem[]
}

interface IItem {
    name: string
}

function List(props: ListProps) {
    const { items } = props

    return (
        <ul>
            {items.map((it) => (
                <li>{it.name}</li>
            ))}
        </ul>
    )
}
```

Если нам нужен аналогичный список для постов (IPost), где нет поля name, многие разработчики создадут новый компонент PostsList, а текущий переименуют в UsersList. Это ведет к ненужному дублированию кода.

## Как делать правильно?
Используем render-props:
```typescript
interface ListProps<T> {
    items: Array<T>
    render: (it: T) => ReactNode
}

function List<T>(props: ListProps<T>) {
    const { items, render } = props

    return (
        <ul>
            {items.map((it) => render(it))}
        </ul>
    )
}
```

Теперь мы сами решаем, как рендерить элементы списка.

```typescript
interface IItem {
    name: string
}
interface IPost {
    author: string
}
const ITEMS: IItem[] = [{ name: 'Evgeniy' }, { name: 'Kate' }, { name: 'Fedor' }, { name: 'Elena' }]

const POSTS: IPost[] = [{ author: 'Evgeniy' }, { author: 'Kate' }, { author: 'Fedor' }, { author: 'Elena' }]

function Page(props: Props) {
    const { } = props

    return (
        <div>
            <List items={ITEMS} render={(it) => (
                <li>{it.name}</li>
            )} />
            <List items={POSTS} render={(it) => (
                <li>{it.author}</li>
            )} />
        </div>
    )
}
```
## Преимущества render-prop
✅ Меньше дублирования кода – один универсальный компонент вместо множества однотипных.
✅ Больше гибкости – можно передавать любую логику рендеринга.
✅ Лучшая поддерживаемость – изменение логики списка затронет только один компонент.