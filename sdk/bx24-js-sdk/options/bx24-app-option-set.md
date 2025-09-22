# Установить настройки для приложения BX24.appOption.set

```js
BX24.appOption.set(string name, mixed value[, Function callback]): void;
```

Метод `BX24.appOption.set` устанавливает общие настройки для текущего приложения. 

Установка значений настроек приложения доступна только пользователям с правом управления приложениями (см. [BX24.isAdmin](../additional-functions/bx24-is-admin.md)). Для настроек приложения может потребоваться обработчик завершения (см. ниже параметр `callback`).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../api-reference/data-types.md) | Код параметра ||
|| **value***
[`mixed`](../../../api-reference/data-types.md) | Значение параметра ||
|| **callback**
[`function`](../../../api-reference/data-types.md) | Callback после сохранения. В качестве аргумента будут переданы текущие настройки приложения ||
|#

## Пример кода

```js
BX24.init(() => {
    BX24.appOption.set('param_str', 'str1', (params) => console.log(params));
    BX24.appOption.set('param_numb', 1);
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-user-option-set.md)
- [{#T}](./bx24-user-option-get.md)
- [{#T}](./bx24-app-option-get.md)