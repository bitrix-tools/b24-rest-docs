# Как создать пользовательское поле в смарт-процессе

> Scope: [`crm`, `userfieldconfig`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «административный доступ к разделу CRM»
>
> - [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — пользователь с административным доступом к разделу CRM
> - [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) — пользователь с правом «Разрешить изменять настройки» в CRM
> - [userfieldconfig.list](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-list.md) — пользователь с правом на чтение элементов смарт-процесса

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля расширяют функционал CRM под задачи вашего бизнеса:

- можно создать поля для хранения информации в разных форматах: строка, деньги, число, адрес, файл и другие

- можно настроить характеристики полей: названия для разных языков, флаг множественного поля, настройка округления для числовых полей и другие

Код пользовательского поля и идентификатор объекта строятся из порядкового номера смарт-процесса, поэтому сначала нужно получить его из настроек смарт-процесса. В результате сценария в смарт-процессе появится множественное поле типа «список» с двумя вариантами значений.

Сценарий состоит из двух шагов.

1. Получить `id` смарт-процесса методом [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
2. Создать пользовательское поле методом [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md), собрав из `id` идентификатор объекта и код поля

## Что нужно до начала

- смарт-процесс уже создан в Битрикс24, и вы знаете его название

- вебхук создан от имени пользователя с административным доступом к разделу CRM. Без него метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) вернет ошибку

- в правах вебхука отмечены оба scope: `crm` и `userfieldconfig`. Метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) требует scope `userfieldconfig` и scope того модуля, который передан в `moduleId`

## 1. Получаем идентификатор смарт-процесса {#spa-id}

Для получения ID смарт-процесса используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:

- `title` — укажем название смарт-процесса. Замените `Закупка оборудования` на название своего смарт-процесса

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
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

В результате получим `id` — это порядковый номер смарт-процесса в Битрикс24. В примере `id`: `7`.

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

{% note warning "" %}

Дальше нужен именно `id`, а не `entityTypeId`. Это разные числа: у смарт-процесса с `id`: `7` идентификатор типа равен `177`. Если подставить `entityTypeId`, метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) откажет с сообщением «Вы не можете создавать пользовательские поля».

{% endnote %}

## 2. Создаем пользовательское поле в смарт-процессе

Для создания пользовательского поля используем метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) с параметрами:

- `moduleId` — идентификатор модуля, в котором метод создаст поле, обязательный параметр. Модуль смарт-процессов — `crm`

- `field[entityId]` — идентификатор объекта по формуле `CRM_ + {id}`, где `id` — это порядковый номер смарт-процесса из результата шага [crm.type.list](./how-to-add-user-field-to-spa.md#spa-id), обязательный параметр. В примере укажем `CRM_7`

- `field[fieldName]` — код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}`. Ограничение длины кода — 50 символов, обязательный параметр. В примере укажем `UF_CRM_7_NEW_REST_LIST`

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
        module_id="crm",  # Идентификатор модуля
        field={
            "entityId": "CRM_7",  # Идентификатор объекта
            "fieldName": "UF_CRM_7_NEW_REST_LIST",  # Код поля
            "userTypeId": "enumeration",  # Идентификатор типа поля
            "multiple": "Y",  # Флаг множественности
            "editFormLabel": {
                "ru": "Список характеристик",  # Название поля на русском
                "en": "List of characteristics",  # Название поля на английском
            },
            "enum": [  # Значения списочного поля
                {
                    "value": "Характеристика 1",  # Значение варианта
                    "def": "N",  # Флаг значения по умолчанию
                    "sort": 100,  # Индекс сортировки
                },
                {
                    "value": "Характеристика 2",
                    "def": "Y",  # Этот вариант будет значением по умолчанию
                    "sort": 200,
                },
            ],
        },
    ).response.result["field"]
    ```

{% endlist %}

В результате получим данные созданного поля. Сохраните `id` — он понадобится, чтобы изменить поле методом [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) или удалить его методом [userfieldconfig.delete](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-delete.md).

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
    }
}
```

## Проверим результат

Откройте карточку любого элемента смарт-процесса в Битрикс24. Новое поле отображается в карточке под названием из `editFormLabel` — «Список характеристик». Значение «Характеристика 2» подставлено по умолчанию, потому что у него `def`: `Y`.

Через REST состав полей смарт-процесса возвращает метод [userfieldconfig.list](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-list.md) с параметрами:

- `moduleId` — `crm`

- `filter` — укажем поле `entityId` со значением `CRM_7`, чтобы получить только поля этого смарт-процесса

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.list',
        params: {
            moduleId: 'crm',
            filter: { entityId: 'CRM_7' }
        },
        requestId: 'userfieldconfig-list'
    });

    console.dir(checkResult.getData().result.fields);
    ```

- PHP

    ```php
    // у userfieldconfig.list нет обёртки в SDK — вызываем метод напрямую
    $fields = $sb->core->call(
        'userfieldconfig.list',
        [
            'moduleId' => 'crm',
            'filter' => ['entityId' => 'CRM_7']
        ]
    )->getResponseData()->getResult();
    ```

- Python

    ```python
    fields = client.userfieldconfig.list(
        module_id="crm",
        filter={"entityId": "CRM_7"},
    ).response.result["fields"]
    ```

{% endlist %}

Сценарий выполнен, если в массиве `fields` есть объект с `fieldName`: `UF_CRM_7_NEW_REST_LIST`, а его `userTypeId` равен `enumeration` и `multiple` равен `Y`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса. Метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) возвращает ошибки с пустым кодом, поэтому ориентируйтесь на текст в `error_description`.

#|
|| **Текст ошибки** | **Причина и действие** ||
|| `Вы не можете создавать пользовательские поля` | В `field[entityId]` передан идентификатор объекта, которого нет. Частая причина — `entityTypeId` вместо `id`: у смарт-процесса с `id`: `7` нужен `CRM_7`, а не `CRM_177` ||
|| `Некорректный код поля` | `field[fieldName]` не начинается с `UF_{entityId}_`. Для объекта `CRM_7` код должен начинаться с `UF_CRM_7_` ||
|| `Поле ... уже существует.` | Поле с таким `field[fieldName]` в этом объекте уже создано. Возьмите другой код или измените существующее поле методом [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) ||
|| `The 'FIELD_NAME' field is not found` | Не передан обязательный `field[fieldName]` ||
|| `The 'USER_TYPE_ID' field is not found` | Не передан обязательный `field[userTypeId]`. Список допустимых значений возвращает метод [userfieldconfig.getTypes](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-get-types.md) ||
|| `Access denied` | У пользователя нет права «Разрешить изменять настройки» в CRM. Проверьте, от имени какого пользователя создан вебхук ||
|| `Fail to save enumeration field values` | Не сохранились варианты списка. Проверьте массив `enum`: у каждого варианта нужны непустой `value`, а `def` принимает только `Y` или `N` ||
|#

Ошибку с текстом `ACCESS_DENIED` или `allowed_only_intranet_user` возвращает шаг 1: у пользователя вебхука нет административного доступа к разделу CRM.

Шаг 1 ничего не создает, его можно повторять сколько угодно раз. Если ошибку вернул шаг 2, поле не создано: исправьте `field` и повторите только его.

## Что важно учитывать

- флаг множественности `multiple` после создания поля изменить нельзя. Чтобы сделать поле множественным, удалите его методом [userfieldconfig.delete](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-delete.md) и создайте заново

- метод не проверяет `field[entityId]` на принадлежность к смарт-процессам. Формула `CRM_ + {id}` работает только для них, для лидов, сделок и других объектов CRM идентификаторы объектов другие

- повторный запуск примера с тем же `fieldName` вернет ошибку «Поле ... уже существует», новое поле не создастся

- варианты списка возвращаются в массиве `enum` с собственными `id`. Чтобы добавить или изменить вариант позже, передайте эти `id` в метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md)

## Пример кода

{% list tabs %}

- JS

    ```javascript
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
            var spaId = result.getData().result.types[0].id; // Используем id, а не entityTypeId
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
                        fieldName: 'UF_CRM_' + spaId + '_NEW_REST_LIST', // Код поля начинается с UF_ + идентификатор объекта
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
                $spaId = $types[0]->id; // Используем id, а не entityTypeId
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
                    'fieldName' => 'UF_CRM_' . $spaId . '_NEW_REST_LIST', // Код поля начинается с UF_ + идентификатор объекта
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
            spa_id = int(types[0]["id"])  # используем id, а не entityTypeId
            add_user_field(client, spa_id)
        else:
            print("Смарт-процесс не найден.")


    def add_user_field(client, spa_id):
        try:
            result = client.userfieldconfig.add(
                module_id="crm",
                field={
                    "entityId": f"CRM_{spa_id}",
                    # код поля начинается с UF_ + идентификатор объекта
                    "fieldName": f"UF_CRM_{spa_id}_NEW_REST_LIST",
                    "userTypeId": "enumeration",
                    "multiple": "Y",
                    "editFormLabel": {
                        "ru": "Список характеристик",
                        "en": "List of characteristics",
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

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-list.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-delete.md)
- [{#T}](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-get-types.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
