# Получить идентификатор языка в текущем Битрикс24 BX24.getLang

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Метод `BX24.getLang` возвращает идентификатор языка в текущем Битрикс24. Метод работает после [BX24.init](../system-functions/bx24-init.md).

```js
String BX24.getLang()
```

## Параметры

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const lang = BX24.getLang();
    BX24.loadScript('lang/' + lang + '.js', function () {
        console.log('Загрузка завершена');
    });
});
```

## Обработка ответа

Метод синхронно возвращает результат типа `string`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../api-reference/data-types.md) | Идентификатор языка в текущем Битрикс24: `ja`, `id`, `ms`, `de`, `la`, `fr`, `it`, `pl`, `br`, `vn`, `tr`, `kz`, `ru`, `en`, `ua`, `ar`, `th`, `sc`, `tc` ||
|#

## Продолжите изучение

- [{#T}](../system-functions/bx24-init.md)
- [{#T}](./bx24-is-admin.md)
