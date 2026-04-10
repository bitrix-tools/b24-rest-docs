# Изменить якорь блока landing.block.changeAnchor

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.changeAnchor` изменяет или удаляет пользовательский якорь блока в черновике страницы.

Если страница уже опубликована, изменения станут видны посетителям после публикации изменений через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = true` ||
|| **data***
[`string`](../../../data-types.md) | Новый якорь блока без символа `#`.

Передавайте значение строкой. Якорь должен начинаться с буквы `A-Z` или `a-z`, содержать не менее двух символов и далее может включать только буквы `A-Z` и `a-z`, цифры `0-9` и символы `-`, `_`, `.`, `:`.

Якорь из одного символа недопустим. Например, `a` вызовет ошибку. Примеры допустимых значений: `about-us`, `Section_A`, `faq.v2`, `Tab:1` ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Не добавлять изменение в историю страницы.

Возможные значения:
`true` — не сохранять изменение в истории,
`false` — сохранить изменение в истории.

По умолчанию — `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": "about-us",
        "preventHistory": true
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.changeAnchor.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": "about-us",
        "preventHistory": true,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.changeAnchor.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.changeAnchor',
    		{
    			lid: 311,
    			block: 6058,
    			data: 'about-us',
    			preventHistory: true
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
                'landing.block.changeAnchor',
                [
                    'lid' => 311,
                    'block' => 6058,
                    'data' => 'about-us',
                    'preventHistory' => true,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error changing block anchor: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.changeAnchor',
        {
            lid: 311,
            block: 6058,
            data: 'about-us',
            preventHistory: true
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
        'landing.block.changeAnchor',
        [
            'lid' => 311,
            'block' => 6058,
            'data' => 'about-us',
            'preventHistory' => true,
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
        "start": 1774525298,
        "finish": 1774525298.491831,
        "duration": 0.49183106422424316,
        "processing": 0,
        "date_start": "2026-03-26T14:41:38+03:00",
        "date_finish": "2026-03-26T14:41:38+03:00",
        "operating_reset_at": 1774525898,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат изменения якоря. При успешном выполнении метод возвращает `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BAD_ANCHOR",
    "error_description": "Якорь должен начинаться с символа от a-z и далее может содержать только символы от \"a-z\", \"0-9\", \"-\", \"_\", \".\", \":\""
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `data` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден в черновике страницы ||
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта ||
|| `BAD_ANCHOR` | Передан недопустимый якорь: он начинается не с буквы, содержит запрещенные символы или состоит из одного символа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-change-node-name.md)
- [{#T}](./landing-block-get-list.md)
