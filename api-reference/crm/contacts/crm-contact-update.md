# Изменить контакт crm.contact.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение контактов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.update](../rest-v3/items/crm-entity-update-rest-v3.md).

{% endnote %}

Метод `crm.contact.update` обновляет существующий контакт.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор контакта, который нужно изменить. 

Идентификатор можно получить методами [`crm.contact.list`](crm-contact-list.md) или [`crm.contact.add`](crm-contact-add.md) ||
|| **fields**
[`object`](../../data-types.md) | Объект формата:

```text
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` передавайте только поля, которые меняете. При обновлении адреса передавайте все поля адреса: поля адреса, которых нет в запросе, очищаются.

Если не передать `fields`, метод вернет `true` и ничего не изменит
||
|| **params**
[`object`](../../data-types.md) | Объект, содержащий набор дополнительных параметров.

Структура и возможные значения описаны [ниже](#parameter-params) ||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Список доступных типов обращений можно узнать с помощью [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "HONORIFIC" }` ||
|| **NAME**
[`string`](../../data-types.md) | Имя ||
|| **SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
|| **PHOTO**
[`file`](../../data-types.md) | Фотография ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта.
Список доступных типов контакта можно узнать с помощью [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }` ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник. Список доступных типов источника можно узнать с помощью [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "SOURCE" }` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
|| **POST**
[`string`](../../data-types.md) | Должность ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
|| **OPENED**
[`boolean`](../../data-types.md) | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **EXPORT**
[`boolean`](../../data-types.md) | Участвует ли контакт в экспорте. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя, ответственного за контакт ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании для контакта.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **COMPANY_IDS**
[`crm_company[]`](../data-types.md) | Массив идентификаторов компаний, к которым привязан контакт.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4`  ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие)  ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Например, `CPC` — объявления, `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Телефон ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md#crm_multifield) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Мессенджер ||
|| **LINK**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Ссылки. Служебное поле ||
||**UF_...**
[`any`](../../data-types.md) | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек Битрикс24 у контактов может быть набор пользовательских полей определенных типов.

Для изменения файловых полей рекомендуется использовать метод [crm.item.update](../universal/crm-item-update.md).

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) ||
||**PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей.

Если смарт-процесс связан с контактами как родительский, поле `PARENT_ID_...` хранит идентификатор его элемента. Например, `PARENT_ID_153` — идентификатор элемента родительского смарт-процесса с `entityTypeId=153` ||
|#

**Поля связи с внешними источниками данных**

Поля заполняются, если контакт создан внешней системой.

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор контакта во внешней системе ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных контакта во внешней системе ||
|#

**Устаревшие поля**

Поля адреса в контакте устарели и работают только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая строка адреса ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../../data-types.md) | Идентификатор адреса местоположения ||
|#

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`boolean`](../../data-types.md) | Параметр принимается для совместимости и на изменение контакта не влияет: метод его не учитывает ||
|| **REGISTER_HISTORY_EVENT**
[`boolean`](../../data-types.md) | Записывать ли обновление контакта в историю. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Изменить контакт с `id = 43`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"NAME":"Сергей","BIRTHDATE":"11.11.1999","TYPE_ID":"RECOMMENDATION","SOURCE_ID":"WEB","POST":"Администратор компьютерных сетей","COMMENTS":"Новый комментарий","OPENED":"N","EXPORT":"Y","ASSIGNED_BY_ID":1,"COMPANY_ID":13,"COMPANY_IDS":[13,15],"UF_CRM_1720697698689":"Пример нового значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":14},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"NAME":"Сергей","BIRTHDATE":"11.11.1999","TYPE_ID":"RECOMMENDATION","SOURCE_ID":"WEB","POST":"Администратор компьютерных сетей","COMMENTS":"Новый комментарий","OPENED":"N","EXPORT":"Y","ASSIGNED_BY_ID":1,"COMPANY_ID":13,"COMPANY_IDS":[13,15],"UF_CRM_1720697698689":"Пример нового значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":14},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.contact.update',
        params: {
          id: 43,
          fields: {
            NAME: 'Sergey',
            BIRTHDATE: '11.11.1999',
            TYPE_ID: 'RECOMMENDATION',
            SOURCE_ID: 'WEB',
            POST: 'Computer network administrator',
            COMMENTS: 'New comment',
            OPENED: 'N',
            EXPORT: 'Y',
            ASSIGNED_BY_ID: 1,
            COMPANY_ID: 13,
            COMPANY_IDS: [13, 15],
            UF_CRM_1720697698689: 'Example new value of a custom field of type "String"',
            PARENT_ID_1224: 14,
          },
          params: {
            REGISTER_SONET_EVENT: 'N',
            REGISTER_HISTORY_EVENT: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact updated:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.update',
            params: {
              id: 43,
              fields: {
                NAME: 'Sergey',
                BIRTHDATE: '11.11.1999',
                TYPE_ID: 'RECOMMENDATION',
                SOURCE_ID: 'WEB',
                POST: 'Computer network administrator',
                COMMENTS: 'New comment',
                OPENED: 'N',
                EXPORT: 'Y',
                ASSIGNED_BY_ID: 1,
                COMPANY_ID: 13,
                COMPANY_IDS: [13, 15],
                UF_CRM_1720697698689: 'Example new value of a custom field of type "String"',
                PARENT_ID_1224: 14,
              },
              params: {
                REGISTER_SONET_EVENT: 'N',
                REGISTER_HISTORY_EVENT: 'N',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contact updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateContact)
    </script>
    ```

- PHP

    ```php        
    try {
        $contactId = 43; // Example contact ID
        $fields = [
            'NAME' => 'John',
            'LAST_NAME' => 'Doe',
            'BIRTHDATE' => (new DateTime('1990-01-01'))->format(DateTime::ATOM),
            'PHONE' => [['VALUE' => '123456789', 'VALUE_TYPE' => 'WORK']],
            'EMAIL' => [['VALUE' => 'john.doe@example.com', 'VALUE_TYPE' => 'WORK']],
            'ADDRESS' => '123 Main St',
            'ADDRESS_CITY' => 'Anytown',
            'ADDRESS_COUNTRY' => 'USA',
        ];
        $params = [
            'REGISTER_SONET_EVENT' => 'Y',
        ];
        $result = $serviceBuilder
            ->getCRMScope()
            ->contact()
            ->update($contactId, $fields, $params);
        if ($result->isSuccess()) {
            var_export($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print('Update failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.update',
        {
            id: 43,
            fields: {
                NAME: "Сергей",
                BIRTHDATE: '11.11.1999',
                TYPE_ID: "RECOMMENDATION",
                SOURCE_ID: "WEB",
                POST: "Администратор компьютерных сетей",
                COMMENTS: "Новый комментарий",
                OPENED: "N",
                EXPORT: "Y",
                ASSIGNED_BY_ID: 1,
                COMPANY_ID: 13,
                COMPANY_IDS: [13, 15],
                UF_CRM_1720697698689: "Пример нового значения пользовательского поля с типом \"Строка\"",
                PARENT_ID_1224: 14,
            },
            params: {
                REGISTER_SONET_EVENT: "N",
                REGISTER_HISTORY_EVENT: "N",
            },
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
        'crm.contact.update',
        [
            'ID' => 43,
            'FIELDS' => [
                'NAME' => 'Сергей',
                'BIRTHDATE' => '11.11.1999',
                'TYPE_ID' => 'RECOMMENDATION',
                'SOURCE_ID' => 'WEB',
                'POST' => 'Администратор компьютерных сетей',
                'COMMENTS' => 'Новый комментарий',
                'OPENED' => 'N',
                'EXPORT' => 'Y',
                'ASSIGNED_BY_ID' => 1,
                'COMPANY_ID' => 13,
                'COMPANY_IDS' => [13, 15],
                'UF_CRM_1720697698689' => 'Пример нового значения пользовательского поля с типом "Строка"',
                'PARENT_ID_1224' => 14,
            ],
            'PARAMS' => [
                'REGISTER_SONET_EVENT' => 'N',
                'REGISTER_HISTORY_EVENT' => 'N',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.update", b24.Params{
    	"id": 43,
    	"fields": b24.Params{
    		"NAME":                 "Сергей",
    		"BIRTHDATE":            "11.11.1999",
    		"TYPE_ID":              "RECOMMENDATION",
    		"SOURCE_ID":            "WEB",
    		"POST":                 "Администратор компьютерных сетей",
    		"COMMENTS":             "Новый комментарий",
    		"OPENED":               "N",
    		"EXPORT":               "Y",
    		"ASSIGNED_BY_ID":       1,
    		"COMPANY_ID":           13,
    		"COMPANY_IDS":          []int{13, 15},
    		"UF_CRM_1720697698689": "Пример нового значения пользовательского поля с типом \"Строка\"",
    		"PARENT_ID_1224":       14,
    	},
    	"params": b24.Params{
    		"REGISTER_SONET_EVENT":   "N",
    		"REGISTER_HISTORY_EVENT": "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.update: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Работа с множественными полями

### Изменить множественное поле

Для перезаписи существующего значения множественного поля передайте `ID` значения, которое хотите изменить, и новые `VALUE` и `VALUE_TYPE`. Если не передать `VALUE_TYPE`, тип значения сбросится на `WORK`.

Пусть есть следующие значения поля `PHONE`:

```json
[
    {
        "ID": "222",
        "VALUE_TYPE": "WORK",
        "VALUE": "111111",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "223",
        "VALUE_TYPE": "WORK",
        "VALUE": "222222",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "224",
        "VALUE_TYPE": "WORK",
        "VALUE": "333333",
        "TYPE_ID": "PHONE"
    }
]
```

Чтобы изменить значения у телефона с `ID = 223`, передайте следующий параметр `fields`:

```json
{
    "fields": {
        "PHONE": [
            {
                "ID": 223,
                "VALUE": "444444",
                "VALUE_TYPE": "MOBILE"
            }
        ]
    }
}
```

### Удалить отдельное значение множественного поля

Чтобы удалить одно из значений множественного поля, передайте его идентификатор и параметр `DELETE = 'Y'`, пустой `VALUE` или не передавайте `VALUE`.

Пусть есть следующие значения поля `PHONE`:

```json
[
    {
        "ID": "222",
        "VALUE_TYPE": "WORK",
        "VALUE": "111111",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "223",
        "VALUE_TYPE": "WORK",
        "VALUE": "222222",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "224",
        "VALUE_TYPE": "WORK",
        "VALUE": "333333",
        "TYPE_ID": "PHONE"
    },
    {
      "ID": "225",
      "VALUE_TYPE": "WORK",
      "VALUE": "44444",
      "TYPE_ID": "PHONE"
    }
]
```

Рассмотрим способы удаления всех значений, кроме телефона с `ID = 225`:

```json
{
    "fields": {
        "PHONE": [
            {
                "ID": 222,
                "DELETE": "Y"
            },
            {
                "ID": 223,
                "VALUE": ""
            },
            {
                "ID": 224
            }
        ]
    }
}
```

В результате останется:

```json
[
    {
        "ID": "225",
        "VALUE_TYPE": "WORK",
        "VALUE": "44444",
        "TYPE_ID": "PHONE"
    }
]
```

### Добавить новое значение для множественного поля

Чтобы добавить значение, передайте его без `ID`. Существующие значения не изменятся.

Пример добавления нового значения `55555`:

```json
{
    "fields": {
        "PHONE": [
            {
                "VALUE": "55555",
                "VALUE_TYPE": "WORK"
            }
        ]
    }
}
```

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1723820393.459406,
        "finish": 1723820396.129949,
        "duration": 2.6705431938171387,
        "processing": 2.1193439960479736,
        "date_start": "2024-08-16T16:59:53+02:00",
        "date_finish": "2024-08-16T16:59:56+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Contact is not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `ID is not defined or invalid.` | Параметр `id` не передан или после приведения к целому числу его значение не больше 0 ||
|| `400` | Пустое значение | `Parameter 'fields' must be array.` | В параметр `fields` передан не объект ||
|| `400` | Пустое значение | `Parameter 'params' must be array.` | В параметр `params` передан не объект ||
|| `400` | Пустое значение | `Contact is not found` | Контакт не найден ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет прав на «Изменение» контактов ||
|| `400` | Пустое значение | Исчерпан выделенный дисковый ресурс | Не хватает места на диске для сохранения файла ||
|| `400` | Пустое значение | `Поля "Имя" и "Фамилия" не могут быть пустыми одновременно. Пожалуйста, заполните как минимум одно из них` | После обновления у контакта не осталось ни `NAME`, ни `LAST_NAME`. Например, передан пустой `NAME`, а фамилия не заполнена ||
|| `400` | `ERROR_CORE` | `Поле "Рабочий e-mail" содержит некорректный адрес.<br>` | В `EMAIL` передан некорректный адрес. Название поля в тексте зависит от `VALUE_TYPE` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
