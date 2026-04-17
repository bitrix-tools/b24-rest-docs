# Удалить пользовательское поле userfieldconfig.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`userfieldconfig`](../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом изменения настроек объекта в модуле `moduleId` (для `crm` — право «Разрешить изменять настройки»)

Метод `userfieldconfig.delete` удаляет пользовательское поле.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, в котором удаляется поле ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор настроек пользовательского поля.

Идентификатор можно получить методом [userfieldconfig.list](./userfieldconfig-list.md) или при создании поля методом [userfieldconfig.add](./userfieldconfig-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":6953}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","id":6953,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldconfig.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'userfieldconfig.delete',
    		{
    			moduleId: 'crm',
    			id: 6953,
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
                'userfieldconfig.delete',
                [
                    'moduleId' => 'crm',
                    'id' => 6953,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Result: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldconfig.delete',
        {
            moduleId: 'crm',
            id: 6953,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.delete',
        [
            'moduleId' => 'crm',
            'id' => 6953,
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
    "result": null,
    "time": {
        "start": 1724239307.903115,
        "finish": 1724239308.567422,
        "duration": 0.6643068790435791,
        "processing": 0.20090818405151367,
        "date_start": "2024-08-21T13:21:47+02:00",
        "date_finish": "2024-08-21T13:21:48+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null`, если поле успешно удалено ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Вы не можете удалить пользовательское поле"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Вы не можете удалить пользовательское поле | Недостаточно прав на удаление поля. Эта же ошибка возвращается, если поле с переданным `id` уже удалено или недоступно в контексте `moduleId` ||
|| `-` | The current method required more scopes. (crm) | У приложения нет нужного scope для модуля из `moduleId` ||
|| `-` | No settings for UserFieldAccess | Для переданного `moduleId` не настроен доступ к пользовательским полям ||
|| `-` | Ошибка при попытке изменения настроек пользовательских полей | Общая ошибка удаления поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-add.md)
- [{#T}](./userfieldconfig-update.md)
- [{#T}](./userfieldconfig-get.md)
- [{#T}](./userfieldconfig-list.md)
- [{#T}](./userfieldconfig-get-types.md)
