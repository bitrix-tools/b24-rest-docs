# Отвязать Базу знаний от группы Социальной сети landing.site.unbindingFromGroup

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты и правами на редактирование Базы знаний в указанной группе

Метод `landing.site.unbindingFromGroup` удаляет привязку Базы знаний к группе Социальной сети.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор сайта Базы знаний.

`id` можно получить, например, из метода [landing.site.getList](../../site/landing-site-get-list.md) в поле `ID` ||
|| **groupId**^*^
[`integer`](../../../data-types.md) | Идентификатор группы Социальной сети.

`groupId` можно получить:
- из интерфейса группы
- из результата метода [landing.site.getGroupBindings](./landing-site-get-group-bindings.md) в поле `BINDING_ID`
- методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md)
- методом [sonet_group.get](../../../sonet-group/sonet-group-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления привязки Базы знаний от группы, где:
- `id` — идентификатор сайта Базы знаний
- `groupId` — идентификатор группы

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.unbindingFromGroup.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.unbindingFromGroup.json"
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
        method: 'landing.site.unbindingFromGroup',
        params: {
          id: 32,
          groupId: 174,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Unbinding result:', result)
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
      async function unbindSiteFromGroup() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.unbindingFromGroup',
            params: {
              id: 32,
              groupId: 174,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Unbinding result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', unbindSiteFromGroup)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.unbindingFromGroup',
                [
                    'id' => 32,
                    'groupId' => 174,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding site from group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.unbindingFromGroup',
        {
            id: 32,
            groupId: 174
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.unbindingFromGroup',
        [
            'id' => 32,
            'groupId' => 174,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1774952664,
        "finish": 1774952665.017161,
        "duration": 1.0171608924865723,
        "processing": 0,
        "date_start": "2026-03-31T13:24:24+03:00",
        "date_finish": "2026-03-31T13:24:25+03:00",
        "operating_reset_at": 1774953265,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат отвязки:

- `true` — привязка удалена
- `false` — привязка не удалена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: groupId | Вызов метода без `groupId` ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: id | Вызов метода без `id` ||
|| `TYPE_ERROR` | Bitrix\Landing\PublicAction\Site::unbindingFromGroup(): Argument #2 ($groupId) must be of type int, string given | Параметр `groupId` передан строкой вместо `int` ||
|| `TYPE_ERROR` | Bitrix\Landing\PublicAction\Site::unbindingFromGroup(): Argument #1 ($id) must be of type int, string given | Параметр `id` передан строкой вместо `int` ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-binding-to-group.md)
- [{#T}](./landing-site-get-group-bindings.md)
- [{#T}](./landing-site-unbinding-from-menu.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./index.md)
