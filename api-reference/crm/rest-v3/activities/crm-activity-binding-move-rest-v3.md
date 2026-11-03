# Перенести привязку дела v 3.0 crm.activity.binding.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение дела и обоих элементов CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.activity.binding.move` переносит привязку дела с одного элемента CRM на другой и возвращает привязки дела после переноса. Так можно сменить элемент у дела с единственной привязкой, которую нельзя снять методом [crm.activity.binding.unbind](./crm-activity-binding-unbind-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../data-types.md) | Идентификатор дела.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|| **from***
[`object`](../../../data-types.md) | Элемент CRM в формате `{"entityTypeId": 2, "entityId": 9001}`: `entityTypeId` — идентификатор типа объекта, `entityId` — идентификатор элемента. Элемент, от которого отвязывается дело. Дело должно быть к нему привязано.

Идентификаторы типов объектов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md), для смарт-процесса — [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|| **to***
[`object`](../../../data-types.md) | Элемент CRM, к которому привязывается дело, в том же формате ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.binding.move`

{% endnote %}

Примеры переносят дело с элемента смарт-процесса `1038` с идентификатором `41` на сделку `9001`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":8463,"from":{"entityTypeId":1038,"entityId":41},"to":{"entityTypeId":2,"entityId":9001}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.binding.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":8463,"from":{"entityTypeId":1038,"entityId":41},"to":{"entityTypeId":2,"entityId":9001},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.binding.move
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ActivityMoveResult = {
      items: Array<{
        entityTypeId: number
        entityId: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ActivityMoveResult>(
        'crm.activity.binding.move',
        {
          activityId: 8463,
          from: {
            entityTypeId: 1038,
            entityId: 41,
          },
          to: {
            entityTypeId: 2,
            entityId: 9001,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bindings:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function moveActivity() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.binding.move',
            {
              activityId: 8463,
              from: {
                entityTypeId: 1038,
                entityId: 41,
              },
              to: {
                entityTypeId: 2,
                entityId: 9001,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bindings:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveActivity)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.binding.move"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "activityId": 8463,
                "from": {
                    "entityTypeId": 1038,
                    "entityId": 41,
                },
                "to": {
                    "entityTypeId": 2,
                    "entityId": 9001,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.binding.move',
                [
                    'activityId' => 8463,
                    'from' => [
                        'entityTypeId' => 1038,
                        'entityId' => 41,
                    ],
                    'to' => [
                        'entityTypeId' => 2,
                        'entityId' => 9001,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.activity.binding.move',
        {
            activityId: 8463,
            from: {
                entityTypeId: 1038,
                entityId: 41,
            },
            to: {
                entityTypeId: 2,
                entityId: 9001,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.move',
        [
            'activityId' => 8463,
            'from' => [
                'entityTypeId' => 1038,
                'entityId' => 41,
            ],
            'to' => [
                'entityTypeId' => 2,
                'entityId' => 9001,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.binding.move", b24.Params{
    	"activityId": 8463,
    	"from": b24.Params{
    		"entityTypeId": 1038,
    		"entityId":     41,
    	},
    	"to": b24.Params{
    		"entityTypeId": 2,
    		"entityId":     9001,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.binding.move: %w", err)
    }

    var result struct {
    	Items []struct {
    		EntityTypeID int `json:"entityTypeId"`
    		EntityID     int `json:"entityId"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.EntityTypeID, item.EntityID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "entityTypeId": 2,
                "entityId": 9001
            }
        ]
    },
    "time": {
        "start": 1793711360,
        "finish": 1793711360.764732,
        "duration": 0.7647318840026855,
        "processing": 0,
        "date_start": "2026-11-03T16:09:20+03:00",
        "date_finish": "2026-11-03T16:09:20+03:00",
        "operating_reset_at": 1793711940,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`object[]`](../../../data-types.md) | Привязки дела после операции: `entityTypeId` — тип объекта, `entityId` — идентификатор элемента. Привязки к элементам, которые вам недоступны для просмотра, в ответ не входят, но сохраняются ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "CRM_ACTIVITY_BINDING_NOT_FOUND",
        "message": "Дело не привязано к указанному элементу CRM"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `activityId` | Обязательное поле `activityId` не указано | Передайте `activityId` ||
|| `activityId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор дела ||
|| `from` | Обязательное поле `from` не указано | Передайте `from` объектом ||
|| `from` | The parent must be an object of entityTypeId and entityId. | Передайте `from` объектом с полями `entityTypeId` и `entityId`, а не массивом ||
|| `from.entityId` | Обязательное поле `from.entityId` не указано | Передайте оба поля: `entityTypeId` и `entityId` ||
|| `from.entityTypeId` | В поле `from.entityTypeId` требуется тип данных `integer` для такого запроса | Передайте идентификаторы числами, а не строками ||
|| `from.entityTypeId` | The type of the parent is not defined. | Передайте существующий идентификатор типа объекта ||
|| `from.entityId` | The identifier of the parent must be positive. | Передайте положительный идентификатор элемента ||
|| `to` | Обязательное поле `to` не указано | Передайте `to` объектом. Для `to` действуют те же проверки, что для `from` ||
|#

#### Привязка не найдена

Код ошибки: `CRM_ACTIVITY_BINDING_NOT_FOUND`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Дело не привязано к указанному элементу CRM | Проверьте `from` методом [crm.activity.binding.list](./crm-activity-binding-list-rest-v3.md) ||
|#

#### Дело не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Дела нет или у вас нет права на его изменение. Проверьте `activityId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Элемента нет или у вас нет права на его изменение. Проверьте идентификатор элемента и права ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода, например `crm.activity.binding.move` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-binding-bind-rest-v3.md)
- [{#T}](./crm-activity-binding-unbind-rest-v3.md)
- [{#T}](./crm-activity-binding-list-rest-v3.md)
