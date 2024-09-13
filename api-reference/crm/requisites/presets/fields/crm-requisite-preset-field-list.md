# Получить список всех настраиваемых полей заданного шаблона реквизитов crm.requisite.preset.field.list

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список всех настраиваемых полей для определенного шаблона реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, из которого извлекается список настраиваемых полей (например, `{"ID": 27}`). Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.list
    ```

- cURL (OAuth) 

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.list",
        {
            preset:
            {
                "ID": 27
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.list',
        [
            'preset' => ['ID' => 27]
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
            "ID": 1,
            "FIELD_NAME": "RQ_INN",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 510
        },
        {
            "ID": 2,
            "FIELD_NAME": "RQ_COMPANY_NAME",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 520
        },
        {
            "ID": 3,
            "FIELD_NAME": "RQ_COMPANY_FULL_NAME",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 530
        },
        {
            "ID": 4,
            "FIELD_NAME": "RQ_OGRN",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 540
        },
        {
            "ID": 5,
            "FIELD_NAME": "RQ_KPP",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 550
        },
        {
            "ID": 6,
            "FIELD_NAME": "RQ_COMPANY_REG_DATE",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 560
        },
        {
            "ID": 7,
            "FIELD_NAME": "RQ_OKPO",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 570
        },
        {
            "ID": 8,
            "FIELD_NAME": "RQ_OKTMO",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 580
        },
        {
            "ID": 9,
            "FIELD_NAME": "RQ_DIRECTOR",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 590
        },
        {
            "ID": 10,
            "FIELD_NAME": "RQ_ACCOUNTANT",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 600
        },
        {
            "ID": 11,
            "FIELD_NAME": "RQ_ADDR",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 610
        },
        {
            "ID": 12,
            "FIELD_NAME": "RQ_SIGNATURE",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 620
        },
        {
            "ID": 13,
            "FIELD_NAME": "RQ_STAMP",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 630
        },
        {
            "ID": 14,
            "FIELD_NAME": "UF_CRM_1703689889",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 640
        },
        {
            "ID": 15,
            "FIELD_NAME": "UF_CRM_1703690003",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 650
        }
    ],
    "time": {
        "start": 1716895759.934609,
        "finish": 1716895760.407579,
        "duration": 0.47297000885009766,
        "processing": 0.023286104202270508,
        "date_start": "2024-05-28T13:29:19+02:00",
        "date_finish": "2024-05-28T13:29:20+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md)| Массив объектов, описывающих настраиваемые поля шаблона реквизитов. Каждый элемент содержит [поля](#fields) настраиваемого поля шаблона ||
|| **total**
[`integer`](../../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Поля, описывающие настраиваемое поле шаблона реквизитов {#fields}

#|
||  **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Название поля ||
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет 
||
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона || 
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The Preset with ID '27' is not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The Preset with ID '27' is not found` | Шаблон с указанным идентификатором не найден ||
|| `Access denied` | Недостаточно прав доступа для получения списка настраиваемых полей шаблона ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)