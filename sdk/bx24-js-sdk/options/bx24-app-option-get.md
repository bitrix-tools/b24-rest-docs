# Получить настройки приложения BX24.appOption.get

```js
BX24.appOption.get(string name, mixed value): mixed;
```

Метод `BX24.appOption.get` возвращает настройку по ее коду.

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
    BX24.appOption.set('param_str', 'str1', (params) => console.log(params));
    BX24.appOption.set('param_numb', 1);

    console.log(BX24.appOption.get('param_str')); //вернет str1
    console.log(BX24.appOption.get('param_numb'));//вернет 1
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-user-option-set.md)
- [{#T}](./bx24-user-option-get.md)
- [{#T}](./bx24-app-option-set.md)