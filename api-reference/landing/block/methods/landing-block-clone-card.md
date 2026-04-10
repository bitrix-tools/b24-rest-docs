# Клонировать карточку блока landing.block.clonecard

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.clonecard` создает копию карточки в блоке в черновике страницы. Он работает с карточками, описанными в ключе `cards` манифеста блока.

Если страница уже опубликована, изменение станет видно посетителям после публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getlist](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|| **selector***
[`string`](../../../data-types.md) | Селектор карточки из [ключа cards манифеста блока](../manifest.md#ключ-cards).

После селектора можно указать позицию через `@<индекс>`. `@0` копирует первую найденную карточку, `@2` — третью.

При указанном индексе метод копирует выбранную карточку и вставляет копию сразу после нее. Для последней карточки копия добавляется в конец контейнера. Без индекса метод берет первую карточку по этому селектору и вставляет копию в начало контейнера.

Если селектора нет в манифесте или подходящая карточка не найдена, метод вернет ошибку ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Не добавлять действие в историю изменений страницы.

Возможные значения:
`true` - не сохранять действие в истории
`false` - сохранить действие в истории

По умолчанию - `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 6428,
        "selector": ".landing-block-card@0"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.clonecard.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 6428,
        "selector": ".landing-block-card@0",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.clonecard.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.block.clonecard',
            {
                lid: 351,
                block: 6428,
                selector: '.landing-block-card@0'
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
                'landing.block.clonecard',
                [
                    'lid' => 351,
                    'block' => 6428,
                    'selector' => '.landing-block-card@0',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error cloning block card: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.clonecard',
        {
            lid: 351,
            block: 6428,
            selector: '.landing-block-card@0'
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
        'landing.block.clonecard',
        [
            'lid' => 351,
            'block' => 6428,
            'selector' => '.landing-block-card@0',
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
        "start": 1774477875,
        "finish": 1774477875.611452,
        "duration": 0.6114521026611328,
        "processing": 0,
        "date_start": "2026-03-26T01:31:15+03:00",
        "date_finish": "2026-03-26T01:31:15+03:00",
        "operating_reset_at": 1774478475,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат клонирования карточки.

При успешном выполнении возвращается `true`. Идентификатор новой карточки в ответ не приходит ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CARD_NOT_FOUND",
    "error_description": "Карточка блока не найдена"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `selector` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | У пользователя нет прав на редактирование страницы ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в черновике страницы ||
|| `CARD_NOT_FOUND` | В блоке не найдена карточка по селектору `selector`. Ошибка возвращается, если селектор отсутствует в `manifest.cards` или карточка по указанному селектору и индексу не найдена ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-remove-card.md)
- [{#T}](./landing-block-add-card.md)
- [{#T}](./landing-block-update-cards.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
