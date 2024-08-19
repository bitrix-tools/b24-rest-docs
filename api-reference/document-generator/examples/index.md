# Генерация простого документа 

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- должно быть описание и ссылка на материал в общем разделе

{% endnote %}

{% endif %}

Если в документ необходимо вставить только простые текстовые данные, то надо в метод [documentgenerator.document.add](../document-generator-document-add.md) передать только массив `values` с текстовыми значениями:

```php
$data = [
    'templateId' => 203,
    'providerClassName' => 'Bitrix\\DocumentGenerator\\DataProvider\\Rest',
    'value' => 1,
    'values' => [
        'SomeDate' => '14.02.2018',
        'SomeName' => 'Горелкин Владислав',
    ],
];
$url = $webHookUrl.$prefix.'.document.add/';
```