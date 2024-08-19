# Список запущенных бизнес-процессов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "bizproc.workflow.instances" %}

{% include notitle [Скоуп bizproc админ](./_includes/scope-bizproc-admin.md) %}

{% endnote %}

{% note warning "bizproc.workflow.instance.list" %}

Существует старый метод `bizproc.workflow.instance.list`, который является алиасом текущего метода `bizproc.workflow.instances`. Метод `bizproc.workflow.instance.list` принимает те же параметры и возвращает те же результаты. Поддержка `bizproc.workflow.instance.list` не гарантирована в будущем, поэтому рекомендуется использовать `bizproc.workflow.instances`.

{% endnote %}

Метод возвращает список запущенных бизнес-процессов.

## Примеры

```javascript
BX24.callMethod(
	'bizproc.workflow.instances',
	{
		select: ['ID', 'MODIFIED', 'OWNED_UNTIL', 'MODULE_ID', 'ENTITY', 'DOCUMENT_ID', 'STARTED', 'STARTED_BY', 'TEMPLATE_ID'],
		order: {STARTED: 'DESC'},
		filter: {'>STARTED_BY': 0}
	},
	function(result)
	{
		if(result.error())
			alert("Error: " + result.error());
		else
			console.log(result.data());
	}
);
```
 
{% include [Сноска о примерах](../../_includes/examples.md) %}