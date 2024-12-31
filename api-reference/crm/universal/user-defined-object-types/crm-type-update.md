# Обновить пользовательский тип crm.type.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод обновляет существующий смарт-процесс по его идентификатору `id`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор смарт-процесса. Можно получить с помощью методов: [`crm.type.list`](./crm-type-list.md), [`crm.type.add`](./crm-type-add.md) ||
|| **fields**
[`object`][1]  | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления смарт-процесса ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **title** 
[`string`][1]  | Название смарт-процесса ||
|| **relations**
[`object`][1]  | Объект, содержащий в себе связи к другим сущностям CRM. Структура описана объектом [`type.relations`](../../data-types.md#typerelations)  ||
|| **isUseInUserfieldEnabled**
[`boolean`][1] | Включено ли использование смарт-процесса в пользовательском поле ||
|| **linkedUserFields**       
[`object`][1]  | Набор пользовательских полей в которых должен отображаться данный смарт-процесс. Структура описана объектом [`type.linkedUserFields`](../../data-types.md#typelinkeduserfields) ||
|| **isAutomationEnabled**    
[`boolean`][1] | Включены ли роботы и триггеры ||
|| **isBeginCloseDatesEnabled**
[`boolean`][1] | Включены ли поля **Дата начала** и **Дата завершения** ||
|| **isBizProcEnabled**       
[`boolean`][1] | Включено ли использование дизайнера бизнес процессов ||
|| **isCategoriesEnabled**    
[`boolean`][1] | Включены ли свои воронки и туннели продаж ||
|| **isClientEnabled**        
[`boolean`][1] | Включено ли поле **Клиент**. При включенной опции у смарт-процесса появляется предустановленная привязка к **Контактам** и **Компаниям** ||
|| **isDocumentsEnabled**     
[`boolean`][1] | Включена ли печать документов ||
|| **isLinkWithProductsEnabled**
[`boolean`][1] | Включена ли привязка товаров каталога ||
|| **isMycompanyEnabled**     
[`boolean`][1] | Включено ли поле **Реквизиты вашей компании** ||
|| **isObserversEnabled**     
[`boolean`][1] | Включено ли поле **Наблюдатели** ||
|| **isRecyclebinEnabled**    
[`boolean`][1] | Включено ли использование корзины ||
|| **isSetOpenPermissions**   
[`boolean`][1] | Делать ли новые воронки доступными для всех ||
|| **isSourceEnabled**        
[`boolean`][1] | Включены ли поля **Источник** и **Дополнительно об источнике** ||
|| **isStagesEnabled**        
[`boolean`][1] | Включено ли использование своих стадий и канбана ||
|| **isExternal**
[`boolean`][1] | Является ли смарт-процесс вынесенным из CRM (привязанным к цифровому рабочему месту)

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|| **customSectionId**
[`integer`][1] | Идентификатор цифрового рабочего места

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|| **customSections**
[`array`][1]   | Массив цифровых рабочих мест

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) ||
|#

{% note info %}

Изменение полей настроек смарт-процесса происходит только при передаче изменяемых значений полей.

Например, если у смарт-процесса с `id = 128` необходимо отключить функционал печати документов, то передаем следующие параметры:

```json
{
    "id": 128,
    "fields": {
        "isDocumentsEnabled": "N"
    }
}
```

{% endnote %}

### Связи

- Настройки необходимо передавать целиком, они полностью перезаписываются.
- Нельзя изменить настройки предустановленных связей (`iPredefined: true`). Эти настройки можно не передавать в запросе.
- Если при попытке сохранить переданные настройки связей возникнет ошибка, она не будет выведена. Настройки просто не сохранятся.

## Примеры кода

1. У смарт-процесса с `id = 20`:
    * Отключить следующие настройки:
        - Роботы и триггеры
        - Поля **Дата начала** и **Дата завершения**
        - Поле **Клиент**
        - Поле **Наблюдатели**
    * Включить следующие настройки:
        - Поля **Источник** и **Дополнительно об источнике**
        - Использование своих стадий и канбана
    * Включить отображение смарт-процесса в поле **Задачи**

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"isAutomationEnabled":"N","isBeginCloseDatesEnabled":"N","isClientEnabled":"N","isObserversEnabled":"N","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"TASKS_TASK|UF_CRM_TASK":"true"}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.type.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"isAutomationEnabled":"N","isBeginCloseDatesEnabled":"N","isClientEnabled":"N","isObserversEnabled":"N","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"TASKS_TASK|UF_CRM_TASK":"true"}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.update
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.type.update',
            {
                id: 20,
                fields: {
                    isAutomationEnabled: "N",
                    isBeginCloseDatesEnabled: "N",
                    isClientEnabled: "N",
                    isObserversEnabled: "N",
                    isSourceEnabled: "Y",
                    isStagesEnabled: "Y",
                    isUseInUserfieldEnabled: "Y",
                    linkedUserFields: {
                        "TASKS_TASK|UF_CRM_TASK": "true",
                    },
                },
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
            'crm.type.update',
            [
                'id' => 20,
                'fields' => [
                    'isAutomationEnabled' => "N",
                    'isBeginCloseDatesEnabled' => "N",
                    'isClientEnabled' => "N",
                    'isObserversEnabled' => "N",
                    'isSourceEnabled' => "Y",
                    'isStagesEnabled' => "Y",
                    'isUseInUserfieldEnabled' => "Y",
                    'linkedUserFields' => [
                        "TASKS_TASK|UF_CRM_TASK" => "true",
                    ],
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Допустим, у смарт-процесса с `id = 20` необходимо
    * Удалить все привязанные к смарт-процессу сущности (`relations.parent`)
    * Включить «показ в карточке» для `Лидов`, к которым привязан смарт-процесс

    Исходные **relations** в смарт-процессе:

    ```json
    {
        "relations": {
            "parent": [
                {
                    "entityTypeId": 31,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                }
            ],
            "child": [
                {
                    "entityTypeId": 1,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                },
                {
                    "entityTypeId": 2,
                    "isChildrenListEnabled": "N",
                    "isPredefined": "N"
                }
            ]
        }
    }
    ```

    **Итоговый запрос:**

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"relations":{"parent":[],"child":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"false"}]}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.type.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":20,"fields":{"relations":{"parent":[],"child":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"false"}]}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.update
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.type.update',
            {
                id: 20,
                fields: {
                    relations: {
                        parent: [],
                        child: [
                            {
                                "entityTypeId": 1,
                                "isChildrenListEnabled": "true",
                            },
                            {
                                "entityTypeId": 2,
                                "isChildrenListEnabled": "false",
                            }
                        ],
                    },
                },
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
            'crm.type.update',
            [
                'id' => 20,
                'fields' => [
                    'relations' => [
                        'parent' => [],
                        'child' => [
                            [
                                "entityTypeId" => 1,
                                "isChildrenListEnabled" => "true",
                            ],
                            [
                                "entityTypeId" => 2,
                                "isChildrenListEnabled" => "false",
                            ]
                        ],
                    ],
                ]
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
            "id": 20,
            "title": "Смарт-процесс #3",
            "code": "",
            "createdBy": 1,
            "entityTypeId": 1222,
            "customSectionId": null,
            "isCategoriesEnabled": "Y",
            "isStagesEnabled": "Y",
            "isBeginCloseDatesEnabled": "N",
            "isClientEnabled": "N",
            "isUseInUserfieldEnabled": "Y",
            "isLinkWithProductsEnabled": "N",
            "isMycompanyEnabled": "Y",
            "isDocumentsEnabled": "N",
            "isSourceEnabled": "Y",
            "isObserversEnabled": "N",
            "isRecyclebinEnabled": "N",
            "isAutomationEnabled": "N",
            "isBizProcEnabled": "N",
            "isSetOpenPermissions": "Y",
            "isPaymentsEnabled": "N",
            "isCountersEnabled": "N",
            "createdTime": "2024-07-08T17:24:47+02:00",
            "updatedTime": "2024-07-09T20:55:37+02:00",
            "updatedBy": 1,
            "relations": {
                "parent": [],
                "child": [
                    {
                        "entityTypeId": 1,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    },
                    {
                        "entityTypeId": 2,
                        "isChildrenListEnabled": "Y",
                        "isPredefined": "N"
                    }
                ]
            },
            "linkedUserFields": {
                "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "N",
                "TASKS_TASK|UF_CRM_TASK": "Y",
                "TASKS_TASK_TEMPLATE|UF_CRM_TASK": "N"
            },
            "customSections": []
        }
    },
    "time": {
        "start": 1720551426.116454,
        "finish": 1720551426.816224,
        "duration": 0.6997702121734619,
        "processing": 0.20451998710632324,
        "date_start": "2024-07-09T20:57:06+02:00",
        "date_finish": "2024-07-09T20:57:06+02:00",
        "operating": 0.2044668197631836
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит единственный ключ `type` ||
|| **type**
[`type`](../../data-types.md#type) | Информация об обновленном смарт-процессе ||
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
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `UPDATE_DYNAMIC_TYPE_RESTRICTED` | Вы не можете изменить настройки смарт-процесса из-за ограничений вашего тарифа | Смарт-процессы не доступны на вашем тарифе ||
|| `400` | `0` | Выберите рабочее место, в котором будет находиться смарт-процесс | При передаче `isExternal = 'true'`, но пустом `customSectionId` ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)

[1]: ../../../data-types.md