# Сбросить параметры карточки crm.contact.details.configuration.reset

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: проверка прав при выполнении метода зависит от переданных данных:
>   - Любой пользователь имеет право сбросить свои личные настройки
>   - Пользователь имеет право сбрасывать общие и чужие настройки только если он является администратором

Метод `crm.contact.details.configuration.reset` сбрасывает настройки карточки контактов. Метод удаляет личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.


## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. 

Возможные значения:
- **P** - личные настройки,
- **C** - общие настройки.

По умолчанию - `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Если не задан, то берётся текущий. Нужен только при сбросе личных настроек. ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Сброс общей конфигурации

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
            'crm.contact.details.configuration.reset',
            {
                scope: "C",
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

### Сброс личной конфигурации

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
            'crm.contact.details.configuration.reset',
            {
                scope: "P",
                userId: 6,
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
		"start": 1724682584.069094,
		"finish": 1724682584.38436,
		"duration": 0.31526613235473633,
		"processing": 0.025727033615112305,
		"date_start": "2024-08-26T16:29:44+02:00",
		"date_finish": "2024-08-26T16:29:44+02:00",
		"operating": 0
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true` в случае успешного сброса настроек ||
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
|| `-`     | Access denied. | У пользователя нет административных прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение

TODO
