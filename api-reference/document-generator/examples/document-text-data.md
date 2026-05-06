# Сгенерировать документ с текстом

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Текстовые значения для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) через параметр `values` без дополнительных настроек типов полей.

## Когда использовать

- В шаблоне только текстовые плейсхолдеры без модификаторов типов
- Не нужно задавать `TYPE`, `FORMAT` и провайдеры в `fields`

## Что передавать в запросе

- `values` — объект вида `"КодПоля": "ТекстовоеЗначение"`
- `fields` можно не передавать, если все поля вставляются как обычный текст без форматирования

Ключи в `values` должны совпадать с кодами полей из шаблона, например для плейсхолдера `{SomeName}` нужно передать `'SomeName'`.

Получить коды полей шаблона можно методом [documentgenerator.template.getfields](../templates/document-generator-template-get-fields.md).

Для REST-вызовов используется провайдер `Bitrix\\DocumentGenerator\\DataProvider\\Rest`.

## Пример

```php
$data = [
    'templateId' => 203,
    'providerClassName' => 'Bitrix\\DocumentGenerator\\DataProvider\\Rest',
    'value' => 'ORDER_1024',
    'values' => [
        'DocumentNumber' => 'ДГ-2026-001',
        'CurrentDate' => '18.03.2026',
        'ClientName' => 'ООО Ромашка',
        'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
    ],
];
$url = $webHookUrl.'documentgenerator.document.add/';
```

## Продолжите изучение

- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
