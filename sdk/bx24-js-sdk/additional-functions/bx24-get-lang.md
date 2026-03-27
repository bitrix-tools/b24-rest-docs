# Получить идентификатор языка текущего портала BX24.getLang

Метод `BX24.getLang` возвращает идентификатор языка текущего портала. Метод работает после [BX24.init](../system-functions/bx24-init.md).

```js
String BX24.getLang()
```

## Параметры

Без параметров.

## Пример кода

```js
BX24.init(function () {
    const lang = BX24.getLang();
    BX24.loadScript('lang/' + lang + '.js', function () {
        console.log('Загрузка завершена');
    });
});
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Обработка ответа

Метод синхронно возвращает результат типа `string`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../api-reference/data-types.md) | Идентификатор языка текущего портала: `ja`, `id`, `ms`, `de`, `la`, `fr`, `it`, `pl`, `br`, `vn`, `tr`, `kz`, `ru`, `en`, `ua`, `ar`, `th`, `sc`, `tc` ||
|#

## Продолжите изучение

- [{#T}](../system-functions/bx24-init.md)
- [{#T}](./bx24-is-admin.md)
