# Получить настройки пользователя BX24.userOption.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

```js
BX24.userOption.get(string name): any | undefined;
```

Метод `BX24.userOption.get` возвращает значение настройки с именем `name` для текущего пользователя.

Метод работает после [BX24.init](../system-functions/bx24-init.md) и читает настройки пользователя, загруженные при инициализации библиотеки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../api-reference/data-types.md) | Код параметра ||
|#

## Пример кода

```js
BX24.init(() => {
    BX24.userOption.set('param_str', 'str');
    BX24.userOption.set('param_numb', 1);
    BX24.userOption.set('param_obj', {foo: 'bar'});

    console.log(BX24.userOption.get('param_str')); // вернет str
    console.log(BX24.userOption.get('param_numb')); // вернет 1
    console.log(BX24.userOption.get('param_obj')); // вернет {foo: 'bar'}
    console.log(BX24.userOption.get('unknown')); // вернет undefined
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Обработка ответа

Метод синхронно возвращает значение настройки пользователя.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`any`\|`undefined`](../../../api-reference/data-types.md) | Если настройка с именем `name` сохранена, метод возвращает ее значение. Тип зависит от значения, переданного в [BX24.userOption.set](./bx24-user-option-set.md). Если настройка не сохранена, возвращает `undefined` ||
|#

Например, для несохраненного кода результатом будет:

```js
undefined
```

## Обработка ошибок

Кодов ошибок метод не возвращает. Отсутствие настройки не считается ошибкой — метод возвращает `undefined`.

## Продолжите изучение

- [{#T}](./bx24-user-option-set.md)
- [{#T}](./bx24-app-option-set.md)
- [{#T}](./bx24-app-option-get.md)
