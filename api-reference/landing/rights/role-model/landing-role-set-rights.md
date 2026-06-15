# Установить права роли для списка сайтов landing.role.setRights

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.setRights` устанавливает права роли по сайтам. Для каждого сайта можно задать отдельные права, а для остальных — общие права по умолчанию. Новый набор прав полностью заменяет предыдущий.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор роли, для которой нужно обновить права.

Получить идентификатор можно с помощью метода [landing.role.getList](./landing-role-get-list.md)

Если передать идентификатор несуществующей роли, метод не вернет отдельную ошибку ||
|| **rights***
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Объект формата:

```json
{
    "0": ["read"],
    "<siteId>": ["read", "edit", "sett"]
}
```

где:
- `0` — право по умолчанию для сайтов без отдельной настройки
- `<siteId>` — идентификатор сайта

Список доступных кодов прав описан [ниже](#right-codes), а структура объекта — в таблице параметра [rights](#rights).

Метод полностью заменяет ранее сохраненные права роли по сайтам ||
|| **additional**
[`string[]`](../../../data-types.md) | Дополнительные возможности роли.

**Возможные значения:**

- `menu24` — показывать для роли пункт меню «Сайты и магазины»
- `create` — разрешить создавать новые сайты

Если параметр не передавать, текущие дополнительные возможности роли сохранятся без изменений ||
|#

### Параметр rights {#rights}

#|
|| **Название**
`тип` | **Описание** ||
|| **`0`**
[`string[]`](../../../data-types.md) | Права роли по умолчанию для всех сайтов, у которых нет отдельной настройки.

Доступные коды прав описаны [ниже](#right-codes) ||
|| **`<siteId>`**
[`string[]`](../../../data-types.md) | Права роли для сайта с указанным идентификатором.

Ключом служит идентификатор сайта, значением — массив кодов прав. Если сайт с таким идентификатором не найден, запись будет пропущена без ошибки.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md).

Для каждого сайта передавайте массив кодов прав. Если вместо массива передать другое значение, запись для этого сайта будет пропущена без ошибки ||
|#

### Коды прав {#right-codes}

#|
|| **Код** | **Описание** ||
|| `denied` | Доступ к сайту запрещен ||
|| `read` | Просмотр сайта ||
|| `edit` | Изменение страниц сайта ||
|| `sett` | Изменение настроек сайта ||
|| `public` | Публикация ||
|| `delete` | Удаление в корзину и восстановление из корзины ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 11,
        "rights": {
          "0": ["read"],
          "66": ["read", "edit", "sett"],
          "71": ["denied"]
        },
        "additional": ["menu24", "create"]
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.setRights.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 11,
        "rights": {
          "0": ["read"],
          "66": ["read", "edit", "sett"],
          "71": ["denied"]
        },
        "additional": ["menu24", "create"],
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.setRights.json"
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
        method: 'landing.role.setRights',
        params: {
          id: 11,
          rights: {
            0: ['read'],
            66: ['read', 'edit', 'sett'],
            71: ['denied'],
          },
          additional: ['menu24', 'create'],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Rights set successfully:', result)
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
      async function setRoleRights() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.role.setRights',
            params: {
              id: 11,
              rights: {
                0: ['read'],
                66: ['read', 'edit', 'sett'],
                71: ['denied'],
              },
              additional: ['menu24', 'create'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Rights set successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setRoleRights)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.role.setRights',
                [
                    'id' => 11,
                    'rights' => [
                        0 => ['read'],
                        66 => ['read', 'edit', 'sett'],
                        71 => ['denied'],
                    ],
                    'additional' => ['menu24', 'create'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting role rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.setRights',
        {
            id: 11,
            rights: {
                0: ['read'],
                66: ['read', 'edit', 'sett'],
                71: ['denied']
            },
            additional: ['menu24', 'create']
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
        'landing.role.setRights',
        [
            'id' => 11,
            'rights' => [
                0 => ['read'],
                66 => ['read', 'edit', 'sett'],
                71 => ['denied'],
            ],
            'additional' => ['menu24', 'create'],
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
        "start": 1775071662,
        "finish": 1775071663.148474,
        "duration": 1.1484739780426025,
        "processing": 0,
        "date_start": "2026-04-01T22:27:42+03:00",
        "date_finish": "2026-04-01T22:27:43+03:00",
        "operating_reset_at": 1775072263,
        "operating": 0.1147608757019043
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат вызова.

Метод возвращает `true`, если запрос обработан без ошибки доступа или системной ошибки.

Значение `true` не гарантирует, что права были записаны для каждого переданного сайта. Если сайт не найден или формат одной из записей некорректен, такая запись будет пропущена без ошибки.

После вызова проверьте сохраненный набор прав методом [landing.role.getRights](./landing-role-get-rights.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: rights"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для работы с разделом «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Управление правами в разделе «Сайты и магазины» недоступно на текущем тарифе ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` или `rights` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-get-list.md)
- [{#T}](./landing-role-get-rights.md)
- [{#T}](./landing-role-set-access-codes.md)
