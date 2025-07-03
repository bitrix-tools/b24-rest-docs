# Получить пользовательский тип по entityTypeId crm.type.getByEntityTypeId

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к смарт-процессу, либо пользователь с правом на чтение смарт-процесса

Метод получает информацию о смарт-процессе с идентификатором типа смарт-процесса `entityTypeId`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор типа смарт-процесса. ||
|#

## Примеры кода

Получить информацию о смарт-процессе с `entityTypeId = 2024`.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2024}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.getByEntityTypeId
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2024,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.type.getByEntityTypeId
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.type.getByEntityTypeId',
        {
            entityTypeId: 2024,
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());

                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.getByEntityTypeId',
        [
            'entityTypeId' => 2024
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
    "result": {
        "type": {
            "id": 16,
            "title": "Смарт-процесс",
            "code": "",
            "createdBy": 1,
            "entityTypeId": 2024,
            "customSectionId": null,
            "isCategoriesEnabled": "Y",
            "isStagesEnabled": "Y",
            "isBeginCloseDatesEnabled": "Y",
            "isClientEnabled": "Y",
            "isUseInUserfieldEnabled": "Y",
            "isLinkWithProductsEnabled": "Y",
            "isMycompanyEnabled": "Y",
            "isDocumentsEnabled": "Y",
            "isSourceEnabled": "Y",
            "isObserversEnabled": "Y",
            "isRecyclebinEnabled": "Y",
            "isAutomationEnabled": "Y",
            "isBizProcEnabled": "Y",
            "isSetOpenPermissions": "Y",
            "isPaymentsEnabled": "N",
            "isCountersEnabled": "N",
            "createdTime": "2024-07-08T14:46:54+02:00",
            "updatedTime": "2024-07-08T14:46:54+02:00",
            "updatedBy": 1,
            "relations": {
                "parent": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "Y"
                    },
                    {
                        "entityTypeId": 4,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "Y"
                    },
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 2,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 31,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    }
                ],
                "child": [
                    {
                        "entityTypeId": 3,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 4,
                        "isChildrenListEnabled": "N",
                        "isPredefined": "N"
                    }
                ]
            },
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "Y",
                "TASKS_TASK|UF_CRM_TASK": "Y",
                "TASKS_TASK_TEMPLATE|UF_CRM_TASK": "N"
            },
            "customSections": []
        }
    },
    "time": {
        "start": 1720442829.865672,
        "finish": 1720442830.334845,
        "duration": 0.46917295455932617,
        "processing": 0.13246917724609375,
        "date_start": "2024-07-08T14:47:09+02:00",
        "date_finish": "2024-07-08T14:47:10+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа, содержащий объект [`type`](../../data-types.md#type) с информацией о смарт-процессе ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок
#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM или нет прав на чтение смарт-процесса ||
|| `400` | `0` | Смарт-процесс не найден | Смарт-процесс с переданным `entityTypeId` не найден ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)


[1]: ../../../data-types.md