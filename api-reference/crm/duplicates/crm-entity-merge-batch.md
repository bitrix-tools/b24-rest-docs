# Объединить дубликаты crm.entity.mergeBatch

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: администратор

Метод `crm.entity.mergeBatch` объединяет несколько элементов в один. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params***
[`object`](../../data-types.md) | Объект с элементами для объединения [(подробное описание)](#params) ||
|#

### Параметр params{#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../data-types.md) | Идентификатор [типа объекта CRM](../data-types.md#object_type). Возможные значения:
- `1` — [лид](../leads/index.md)
- `2` — [сделка](../deals/index.md)
- `3` — [контакт](../contacts/index.md)
- `4` — [компания](../companies/index.md)
- `7` — [предложение](../quote/index.md)
- `31` — [счет](../universal/invoice.md)
- `128` — [смарт-процесс](../universal/index.md). Идентификатор конкретного смарт-процесса можно узнать методами [crm.enum.ownertype](../auxiliary/enum/crm-enum-owner-type.md) и [crm.type.list](../universal/user-defined-object-types/crm-type-list.md) ||
|| **entityIds***
[`integer[]`](../../data-types.md) | Массив идентификаторов элементов, которые необходимо объединить. Минимум два элемента ||
|#

### Особенности работы метода

Объединять можно только элементы одного типа: лид с лидом, контакт с контактом, элемент смарт-процесса с ID 128 c элементом смарт-процесса с ID 128.

Полное автоматическое объединение доступно в нескольких случаях: 
- элементы идентичны друг другу,
- элементы не идентичны, но разница в значениях полей не требует ручной обработки. Например, в одном элементе поле заполнено, а в другом это же поле пустое — будет сохранено значение из заполненного поля.

Главным элементом при объединении будет тот, `ID` которого указан первым в массиве `entityIds`. В главный элемент будет перенесена информация из других элементов. Все элементы кроме главного будут удалены после успешного объединения. 

#### Ручное объединение при конфликте

Если метод возвращает статус `CONFLICT`, продолжить объединение можно вручную в интерфейсе Битрикс24 по ссылке:

- Контакты: `/crm/contact/merge/?id=1,2,3`
- Компании: `/crm/company/merge/?id=1,2,3`
- Лиды: `/crm/lead/merge/?id=1,2,3`
- Сделки: `/crm/deal/merge/?id=1,2,3`
  
Параметр `id` содержит идентификаторы объединяемых элементов через запятую.  

- Счета: `/crm/type/31/merge/?id[]=1&id[]=2`
- Предложения: `/crm/type/7/merge/?id[]=1&id[]=2`
- Смарт-процессы: `/crm/type/128/merge/?id[]=1&id[]=2`

Параметр `id[]` содержит идентификаторы объединяемых элементов, переданные в виде повторяющегося параметра.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"params":{"entityTypeId":3,"entityIds":[100,101,102]}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.entity.mergeBatch
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**","params":{"entityTypeId":3,"entityIds":[100,101,102]}}' \
         https://**put_your_bitrix24_address**/rest/crm.entity.mergeBatch
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MergeBatchResult = {
      STATUS: 'SUCCESS' | 'CONFLICT' | 'ERROR'
      ENTITY_IDS: number[]
    }

    try {
      const response = await $b24.actions.v2.call.make<MergeBatchResult>({
        method: 'crm.entity.mergeBatch',
        params: {
          params: {
            entityTypeId: 3,
            entityIds: [100, 101, 102],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Merge status:', result.STATUS, '| Deleted entity IDs:', result.ENTITY_IDS)
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
      async function mergeEntities() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.entity.mergeBatch',
            params: {
              params: {
                entityTypeId: 3,
                entityIds: [100, 101, 102],
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
          console.info('Merge status:', result.STATUS, '| Deleted entity IDs:', result.ENTITY_IDS)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', mergeEntities)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.entity.mergeBatch',
                [
                    'params' => [
                        'entityTypeId' => 3,
                        'entityIds'    => [100, 101, 102]
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
        echo 'Error merging entities: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.entity.mergeBatch',
        {
            params: {
                entityTypeId: 3,
                entityIds: [100, 101, 102]
            }
        },
        function(result) {
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
        'crm.entity.mergeBatch',
        [
            'params' => [
                'entityTypeId' => 3,
                'entityIds' => [100, 101, 102]
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
        "STATUS": "SUCCESS",
        "ENTITY_IDS": [101, 102]
    },
    "time": {
        "start": 1750754639.300838,
        "finish": 1750754641.350269,
        "duration": 2.049431085586548,
        "processing": 2.0271031856536865,
        "date_start": "2025-06-24T11:43:59+03:00",
        "date_finish": "2025-06-24T11:44:01+03:00",
        "operating_reset_at": 1750755239,
        "operating": 0
    }
}

```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **STATUS**
[`string`](../../data-types.md) | Статус выполнения операции. Возможные значения:
- `SUCCESS` — объединение прошло успешно
- `CONFLICT` — возник конфликт данных, автоматическое объединение невозможно
- `ERROR` — произошла [ошибка](#errors) ||
|| **ENTITY_IDS**
[`integer[]`](../../data-types.md) | Массив идентификаторов элементов, которые были удалены при объединении ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400** 

```json
{
    "error": 0,
    "error_description": "The parameter entityIds must contains at least two elements."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок {#errors}

#|
|| **Код** | **Описание** | **Значение** ||
|| `403` | `Access denied` | У пользователя нет прав на изменение или удаление элементов CRM ||
|| `400` | `The parameter entityTypeId is required.` | Не указан обязательный параметр `entityTypeId` ||
|| `400` | `The parameter entityIds does not contains valid elements.` | Не переданы или не найдены элементы для объединения ||
|| `400` | `The parameter entityIds must contains at least two elements.` | Для объединения требуется минимум два элемента ||
|| `400` | `Owner was not found` | Объект не найден ||
|| `400` | `Entity type {entityTypeName} is not supported` | Указан неподдерживаемый тип объекта ||
|| `400` | `CRM_FEATURE_RESTRICTION_ERROR` | Ограничение тарифа ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.findbycomm](./crm-duplicate-find-by-comm.md) 