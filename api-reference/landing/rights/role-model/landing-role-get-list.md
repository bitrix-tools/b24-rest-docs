# Получить список ролей landing.role.getList

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.getList` получает список ролей доступа для выбранного типа сайтов. 

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Тип сайтов, для которого нужно получить роли. Параметр не связан с REST-скоупом `landing` в названии метода.

Значения `GROUP`, `KNOWLEDGE` и `MAINPAGE` соответствуют типам сайтов из статьи [Работа с типами сайтов и скоупами](../../types.md).

Возможные значения:
`GROUP` - роли для сайтов групп
`KNOWLEDGE` - роли для баз знаний
`MAINPAGE` - роли для главной страницы или вайба

Если параметр не передали или указали неверно, метод вернет роли для сайтов и интернет-магазинов. Например, так будет, если значение пустое, не строковое или не поддерживается ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.getList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.getList.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.getList',
            {
                scope: 'KNOWLEDGE'
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
                'landing.role.getList',
                [
                    'scope' => 'KNOWLEDGE',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting role list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.getList',
        {
            scope: 'KNOWLEDGE'
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
        'landing.role.getList',
        [
            'scope' => 'KNOWLEDGE',
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
    "result": [
        {
            "ID": "3",
            "TITLE": "Администратор",
            "XML_ID": "ADMIN"
        },
        {
            "ID": "5",
            "TITLE": "Менеджер",
            "XML_ID": "MANAGER"
        }
    ],
    "time": {
        "start": 1775062049,
        "finish": 1775062049.634052,
        "duration": 0.634052038192749,
        "processing": 0,
        "date_start": "2026-04-01T19:47:29+03:00",
        "date_finish": "2026-04-01T19:47:29+03:00",
        "operating_reset_at": 1775062649,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список ролей выбранного типа сайтов [(подробное описание)](#role).

Если роли не найдены, метод возвращает `result: []` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект role {#role}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор роли. Используйте его в методах [landing.role.getRights](./landing-role-get-rights.md), [landing.role.setAccessCodes](./landing-role-set-access-codes.md) и [landing.role.setRights](./landing-role-set-rights.md) ||
|| **TITLE**
[`string`](../../../data-types.md) | Название роли в интерфейсе ||
|| **XML_ID**
[`string`](../../../data-types.md) | Системный код роли.

Возможные значения для автоматически созданных стандартных ролей:
`ADMIN` - администратор
`MANAGER` - менеджер ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "IS_NOT_ADMIN",
    "error_description": "Для совершения действия необходимо быть администратором."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Нет авторизации или недостаточно прав для работы с модулем «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Метод доступен пользователю с правами администратора ||
|| `FEATURE_NOT_AVAIL` | На текущем тарифе недоступно управление правами в разделе «Сайты и магазины» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-get-rights.md)
- [{#T}](./landing-role-set-access-codes.md)
- [{#T}](./landing-role-set-rights.md)
