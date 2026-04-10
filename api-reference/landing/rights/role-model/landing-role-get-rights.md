# Получить права роли landing.role.getRights

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.getRights` возвращает права указанной роли по каждому сайту, для которого они настроены.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор роли. Получить идентификатор можно с помощью метода [landing.role.getList](./landing-role-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 2
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.getRights.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 2,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.getRights.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.getRights',
            {
                id: 2
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
                'landing.role.getRights',
                [
                    'id' => 2,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting role rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.getRights',
        {
            id: 2
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
        'landing.role.getRights',
        [
            'id' => 2,
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
    "result": {
        "0": [
            "read",
            "edit"
        ],
        "5": [
            "read"
        ]
    },
    "time": {
        "start": 1775064046,
        "finish": 1775064046.935469,
        "duration": 0.9354689121246338,
        "processing": 0,
        "date_start": "2026-04-01T20:20:46+03:00",
        "date_finish": "2026-04-01T20:20:46+03:00",
        "operating_reset_at": 1775064646,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив прав роли по сайтам, где ключом выступает идентификатор сайта, а значением — массив кодов прав [(подробное описание)](#result-item).

Если у роли нет сохраненных прав или роль с таким `id` не найдена, метод возвращает пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент result {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **`0`**
[`string[]`](../../../data-types.md) | Права роли по умолчанию для всех сайтов, у которых нет отдельной настройки.

Доступные значения описаны [ниже](#right-codes) ||
|| **`<siteId>`**
[`string[]`](../../../data-types.md) | Права роли для сайта с указанным идентификатором.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md).

Доступные значения описаны [ниже](#right-codes) ||
|#

#### Коды прав {#right-codes}

#|
|| **Код** | **Описание** ||
|| `denied` | Доступ к сайту запрещен ||
|| `read` | Чтение ||
|| `edit` | Изменение страниц сайта ||
|| `sett` | Изменение настроек сайта ||
|| `public` | Публикация ||
|| `delete` | Удаление в корзину и восстановление из корзины ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Нет доступа к разделу «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Управление правами в разделе «Сайты и магазины» недоступно на текущем тарифе ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-set-rights.md)
- [{#T}](./landing-role-get-list.md)
- [{#T}](./landing-role-set-access-codes.md)
