# Как настроить округление для пользовательского поля типа «Число»

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У пользовательских полей есть стандартные настройки: название, обязательность заполнения, множественное значение.

Дополнительно есть специализированные настройки в зависимости от типа поля:
- значения для списка
- точность округления для чисел
- валюта для денежных полей

Чтобы получить специализированные настройки для типа «Число» — `double`, используем метод [crm.userfield.settings.fields](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.md):

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.userfield.settings.fields',
        params: {
            type: 'double' // тип пользовательского поля
        },
        requestId: 'settings-fields'
    });
    console.dir(result.getData().result);
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

    $result = $sb->getCRMScope()->userfield()->settingsFields(
        'double' // Тип пользовательского поля
    )->getFieldsDescription();

    print_r($result);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    try:
        result = client.crm.userfield.settings.fields(type="double").response.result
        print(result)
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    ```

{% endlist %}

В результате получим две настройки: значение по умолчанию и точность.

```JSON
{
    "result": {
        "DEFAULT_VALUE": {
            "type": "double",
            "title": "Значение по умолчанию"
        },
        "PRECISION": {
            "type": "int",
            "title": "Точность"
        }
    }
}
```

## Создаем числовое поле с настройкой для округления

Создадим поле с типом число с настройкой точности три знака после запятой. Если в поле ввести значение с четырьмя или более знаками после запятой, оно автоматически округлится до трех знаков.

Чтобы создать пользовательское поле, используем метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод создаст поле, обязательный параметр. В примере создаем поле для сделок, модуль — `crm`
- `field[entityId]` — идентификатор объекта по формуле `CRM_ + {ID}`, обязательный параметр. Перечень идентификаторов для объектов есть в статье [Настройки пользовательских полей](../../../api-reference/crm/universal/userfieldconfig/index.md#entity-id). В примере укажем `CRM_DEAL`

- `field[fieldName]` — код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}` . Ограничение длины кода — 50 символов, обязательный параметр. В примере укажем `UF_CRM_DEAL_NEW_DOUBLE_FIELD`

- `field[userTypeId]` — идентификатор [типа поля](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md), обязательный параметр. В примере укажем `double` для создания поля типа число

- `field[editFormLabel]` — массив названий для отображения поля в Битрикс24 на разных языках. Необязательный параметр, при отсутствии названия в Битрикс24 будет отображаться код поля

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. Необязательный параметр, при отсутствии будут использованы настройки по умолчанию. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число равное количеству знаков после запятой.

{% list tabs %}

- JS
  
    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.add',
        params: {
            moduleId: 'crm', // Идентификатор модуля
            field: {
                entityId: 'CRM_DEAL', // Идентификатор объекта
                fieldName: 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                userTypeId: 'double', // Идентификатор типа поля
                editFormLabel: { 
                    'ru': 'Число с округлением', // Название поля на русском
                    'en': 'PRECISION double' // Название поля на английском
                },
                settings: { // Дополнительные настройки поля
                        PRECISION: 3, // Количество знаков после запятой
                    },
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
                'entityId' => 'CRM_DEAL', // Идентификатор объекта
                'fieldName' => 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                'userTypeId' => 'double', // Идентификатор типа поля
                'editFormLabel' => [
                    'ru' => 'Число с округлением', // Название поля на русском
                    'en' => 'PRECISION double' // Название поля на английском
                ],
                'settings' => [ // Дополнительные настройки поля
                    'PRECISION' => 3 // Количество знаков после запятой
                ]
            ]
        ]
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    try:
        field = client.userfieldconfig.add(
            module_id="crm",
            field={
                "entityId": "CRM_DEAL",
                "fieldName": "UF_CRM_DEAL_NEW_DOUBLE_FIELD",
                "userTypeId": "double",
                "editFormLabel": {
                    "ru": "Число с округлением",
                },
                "settings": {
                    "PRECISION": 3,
                },
            },
        ).response.result["field"]
        print(field)
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    ```

{% endlist %}

В результате получим данные созданного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6961",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_DEAL_NEW_DOUBLE_FIELD",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "100",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "PRECISION double",
                "ru": "Число с округлением"
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
            }
        }
    },
}
```

## Изменяем настройку существующего числового поля

Чтобы изменить настройку округления существующего поля используем метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) с указанием ID поля. ID поля можно получить двумя способами: при создании поля методом [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) или через метод получения списка пользовательских полей объекта. В примере поле cделки, поэтому используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md).

### 1. Получаем ID поля

Чтобы получить ID поля используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) с параметрами:

- `filter[LANG]` — фильтр по языку используем для вывода названий полей на нужном языке. Без данного фильтра названия выведены не будут

- `filter[USER_TYPE_ID]` — фильтр по типу поля используем чтобы получить только поля с типом «Число» в результате

{% list tabs %}

- JS
  
    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.deal.userfield.list',
        params: {
            filter: {
                LANG: 'ru', // Фильтр по языку для вывода названия поля
                USER_TYPE_ID: 'double' // Фильтр по типу поля
            }
        },
        requestId: 'userfield-list'
    });
    ```

- PHP
  
    ```php
    $result = $sb->getCRMScope()->dealUserfield()->list(
        order: [],
        filter: [
            'LANG' => 'ru', // Фильтр по языку для вывода названия поля
            'USER_TYPE_ID' => 'double' // Фильтр по типу поля
        ]
    )->getUserfields();
    ```

- Python

    ```python
    fields = client.crm.deal.userfield.list(
        filter={
            "LANG": "ru",
            "USER_TYPE_ID": "double",
        }
    ).response.result
    ```

{% endlist %}

В результате получим все числовые поля сделок с названиями.

```JSON
{
    "result": [
        {
            "ID": "6963",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1740471712",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Аванс",
            "LIST_COLUMN_LABEL": "Аванс",
            "LIST_FILTER_LABEL": "Аванс",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6807",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723464314",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Сумма к возврату",
            "LIST_COLUMN_LABEL": "Сумма к возврату",
            "LIST_FILTER_LABEL": "Сумма к возврату",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        }
    ],
    "total": 2,
}
```

### 2. Изменяем настройку для округления значения в поле

Для изменения настройки существующего поля используем метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод изменит поле, обязательный параметр. В примере изменяем поле сделок, модуль — `crm`

- `id` — идентификатор пользовательского поля, обязательный параметр. В примере передадим id поля, полученный методом [crm.deal.userfield.list](#1-получаем-id-поля)

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число равное количеству знаков после запятой.

{% list tabs %}

- JS
  
    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'userfieldconfig.update',
        params: {
            moduleId: 'crm', // Идентификатор модуля
            id: 6807, // id пользовательского поля
            field: {
                settings: { // Дополнительные настройки поля
                        PRECISION: 3, // Количество знаков после запятой
                    },
            }
        },
        requestId: 'userfieldconfig-update'
    });
    ```

- PHP
  
    ```php
    // у userfieldconfig.update нет обёртки в SDK — вызываем метод напрямую
    $result = $sb->core->call(
        'userfieldconfig.update',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'id' => 6807, // ID пользовательского поля
            'field' => [
                'settings' => [ // Дополнительные настройки поля
                    'PRECISION' => 3 // Количество знаков после запятой
                ]
            ]
        ]
    );
    ```

- Python

    ```python
    field = client.userfieldconfig.update(
        module_id="crm",
        bitrix_id=6807,
        field={
            "settings": {
                "PRECISION": 3,
            }
        },
    ).response.result["field"]
    ```

{% endlist %}

В результате получим данные измененного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6807",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_1723464314",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "150",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "E",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "ru": "ru"
            },
            "editFormLabel": {
                "ru": "Сумма к возврату"
            },
            "listColumnLabel": {
                "ru": "Сумма к возврату"
            },
            "listFilterLabel": {
                "ru": "Сумма к возврату"
            },
            "errorMessage": {
                "ru": null
            },
            "helpMessage": {
                "ru": null
            }
        }
    },
}
```

### Пример кода

{% list tabs %}

- JS
  
    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Функция для поиска и обновления пользовательского поля
    async function updateUserField() {
        // Запрашиваем у пользователя название поля
        var fieldName = prompt("Введите название поля:");

        try {
            // Первый метод: Получаем список всех пользовательских полей типа 'double'
            const result = await $b24.actions.v2.call.make({
                method: 'crm.deal.userfield.list',
                params: {
                    filter: {
                        LANG: 'ru', // Фильтр по языку для вывода названия поля
                        USER_TYPE_ID: 'double' // Фильтр по типу поля
                    }
                },
                requestId: 'userfield-list'
            });

            // Перебираем полученные поля, чтобы найти нужное по названию
            var fields = result.getData().result;
            var fieldId = null;

            for (var i = 0; i < fields.length; i++) {
                if (fields[i].EDIT_FORM_LABEL === fieldName) {
                    fieldId = fields[i].ID;
                    break;
                }
            }

            if (fieldId) {
                // Второй метод: Обновляем настройки найденного поля
                await $b24.actions.v2.call.make({
                    method: 'userfieldconfig.update',
                    params: {
                        moduleId: 'crm', // Идентификатор модуля
                        id: fieldId, // ID найденного пользовательского поля
                        field: {
                            settings: { 
                                PRECISION: 3 // Количество знаков после запятой
                            }
                        }
                    },
                    requestId: 'userfieldconfig-update'
                });
                console.log("Настройки поля успешно обновлены.");
            } else {
                console.log("Поле с указанным названием не найдено.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Запускаем функцию
    updateUserField();
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

    // Функция для поиска и обновления пользовательского поля
    function updateUserField(ServiceBuilder $sb, $fieldName) {
        try {
            // Первый метод: Получаем список всех пользовательских полей типа 'double'
            $fields = $sb->getCRMScope()->dealUserfield()->list(
                order: [],
                filter: [
                    'LANG' => 'ru', // Фильтр по языку для вывода названия поля
                    'USER_TYPE_ID' => 'double' // Фильтр по типу поля
                ]
            )->getUserfields();

            // Перебираем полученные поля, чтобы найти нужное по названию
            $fieldId = null;
            foreach ($fields as $field) {
                if ($field->EDIT_FORM_LABEL === $fieldName) {
                    $fieldId = $field->ID;
                    break;
                }
            }

            if ($fieldId) {
                // Второй метод: Обновляем настройки найденного поля
                // у userfieldconfig.update нет обёртки в SDK — вызываем метод напрямую
                $sb->core->call(
                    'userfieldconfig.update',
                    [
                        'moduleId' => 'crm', // Идентификатор модуля
                        'id' => $fieldId, // ID найденного пользовательского поля
                        'field' => [
                            'settings' => [
                                'PRECISION' => 3 // Количество знаков после запятой
                            ]
                        ]
                    ]
                );
                echo 'Настройки поля успешно обновлены.';
            } else {
                echo 'Поле с указанным названием не найдено.';
            }
        } catch (\Throwable $e) {
            echo 'Ошибка: ' . $e->getMessage();
        }
    }

    // Запрашиваем у пользователя название поля
    $fieldName = readline("Введите название поля: ");

    // Запускаем функцию
    updateUserField($sb, $fieldName);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def update_user_field(client, field_name: str) -> None:
        try:
            fields = client.crm.deal.userfield.list(
                filter={
                    "LANG": "ru",
                    "USER_TYPE_ID": "double",
                }
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        field_id = None
        for field in fields:
            if field["EDIT_FORM_LABEL"] == field_name:
                field_id = int(field["ID"])
                break

        if field_id is None:
            print("Поле с указанным названием не найдено.")
            return

        try:
            client.userfieldconfig.update(
                module_id="crm",
                bitrix_id=field_id,
                field={
                    "settings": {
                        "PRECISION": 3
                    }
                },
            ).response
        except BitrixAPIError as error:
                print(f"Ошибка: {error}")
        else:
            print("Настройки поля успешно обновлены.")


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    field_name = input("Введите название поля: ")
    update_user_field(client, field_name)
    ```

{% endlist %}
