# Добавить карточку блока landing.block.addcard

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.addcard` добавляет карточку в блок в черновике страницы.

Метод работает с карточками, описанными в ключе `cards` манифеста блока. Если страница уже опубликована, изменение станет видно посетителям после повторной публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getlist](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в версии страницы для редактирования.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|| **selector***
[`string`](../../../data-types.md) | Селектор карточки из [ключа `cards` манифеста блока](../manifest.md#ключ-cards)

После селектора можно указать индекс через `@<индекс>`. Например, `@0` добавит новую карточку после первой найденной, а `@2` — после третьей.

Если индекс указан, метод вставляет новую карточку после выбранной. Если эта карточка последняя, новая карточка появится в конце контейнера. Если индекс не указан, метод берет первую карточку по этому селектору и вставляет новую карточку в начало контейнера.

После добавления карточки индексы меняются. Если вы добавляете несколько карточек подряд, перед каждым следующим вызовом указывайте в `selector` уже новый индекс. 

Если селектор отсутствует в манифесте, в блоке нет карточек по этому селектору или указан несуществующий индекс, метод вернет ошибку.

Подробнее про селекторы карточек и структуру манифеста читайте в статье [Манифест блока](../manifest.md#ключ-cards) ||
|| **content***
[`string`](../../../data-types.md) | HTML новой карточки.

Если нужно взять существующую разметку блока за основу, получите HTML методом [landing.block.getcontent](./landing-block-get-content.md) и используйте структуру карточки из текущего блока.

Если передать пустую строку или после фильтрации содержимое станет пустым, метод сработает как [landing.block.clonecard](./landing-block-clone-card.md) и создаст копию карточки, указанной в `selector` ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Не добавлять действие в историю изменений страницы.

Возможные значения:
`true` - не сохранять действие в истории,
`false` - сохранить действие в истории.

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
        "selector": ".landing-block-node-menu-list-item@0",
        "content": "<li class=\"landing-block-node-menu-list-item nav-item\"><a href=\"#services\" class=\"landing-block-node-menu-list-item-link nav-link\">Услуги</a></li>"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.addcard.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 6428,
        "selector": ".landing-block-node-menu-list-item@0",
        "content": "<li class=\"landing-block-node-menu-list-item nav-item\"><a href=\"#services\" class=\"landing-block-node-menu-list-item-link nav-link\">Услуги</a></li>",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.addcard.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.block.addcard',
            {
                lid: 351,
                block: 6428,
                selector: '.landing-block-node-menu-list-item@0',
                content: '<li class="landing-block-node-menu-list-item nav-item"><a href="#services" class="landing-block-node-menu-list-item-link nav-link">Услуги</a></li>'
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
                'landing.block.addcard',
                [
                    'lid' => 351,
                    'block' => 6428,
                    'selector' => '.landing-block-node-menu-list-item@0',
                    'content' => '<li class="landing-block-node-menu-list-item nav-item"><a href="#services" class="landing-block-node-menu-list-item-link nav-link">Услуги</a></li>',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding block card: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.addcard',
        {
            lid: 351,
            block: 6428,
            selector: '.landing-block-node-menu-list-item@0',
            content: '<li class="landing-block-node-menu-list-item nav-item"><a href="#services" class="landing-block-node-menu-list-item-link nav-link">Услуги</a></li>'
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
        'landing.block.addcard',
        [
            'lid' => 351,
            'block' => 6428,
            'selector' => '.landing-block-node-menu-list-item@0',
            'content' => '<li class="landing-block-node-menu-list-item nav-item"><a href="#services" class="landing-block-node-menu-list-item-link nav-link">Услуги</a></li>',
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
        "start": 1774524862,
        "finish": 1774524862.61318,
        "duration": 0.6131799221038818,
        "processing": 0,
        "date_start": "2026-03-26T14:34:22+03:00",
        "date_finish": "2026-03-26T14:34:22+03:00",
        "operating_reset_at": 1774525462,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат добавления карточки. При успешном выполнении возвращается `true`, идентификатор новой карточки в ответ не приходит ||
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
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block`, `selector` или `content` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | У пользователя нет прав на редактирование сайта ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в черновике страницы ||
|| `CARD_NOT_FOUND` | В блоке не найдена карточка по селектору `selector` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-clone-card.md)
- [{#T}](./landing-block-remove-card.md)
- [{#T}](./landing-block-update-cards.md)
- [{#T}](./landing-block-get-content.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
