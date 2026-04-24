# Сгенерировать документ со сложными таблицами

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

В REST генератора документов можно заполнять плейсхолдеры шаблона вложенными списками, когда одно из значений списка первого уровня содержит еще один список. Для создания документа используется метод [documentgenerator.document.add](../document-generator-document-add.md).

## Когда использовать

- Нужно вставить несколько таблиц одинаковой структуры, но с разным числом строк
- Нужно построить таблицу внутри повторяющегося блока

В таких сценариях внешний список задает структуру, а внутренние списки передаются отдельными полями и связываются через цепочки вида `Events.Event.Title` и `Event1Speakers.Speaker.Name`.

## Что передавать в запросе

- В `values` передайте внешний список, например `Events`
- В элементах внешнего списка передайте плейсхолдеры для связанных внутренних списков, например `{Event1SpeakersSpeakerName}`
- Для полей внешнего списка передайте цепочки доступа вида `Events.Event.Title`
- Для каждого внутреннего списка передайте отдельный массив в `values`, например `Event1Speakers`
- Для полей внутренних списков передайте цепочки доступа вида `Event1Speakers.Speaker.Name`
- В `fields` опишите внешний и внутренние списки через `ArrayDataProvider`
- В `OPTIONS` каждого списка укажите `ITEM_NAME` и `ITEM_PROVIDER = Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider`

## На что обратить внимание

- В `fields` внешний список должен идти раньше связанных внутренних списков, чтобы провайдеры разрешались в нужном порядке
- Коды внутренних списков должны совпадать с плейсхолдерами, которые передаются во внешнем списке

## Пример таблицы внутри повторяющихся блоков

```php
$data = [
	'templateId' => 203,
	'providerClassName' => 'Bitrix\\DocumentGenerator\\DataProvider\\Rest',
	'value' => 'EVENTS_2026',
	'values' => [
		'Title' => 'Welcome to my template',
		'Description' => '<b>Description is here</b>',
		'Picture' => null, // можно передать ссылку на изображение
		'Events' => [
			[
				'Title' => 'Automation',
				'Description' => 'Some description of the automation event',
				'SpeakerName' => '{Event1SpeakersSpeakerName}',
				'SpeakerCompany' => '{Event1SpeakersSpeakerCompany}',
				'SpeakerPosition' => '{Event1SpeakersSpeakerPosition}',
			],
			[
				'Title' => 'Documents',
				'Description' => 'This event is about document processing',
				'SpeakerName' => '{Event2SpeakersSpeakerName}',
				'SpeakerCompany' => '{Event2SpeakersSpeakerCompany}',
				'SpeakerPosition' => '{Event2SpeakersSpeakerPosition}',
			],
		],
		'EventsEventTitle' => 'Events.Event.Title',
		'EventsEventDescription' => 'Events.Event.Description',
		'EventsEventSpeakerName' => 'Events.Event.SpeakerName',
		'EventsEventSpeakerCompany' => 'Events.Event.SpeakerCompany',
		'EventsEventSpeakerPosition' => 'Events.Event.SpeakerPosition',
		'Event1SpeakersSpeakerName' => 'Event1Speakers.Speaker.Name',
		'Event1SpeakersSpeakerCompany' => 'Event1Speakers.Speaker.Company',
		'Event1SpeakersSpeakerPosition' => 'Event1Speakers.Speaker.Position',
		'Event1Speakers' => [
			[
				'Name' => 'Ivan Petrov',
				'Company' => 'Cool Ltd.',
				'Position' => 'Core developer',
			],
			[
				'Name' => 'Igor Milov',
				'Company' => 'Cool Ltd.',
				'Position' => 'Product Manager',
			],
		],
		'Event2Speakers' => [
			[
				'Name' => 'Sergey Ivanov',
				'Company' => 'Devils corp.',
				'Position' => 'Chief',
			],
		],
		'Event2SpeakersSpeakerName' => 'Event2Speakers.Speaker.Name',
		'Event2SpeakersSpeakerCompany' => 'Event2Speakers.Speaker.Company',
		'Event2SpeakersSpeakerPosition' => 'Event2Speakers.Speaker.Position',
	],
	'fields' => [
		'Events' => [
			'PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
			'OPTIONS' => [
				'ITEM_NAME' => 'Event',
				'ITEM_PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
			],
		],
		'Event1Speakers' => [
			'PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
			'OPTIONS' => [
				'ITEM_NAME' => 'Speaker',
				'ITEM_PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
			],
		],
		'Event2Speakers' => [
			'PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
			'OPTIONS' => [
				'ITEM_NAME' => 'Speaker',
				'ITEM_PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
			],
		],
		'Event1SpeakersSpeakerName' => ['TITLE' => 'Event1SpeakersSpeakerName'],
		'Event1SpeakersSpeakerCompany' => ['TITLE' => 'Event1SpeakersSpeakerCompany'],
		'Event1SpeakersSpeakerPosition' => ['TITLE' => 'Event1SpeakersSpeakerPosition'],
		'Event2SpeakersSpeakerName' => ['TITLE' => 'Event2SpeakersSpeakerName'],
		'Event2SpeakersSpeakerCompany' => ['TITLE' => 'Event2SpeakersSpeakerCompany'],
		'Event2SpeakersSpeakerPosition' => ['TITLE' => 'Event2SpeakersSpeakerPosition'],
	],
];
$url = $webHookUrl.'documentgenerator.document.add/';
```

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
