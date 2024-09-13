# Получить роль по идентификатору documentgenerator.role.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.role.get` отдаёт информацию о роли и её правах доступа.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор роли. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

```json
"role": {
	"id": "1",
	"name": "Администратор",
	"code": "ADMIN",
	"permissions": {
		"settings": {
			"modify" : "X",
		},
		"templates": {
			"modify" : "X",
		},
		"documents": {
			"modify" : "X",
			"view" : "X",
		},
	}
}
```