# Изменить группу или проект sonet_group.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или владелец группы или проекта

Метод `sonet_group.update` изменяет параметры рабочей группы или проекта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../data-types.md) | Идентификатор группы или проекта.

Идентификатор можно получить методом [sonet_group.get](./sonet-group-get.md) ||
|| **NAME**
[`string`](../data-types.md) | Новое название ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Новое описание ||
|| **VISIBLE**
[`string`](../data-types.md) | Видимость группы в списке.

Возможные значения:
- `Y` — группа видна в общем списке
- `N` — группа скрыта из общего списка

Для экстранет-пользователя значение принудительно устанавливается в `N` ||
|| **OPENED**
[`string`](../data-types.md) | Открыта ли группа для свободного вступления.

Возможные значения:
- `Y` — пользователь может вступить в группу без подтверждения
- `N` — вступление по приглашению или запросу

Для экстранет-пользователя значение принудительно устанавливается в `N` ||
|| **CLOSED**
[`string`](../data-types.md) | Архивная ли группа.

Возможные значения:
- `Y` — группа в архиве
- `N` — активная группа ||
|| **KEYWORDS**
[`string`](../data-types.md) | Ключевые слова через запятую ||
|| **INITIATE_PERMS**
[`string`](../data-types.md) | Кто может приглашать участников.

Возможные значения:
- `A` — только владелец группы
- `E` — владелец и модераторы
- `K` — все участники ||
|| **PROJECT_DATE_START**
[`datetime`](../data-types.md) | Дата начала проекта в формате ISO-8601 ||
|| **PROJECT_DATE_FINISH**
[`datetime`](../data-types.md) | Дата окончания проекта в формате ISO-8601 ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Новый владелец группы.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md) ||
|| **IMAGE**
[`file`](../data-types.md) | Новый аватар группы в формате [Base64](../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64) ||
|| **IMAGE_FILE_ID**
[`integer`](../data-types.md) | Идентификатор файла из Диска для установки аватара.

Идентификатор файла можно получить методами [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md) и [disk.folder.getchildren](../disk/folder/disk-folder-get-children.md).

Чтобы удалить аватар передавайте `IMAGE_FILE_ID: 0`. Аватар удалится, даже если одновременно передать `IMAGE`, он не будет использован ||
|| **SITE_ID**
[`array`](../data-types.md) | Список сайтов, к которым привязана группа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"NAME":"Новый заголовок проекта"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"NAME":"Новый заголовок проекта","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.update
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
        method: 'sonet_group.update',
        params: {
          GROUP_ID: 77,
          NAME: 'New project title',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated group ID:', result)
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
      async function updateSonetGroup() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.update',
            params: {
              GROUP_ID: 77,
              NAME: 'New project title',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated group ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSonetGroup)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.update',
                [
                    'GROUP_ID' => 77,
                    'NAME' => 'Новый заголовок проекта'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.update',
        {
            GROUP_ID: 77,
            NAME: 'Новый заголовок проекта'
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
        'sonet_group.update',
        [
            'GROUP_ID' => 77,
            'NAME' => 'Новый заголовок проекта'
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
    "result": 77,
    "time": {
        "start": 1773923568,
        "finish": 1773923568.505599,
        "duration": 0.5055990219116211,
        "processing": 0,
        "date_start": "2026-03-19T15:32:48+03:00",
        "date_finish": "2026-03-19T15:32:48+03:00",
        "operating_reset_at": 1773924168,
        "operating": 0.3419780731201172
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор обновленной группы или проекта ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong group ID"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `User has no permissions to update group` | Недостаточно прав для изменения группы или проекта ||
|| — | `Cannot update group` | Не удалось обновить группу или проект ||
|| `ERROR_IMAGE_ID` | `Изображение не корректно: Неверный тип файла` | Передан некорректный `IMAGE` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-create.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
