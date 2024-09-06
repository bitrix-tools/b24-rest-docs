# Добавить компанию к указанному контакту crm.contact.company.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.company.add` добавляет компанию к указанному контакту.


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`][1] | Идентификатор контакта.

Можно получить с помощью методов [`crm.contact.list`](../crm-contact-list.md) или [`crm.contact.add`](../crm-contact-add.md)
||
|| **fields**^*^
[`object`][1] | Объект формата.

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где
- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#parametr-fields). ||
|#

### Параметр fields

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_ID**^*^
[`crm_entity`][1] | Идентификатор компании, который будет привязан к контакту

Можно получить с помощью метода [`crm.item.list`](../../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **IS_PRIMARY**
[`boolean`][1] | Является ли привязка первичной

Возможные значения:
- `Y` - Да
- `N` - Нет

* У первого добавленного элемента `IS_PRIMARY` по умолчанию равен `Y`
* Передача `IS_PRIMARY = Y` у новой и не первой привязки, перетирает существующую первичную привязку ||
|| **SORT**
[`integer`][1] | Индекс сортировки

По умолчанию - `i + 10`, где `i` - Максимальный индекс сортировки у существующих привязок для текущего контакта или 0 если таковых нет ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления связи Контакт-Компания, где
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
            'crm.contact.company.add',
            {
                id: 54,
                fields: {
                    COMPANY_ID: 32,
                    IS_PRIMARY: "Y",
                    SORT: 1000,
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
		"start": 1724068028.331234,
		"finish": 1724068028.726591,
		"duration": 0.3953571319580078,
		"processing": 0.13033390045166016,
		"date_start": "2024-08-19T13:47:08+02:00",
		"date_finish": "2024-08-19T13:47:08+02:00"
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
- `false` - В случае неудачи (Скорее всего, компания, которую вы пытаетесь добавить уже есть в привязках)
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
|| `-`     | The parameter 'ownerEntityID' is invalid or not defined. | Передан `id` меньше 0 или не передан вовсе ||
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
