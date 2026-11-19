# Изменить роль участников группы sonet_group.user.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet_group`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор Битрикс24 или модуля Социальная сеть

Метод `sonet_group.user.update` изменяет роль участников рабочей группы или проекта.

Для смены владельца используйте метод [sonet_group.setowner](../sonet-group-setowner.md)

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить методом [sonet_group.get](../sonet-group-get.md) ||
|| **USER_ID***
[```integer | integer[]```](../../data-types.md#compound-types) | Идентификатор участника или массив идентификаторов участников.

Идентификатор можно получить с помощью метода [sonet_group.user.get](./sonet-group-user-get.md).

Для одиночного значения проверяется, что после приведения к целому числу оно больше нуля. Для массива проверяется только его непустота ||
|| **ROLE***
[`string`](../../data-types.md) | Код новой роли участника.

Возможные значения:
- `E` — модератор
- `K` — участник
||
|#

{% note info "" %}

Роль пользователя не будет обновлена, если пользователь является владельцем группы или проекта.

Если пользователь приглашен в группу, но еще не принял приглашение, метод может изменить его роль и сделать участником без подтверждения приглашения

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272],"ROLE":"E"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272],"ROLE":"E","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.update
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
        method: 'sonet_group.user.update',
        params: {
          GROUP_ID: 69,
          USER_ID: [1271, 1272],
          ROLE: 'E',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated user IDs:', result)
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
      async function updateGroupUsersRole() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.user.update',
            params: {
              GROUP_ID: 69,
              USER_ID: [1271, 1272],
              ROLE: 'E',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated user IDs:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateGroupUsersRole)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sonet_group.user.update(
            group_id=69,
            user_id=[
                1271,
                1272,
            ],
            role="E",
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
                'sonet_group.user.update',
                [
                    'GROUP_ID' => 69,
                    'USER_ID' => [1271, 1272],
                    'ROLE' => 'E'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating group users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.update',
        {
            GROUP_ID: 69,
            USER_ID: [1271, 1272],
            ROLE: 'E'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'sonet_group.user.update',
        [
            'GROUP_ID' => 69,
            'USER_ID' => [1271, 1272],
            'ROLE' => 'E'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sonet_group.user.update", b24.Params{
    	"GROUP_ID": 69,
    	"USER_ID":  []int{1271, 1272},
    	"ROLE":     "E",
    })
    if err != nil {
    	return fmt.Errorf("sonet_group.user.update: %w", err)
    }

    var items []b24.ID
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("получено:", len(items))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": ["1271", "1272"],
    "time": {
        "start": 1773810360,
        "finish": 1773810360.6451,
        "duration": 0.6451,
        "processing": 0.3112,
        "date_start": "2026-03-18T08:46:00+03:00",
        "date_finish": "2026-03-18T08:46:00+03:00",
        "operating_reset_at": 1773810960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив строковых идентификаторов пользователей, для которых роль успешно обновлена.

Пустой массив означает, что ни одна роль не обновлена. Например, у указанных пользователей нет связи с группой или они уже имеют указанную роль ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Incorrect role code"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Wrong group ID` | Не передан `GROUP_ID` или его значение после приведения к целому числу не больше нуля ||
|| `400` | Пустое значение | `No permissions to update users role` | Недостаточно прав для изменения роли участников ||
|| `400` | Пустое значение | `Incorrect role code` | Передано неподдерживаемое значение `ROLE` ||
|| `400` | Пустое значение | `Wrong user IDs` | Не передан `USER_ID`, одиночное значение после приведения к целому числу не больше нуля или передан пустой массив ||
|| `400` | Пустое значение | `Socialnetwork group not found` | Группа или проект с указанным `GROUP_ID` не найдены ||
|| `400` | Пустое значение | `Не установлены обязательные модули: extranet` | Группа — коллаб, модуль `extranet` недоступен, а изменение создает членство пользователя не из числа сотрудников или повышает его роль ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sonet-group-user-invite.md)
- [{#T}](./sonet-group-user-request.md)
- [{#T}](./sonet-group-user-add.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
