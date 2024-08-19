# Добавление изображения в товар или торговое предложение

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
- ссылка на статью Обработка файлов (должна быть по адресу js_library/rest/files.md)
  
{% endnote %}

{% endif %}

{% note info "catalog.productImage.add" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.productImage.add(fields, fileContent)
```

Метод добавляет изображение в товар или торговое предложение.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`object`](../../data-types.md)| Массив, содержащий следующие поля:
- **productId** – идентификатор товара или предложения (обязательное поле);
- **type** – тип картинки. Можно задать три значения:
  - `DETAIL_PICTURE` – картинка будет сохранена в детальную;
  - `PREVIEW_PICTURE` – картинка будет сохранена в анонс;
  - `MORE_PHOTO` либо оставить пустым – картинка будет сохранена в свойство `MORE_PHOTO` товара. ||
|| **fileContent^*^** | `product_file`, структура аналогична описанной в статье Обработка файлов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.productImage.add',
    {
        'fields': {
            'productId': 1,
            'type': 'PREVIEW_PICTURE'
        },
        'fileContent': [
            'test.jpeg',
            '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'
        ]
    },
    function(result) {
        if (result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}