# Получить список стран documentgenerator.region.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.region.list` возвращает список регионов, как установленных по умолчанию, так и пользовательских.

Без параметров.

## Ответ в случае успеха

> 200 OK

```json
"regions": {
	"uk":{ // предустановленный регион
		"code": "uk",
		"title": "Великобритания",
		"languageId": "en",
	},
	"1":{ // пользовательский регион
		"id": "1",
		"title": "Турция asdf",
		"languageId":" ",
		"formatDate": "YYYY-MM-DD",
		"formatDatetime": "YYYY-MM-DD HH:MI:SS",
		"formatName": "#LAST_NAME# #NAME# #SECOND_NAME#",
	}
}
```