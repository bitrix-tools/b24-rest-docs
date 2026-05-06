# Изменить контент блока landing.block.updatecontent

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.updatecontent` полностью заменяет HTML-содержимое блока в черновике страницы.

Если нужно изменить только отдельные ноды, атрибуты или стили блока, используйте методы [landing.block.updatenodes](./landing-block-update-nodes.md), [landing.block.updateattrs](./landing-block-update-attrs.md) и [landing.block.updateStyles](./landing-block-update-styles.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1`.

Если передать идентификатор блока из опубликованной версии страницы, метод может вернуть ошибку ||
|| **content***
[`string`](../../../data-types.md) | Новый HTML блока целиком.

Метод полностью заменяет текущее содержимое блока. Текущий HTML блока можно получить методом [landing.block.getcontent](./landing-block-get-content.md) или методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.get_content = true` ||
|| **designed**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Помечает блок как измененный вручную.

Чтобы включить этот признак, передайте `true`, `"true"` или `1`. Любое другое значение его не включает. По умолчанию — `false` ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Не добавлять изменение в историю страницы. По умолчанию — `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "content": "<section class=\"g-pt-60 g-pb-60\"><div class=\"container\"><h2 class=\"landing-block-node-title\">Весенняя акция</h2><p class=\"landing-block-node-text\" bxstyle=\"color:#1d1d1d;\">Скидка 15% до конца месяца</p></div></section>",
        "preventHistory": true
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.updatecontent.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "content": "<section class=\"g-pt-60 g-pb-60\"><div class=\"container\"><h2 class=\"landing-block-node-title\">Весенняя акция</h2><p class=\"landing-block-node-text\" bxstyle=\"color:#1d1d1d;\">Скидка 15% до конца месяца</p></div></section>",
        "preventHistory": true,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.updatecontent.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updatecontent',
    		{
    			lid: 311,
    			block: 6058,
    			content: '<section class="g-pt-60 g-pb-60"><div class="container"><h2 class="landing-block-node-title">Весенняя акция</h2><p class="landing-block-node-text" bxstyle="color:#1d1d1d;">Скидка 15% до конца месяца</p></div></section>',
    			preventHistory: true
    		}
    	);

    	const result = response.getData().result;
    	console.info('Результат обновления блока:', result);
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
                'landing.block.updatecontent',
                [
                    'lid' => 311,
                    'block' => 6058,
                    'content' => '<section class="g-pt-60 g-pb-60"><div class="container"><h2 class="landing-block-node-title">Весенняя акция</h2><p class="landing-block-node-text" bxstyle="color:#1d1d1d;">Скидка 15% до конца месяца</p></div></section>',
                    'preventHistory' => true,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Результат обновления блока: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating block content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updatecontent',
        {
            lid: 311,
            block: 6058,
            content: '<section class="g-pt-60 g-pb-60"><div class="container"><h2 class="landing-block-node-title">Весенняя акция</h2><p class="landing-block-node-text" bxstyle="color:#1d1d1d;">Скидка 15% до конца месяца</p></div></section>',
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
                console.info('Результат обновления блока:', result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.block.updatecontent',
        [
            'lid' => 311,
            'block' => 6058,
            'content' => '<section class="g-pt-60 g-pb-60"><div class="container"><h2 class="landing-block-node-title">Весенняя акция</h2><p class="landing-block-node-text" bxstyle="color:#1d1d1d;">Скидка 15% до конца месяца</p></div></section>',
            'preventHistory' => true,
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
    "result": true,
    "time": {
        "start": 1774524519,
        "finish": 1774524519.331829,
        "duration": 0.3318290710449219,
        "processing": 0,
        "date_start": "2026-03-26T14:28:39+03:00",
        "date_finish": "2026-03-26T14:28:39+03:00",
        "operating_reset_at": 1774525119,
        "operating": 0
    }
}
```

Если передать `designed = true` для блока, в котором нельзя использовать пользовательский дизайн, метод вернет такой ответ:

HTTP-статус: **200**

```json
{
    "result": null,
    "time": {
        "start": 1774524519,
        "finish": 1774524519.102341,
        "duration": 0.1023409366607666,
        "processing": 0,
        "date_start": "2026-03-26T14:28:39+03:00",
        "date_finish": "2026-03-26T14:28:39+03:00",
        "operating_reset_at": 1774525119,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) \| `null` | Результат обновления блока. Метод возвращает `true`, если вызов выполнен успешно. 

Если вызвать метод с `designed = true` для блока, в котором недоступен пользовательский дизайн, вернется `null`||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `content` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в черновике ||
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-update-attrs.md)
- [{#T}](./landing-block-update-styles.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
