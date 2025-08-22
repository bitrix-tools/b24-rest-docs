# Создать новый пользовательский тип crm.type.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод создает новый смарт-процесс.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип`         | **Описание** ||
|| **fields***
[`object`][1] | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления нового смарт-процесса ||
|#

### Параметр fields

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **По умолчанию** ||
|| **title***
[`string`][1]  | Название смарт-процесса | ||
|| **entityTypeId**
[`integer`][1] | Идентификатор создаваемого смарт-процесса. Если не передавать данное поле, то оно будет сгенерировано автоматически.

Стоит учитывать, что:
1. Данный параметр является уникальны. Не получится создать два смарт-процесса с одинаковыми `entityTypeId`
2. Значение `entityTypeId` обязано быть в одном из двух диапазонов:
   - четным целым числом, которое больше или равно 1030
   - в диапазоне от 128 до 192
| ||
|| **relations**
[`object`][1]  | Объект, содержащий в себе связи к другим сущностям CRM. Структура описана [ниже](#relations) | ||
|| **isUseInUserfieldEnabled** 
[`boolean`][1] | Включено ли использование смарт-процесса в пользовательском поле | `N` ||
|| **linkedUserFields** 
[`object`][1]  | Набор пользовательских полей в которых должен отображаться данный смарт-процесс. Структура описана [ниже](#linkedUserFields) | `{}` ||
|| **isAutomationEnabled**
[`boolean`][1] | Включены ли роботы и триггеры | `N` ||
|| **isBeginCloseDatesEnabled**
[`boolean`][1] | Включены ли поля **Дата начала** и **Дата завершения** | `N` ||
|| **isBizProcEnabled**
[`boolean`][1] | Включено ли использование дизайнера бизнес процессов | `N` ||
|| **isCategoriesEnabled**
[`boolean`][1] | Включены ли свои воронки и туннели продаж | `N` ||
|| **isClientEnabled**
[`boolean`][1] | Включено ли поле **Клиент**. При включенной опции у смарт-процесса появляется предустановленная привязка к **Контактам** и **Компаниям** | `N` ||
|| **isDocumentsEnabled**
[`boolean`][1] | Включена ли печать документов | `N` ||
|| **isLinkWithProductsEnabled**
[`boolean`][1] | Включена ли привязка товаров каталога | `N` ||
|| **isMycompanyEnabled**
[`boolean`][1] | Включено ли поле **Реквизиты вашей компании** | `N` ||
|| **isObserversEnabled** 
[`boolean`][1] | Включено ли поле **Наблюдатели** | `N` ||
|| **isRecyclebinEnabled**
[`boolean`][1] | Включено ли использование корзины | `N` ||
|| **isSetOpenPermissions** 
[`boolean`][1] | Делать ли новые воронки доступными для всех | `Y` ||
|| **isSourceEnabled** 
[`boolean`][1] | Включены ли поля **Источник** и **Дополнительно об источнике** | `N` ||
|| **isStagesEnabled**
[`boolean`][1] | Включено ли использование своих стадий и канбана | `N` ||
|| **isExternal**
[`boolean`][1] | Является ли смарт-процесс вынесенным из CRM (привязанным к цифровому рабочему месту)

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|| **customSectionId**
[`integer`][1] | Идентификатор цифрового рабочего места

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|| **customSections**
[`array`][1] | Массив цифровых рабочих мест

Параметр устарел. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](../../automated-solution/index.md) | `-` ||
|#

### Связи relations {#relations}

#|
|| **Название**
`тип` | **Описание** ||
|| **parent**
[`relation[]`](#relation) | Элементы CRM, которые будут привязаны к данному смарт-процессу ||
|| **child**
[`relation[]`](#relation) | Элементы CRM, к котором будет привязан данный смарт-процесс    ||
|#

#### Одна связь relation {#relation}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **По умолчанию** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../index.md) или [пользовательского типа](./index.md) сущности CRM | `-` ||
|| **isChildrenListEnabled**
[`boolean`][1] | Добавлять ли связанный элемент в карточку. 

Значения `Y` и `N` не работают. Необходимо передавать `"true"` или `"false"` | `"false"` ||
|#

### Привязка к пользовательским полям {#linkedUserFields}

`linkedUserFields` — набор полей, в которых должен отображаться этот смарт-процесс.
Данная настройка будет учитываться, только в случае передачи `isUseInUserfieldEnabled = 'Y'`

#|
|| **Название**
`тип` | **Описание** | **Значение по умолчанию** ||
|| **CALENDAR_EVENT**\|**UF_CRM_CAL_EVENT**
[`boolean`][1] | Событие в календаре | `"false"` ||
|| **TASKS_TASK**\|**UF_CRM_TASK**
[`boolean`][1] | Задачи | `"false"` ||
|| **TASKS_TASK**\|**UF_CRM_TASK**
[`boolean`][1] | Шаблоны задач | `"false"` ||
|#

Данные параметры не поддерживают передачу в них значений `Y` и `N`. Используйте `"true"` или `"false"`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Создадим смарт-процесс со следующими условиями:
* Наиболее полное количество включенных настроек
* Привязать `Лиды`, `Сделки`, `Счета` к создаваемому смарт-процессу. Каждую из привязок добавляем в карточку элементов данного смарт-процесса
* Привязать создаваемый смарт-процесс к `Контактам` и `Компаниям`. Привязку к `Контактам` добавляем в карточку
* Смарт-процесс должен отображаться в следующих полях: `Событие в календаре`, `Задачи`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Смарт-процесс","entityTypeId":2024,"isAutomationEnabled":"Y","isBeginCloseDatesEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y","isDocumentsEnabled":"Y","isLinkWithProductsEnabled":"Y","isMycompanyEnabled":"Y","isObserversEnabled":"Y","isRecyclebinEnabled":"Y","isSetOpenPermissions":"Y","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"CALENDAR_EVENT|UF_CRM_CAL_EVENT":"true","TASKS_TASK|UF_CRM_TASK":"true"},"relations":{"parent":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"true"},{"entityTypeId":31,"isChildrenListEnabled":"true"}],"child":[{"entityTypeId":3,"isChildrenListEnabled":"true"},{"entityTypeId":4}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.type.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Смарт-процесс","entityTypeId":2024,"isAutomationEnabled":"Y","isBeginCloseDatesEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y","isDocumentsEnabled":"Y","isLinkWithProductsEnabled":"Y","isMycompanyEnabled":"Y","isObserversEnabled":"Y","isRecyclebinEnabled":"Y","isSetOpenPermissions":"Y","isSourceEnabled":"Y","isStagesEnabled":"Y","isUseInUserfieldEnabled":"Y","linkedUserFields":{"CALENDAR_EVENT|UF_CRM_CAL_EVENT":"true","TASKS_TASK|UF_CRM_TASK":"true"},"relations":{"parent":[{"entityTypeId":1,"isChildrenListEnabled":"true"},{"entityTypeId":2,"isChildrenListEnabled":"true"},{"entityTypeId":31,"isChildrenListEnabled":"true"}],"child":[{"entityTypeId":3,"isChildrenListEnabled":"true"},{"entityTypeId":4}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.type.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.type.add',
    		{
    			fields: {
    				title: "Смарт-процесс",
    				entityTypeId: 2024,
    				isAutomationEnabled: "Y",
    				isBeginCloseDatesEnabled: "Y",
    				isBizProcEnabled: "Y",
    				isCategoriesEnabled: "Y",
    				isClientEnabled: "Y",
    				isDocumentsEnabled: "Y",
    				isLinkWithProductsEnabled: "Y",
    				isMycompanyEnabled: "Y",
    				isObserversEnabled: "Y",
    				isRecyclebinEnabled: "Y",
    				isSetOpenPermissions: "Y",
    				isSourceEnabled: "Y",
    				isStagesEnabled: "Y",
    				isUseInUserfieldEnabled: "Y",
    				linkedUserFields: {
    					"CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
    					"TASKS_TASK|UF_CRM_TASK": "true",
    				},
    				relations: {
    					parent: [
    						{
    							entityTypeId: 1,
    							isChildrenListEnabled: "true",
    						},
    						{
    							entityTypeId: 2,
    							isChildrenListEnabled: "true",
    						},
    						{
    							entityTypeId: 31,
    							isChildrenListEnabled: "true",
    							
    						},
    					],
    					child: [
    						{
    							entityTypeId: 3,
    							isChildrenListEnabled: "true",
    						},
    						{
    							entityTypeId: 4,
    						},
    					],
    				},
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.type.add',
                [
                    'fields' => [
                        'title'                     => "Смарт-процесс",
                        'entityTypeId'              => 2024,
                        'isAutomationEnabled'       => "Y",
                        'isBeginCloseDatesEnabled'  => "Y",
                        'isBizProcEnabled'          => "Y",
                        'isCategoriesEnabled'       => "Y",
                        'isClientEnabled'           => "Y",
                        'isDocumentsEnabled'        => "Y",
                        'isLinkWithProductsEnabled' => "Y",
                        'isMycompanyEnabled'        => "Y",
                        'isObserversEnabled'        => "Y",
                        'isRecyclebinEnabled'       => "Y",
                        'isSetOpenPermissions'      => "Y",
                        'isSourceEnabled'           => "Y",
                        'isStagesEnabled'           => "Y",
                        'isUseInUserfieldEnabled'   => "Y",
                        'linkedUserFields'          => [
                            "CALENDAR_EVENT|UF_CRM_CAL_EVENT" => "true",
                            "TASKS_TASK|UF_CRM_TASK"          => "true",
                        ],
                        'relations'                 => [
                            'parent' => [
                                [
                                    'entityTypeId'           => 1,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 2,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 31,
                                    'isChildrenListEnabled'  => "true",
                                ],
                            ],
                            'child'  => [
                                [
                                    'entityTypeId'           => 3,
                                    'isChildrenListEnabled'  => "true",
                                ],
                                [
                                    'entityTypeId'           => 4,
                                ],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding CRM type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.type.add',
        {
            fields: {
                title: "Смарт-процесс",
                entityTypeId: 2024,
                isAutomationEnabled: "Y",
                isBeginCloseDatesEnabled: "Y",
                isBizProcEnabled: "Y",
                isCategoriesEnabled: "Y",
                isClientEnabled: "Y",
                isDocumentsEnabled: "Y",
                isLinkWithProductsEnabled: "Y",
                isMycompanyEnabled: "Y",
                isObserversEnabled: "Y",
                isRecyclebinEnabled: "Y",
                isSetOpenPermissions: "Y",
                isSourceEnabled: "Y",
                isStagesEnabled: "Y",
                isUseInUserfieldEnabled: "Y",
                linkedUserFields: {
                    "CALENDAR_EVENT|UF_CRM_CAL_EVENT": "true",
                    "TASKS_TASK|UF_CRM_TASK": "true",
                },
                relations: {
                    parent: [
                        {
                            entityTypeId: 1,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 2,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 31,
                            isChildrenListEnabled: "true",
                            
                        },
                    ],
                    child: [
                        {
                            entityTypeId: 3,
                            isChildrenListEnabled: "true",
                        },
                        {
                            entityTypeId: 4,
                        },
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.add',
        [
            'fields' => [
                'title' => "Смарт-процесс",
                'entityTypeId' => 2024,
                'isAutomationEnabled' => "Y",
                'isBeginCloseDatesEnabled' => "Y",
                'isBizProcEnabled' => "Y",
                'isCategoriesEnabled' => "Y",
                'isClientEnabled' => "Y",
                'isDocumentsEnabled' => "Y",
                'isLinkWithProductsEnabled' => "Y",
                'isMycompanyEnabled' => "Y",
                'isObserversEnabled' => "Y",
                'isRecyclebinEnabled' => "Y",
                'isSetOpenPermissions' => "Y",
                'isSourceEnabled' => "Y",
                'isStagesEnabled' => "Y",
                'isUseInUserfieldEnabled' => "Y",
                'linkedUserFields' => [
                    "CALENDAR_EVENT|UF_CRM_CAL_EVENT" => "true",
                    "TASKS_TASK|UF_CRM_TASK" => "true",
                ],
                'relations' => [
                    'parent' => [
                        [
                            'entityTypeId' => 1,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 2,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 31,
                            'isChildrenListEnabled' => "true",
                        ],
                    ],
                    'child' => [
                        [
                            'entityTypeId' => 3,
                            'isChildrenListEnabled' => "true",
                        ],
                        [
                            'entityTypeId' => 4,
                        ],
                    ],
                ],
            ],
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
            "createdBy": 1,
            "entityTypeId": 2024,
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
            "createdTime": "2024-07-05T19:47:33+02:00",
            "updatedTime": "2024-07-05T19:47:33+02:00",
            "updatedBy": 1,
            "title": "Смарт-процесс",
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
            "customSections": [],
            "customSectionId": null
        }
    },
    "time": {
        "start": 1720201651.707909,
        "finish": 1720201654.748627,
        "duration": 3.040717840194702,
        "processing": 2.71589994430542,
        "date_start": "2024-07-05T19:47:31+02:00",
        "date_finish": "2024-07-05T19:47:34+02:00",
        "operating": 0
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
[`type`](../../data-types.md#type) | Информация о созданном смарт-процессе ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "INVALID_ARG_VALUE", 
    "error_description": "entityTypeId is out of allowed range"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `INVALID_ARG_VALUE` | entityTypeId is out of allowed range | Возникает, при передаче невалидного `entityTypeId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `100` | Could not find value for parameter {fields} | Возникает, если не передан обязательный параметр `fields` ||
|| `400` | `0` | Выберите рабочее место, в котором будет находиться смарт-процесс | При передаче `isExternal = 'true'`, но пустом `customSectionId` ||
|| `400` | `CREATE_DYNAMIC_TYPE_RESTRICTED` | Превышено максимальное количество смарт-процессов | Создание смарт-процесса ограничено из-за тарифа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)

[1]: ../../../data-types.md