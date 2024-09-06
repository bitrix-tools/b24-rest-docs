# Удалить пользовательское поле контактов crm.contact.userfield.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: Администратор

Метод `crm.contact.userfield.delete` удаляет пользовательское поле контактов.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля, привязанного к контакту

Можно получить с помощью методов [`crm.contact.userfield.add`](crm-contact-userfield-add.md) или [`crm.contact.userfield.list`](crm-contact-userfield-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Удаление пользовательского поля с `id = 432`

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
        'crm.contact.userfield.delete',
        {
            id: 432,
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
		"start": 1724316817.995457,
		"finish": 1724316818.640754,
		"duration": 0.6452970504760742,
		"processing": 0.3215677738189697,
		"date_start": "2024-08-22T10:53:37+02:00",
		"date_finish": "2024-08-22T10:53:38+02:00",
		"operating": 0
	}
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | ID is not defined or invalid. | Переданный `id` либо меньше или равен нулю, либо не передан вовсе ||
|| `-` | Access denied. | Возникает в случаях:
* У пользователя нет административных прав
* Пользователь пытается удалить пользовательское поле не привязанное к контактам ||

|| `ERROR_NOT_FOUND` | The entity with ID `id` is not found. | Пользовательское поле с переданным `id` не существует ||
|| `-` | Ошибка удаления `FIELD_NAME` для объекта `ENTITY_ID`. | Неизвестная ошибка при удалении ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение

TODO