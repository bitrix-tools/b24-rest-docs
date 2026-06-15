# Получить поля, доступные для добавления в шаблон реквизитов crm.requisite.preset.field.availabletoadd

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает поля, доступные для добавления в указанный шаблон реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, для которого нужно получить список доступных для добавления настраиваемых полей. 

Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md). 

Поля с префиксом `UF_` в ответе являются пользовательскими (смотрите [методы](../../user-fields/index.md) для работы с пользовательскими полями реквизитов) ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.availabletoadd
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.availabletoadd
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<string[]>({
        method: 'crm.requisite.preset.field.availabletoadd',
        params: {
          preset: {
            ID: 27,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Available fields:', result, 'Count:', result.length)
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
      async function getAvailablePresetFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.field.availabletoadd',
            params: {
              preset: {
                ID: 27,
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
          console.info('Available fields:', result, 'Count:', result.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAvailablePresetFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.preset.field.availabletoadd',
                [
                    'preset' => [
                        'ID' => 27
                    ]
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
        echo 'Error checking available fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.availabletoadd",
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.availabletoadd',
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
        "RQ_FIRST_NAME",
        "RQ_LAST_NAME",
        "RQ_SECOND_NAME",
        "RQ_COMPANY_NAME",
        "RQ_COMPANY_FULL_NAME",
        "RQ_COMPANY_REG_DATE",
        "RQ_DIRECTOR",
        "RQ_ACCOUNTANT",
        "RQ_ADDR",
        "RQ_CONTACT",
        "RQ_EMAIL",
        "RQ_PHONE",
        "RQ_FAX",
        "RQ_IDENT_DOC",
        "RQ_IDENT_DOC_SER",
        "RQ_IDENT_DOC_NUM",
        "RQ_IDENT_DOC_DATE",
        "RQ_IDENT_DOC_ISSUED_BY",
        "RQ_IDENT_DOC_DEP_CODE",
        "RQ_INN",
        "RQ_KPP",
        "RQ_IFNS",
        "RQ_OGRN",
        "RQ_OGRNIP",
        "RQ_OKPO",
        "RQ_OKTMO",
        "RQ_OKVED",
        "RQ_ST_CERT_SER",
        "RQ_ST_CERT_NUM",
        "RQ_ST_CERT_DATE",
        "RQ_SIGNATURE",
        "RQ_STAMP",
        "UF_CRM_1707997209",
        "UF_CRM_1707997236",
        "UF_CRM_1707997253",
        "UF_CRM_1708012333"
    ]
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Массив с названиями полей, которые можно добавить в указанный шаблон реквизитов ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей

#|
|| **Название**
`тип` | **Описание** ||
|| **RQ_FIRST_NAME**
[`string`](../../../../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../../../../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../../../../data-types.md) | Отчество ||
|| **RQ_COMPANY_NAME**
[`string`](../../../../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../../../../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../../../../data-types.md) | Главный бухгалтер ||
|| **RQ_CONTACT**
[`string`](../../../../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../../../../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../../../../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../../../../data-types.md) | Факс ||
|| **RQ_IDENT_DOC**
[`string`](../../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../../../../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../../../../data-types.md) | КПП ||
|| **RQ_IFNS**
[`string`](../../../../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../../../../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../../../../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../../../../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../../../../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../../../../data-types.md) | ОКВЭД ||
|| **RQ_ST_CERT_SER**
[`string`](../../../../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../../data-types.md) | Дата свидетельства о государственной регистрации ||
|| **UF_CRM_1707997209**
[`double`](../../../../data-types.md) | Пользовательское поле типа «Число» ||
|| **UF_CRM_1707997236**
[`boolean`](../../../../data-types.md) | Пользовательское поле типа «Да/Нет» ||
|| **UF_CRM_1707997253**
[`datetime`](../../../../data-types.md) | Пользовательское поле типа «Дата» ||
|| **UF_CRM_1708012333**
[`string`](../../../../data-types.md) | Пользовательское поле типа «Строка» ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "Шаблон не найден."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `Шаблон не найден` | Не найден шаблон, для которого нужно получить список полей, доступных для добавления ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)
