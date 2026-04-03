# Получить адрес Битрикс24 BX24.getDomain

Метод `BX24.getDomain` возвращает значение `PARAMS.DOMAIN`, сохраненное при инициализации библиотеки. Это домен текущего Битрикс24.

```js
String BX24.getDomain()
```

## Параметры

Без параметров.

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```js
BX24.init(function () {
    const domain = BX24.getDomain();
    console.log(domain);
});
```

## Обработка ответа

Метод синхронно возвращает результат типа `string`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../api-reference/data-types.md) | Домен Битрикс24 без портов `80` и `443`, например `mycompany.bitrix24.ru` ||
|#

## Продолжите изучение

- [{#T}](../system-functions/bx24-init.md)
- [{#T}](./bx24-get-lang.md)
