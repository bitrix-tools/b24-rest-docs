# Получить информацию о шаблоне документа по Id crm.documentgenerator.template.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.template.get` возвращает информацию о шаблоне по его идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения шаблона документа, где:
- идентификатор шаблона — `41`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateGetResult = {
      template: {
        id: string
        name: string
        region: string
        code: string | null
        download: string
        downloadMachine: string
        active: string
        moduleId: string
        numeratorId: string
        withStamps: string
        users: Record<string, string>
        isDeleted: string
        sort: string
        entityTypeId: string[]
        createTime: ISODate
        updateTime: ISODate
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<TemplateGetResult>({
        method: 'crm.documentgenerator.template.get',
        params: {
          id: 41,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.template.id, result.template.name, result.template.active)
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
      async function getTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.template.get',
            params: {
              id: 41,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.template.id, result.template.name, result.template.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplate)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.template.get',
                [
                    'id' => 41,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.get',
        {
            id: 41,
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
        'crm.documentgenerator.template.get',
        [
            'id' => 41,
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
        "template": {
            "id": "41",
            "name": "Шаблон из файла (обновлен)",
            "region": "ru",
            "code": null,
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=41",
            "downloadMachine": "https://mysite.ru/rest/crm.documentgenerator.template.download.json?auth=***&token=***",
            "active": "Y",
            "moduleId": "crm",
            "numeratorId": "49",
            "withStamps": "N",
            "users": {
                "UA": "UA"
            },
            "isDeleted": "N",
            "sort": "500",
            "entityTypeId": [
                "2"
            ],
            "createTime": "2026-03-18T15:54:20+03:00",
            "updateTime": "2026-03-18T17:26:29+03:00"
        }
    },
    "time": {
        "start": 1773846100,
        "finish": 1773846100.102531,
        "duration": 0.10253095626831055,
        "processing": 0,
        "date_start": "2026-03-18T18:01:40+03:00",
        "date_finish": "2026-03-18T18:01:40+03:00",
        "operating_reset_at": 1773846700,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`template`](#template) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **code**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Символьный код шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона для приложения ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона: `Y` или `N` ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печать и подпись: `Y` или `N` ||
|| **users**
[`object`](../../data-types.md) | Объект кодов прав доступа в формате `{"UA":"UA"}` ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона: `Y` или `N` ||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **entityTypeId**
[`array`](../../data-types.md) | Массив идентификаторов CRM-элементов, для которых доступен шаблон ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания шаблона ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время последнего обновления шаблона ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Шаблон не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Шаблон не найден | Шаблон с указанным `id` не найден или недоступен ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к шаблону ||
|| `Пустое значение` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-add.md)
- [{#T}](./crm-document-generator-template-update.md)
- [{#T}](./crm-document-generator-template-list.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [Получить поля шаблона документа crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
