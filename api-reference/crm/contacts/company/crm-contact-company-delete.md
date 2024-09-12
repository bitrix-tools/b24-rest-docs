# Удалить компанию из указанного контакта crm.contact.company.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.company.delete` удаляет компанию из указанного контакта.


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`][1] | Идентификатор контакта

Можно получить с помощью методов [`crm.contact.list`](../crm-contact-list.md) или [`crm.contact.add`](../crm-contact-add.md) ||
|| **fields**^*^
[`object`][1] | Объект, содержащий информацию о том, какую компанию необходимо удалить из привязок

Содержит единственный ключ `COMPANY_ID` ||
|| **fields.COMPANY_ID**^*^
[`integer`][1] | Идентификатор компании, которую необходимо удалить из привязок ||
|#

{% note info "Удаление первичной привязки" %}

При удалении первичной привязки, первичной станет первая доступная привязка

{% endnote %}


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаление связи контакт-компания, где
* Идентификатор контакта - `54`
* Идентификатор компании - `32`

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
            'crm.contact.company.delete',
            {
                id: 54,
                fields: {
                    COMPANY_ID: 32,
                },
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
		"start": 1724072653.79827,
		"finish": 1724072717.749956,
		"duration": 63.95168590545654,
		"processing": 63.63148093223572,
		"date_start": "2024-08-19T15:04:13+02:00",
		"date_finish": "2024-08-19T15:05:17+02:00"
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа
Содержит:

- `true` - В случае успеха
- `false` - В случае неудачи (Скорее всего, компания, которую вы пытаетесь удалить, не привязана к контакту)
||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "The parameter 'ownerEntityID' is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | The parameter 'ownerEntityID' is invalid or not defined. | Передан `id` меньше 0 ||
|| `-`     | The parameter 'fields' must be array. | В `fields` передан не объект ||
|| `ACCESS_DENIED` | Access denied! | У пользователя нет прав на изменения контактов ||
|| `-`     | Not found. | Контакт с переданным `id` не найден ||
|| `-`     | The parameter 'fields' is not valid. | Может возникать из-за нескольких причин:
* Если не передан обязательный параметр `fields.COMPANY_ID`
* Если переданный `fields.COMPANY_ID` меньше или равен 0 ||
||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение
TODO

[1]: ../../../data-types.md
