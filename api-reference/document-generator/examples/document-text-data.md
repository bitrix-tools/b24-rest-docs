# Сгенерировать документ с текстом

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

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