# Удалить контакт crm.contact.delete

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «удаления» контакта

Метод `crm.contact.delete` удаляет контакт и все связанные с ним объекты.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **id^*^**
[`integer`][1] | Идентификатор контакта. Можно получить с помощью методов [`crm.contact.list`](crm-contact-list.md) или [`crm.contact.add`](crm-contact-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Удаление контакта с `id = 50`

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
            'crm.contact.delete',
            {
                id: 50,
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
    "start": 1723727109.430573,
    "finish": 1723727210.611973,
    "duration": 101.18140006065369,
    "processing": 100.78639197349548,
    "date_start": "2024-08-15T15:05:09+02:00",
    "date_finish": "2024-08-15T15:06:50+02:00"
  }
}
```


### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа.

Возвращает `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | ID is not defined or invalid. | Параметр `id` не передан, либо переданное значение не является целым числом больше 0 ||
|| `-`     | Access denied. | У пользователя нет прав на "Удаление" контакта ||
|| `ERROR_CORE` | Элемент не найден | Контакт с переданным `id` не найден ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](crm-contact-fields.md)
- [{#T}](crm-contact-add.md)
- [{#T}](crm-contact-update.md)
- [{#T}](crm-contact-get.md)
- [{#T}](crm-contact-list.md)

[1]: ../../data-types.md
