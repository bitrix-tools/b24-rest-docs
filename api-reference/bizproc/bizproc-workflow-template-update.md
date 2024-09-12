# Изменить шаблон бизнес-процесса bizproc.workflow.template.update

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

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет только те шаблоны, которые были созданы методом [bizproc.workflow.template.add](./bizproc-workflow-template-add.md), так как такие шаблоны привязываются к приложению и только их можно обновлять.

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **ID** | Идентификатор изменяемого шаблона. | ||
|| **FIELDS** | Массив изменяемых параметров. Обновить можно поля: `NAME`, `DESCRIPTION`, `AUTO_EXECUTE` и `TEMPLATE_DATA`, описанные подробнее в таблице ниже. При попытке обновить другие поля, возвращаемые [bizproc.workflow.template.list](./bizproc-workflow-template-list.md), ошибок не возникнет, но и обновлены они не будут. | ||
|#

## Параметр FIELDS

#|
|| **Параметр** | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название шаблона ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание шаблона. ||
|| **TEMPLATE_DATA**
[`file`](../data-types.md) | Передается контент файла с шаблоном бизнес-процесса *.bpt. См. [{#T}](../how-to-call-rest-api/how-to-upload-files.md) ||
|| **AUTO_EXECUTE**
[`integer`](../data-types.md) | Флаг автозапуска, может быть:

- `0` (без автозапуска),
- `1` (запуск на создание),
- `2` (запуск на изменение),
- `3` (запуск и на создание, и на изменение) ||
|#

## Примеры

```javascript
function renameTemplate(id, name)
{
	BX24.callMethod(
		'bizproc.workflow.template.update',
		{ID: id, FIELDS: {'NAME': name}},
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