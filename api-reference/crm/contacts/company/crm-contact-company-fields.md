# Получить поля для связи контакт-компания crm.contact.company.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.contact.company.fields` возвращает описание полей для связи контакт-компания


## Параметры метода

Без параметров


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получение списка полей для связи контакт-компания

{% list tabs %}

- cURL (Webhook)

    ```bash
    todo
    ```

- cURL (OAuth)

    ```bash
    todo
    ```

- JS

    ```js
        BX24.callMethod(
            'crm.contact.company.fields',
            {},
            (result) => {
                result.error()
                    ? console.error(result.error())
                    : console.info(result.data())
                ;
            },
        );
    ```

- PHP

    ```php
    todo
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
	"result": {
		"SORT": {
			"type": "integer",
			"isRequired": false,
			"isReadOnly": false,
			"isImmutable": false,
			"isMultiple": false,
			"isDynamic": false,
			"title": "Сортировка"
		},
		"IS_PRIMARY": {
			"type": "char",
			"isRequired": false,
			"isReadOnly": false,
			"isImmutable": false,
			"isMultiple": false,
			"isDynamic": false,
			"title": "Первичный"
		},
		"COMPANY_ID": {
			"type": "integer",
			"isRequired": true,
			"isReadOnly": false,
			"isImmutable": false,
			"isMultiple": false,
			"isDynamic": false,
			"title": "Компания"
		}
	},
	"time": {
		"start": 1724065480.986461,
		"finish": 1724065481.321185,
		"duration": 0.33472418785095215,
		"processing": 0.01616501808166504,
		"date_start": "2024-08-19T13:04:40+02:00",
		"date_finish": "2024-08-19T13:04:41+02:00"
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Объект в формате:
```
{
    field_1: value_1,
    field_2: value_2,
    ...
    field_n: value_n,
}
```

где:
- `field_n` — поле элемента
- `value_n` — информация о поле в формате [`crm_rest_field_description`](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`][1]   | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

Метод не возвращает ошибок

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение

TODO

[1]: ../../data-types.md