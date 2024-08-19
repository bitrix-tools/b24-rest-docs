# Удаление запущенного процесса

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- в чем разница с методом terminate?
  
{% endnote %}

{% endif %}

{% note info "bizproc.workflow.kill!" %}

{% include notitle [Скоуп bizproc все](./_includes/scope-bizproc-all.md) %}

{% endnote %}

Метод удаляет запущенный бизнес-процесс.

#|
|| **Параметр** | **Описание** ||
|| **ID**^*^ | Идентификатор бизнес-процесса. ||
|#

\* - Обязательные параметры

## Пример
 ```javascript
function killWf(id, cb)
{
	var params = {ID: id};
	BX24.callMethod(
		'bizproc.workflow.kill',
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