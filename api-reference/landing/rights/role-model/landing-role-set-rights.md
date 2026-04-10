# Установить права роли для списка сайтов landing.role.setRights

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

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.setRights',
            {
                id: 11,
                rights: {
                    0: ['read'],
                    66: ['read', 'edit', 'sett'],
                    71: ['denied']
                },
                additional: ['menu24', 'create']
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch (error)
    {
        console.error(error);
    }
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
