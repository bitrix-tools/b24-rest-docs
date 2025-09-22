# Установить настройки для пользователя BX24.userOption.set

```js
BX24.userOption.set(string name, string value): void;
```

Метод `BX24.userOption.set` устанавливает значение `value` настройки с именем `name` для текущего пользователя. Установка значения происходит сразу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../api-reference/data-types.md) | Код параметра ||
|| **value***
[`mixed`](../../../api-reference/data-types.md) | Значение параметра ||
|#


## Пример кода

```js
BX24.init(() => {
    BX24.userOption.set('param_str', 'str');
    BX24.userOption.set('param_numb', 1);
    BX24.userOption.set('param_obj', {foo: 'bar'});
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-user-option-get.md)
- [{#T}](./bx24-app-option-set.md)
- [{#T}](./bx24-app-option-get.md)