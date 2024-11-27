# Получить список шаблонов bizproc.workflow.template.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список шаблонов Бизнес-процессов, добавленных в Битрикс24.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ID** | Идентификатор бизнес-процесса. ||
|| **MODULE_ID** | Идентификатор модуля (по документу) ||
|| **ENTITY** | Идентификатор сущности (по документу) ||
|| **DOCUMENT_TYPE** | Тип документа ||
|| **AUTO_EXECUTE** | Флаг автозапуска. Может принимать значения:

- `0` (без автозапуска),
- `1` (запуск на создание),
- `2` (запуск на изменение),
- `3` (запуск и на создание, и на изменение)
||
|| **NAME** | Название шаблона ||
|| **TEMPLATE** | Шаблон БП (массив с описанием структуры действий). ||
|| **PARAMETERS** | Параметры шаблона, массив с описанием свойств. ||
|| **VARIABLES** | Переменные шаблона, массив с описанием свойств. ||
|| **CONSTANTS** | Константы шаблона, массив с описанием свойств. ||
|| **MODIFIED** | Дата последнего изменения. ||
|| **IS_MODIFIED** | [Y\N] Флаг был ли изменен. Актуально для шаблонов, поставляемых "в коробке" (у которых есть системный код) ||
|| **USER_ID** | идентификатор пользователя кто создал/изменил шаблон. ||
|| **SYSTEM_CODE** | системный код шаблона. применяется для идентификации типовых шаблонов, Процессов в ленте, шаблонов автоматизации и т.п. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры

{% list tabs %}

- JS
	
	```javascript
	function getTemplates()
	{
		BX24.callMethod(
			'bizproc.workflow.template.list',
			{
				select: [
					'ID',
					// 'MODULE_ID',
					// 'ENTITY',
					// 'DOCUMENT_TYPE',
					// 'AUTO_EXECUTE',
					'NAME',
					// 'TEMPLATE',
					// 'PARAMETERS',
					// 'VARIABLES',
					// 'CONSTANTS',
					'MODIFIED',
					'IS_MODIFIED',
					'USER_ID',
					'SYSTEM_CODE'
				],
				filter: {MODULE_ID: 'crm', ENTITY: 'CCrmDocumentLead'}
			},
			function(result)
			{
				if(result.error())
					alert("Error: " + result.error());
				else
				{
					var templates = result.data();
					console.log(templates);
				}
			}
		);
	}
	```

- PHP (B24PhpSdk)

	```php
	try {
		$result = $serviceBuilder
			->getBizProcScope()
			->template()
			->list(
				['ID', 'MODULE_ID', 'ENTITY', 'DOCUMENT_TYPE', 'AUTO_EXECUTE', 'NAME', 'TEMPLATE', 'PARAMETERS', 'VARIABLES', 'CONSTANTS', 'MODIFIED', 'IS_MODIFIED', 'USER_ID', 'SYSTEM_CODE'],
				[]
			);

		foreach ($result->getTemplates() as $template) {
			print("ID: " . $template->ID . "\n");
			print("MODULE_ID: " . $template->MODULE_ID . "\n");
			print("ENTITY: " . $template->ENTITY . "\n");
			print("DOCUMENT_TYPE: " . json_encode($template->DOCUMENT_TYPE) . "\n");
			print("AUTO_EXECUTE: " . ($template->AUTO_EXECUTE ? $template->AUTO_EXECUTE->value : 'null') . "\n");
			print("NAME: " . $template->NAME . "\n");
			print("TEMPLATE: " . json_encode($template->TEMPLATE) . "\n");
			print("PARAMETERS: " . json_encode($template->PARAMETERS) . "\n");
			print("VARIABLES: " . json_encode($template->VARIABLES) . "\n");
			print("CONSTANTS: " . json_encode($template->CONSTANTS) . "\n");
			print("MODIFIED: " . ($template->MODIFIED ? $template->MODIFIED->format(DATE_ATOM) : 'null') . "\n");
			print("IS_MODIFIED: " . ($template->IS_MODIFIED ? 'true' : 'false') . "\n");
			print("USER_ID: " . $template->USER_ID . "\n");
			print("SYSTEM_CODE: " . $template->SYSTEM_CODE . "\n");
			print("\n");
		}
	} catch (Throwable $e) {
		print("Error: " . $e->getMessage() . "\n");
	}
	```
		
{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}