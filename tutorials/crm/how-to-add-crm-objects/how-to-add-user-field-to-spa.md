# Как создать пользовательское поле в смарт-процессе

> Scope: [`crm, userfieldconfig`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение смарт-процесса

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля расширяют функционал CRM под задачи вашего бизнеса:

- можно создать поля для хранения информации в разных форматах: строка, деньги, число, адрес, файл и другие

- можно настроить характеристики полей: названия для разных языков, флаг множественного поля, настройка округления для числовых полей и другие

Для создания пользовательского поля в смарт-процессе последовательно выполним два метода:

1. [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — получим ID смарт-процесса

2. [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) — создадим пользовательское поле в смарт-процессе

## 1. Получаем идентификатор смарт-процесса {#spa-id}

Для получения ID смарт-процесса используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:

- `title` — укажем название смарт-процесса

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.type.list',
        params: {
            filter: { // массив полей для фильтрации
                "title": "Закупка оборудования" // название смарт-процесса
            }
        },
        requestId: 'type-list'
    });
    ```

- PHP
  
    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $result = $sb->getCRMScope()->type()->list(
        order: [],
        filter: ['title' => 'Закупка оборудования'] // название смарт-процесса
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    result = client.crm.type.list(
        filter={
            "title": "Закупка оборудования",
        }
    ).response.result
    ```

{% endlist %}

В результате получим id -- это порядковый номер смарт-процесса в Битрикс24. В примере `id`: `7`.

```json
{
    "result": {
        "types": [
            {
                "id": 7,
                "title": "Закупка оборудования",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 177,
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
                "createdTime": "2021-11-26T10:52:17+03:00",
                "updatedTime": "2024-11-12T15:32:39+03:00",
                "updatedBy": 1
            }
        ]
    }
}
```

## 2. Создаем пользовательское поле в смарт-процессе

Для создания пользовательского поля используем метод [userfieldconfig.add ](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод создаст поле, обязательный параметр. Модуль смарт-процессов — `crm`

- `field[entityId]` — идентификатор объекта по формуле `CRM_ + {ID}`, где ID это порядковый номер смарт-процесса в Битрикс24 из результата [crm.type.list](./how-to-add-user-field-to-spa.md#spa-id), обязательный параметр.  В примере укажем `CRM_7`

- `field[fieldName]`— код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}`. Ограничение длины кода — 50 символов, обязательный параметр. В примере укажем `UF_CRM_7_NEW_REST_LIST`

- `field[userTypeId]` — идентификатор [типа поля](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md), обязательный параметр. В примере укажем `enumeration` для создания поля типа список, варианты значений списочного поля передадим в отдельном массиве `enum`

- `field[multiple]` — флаг множественного поля, необязательный параметр. Изменить флаг множественности после создания поля нельзя

- `field[editFormLabel]` — массив названий для отображения поля в Битрикс24 на разных языках. Необязательный параметр, при отсутствии названия в Битрикс24 будет отображаться код поля

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.add',
        params: {
            moduleId: 'crm', // Идентификатор модуля
            field: {
                entityId: 'CRM_7', // Идентификатор объекта
                fieldName: 'UF_CRM_7_NEW_REST_LIST', // Код поля
                userTypeId: 'enumeration', // Идентификатор типа поля
                multiple: 'Y', // Флаг множественности
                editFormLabel: { 
                    'ru': 'Список характеристик', // Название поля на русском
                    'en': 'List of characteristics' // Название поля на английском
                },
                enum: [ // Значения списочного поля
                    {
                        value: 'Характеристика 1', // Значение варианта
                        def: 'N', // Флаг значения по умолчанию
                        sort: 100, // Индекс сортировки
                    },
                    {
                        value: 'Характеристика 2',
                        def: 'Y', // Этот вариант будет значением по умолчанию
                        sort: 200,
                    }
                ]
            }
        },
        requestId: 'userfieldconfig-add'
    });
    ```

- PHP
  
    ```php
    // у userfieldconfig.add нет обёртки в SDK — вызываем метод напрямую
    $result = $sb->core->call(
        'userfieldconfig.add',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'field' => [
                'entityId' => 'CRM_7', // Идентификатор объекта
                'fieldName' => 'UF_CRM_7_NEW_REST_LIST', // Код поля
                'userTypeId' => 'enumeration', // Идентификатор типа поля
                'multiple' => 'Y', // Флаг множественности
                'editFormLabel' => [
                    'ru' => 'Список характеристик', // Название поля на русском
                    'en' => 'List of characteristics' // Название поля на английском
                ],
                'enum' => [ // Значения списочного поля
                    [
                        'value' => 'Характеристика 1', // Значение варианта
                        'def' => 'N', // Флаг значения по умолчанию
                        'sort' => 100, // Индекс сортировки
                    ],
                    [
                        'value' => 'Характеристика 2',
                        'def' => 'Y', // Этот вариант будет значением по умолчанию
                        'sort' => 200,
                    ]
                ]
            ]
        ]
    );
    ```

- Python

    ```python
    field = client.userfieldconfig.add(
        module_id="crm",
        field={
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST",
            "userTypeId": "enumeration",
            "multiple": "Y",
            "editFormLabel": {
                "ru": "Список характеристик",
            },
            "enum": [
                {
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": 100,
                },
                {
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": 200,
                },
            ],
        },
    ).response.result["field"]
    ```

{% endlist %}

В результате получим данные созданного поля.

```json
{
    "result": {
        "field": {
            "id": "6953",
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST",
            "userTypeId": "enumeration",
            "xmlId": null,
            "sort": "100",
            "multiple": "Y",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "List of characteristics",
                "ru": "Список характеристик"
            },
            "listColumnLabel": {
                "en": null,
                "ru": null
            },
            "listFilterLabel": {
                "en": null,
                "ru": null
            },
            "errorMessage": {
                "en": null,
                "ru": null
            },
            "helpMessage": {
                "en": null,
                "ru": null
            },
            "enum": [
                {
                    "id": "3363",
                    "userFieldId": "6953",
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": "100",
                    "xmlId": "56dff18efcfe25f3bae0117a6b372567"
                },
                {
                    "id": "3365",
                    "userFieldId": "6953",
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": "200",
                    "xmlId": "42e3ebcf5506a65283bf3bf510d8f05a"
                }
            ]
        }
    },
}
```

## Пример кода

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Функция для получения смарт-процесса и создания пользовательского поля
    async function getCrmTypeAndAddUserField() {
        // Переменная для ввода названия смарт-процесса пользователем
        var processTitle = prompt("Введите название смарт-процесса для поиска:", "Название_вашего_процесса");
        try {
            // Вызываем метод crm.type.list для получения смарт-процесса
            const result = await $b24.actions.v2.call.make({
                method: 'crm.type.list',
                params: { filter: { "title": processTitle } }, // Используем введенное пользователем название
                requestId: 'type-list'
            });
            console.log('Смарт-процесс успешно получен:', result.getData().result);
            var spaId = result.getData().result.types[0].id; // Используем id из результата
            await addUserField(spaId);
        } catch (error) {
            console.error('Ошибка при получении смарт-процесса:', error);
        }
    }

    // Функция для создания пользовательского поля
    async function addUserField(spaId) {
        try {
            // Вызываем метод userfieldconfig.add для создания пользовательского поля
            const result = await $b24.actions.v2.call.make({
                method: 'userfieldconfig.add',
                params: {
                    moduleId: 'crm',
                    field: {
                        entityId: 'CRM_' + spaId, // Используем id из предыдущего результата
                        fieldName: 'UF_CRM_' + spaId + '_NEW_REST_LIST', // Используем id
                        userTypeId: 'enumeration',
                        multiple: 'Y',
                        editFormLabel: {
                            'ru': 'Список характеристик',
                            'en': 'List of characteristics'
                        },
                        enum: [
                            {
                                value: 'Характеристика 1',
                                def: 'N',
                                sort: 100
                            },
                            {
                                value: 'Характеристика 2',
                                def: 'Y',
                                sort: 200
                            }
                        ]
                    }
                },
                requestId: 'userfieldconfig-add'
            });
            console.log('Пользовательское поле успешно создано:', result.getData().result);
        } catch (error) {
            console.error('Ошибка создания пользовательского поля:', error);
        }
    }

    // Вызов функции для получения данных смарт-процесса и создания пользовательского поля
    getCrmTypeAndAddUserField();
    ```

- PHP
  
    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Services\ServiceBuilder;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // Функция для получения смарт-процесса и создания пользовательского поля
    function getCrmTypeAndAddUserField(ServiceBuilder $sb, $processTitle) {
        try {
            // Вызываем метод crm.type.list для получения смарт-процесса
            $types = $sb->getCRMScope()->type()->list(
                order: [],
                filter: ['title' => $processTitle] // Используем введенное пользователем название
            )->getTypes();

            if (!empty($types)) {
                $spaId = $types[0]->id; // Используем id из результата
                addUserField($sb, $spaId);
            } else {
                echo 'Смарт-процесс не найден.';
            }
        } catch (\Throwable $e) {
            echo 'Ошибка при получении смарт-процесса: ' . $e->getMessage();
        }
    }

    // Функция для создания пользовательского поля
    function addUserField(ServiceBuilder $sb, $spaId) {
        try {
            // у userfieldconfig.add нет обёртки в SDK — вызываем метод напрямую
            $sb->core->call('userfieldconfig.add', [
                'moduleId' => 'crm',
                'field' => [
                    'entityId' => 'CRM_' . $spaId, // Используем id из предыдущего результата
                    'fieldName' => 'UF_CRM_' . $spaId . '_NEW_REST_LIST', // Используем id
                    'userTypeId' => 'enumeration',
                    'multiple' => 'Y',
                    'editFormLabel' => [
                        'ru' => 'Список характеристик',
                        'en' => 'List of characteristics'
                    ],
                    'enum' => [
                        [
                            'value' => 'Характеристика 1',
                            'def' => 'N',
                            'sort' => 100
                        ],
                        [
                            'value' => 'Характеристика 2',
                            'def' => 'Y',
                            'sort' => 200
                        ]
                    ]
                ]
            ]);
            echo 'Пользовательское поле успешно создано.';
        } catch (\Throwable $e) {
            echo 'Ошибка создания пользовательского поля: ' . $e->getMessage();
        }
    }

    // Вызов функции для получения данных смарт-процесса и создания пользовательского поля
    $processTitle = readline("Введите название смарт-процесса для поиска: ");
    getCrmTypeAndAddUserField($sb, $processTitle);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def get_crm_type_and_add_user_field(client):
        process_title = input("Введите название смарт-процесса для поиска: ")

        try:
            resp = client.crm.type.list(
                filter={"title": process_title},
            ).response
        except BitrixAPIError as error:
            print(f"Ошибка при получении смарт-процесса: {error}")
            return

        print("Смарт-процесс успешно получен:")
        print(resp.result)

        types = resp.result.get("types") or []
        if types:
            spa_id = int(types[0]["id"])
            add_user_field(client, spa_id)
        else:
            print("Смарт-процесс не найден.")


    def add_user_field(client, spa_id):
        try:
            result = client.userfieldconfig.add(
                module_id="crm",
                field={
                    "entityId": f"CRM_{spa_id}",
                    "fieldName": f"UF_CRM_{spa_id}_NEW_REST_LIST",
                    "userTypeId": "enumeration",
                    "multiple": "Y",
                    "editFormLabel": {
                        "ru": "Список характеристик",
                    },
                    "enum": [
                        {"value": "Характеристика 1", "def": "N", "sort": 100},
                        {"value": "Характеристика 2", "def": "Y", "sort": 200},
                    ],
                },
            ).response
        except BitrixAPIError as error:
            print(f"Ошибка создания пользовательского поля: {error}")
        else:
            print("Пользовательское поле успешно создано:")
            print(result.result)


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    get_crm_type_and_add_user_field(client)
    ```

{% endlist %}
