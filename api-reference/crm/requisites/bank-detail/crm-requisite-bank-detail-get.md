# Получить банковский реквизит по id crm.requisite.bankdetail.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает банковский реквизит по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. 

Идентификаторы банковских реквизитов можно получить с помощью метода [`crm.requisite.bankdetail.list`](./crm-requisite-bank-detail-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":357}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.bankdetail.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":357,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.bankdetail.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BankDetailGetResult = {
      ID: string
      ENTITY_ID: string
      COUNTRY_ID: string
      DATE_CREATE: ISODate | null
      DATE_MODIFY: ISODate | null
      CREATED_BY_ID: string
      MODIFY_BY_ID: string | null
      NAME: string
      CODE: string | null
      XML_ID: string
      ORIGINATOR_ID: string | null
      ACTIVE: string
      SORT: string
      RQ_BANK_NAME: string | null
      RQ_BANK_CODE: string | null
      RQ_BANK_ADDR: string | null
      RQ_BANK_ROUTE_NUM: string | null
      RQ_BIK: string | null
      RQ_MFO: string | null
      RQ_ACC_NAME: string | null
      RQ_ACC_NUM: string | null
      RQ_ACC_TYPE: string | null
      RQ_IIK: string | null
      RQ_ACC_CURRENCY: string | null
      RQ_COR_ACC_NUM: string | null
      RQ_IBAN: string | null
      RQ_SWIFT: string | null
      RQ_BIC: string | null
      RQ_CODEB: string | null
      RQ_CODEG: string | null
      RQ_RIB: string | null
      RQ_AGENCY_NAME: string | null
      COMMENTS: string | null
    }

    try {
      const response = await $b24.actions.v2.call.make<BankDetailGetResult>({
        method: 'crm.requisite.bankdetail.get',
        params: {
          id: 357,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bank detail:', result.ID, result.NAME, result.RQ_BIK)
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
      async function getBankDetail() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.bankdetail.get',
            params: {
              id: 357,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bank detail:', result.ID, result.NAME, result.RQ_BIK)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBankDetail)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.bankdetail.get',
                [
                    'id' => 357,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting bank detail: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.bankdetail.get",
        { id: 357 },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.bankdetail.get',
        ['id' => 357]
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
        "ID": "357",
        "ENTITY_ID": "27",
        "COUNTRY_ID": "1",
        "DATE_CREATE": "2024-06-03T17:52:22+02:00",
        "DATE_MODIFY": "",
        "CREATED_BY_ID": "1",
        "MODIFY_BY_ID": null,
        "NAME": "ПАО Супербанк",
        "CODE": null,
        "XML_ID": "1e4641fd-2dd9-31e6-b2f2-105056c00008",
        "ORIGINATOR_ID": null,
        "ACTIVE": "Y",
        "SORT": "600",
        "RQ_BANK_NAME": "ПАО Супербанк",
        "RQ_BANK_CODE": null,
        "RQ_BANK_ADDR": "117312, г. Москва, улица Вавилова, дом 19",
        "RQ_BANK_ROUTE_NUM": null,
        "RQ_BIK": "044525225",
        "RQ_MFO": null,
        "RQ_ACC_NAME": null,
        "RQ_ACC_NUM": "40702810938000060473",
        "RQ_ACC_TYPE": null,
        "RQ_IIK": null,
        "RQ_ACC_CURRENCY": "RUR",
        "RQ_COR_ACC_NUM": "30101810400000000225",
        "RQ_IBAN": null,
        "RQ_SWIFT": null,
        "RQ_BIC": null,
        "RQ_CODEB": null,
        "RQ_CODEG": null,
        "RQ_RIB": null,
        "RQ_AGENCY_NAME": null,
        "COMMENTS": null
    },
    "time": {
        "start": 1717495619.077607,
        "finish": 1717495619.708617,
        "duration": 0.6310100555419922,
        "processing": 0.07691788673400879,
        "date_start": "2024-06-04T12:06:59+02:00",
        "date_finish": "2024-06-04T12:06:59+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект, содержащий значения полей банковского реквизита ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей банковского реквизита

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. Создается автоматически и уникален в рамках портала ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта. Может быть только `Реквизит` (значение `8`).

Идентификаторы типов объектов возвращает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского объекта. Сейчас может быть только идентификатор реквизита. 

Идентификаторы реквизитов можно получить с помощью метода [`crm.requisite.list`](../universal/crm-requisite-list.md) ||
|| **COUNTRY_ID**
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](../presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID` 
||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME^*^**
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле. 

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями 
||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`. 

Сейчас поле фактически ни на что не влияет ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **RQ_BANK_NAME**
[`string`](../../../data-types.md) | Наименование банка ||
|| **RQ_BANK_ADDR**
[`string`](../../../data-types.md) | Адрес банка ||
|| **RQ_BANK_CODE**
[`string`](../../../data-types.md) | Código do banco (для страны BR) ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../../../data-types.md) | Bank Routing Number ||
|| **RQ_BIK**
[`string`](../../../data-types.md) | БИК ||
|| **RQ_CODEB**
[`string`](../../../data-types.md) | Code Banque (для страны FR) ||
|| **RQ_CODEG**
[`string`](../../../data-types.md) | Code Guichet (для страны FR) ||
|| **RQ_RIB**
[`string`](../../../data-types.md) | Clé RIB (для страны FR) ||
|| **RQ_MFO**
[`string`](../../../data-types.md) | МФО ||
|| **RQ_ACC_NAME**
[`string`](../../../data-types.md) | Bank Account Holder Name ||
|| **RQ_ACC_NUM**
[`string`](../../../data-types.md) | Bank Account Number ||
|| **RQ_ACC_TYPE**
[`string`](../../../data-types.md) | Tipo da conta (для страны BR) ||
|| **RQ_AGENCY_NAME**
[`string`](../../../data-types.md) | Agência (для страны BR) ||
|| **RQ_IIK**
[`string`](../../../data-types.md) | ИИК ||
|| **RQ_ACC_CURRENCY**
[`string`](../../../data-types.md) | Валюта счета ||
|| **RQ_COR_ACC_NUM**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **RQ_IBAN**
[`string`](../../../data-types.md) | IBAN ||
|| **RQ_SWIFT**
[`string`](../../../data-types.md) | SWIFT ||
|| **RQ_BIC**
[`string`](../../../data-types.md) | BIC ||
|| **COMMENTS**
[`string`](../../../data-types.md) | Комментарий ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The RequisiteBankDetail with ID '357' is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `ID is not defined or invalid` | Идентификатор банковского реквизита не определен или имеет недопустимое значение ||
|| `The RequisiteBankDetail with ID '357' is not found` | Банковский реквизит с указанным идентификатором не найден ||
|| `Access denied` | Недостаточно прав доступа для получения банковского реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-bank-detail-add.md)
- [{#T}](./crm-requisite-bank-detail-update.md)
- [{#T}](./crm-requisite-bank-detail-list.md)
- [{#T}](./crm-requisite-bank-detail-delete.md)
- [{#T}](./crm-requisite-bank-detail-fields.md)