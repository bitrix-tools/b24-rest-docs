# Указание общей карточки для всех пользователей

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Название метода: **crm.contact.details.configuration.forceCommonScopeForAll**
> 
> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод: пользователь с доступом к операции "Редактирование остальных настроек главного модуля"

Метод `crm.contact.details.configuration.forceCommonScopeForAll` позволяет принудительно установить общую карточку контактов для всех пользователей.


## Параметры метода

Без параметров.


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить общую карточку для контактов у всех пользователей.

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
        'crm.contact.details.configuration.forceCommonScopeForAll',
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
	"result": true,
	"time": {
		"start": 1724671860.18392,
		"finish": 1724671860.843895,
		"duration": 0.6599750518798828,
		"processing": 0.09691596031188965,
		"date_start": "2024-08-26T13:31:00+02:00",
		"date_finish": "2024-08-26T13:31:00+02:00",
		"operating": 0
	}
}
```

### Возвращаемые значения

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true` в случае успеха ||
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
|| **Код** | **Описание**   | **Значение** ||
|| `-`     | Access denied. | У пользователя нет доступа к операции: "Редактирование остальных настроек главного модуля" ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение

TODO
