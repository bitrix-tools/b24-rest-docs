# Получить параметры карточки crm.lead.details.configuration.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может получать свои и общие настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может получать чужие настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md).

{% endnote %}

Метод `crm.lead.details.configuration.get` получает настройки карточки лидов.

{% note warning %}

Настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов используйте параметр `lead.customer.type` в `extras`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя, для которого нужно получить личную конфигурацию.

Если параметр не передан, будет использован `userId` пользователя, который вызывает метод.

Нужен только при запросе личных настроек ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. Возможные значения:
- `'P'` - личные настройки
- `'C'` - общие настройки

По умолчанию используется значение `'P'` ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры. Структура описана [ниже](#extras) ||
|#

### Параметр extras {#extras}

#|
|| **Название**
`тип` | **Описание** ||
|| **lead.customer.type**
[`integer`](../../../data-types.md) | Тип лида. Возможные значения:
- `1` - простой лид
- `2` - повторный лид ||
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
        -d '{"scope":"P","userId":1}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":1,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.get
        ```

    - JS

        ```js
        try
        {
            const response = await $b24.callMethod(
                'crm.lead.details.configuration.get',
                {
                    scope: 'P',
                    userId: 1,
                }
            );
            
            const result = response.getData().result;
            console.log('Data:', result);
            processResult(result);
        }
        catch( error )
        {
            console.error('Error:', error);
        }
        ```

    - PHP

        ```php
        try {
            $response = $b24Service
                ->core
                ->call(
                    'crm.lead.details.configuration.get',
                    [
                        'scope' => 'P',
                        'userId' => 1
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error: ' . $e->getMessage();
        }
        ```

   - BX24.js

       ```js
        BX24.callMethod(
            'crm.lead.details.configuration.get',
            {
                scope: "P",
                userId: 1,
            },
            (result) => {
                result.error()
                    ? console.error(result.error())
                    : console.info(result.data())
                ;
            },
        );
       ```

   - PHP CRest

       ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.lead.details.configuration.get',
            [
                'scope' => 'P',
                'userId' => 1
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
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.get
        ```

    - JS

        ```js
        try
        {
            const response = await $b24.callMethod(
                'crm.lead.details.configuration.get',
                {
                    scope: 'C',
                }
            );
            
            const result = response.getData().result;
            console.log('Configuration details:', result);
            
            processResult(result);
        }
        catch( error )
        {
            console.error('Error:', error);
        }
        ```

    - PHP

        ```php
        try {
            $response = $b24Service
                ->core
                ->call(
                    'crm.lead.details.configuration.get',
                    [
                        'scope' => 'C'
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error fetching lead details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.lead.details.configuration.get',
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

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.lead.details.configuration.get',
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
            "title": "О лиде",
            "type": "section",
            "elements": [
                {
                    "name": "TITLE",
                    "optionFlags": "0"
                },
                {
                    "name": "STATUS_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "SOURCE_ID",
                    "optionFlags": "0"
                }
            ]
        },
        {
            "name": "additional",
            "title": "Дополнительно",
            "type": "section",
            "elements": [
                {
                    "name": "ASSIGNED_BY_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "COMMENTS",
                    "optionFlags": "0"
                }
            ]
        }
    ],
    "time": {
        "start": 1720624891.017344,
        "finish": 1720624891.405621,
        "duration": 0.3882770538330078,
        "processing": 0.02097320556640625,
        "date_start": "2024-07-10T17:21:31+02:00",
        "date_finish": "2024-07-10T17:21:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section)\|`null` | Корневой элемент ответа. Содержит конфигурацию разделов карточки лида. Возвращает `null`, если конфигурация не найдена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект section {#section}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Уникальное имя раздела ||
|| **title**
[`string`](../../../data-types.md) | Заголовок раздела ||
|| **type**
[`string`](../../../data-types.md) | Тип раздела ||
|| **elements**
[`section_element[]`](#section_element) | Список полей, которые выводятся в разделе ||
|#

#### Объект section_element {#section_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Идентификатор поля ||
|| **optionFlags**
[`string`](../../../data-types.md) | Значения:
- `"1"` - показывать всегда
- `"0"` - показывать не всегда ||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля ||
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
|| `-` | Access denied | Недостаточно прав для получения запрошенной конфигурации ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-details-configuration-reset.md)
- [{#T}](./crm-lead-details-configuration-set.md)
- [{#T}](./crm-lead-details-configuration-force-common-scope-for-all.md)





