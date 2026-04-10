# Удалить из сохраненного списка блоков `landing.landing.unFavoriteBlock`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.unFavoriteBlock` удаляет сохраненную копию блока. Исходный блок на странице не изменяется. При удалении сохраненного блока также удаляются связанные с ним файлы, например пользовательское превью, загруженное для этого блока.

Удалить можно только тот сохраненный блок, который текущий пользователь создал методом [landing.landing.favoriteBlock](./landing-landing-favorite-block.md). 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **blockId***
[`integer`](../../../data-types.md) | Идентификатор сохраненной копии блока.

Идентификатор можно получить из результата метода [landing.landing.favoriteBlock](./landing-landing-favorite-block.md).

Если передать идентификатор обычного блока страницы или несуществующий идентификатор, метод вернет ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "blockId": 28619
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.unFavoriteBlock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "blockId": 28619,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.unFavoriteBlock.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.unFavoriteBlock',
            {
                blockId: 28619
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
                'landing.landing.unFavoriteBlock',
                [
                    'blockId' => 28619,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Успех: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при удалении блока из списка блоков: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.unFavoriteBlock',
        {
            blockId: 28619
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
        'landing.landing.unFavoriteBlock',
        [
            'blockId' => 28619,
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
        "start": 1773978259,
        "finish": 1773978259.693505,
        "duration": 0.693505048751831,
        "processing": 0,
        "date_start": "2026-03-20T06:44:19+03:00",
        "date_finish": "2026-03-20T06:44:19+03:00",
        "operating_reset_at": 1773978859,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления сохраненного блока. При успешном выполнении возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Выполнение операции запрещено"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `blockId` ||
|| `TYPE_ERROR` | Передан неверный тип в параметре `blockId` ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `blockId` не существует или не является блоком из списка «Мои блоки» ||
|| `ACCESS_DENIED` | Недостаточно прав для удаления сохраненного блока ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-block.md)
- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-favorite-block.md)
- [{#T}](./landing-landing-hide-block.md)
- [{#T}](./landing-landing-mark-deleted-block.md)
- [{#T}](./landing-landing-mark-undeleted-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-up-block.md)
