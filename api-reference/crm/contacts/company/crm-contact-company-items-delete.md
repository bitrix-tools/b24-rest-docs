# Очистить набор компаний, связанных с указанным контактом crm.contact.company.items.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.company.items.delete` очищает набор компаний, связанных с указанным контактом.


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`][1] | Идентификатор контакта.

Можно получить с помощью методов [`crm.contact.list`](../crm-contact-list.md) или [`crm.contact.add`](../crm-contact-add.md) ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления всех привязанных компаний у контакта с `id = 54`

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
            'crm.contact.company.items.delete',
            {
                id: 54,
            },
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
	"result": true,
	"time": {
		"start": 1724075916.767978,
		"finish": 1724075917.346106,
		"duration": 0.5781280994415283,
		"processing": 0.2096860408782959,
		"date_start": "2024-08-19T15:58:36+02:00",
		"date_finish": "2024-08-19T15:58:37+02:00"
	}
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа. Содержит `true` - В случае успеха ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "The parameter ownerEntityID is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | The parameter 'ownerEntityID' is invalid or not defined. | Передан `id` меньше 0 или не передан вовсе ||
|| `ACCESS_DENIED` | Access denied! | У пользователя нет прав на изменение контактов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите обучение

TODO

[1]: ../../../data-types.md