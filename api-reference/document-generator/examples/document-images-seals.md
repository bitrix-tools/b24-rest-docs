# Сгенерировать документ с изображениями и печатями

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Изображения, печати и подписи для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) ссылками на файлы в `values`. Файлы скачиваются по указанному URL и вставляются в документ при генерации.

## Когда использовать

- Нужно вставить изображение по внешней ссылке
- Нужно добавить печать или подпись в поле шаблона

## Что передавать в запросе

- В `values` передайте абсолютные URL файлов. URL файла должен быть доступен Битрикс24 без дополнительной авторизации
- В `fields` для кода поля укажите тип:
  - `IMAGE` — поле изображения
  - `STAMP` — поле печати или подписи
- Коды полей в `values` и `fields` должны совпадать с кодами плейсхолдеров в шаблоне

## Пример

```php
$data = [
    'templateId' => 203,
    'providerClassName' => 'Bitrix\\DocumentGenerator\\DataProvider\\Rest',
    'value' => 'ORDER_1024',
    'values' => [
        'Stamp' => 'https://myrestapp.example/upload/stamp.png', // внешний путь к файлу печати
        'Image' => 'https://myrestapp.example/upload/image.jpg', // внешний путь к файлу изображения
    ],
    'fields' => [
        'Stamp' => ['TYPE' => 'STAMP'], // тип поля - печать
        'Image' => ['TYPE' => 'IMAGE'], // тип поля - изображение
    ]
];
$url = $webHookUrl.'documentgenerator.document.add/';
```

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./index.md)
