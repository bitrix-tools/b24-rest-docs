# Получить настройки пользователя BX24.userOption.get

```js
BX24.userOption.get(string name): mixed;
```

Метод `BX24.userOption.get` возвращает значение настройки с именем `name` для текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../api-reference/data-types.md) | Код параметра ||
|#

## Примеры кода

```js
BX24.init(() => {
    BX24.userOption.set('param_str', 'str');
    BX24.userOption.set('param_numb', 1);
    BX24.userOption.set('param_obj', {foo: 'bar'});

    console.log(BX24.userOption.get('param_str')); //вернет str
    console.log(BX24.userOption.get('param_numb')); //вернет 1
    console.log(BX24.userOption.get('param_obj')); //вернет {foo: 'bar'}
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-user-option-set.md)
- [{#T}](./bx24-app-option-set.md)
- [{#T}](./bx24-app-option-get.md)