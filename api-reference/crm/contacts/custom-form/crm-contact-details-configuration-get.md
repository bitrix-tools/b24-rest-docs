# Получение параметров карточки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Название метода: **crm.contact.details.configuration.get**
> 
> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод: проверка прав при выполнении метода зависит от переданных данных:
>   - Любой пользователь имеет право получить свои личные настройки
>   - Любой пользователь имеет право получить общие настройки
>   - Пользователь имеет право получить чужие личные настройки только если у него есть доступ к операции: "Редактирование остальных настроек главного модуля"

Метод `crm.contact.details.configuration.get` получает настройки карточки контактов. Метод читает личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.


## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. 

Допустимые значения:
- **P** - личные настройки
- **C** - общие настройки

По умолчанию - `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Если не задан, то берётся текущий. Нужен только при запросе чужих личных настроек. ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Получение личной конфигурации

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
        'crm.contact.details.configuration.get',
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

### Получение общей конфигурации

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
        'crm.contact.details.configuration.get',
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


## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "name": "main",
      "title": "О контакте",
      "type": "section",
      "elements": [
        {
          "name": "LAST_NAME",
          "optionFlags": "0"
        },
        {
          "name": "PHOTO",
          "optionFlags": "0"
        },
        {
          "name": "NAME",
          "optionFlags": "1"
        },
        {
          "name": "SECOND_NAME",
          "optionFlags": "1"
        },
        {
          "name": "BIRTHDATE",
          "optionFlags": "1"
        },
        {
          "name": "PHONE",
          "optionFlags": "1",
          "options": {
            "defaultCountry": "AU"
          }
        },
        {
          "name": "EMAIL",
          "optionFlags": "1"
        }
      ]
    },
    {
      "name": "additional",
      "title": "Дополнительно",
      "type": "section",
      "elements": [
        {
          "name": "TYPE_ID",
          "optionFlags": "0"
        },
        {
          "name": "SOURCE_ID",
          "optionFlags": "0"
        },
        {
          "name": "OPENED",
          "optionFlags": "0"
        },
        {
          "name": "EXPORT",
          "optionFlags": "0"
        },
        {
          "name": "ASSIGNED_BY_ID",
          "optionFlags": "0"
        }
      ]
    }
  ],
  "time": {
    "start": 1724677217.639681,
    "finish": 1724677217.986853,
    "duration": 0.3471717834472656,
    "processing": 0.01840806007385254,
    "date_start": "2024-08-26T15:00:17+02:00",
    "date_finish": "2024-08-26T15:00:17+02:00",
    "operating": 0
  }
}
```

### Возвращаемые значения

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section) | Корневой элемент ответа. Содержит конфигурацию разделов детальной карточки элемента. Возвращает `null` в случае отсутствия конфигурации ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### section

Описывает отдельно взятый раздел с полями внутри карточки элемента

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Уникальное название раздела, используемое для идентификации ||
|| **title**
[`string`](../../../data-types.md) | Название раздела ||
|| **type**
[`string`](../../../data-types.md) | Тип раздела ||
|| **elements**
[`section_element[]`](#section_element) | Список выводимых в карточку полей сущности с дополнительными настройками ||
|#

#### section_element

Конфигурация отдельно взятого поля внутри раздела

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Идентификатор поля ||
|| **optionFlags**
[`boolean`](../../../data-types.md) | Показывать ли поле всегда 

Возможные значения:
- `"1"` — да
- `"0"` — нет

||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля. Структура описана [ниже](#options) ||
|#


#### options

#|
|| **Название**
`тип` | **Поля, где доступна опция** | **Описание** ||
|| **defaultAddressType**
[`integer`](../../../data-types.md) | `ADDRESS` | Идентификатор типа адреса по умолчанию. ||
|| **defaultCountry**
[`string`](../../../data-types.md) | 
`PHONE`
`CLIENT`
`COMPANY`
`CONTACT`
`MYCOMPANY_ID` | Код страны для формата телефонного номера по умолчанию — строка из двух латинских букв. Например `"RU"` ||
|| **isPayButtonVisible**
[`boolean`](../../../data-types.md) | `OPPORTUNITY_WITH_CURRENCY` | Показана ли кнопка принятия оплаты.

Возможные значения:
- `'true'` — показана
- `'false'` — скрыта

||
|| **isPaymentDocumentsVisible**
[`boolean`](../../../data-types.md) | `OPPORTUNITY_WITH_CURRENCY` | Показан ли блок «Оплата и доставка».

Возможные значения:
- `'true'` — показан
- `'false'` — скрыт

||
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
