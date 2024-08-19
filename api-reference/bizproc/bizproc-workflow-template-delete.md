# Удаление шаблона бизнес-процесса

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "bizproc.workflow.template.delete" %}

{% include notitle [Скоуп bizproc админ](./_includes/scope-bizproc-admin.md) %}

{% endnote %}

Удаление шаблона Бизнес-процесса. Метод удаляет только те шаблоны, которые были созданы методом [`bizproc.workflow.template.add`](./bizproc-workflow-template-add.md), так как такие шаблоны привязываются к приложению и только их можно удалить.

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **ID**^*^ | Идентификатор удаляемого шаблона. | |
|#	

\* - Обязательные параметры

## Пример

```javascript
function deleteTemplate(id)
{
	BX24.callMethod(
		'bizproc.workflow.template.delete',
		{ID: id},
		function(result)
		{
			if(result.error())
				alert("Error: " + result.error());
			console.log(result);
		}
	);
}
```


{% include [Сноска о примерах](../../_includes/examples.md) %}