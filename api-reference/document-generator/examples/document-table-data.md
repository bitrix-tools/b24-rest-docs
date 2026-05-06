# Сгенерировать документ с табличными данными

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Табличные данные для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) как массив строк в `values`. В `fields` нужно описать провайдер таблицы, чтобы генератор обработал массив как повторяющиеся строки.

## Когда использовать

- Нужно заполнить одну таблицу строками одинаковой структуры
- Каждая строка таблицы содержит простой набор значений, например название, цену и изображение
- Нужно вывести номер строки внутри таблицы

## Что передавать в запросе

- В `fields['Table']['PROVIDER']` укажите `Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider`, чтобы генератор обработал `values['Table']` как список строк таблицы
- В `fields['Table']['OPTIONS']` укажите:
  - `ITEM_NAME` — внутреннее имя элемента массива
  - `ITEM_PROVIDER` — `Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider`
- В `values['Table']` передайте список строк таблицы
- Для плейсхолдеров таблицы, например `TableItemName` и `TableItemPrice`, передайте цепочку доступа к данным: `Table.Item.Name`, `Table.Item.Price`
- Для изображений в таблице укажите `TYPE = IMAGE` в `fields`
- Для номера строки можно использовать `Table.INDEX`

## Пример

```php
$data = [
	'templateId' => 203,
	'providerClassName' => 'Bitrix\\DocumentGenerator\\DataProvider\\Rest',
	'value' => 'ORDER_1024',
	'values' => [
		'Table' => [
			[
				'Name' => 'Item name 1',
				'Price' => '$111.23',
				'Image' => 'https://myrestapp.example/upload/product-1.png'
			],
			[
				'Name' => 'Item name 2',
				'Price' => '$222.34',
				'Image' => 'https://myrestapp.example/upload/product-2.png'
			],
		],
		'TableItemName' => 'Table.Item.Name',
		'TableItemImage' => 'Table.Item.Image',
		'TableItemPrice' => 'Table.Item.Price',
		'TableIndex' => 'Table.INDEX',
	],
	'fields' => [
		'Table' => [
			'PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
			'OPTIONS' => [
				'ITEM_NAME' => 'Item',
				'ITEM_PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
			],
		],
		'TableItemImage' => ['TYPE' => 'IMAGE'],
	],
];
$url = $webHookUrl.'documentgenerator.document.add/';
```

## Как это работает

В примере предполагается, что в шаблоне есть таблица с полями `{TableItemName}`, `{TableItemImage}`, `{TableItemPrice}`.

1. Поле `Table` используется как контейнер массива строк. Такого плейсхолдера может не быть в шаблоне, но он нужен, чтобы передать массив значений для таблицы
2. По `ITEM_NAME = Item` провайдер читает каждый элемент строки как объект `Item`
3. По `ITEM_PROVIDER = HashDataProvider` элементы читаются как простой хеш
4. Поля вида `TableItem...` ссылаются на значения через цепочку `Table.Item.<Ключ>`, где `<Ключ>` — ключ внутреннего ассоциативного массива, например `Name`, `Price` или `Image`

`Table.INDEX` возвращает номер текущей строки, начиная с `1`.

Если указать в качестве значения поля обычную строку, то она вставится в таблицу как есть во все строки.

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
