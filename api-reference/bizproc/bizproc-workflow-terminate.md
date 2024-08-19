# Остановка активного бизнес-процесса

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы.

{% endnote %}

{% endif %}

{% note info "bizproc.workflow.terminate" %}

{% include notitle [Скоуп bizproc все](./_includes/scope-bizproc-all.md) %}

{% endnote %}

Метод останавливает указанный бизнес-процесс.

#|
|| **Параметр** | **Описание** ||
|| **ID**^*^ | Идентификатор бизнес-процесса, который нужно остановить. Идентификатор можно получить с помощью метода [bizproc.workflo.instances](./bizproc-workflow-instances.md) ||
|| **STATUS** | Установить текст статуса ||
|#

## Примеры

```javascript
function terminateWf(id, cb)
{
	var params = {ID: id, STATUS: 'Terminated by rest app.'};
	BX24.callMethod(
		'bizproc.workflow.terminate',
		params,
		function(result)
		{
			if(result.error())
				alert("Error: " + result.error());
			else if (cb)
				cb();
		}
	);
}
```


{% include [Сноска о примерах](../../_includes/examples.md) %}