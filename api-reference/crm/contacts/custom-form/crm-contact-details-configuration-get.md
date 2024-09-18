# Получить параметры карточки crm.contact.details.configuration.get

> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод:
>  - Любой пользователь имеет право получать свои и общие настройки
>  - Только администратор имеет право получать чужие настройки

Метод получает настройки карточки контактов: читает личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. 

Возможные значения:
- **P** — личные настройки
- **C** — общие настройки

По умолчанию — `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при запросе чужих личных настроек.

Если не задан, то берётся текущий
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получить личную конфигурацию карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.get
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
        require_once('crest.php');

        $result = CRest::call(
            'crm.contact.details.configuration.get',
            [
                'scope' => 'P',
                'userId' => 6
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получить общую конфигурацию карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.get
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
        require_once('crest.php');

        $result = CRest::call(
            'crm.contact.details.configuration.get',
            [
                'scope' => 'C'
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
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
[`section[]`](#section) | Корневой элемент ответа.

Содержит конфигурацию разделов детальной карточки элемента.

Возвращает `null` в случае отсутствия конфигурации ||
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
[`boolean`](../../../data-types.md) | Показывать ли поле всегда. 

Возможные значения:
- `"1"` — да
- `"0"` — нет

||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля.

Структура описана [ниже](#options) ||
|#


#### options

#|
|| **Название**
`тип` | **Поля, где доступна опция** | **Описание** ||
|| **defaultAddressType**
[`integer`](../../../data-types.md) | `ADDRESS` | Идентификатор типа адреса по умолчанию ||
|| **defaultCountry**
[`string`](../../../data-types.md) | 
`PHONE`
`CLIENT`
`COMPANY`
`CONTACT`
`MYCOMPANY_ID` | Код страны для формата телефонного номера по умолчанию — строка из двух латинских букв.

Например `"RU"` ||
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
|| Пустое значение | Access denied. | У пользователя нет административных прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-contact-details-configuration-set.md)
- [{#T}](./crm-contact-details-configuration-force-common-scope-for-all.md)
- [{#T}](./crm-contact-details-configuration-reset.md)
