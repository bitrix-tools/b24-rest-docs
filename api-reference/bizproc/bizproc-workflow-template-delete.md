# Удалить шаблон бизнес-процесса bizproc.workflow.template.delete

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

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Удаление шаблона Бизнес-процесса. Метод удаляет только те шаблоны, которые были созданы методом [`bizproc.workflow.template.add`](./bizproc-workflow-template-add.md), так как такие шаблоны привязываются к приложению и только их можно удалить.

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **ID**^*^ | Идентификатор удаляемого шаблона. | |
|#	

\* - Обязательные параметры

## Пример

{% list tabs %}

- JS

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

- B24-PHP-SDK

	```php
	try {
		$templateId = 123; // Replace with the actual template ID you want to delete
		$result = $serviceBuilder
			->getBizProcScope()
			->template()
			->delete($templateId);

		if ($result->isSuccess()) {
			print("Template with ID {$templateId} deleted successfully.\n");
		} else {
			print("Failed to delete template with ID {$templateId}.\n");
		}
	} catch (\Throwable $e) {
		print("An error occurred: " . $e->getMessage() . "\n");
	}
	```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}