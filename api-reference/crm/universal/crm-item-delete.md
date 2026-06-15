# Удалить элемент crm.item.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «удаление» элементов объекта CRM

Метод удаляет элемент объекта CRM по идентификатору элемента и идентификатору типа элемента

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../data-types.md#object_type) или [пользовательского типа](./user-defined-object-types/index.md), чей элемент мы хотим удалить.

Числовые значения для системных типов (Лид — 1, Сделка — 2, Контакт — 3, Компания — 4, Счёт — 31 и др.) приведены в [справочнике типов объектов CRM](../data-types.md#object_type). Идентификатор смарт-процесса можно узнать методом [crm.type.list](./user-defined-object-types/crm-type-list.md) ||
|| **id***
[`integer`][1] | Идентификатор элемента, который нужно удалить.

Можно получить методом [`crm.item.list`](./crm-item-list.md) или при создании элемента [`crm.item.add`](./crm-item-add.md) ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Удаления элемента с `id = 1`, принадлежащему смарт-процессу с `entityTypeId = 1268`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1268,"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1268,"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.delete
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<never[]>({
        method: 'crm.item.delete',
        params: {
          entityTypeId: 1268,
          id: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item deleted successfully', result)
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
      async function deleteItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.delete',
            params: {
              entityTypeId: 1268,
              id: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item deleted successfully', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteItem)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.delete',
                [
                    'entityTypeId' => 1268,
                    'id'           => 1,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Success: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.delete',
            {
                entityTypeId: 1268,
                id: 1,
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
        'crm.item.delete',
        [
            'entityTypeId' => 1268,
            'id' => 1
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
    "result": [],
    "time": {
        "start": 1721657688.755373,
        "finish": 1721657689.65017,
        "duration": 0.8947970867156982,
        "processing": 0.6092040538787842,
        "date_start": "2024-07-22T16:14:48+02:00",
        "date_finish": "2024-07-22T16:14:49+02:00",
        "operating": 0
    }
}
```

### Возвращаемые значения

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`][1] | Корневой элемент ответа.

Возвращает пустой массив `[]` в случае успеха ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код**                          | **Описание**                                     | **Значение**                                                      ||
|| `allowed_only_intranet_user`     | Действие разрешено только интранет-пользователям | Пользователь не является интранет-пользователем                   ||
|| `NOT_FOUND`                      | Смарт-процесс не найден                          | Возникает, при передаче невалидного `entityTypeId`                ||
|| `NOT_FOUND`                      | Элемент не найден                                | Элемент с переданным `id` типа `entityTypeId` не существует       ||
|| `ACCESS_DENIED`                  | Доступ запрещен                                  | У пользователя нет прав на удаление элементов типа `entityTypeId` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}


## Продолжите изучение

- [{#T}](crm-item-add.md)
- [{#T}](crm-item-update.md)
- [{#T}](crm-item-get.md)
- [{#T}](crm-item-list.md)
- [{#T}](crm-item-fields.md)
- [{#T}](./object-fields.md)

[1]: ../../data-types.md