# Добавить пользователя в чат объекта CRM imopenlines.crm.chat.user.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения объекта CRM

Метод `imopenlines.crm.chat.user.add` добавляет пользователя в чат, привязанный к объекту CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип объекта CRM. Возможные значения:
- `lead` — лид
- `deal` — сделка
- `company` — компания
- `contact` — контакт

Регистр значения не учитывается ||
|| **CRM_ENTITY***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM.

Получить идентификатор можно универсальным методом [получения списка элементов CRM](../../../crm/universal/crm-item-list.md) ||
|| **USER_ID***
[`integer`](../../../data-types.md) | Идентификатор пользователя или бота, которого нужно добавить в чат. Пользователь должен быть активным, иметь право чтения объекта CRM и право «История разговора» на линию, к которой относится чат.

Получить идентификатор пользователя позволяют методы [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md) ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата.

Если параметр не передан, метод берет последний чат объекта CRM — тот же, который возвращает [imopenlines.crm.chat.getLastId](./imopenlines-crm-chat-get-last-id.md).

Получить идентификаторы активных чатов объекта CRM можно методом [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) ||
|#

{% note warning "" %}

Метод работает только с активным чатом — чатом, диалог в котором оператор взял в работу и который еще не перешел в режим закрытия. Если диалог в чате ждет в очереди или закрыт, метод вернет ошибку `CHAT_NOT_IN_CRM`. Список активных чатов объекта CRM возвращает метод [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md)

{% endnote %}

{% note info "" %}

Передавайте имена параметров в верхнем регистре: `CRM_ENTITY_TYPE`, а не `crm_entity_type`. Имена в нижнем регистре метод не распознает и вернет ошибку о пропущенном параметре

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"USER_ID":503,"CHAT_ID":1763}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.chat.user.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"USER_ID":503,"CHAT_ID":1763,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.user.add
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
        method: 'imopenlines.crm.chat.user.add',
        params: {
          CRM_ENTITY_TYPE: 'lead',
          CRM_ENTITY: 1205,
          USER_ID: 503,
          CHAT_ID: 1763,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('ID чата, в который добавлен пользователь:', result)
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
      async function addUserToChat() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.crm.chat.user.add',
            params: {
              CRM_ENTITY_TYPE: 'lead',
              CRM_ENTITY: 1205,
              USER_ID: 503,
              CHAT_ID: 1763,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('ID чата, в который добавлен пользователь:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUserToChat)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imopenlines.crm.chat.user.add(
            crm_entity_type="lead",
            crm_entity=1205,
            user_id=503,
            chat_id=1763,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.user.add',
                [
                    'CRM_ENTITY_TYPE' => 'lead',
                    'CRM_ENTITY' => 1205,
                    'USER_ID' => 503,
                    'CHAT_ID' => 1763,
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

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.user.add',
        {
            CRM_ENTITY_TYPE: 'lead',
            CRM_ENTITY: 1205,
            USER_ID: 503,
            CHAT_ID: 1763
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.crm.chat.user.add',
        [
            'CRM_ENTITY_TYPE' => 'lead',
            'CRM_ENTITY' => 1205,
            'USER_ID' => 503,
            'CHAT_ID' => 1763,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imopenlines.crm.chat.user.add", b24.Params{
    	"CRM_ENTITY_TYPE": "lead",
    	"CRM_ENTITY":      1205,
    	"USER_ID":         503,
    	"CHAT_ID":         1763,
    })
    if err != nil {
    	return fmt.Errorf("imopenlines.crm.chat.user.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1763,
    "time": {
        "start": 1773814042,
        "finish": 1773814043.189039,
        "duration": 1.1890389919281006,
        "processing": 0,
        "date_start": "2026-03-18T09:07:22+03:00",
        "date_finish": "2026-03-18T09:07:23+03:00",
        "operating_reset_at": 1773814643,
        "operating": 0.16756796836853027
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор чата, в который добавлен пользователь.

Если `CHAT_ID` не передан и у объекта CRM нет чатов, метод вернет `"result":0` и никого не добавит. Параметр `USER_ID` в этом случае не проверяется ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_NOT_IN_CRM",
    "error_description": "Chat does not belong to the CRM entity being checked"
}
```

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! You don't have access to join user to chat | Возможные причины:
- у пользователя, который выполняет метод, нет права чтения объекта CRM
- передан неизвестный тип объекта в `CRM_ENTITY_TYPE`, например `abc`
||
|| `403` | `ACCESS_DENIED` | Access denied! This user does not have access to the chat because he does not have access to this CRM entity | У пользователя `USER_ID` нет доступа к объекту CRM ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CRM_ENTITY_TYPE' is null or empty | Не передан обязательный параметр `CRM_ENTITY_TYPE` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CRM_ENTITY' is null or empty | Не передан обязательный параметр `CRM_ENTITY` ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument 'CRM_ENTITY' has an invalid type | Параметр `CRM_ENTITY` не число или число меньше 1 ||
|| `400` | `ERROR_ARGUMENT` | Argument 'Empty USER_ID' is null or empty | Не передан обязательный параметр `USER_ID` или значение меньше 1 ||
|| `400` | `IM_NOT_INSTALLED` | Messenger is not installed. | Модуль `im` не установлен ||
|| `400` | `CHAT_NOT_IN_CRM` | Chat does not belong to the CRM entity being checked | Возможные причины:
- чат не связан с объектом CRM или не существует
- диалог в чате не активен: ждет в очереди или закрыт
||
|| `400` | `CRM_CHAT_USER_NOT_ACTIVE` | User not active | Пользователь `USER_ID` не активен или не существует ||
|| `403` | `ACCESS_DENIED` | Access denied! This user does not have access to the chat because he does not have access to this view chat history | У пользователя `USER_ID` нет права «История разговора» на линию ||
|| `400` | `WRONG_REQUEST` | You don't have access or user already member in chat | Пользователь уже состоит в чате или недоступен для добавления ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-crm-chat-get-last-id.md)
- [{#T}](./imopenlines-crm-chat-get.md)
- [{#T}](./imopenlines-crm-chat-user-delete.md)
