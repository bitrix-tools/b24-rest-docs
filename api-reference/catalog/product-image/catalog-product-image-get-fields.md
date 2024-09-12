# Получить поля картинки товара или торгового предложения catalog.productImage.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.productImage.getFields()
```

Метод возвращает поля картинки товара или торгового предложения.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.productImage.getFields',
    {},
    function(result) {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **createTime** 
[`datetime`](../../data-types.md) | Дата добавления. | Только для чтения||
|| **detailUrl** 
[`string`](../../data-types.md) | Ссылка на картинку. | Только для чтения. ||
|| **downloadUrl** 
[`string`](../../data-types.md) | Ссылка для скачивания приложением, подписанная текущим access_token'ом. | Только для чтения. ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор файла. | Только для чтения. ||
|| **name** 
[`string`](../../data-types.md) | Имя файла. | Только для чтения. ||
|| **productId^*^** 
[`string`](../../data-types.md) | Идентификатор товара или предложения. | ||
|| **type** 
[`string`](../../data-types.md) | Тип картинки. Может принимать три значения: 
- `DETAIL_PICTURE` – детальная картинка;
- `PREVIEW_PICTURE` – картинка для анонса;
- `MORE_PHOTO` – изображение из свойства "картинки товара".  | ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}
