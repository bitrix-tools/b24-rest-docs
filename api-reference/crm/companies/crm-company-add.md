# Создать новую компанию crm.company.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление|Импорт» компаний

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.add](../universal/crm-item-add.md).

{% endnote %}

Метод `crm.company.add` создает новую компанию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан в методе [crm.company.fields](crm-company-fields.md).

Некорректное поле в `fields` будет проигнорировано

{% note info " " %}

Чтобы узнать перечень обязательных полей, выполните метод [crm.company.fields](./crm-company-fields.md)

{% endnote %}
 ||
|| **params**
[`object`](../../data-types.md) | Объект, содержащий набор дополнительных параметров:

- `REGISTER_SONET_EVENT` — регистрировать событие добавления компании и отправить уведомление ответственному
- `IMPORT` — режим импорта. Возможные значения:
  - `Y` — да
  - `N` — нет
||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название компании ||
|| **COMPANY_TYPE**
[`crm_status`](../data-types.md) | Тип компании.

Список доступных типов можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "COMPANY_TYPE" }`.

По умолчанию — первый доступный тип компании ||
|| **INDUSTRY**
[`crm_status`](../data-types.md) | Сфера деятельности.

Список доступных значений можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "INDUSTRY" }`.

По умолчанию — первая доступная сфера деятельности ||
|| **EMPLOYEES**
[`crm_status`](../data-types.md) | Количество сотрудников.

Список доступных значений можно узнать с помощью метода [crm.status.list](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "EMPLOYEES" }`.

По умолчанию — первое доступное значение ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Валюта.

Список доступных валют можно узнать с помощью метода [crm.currency.list](../currency/crm-currency-list.md) ||
|| **REVENUE**
[`double`](../../data-types.md) | Годовой оборот ||
|| **LOGO**
[`file`](../../data-types.md) | Логотип компании ||
|| **OPENED**
[`char`](../../data-types.md) | Доступна ли компания для всех. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение по умолчанию может быть изменено в настройках CRM ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя, ответственного за элемент.

По умолчанию — идентификатор пользователя, который вызывает метод ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md) | Телефон ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md) | Мессенджер ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система, например Yandex-Direct, Google-Adwords ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **IS_MY_COMPANY**
[`char`](../../data-types.md) | Является ли компания «моей компанией». Возможные значения:
- `Y` — да
- `N` — нет ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек портала у компаний может быть набор пользовательских полей определенных типов.

Добавить пользовательское поле в компанию можно с помощью метода [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) ||
||**PARENT_ID_...** | Поля связей.

Если на портале есть смарт-процессы, связанные с компаниями, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и компанией. Само поле хранит идентификатор элемента такого смарт-процесса ||
|#

**Поля связи с внешними источниками данных**

Если компания создана внешней системой, то:
- поле `ORIGINATOR_ID` хранит строковый идентификатор этой системы
- поле `ORIGIN_ID` хранит строковый идентификатор компании в этой внешней системе
- поле `ORIGIN_VERSION` хранит версию данных компании в этой внешней системе

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этой компании ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор компании во внешней системе ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных во внешней системе. Используется для защиты данных от случайного перетирания ||
|#

**Импорт**

Данные поля доступны для заполнения при передаче параметра `IMPORT = 'Y'` в параметр `params`.

#|
|| **Название**
`тип` | **Описание** ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создана ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменена ||
|#

{% note info " " %}

Чтобы добавить адрес и банковские реквизиты компании, используйте методы [реквизитов](../requisites/index.md)

{% endnote %}

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"ИП Титов","COMPANY_TYPE":"CUSTOMER","INDUSTRY":"MANUFACTURING","EMPLOYEES":"EMPLOYEES_2","CURRENCY_ID":"RUB","REVENUE":3000000,"OPENED":"Y","ASSIGNED_BY_ID":1,"PHONE":[{"VALUE":"555888","VALUE_TYPE":"WORK"}]},"params":{"REGISTER_SONET_EVENT":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"ИП Титов","COMPANY_TYPE":"CUSTOMER","INDUSTRY":"MANUFACTURING","EMPLOYEES":"EMPLOYEES_2","CURRENCY_ID":"RUB","REVENUE":3000000,"OPENED":"Y","ASSIGNED_BY_ID":1,"PHONE":[{"VALUE":"555888","VALUE_TYPE":"WORK"}]},"params":{"REGISTER_SONET_EVENT":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.company.add',
        params: {
          fields: {
            TITLE: 'Titov Sole Proprietor',
            COMPANY_TYPE: 'CUSTOMER',
            INDUSTRY: 'MANUFACTURING',
            EMPLOYEES: 'EMPLOYEES_2',
            CURRENCY_ID: 'RUB',
            REVENUE: 3000000,
            LOGO: { fileData: document.getElementById('logo') },
            OPENED: 'Y',
            ASSIGNED_BY_ID: 1,
            PHONE: [{ VALUE: '555888', VALUE_TYPE: 'WORK' }],
          },
          params: { REGISTER_SONET_EVENT: 'Y' },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created company id:', result)
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
      async function addCompany() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.company.add',
            params: {
              fields: {
                TITLE: 'Titov Sole Proprietor',
                COMPANY_TYPE: 'CUSTOMER',
                INDUSTRY: 'MANUFACTURING',
                EMPLOYEES: 'EMPLOYEES_2',
                CURRENCY_ID: 'RUB',
                REVENUE: 3000000,
                LOGO: { fileData: document.getElementById('logo') },
                OPENED: 'Y',
                ASSIGNED_BY_ID: 1,
                PHONE: [{ VALUE: '555888', VALUE_TYPE: 'WORK' }],
              },
              params: { REGISTER_SONET_EVENT: 'Y' },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created company id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCompany)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.add',
                [
                    'fields' => [
                        'TITLE'         => 'ИП Титов',
                        'COMPANY_TYPE'  => 'CUSTOMER',
                        'INDUSTRY'      => 'MANUFACTURING',
                        'EMPLOYEES'     => 'EMPLOYEES_2',
                        'CURRENCY_ID'   => 'RUB',
                        'REVENUE'       => 3000000,
                        'LOGO'          => ['fileData' => $_POST['logo']],
                        'OPENED'        => 'Y',
                        'ASSIGNED_BY_ID' => 1,
                        'PHONE'         => [['VALUE' => '555888', 'VALUE_TYPE' => 'WORK']],
                    ],
                    'params' => ['REGISTER_SONET_EVENT' => 'Y'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создана компания с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при создании компании: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.add",
        {
            fields:
            {
                "TITLE": "ИП Титов",
                "COMPANY_TYPE": "CUSTOMER",
                "INDUSTRY": "MANUFACTURING",
                "EMPLOYEES": "EMPLOYEES_2",
                "CURRENCY_ID": "RUB",
                "REVENUE" : 3000000,
                "LOGO": { "fileData": document.getElementById('logo') },
                "OPENED": "Y",
                "ASSIGNED_BY_ID": 1,
                "PHONE": [ { "VALUE": "555888", "VALUE_TYPE": "WORK" } ]     
            },
            params: { "REGISTER_SONET_EVENT": "Y" }        
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создана компания с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.add',
        [
            'fields' => [
                'TITLE' => 'ИП Титов',
                'COMPANY_TYPE' => 'CUSTOMER',
                'INDUSTRY' => 'MANUFACTURING',
                'EMPLOYEES' => 'EMPLOYEES_2',
                'CURRENCY_ID' => 'RUB',
                'REVENUE' => 3000000,
                'OPENED' => 'Y',
                'ASSIGNED_BY_ID' => 1,
                'PHONE' => [['VALUE' => '555888', 'VALUE_TYPE' => 'WORK']],
            ],
            'params' => ['REGISTER_SONET_EVENT' => 'Y'],
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
    "result": 2921,
    "time": {
        "start": 1769500710,
        "finish": 1769500711.551784,
        "duration": 1.5517840385437012,
        "processing": 1,
        "date_start": "2026-01-27T10:58:30+03:00",
        "date_finish": "2026-01-27T10:58:31+03:00",
        "operating_reset_at": 1769501310,
        "operating": 0.6509370803833008
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданной компании ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'fields' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | Parameter 'fields' must be array | В параметр `fields` передан не объект ||
|| `-`     | Parameter 'params' must be array | В параметр `params` передан не объект ||
|| `-`     | Access denied | У пользователя нет прав на «Добавление» или «Импорт» компаний ||
|| `-`     | Исчерпан выделенный дисковый ресурс | ||
|| `ERROR_CORE` | Поле `E-mail` содержит некорректный адрес |  Поле `E-mail` содержит некорректный адрес ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-company.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-company-with-requisite.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-deal-with-choice-of-requisite.md)





