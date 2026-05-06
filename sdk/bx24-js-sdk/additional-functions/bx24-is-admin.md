# Проверить администраторский доступ пользователя BX24.isAdmin

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Метод `BX24.isAdmin` определяет, есть ли у текущего пользователя права администратора Битрикс24. Метод работает после [BX24.init](../system-functions/bx24-init.md).

```js
Boolean BX24.isAdmin()
```

## Параметры

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const isAdmin = BX24.isAdmin();
    console.log(isAdmin);
});
```

## Обработка ответа

Метод синхронно возвращает результат типа `boolean`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../api-reference/data-types.md) | `true`, если у текущего пользователя есть права администратора Битрикс24, иначе `false` ||
|#

## Продолжите изучение

- [{#T}](../system-functions/bx24-init.md)
- [{#T}](../../../api-reference/common/users/user-admin.md)
