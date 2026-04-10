# Получить контент блока из репозитория landing.block.getContentFromRepository

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Сайты и магазины»

Метод `landing.block.getContentFromRepository` возвращает HTML-содержимое блока из репозитория.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../../../data-types.md) | Код блока, содержимое которого нужно получить.

Поддерживаются несколько форматов значения:

- короткий код стандартного блока, например `01.big_with_text`,
- код блока из репозитория приложений в формате `repo_<ID>`,
- код сохраненного блока в формате `<code>@<ID>`.

Код блока можно получить из результата метода [landing.block.getRepository](./landing-block-get-repository.md). Для сохраненного блока это `repo_<ID>`, для блока из репозитория — `<code>@<ID>`, для стандартного блока — значение из поля `code`.

Если нужно получить описание блока и его параметры, используйте метод [landing.block.getManifestFile](./landing-block-get-manifest-file.md)

Метод работает только с поддерживаемыми форматами кода. Если передать код в формате `<namespace>:<code>`, пустую строку, неизвестный код или код уже удаленного сохраненного блока, в `result` вернется `null`, без отдельной ошибки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "01.big_with_text"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getContentFromRepository.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "01.big_with_text",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getContentFromRepository.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getContentFromRepository',
    		{
    			code: '01.big_with_text'
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
                'landing.block.getContentFromRepository',
                [
                    'code' => '01.big_with_text',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting repository block content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getContentFromRepository',
        {
            code: '01.big_with_text'
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
        'landing.block.getContentFromRepository',
        [
            'code' => '01.big_with_text',
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
    "result": "<section class=\"g-pos-rel landing-block g-overflow-hidden\" data-slider-autoplay=\"1\" data-slider-autoplay-speed=\"5000\" data-slider-dots=\"0\">\n\t<div class=\"js-carousel g-overflow-hidden g-max-height-100vh\" data-autoplay=\"true\" data-infinite=\"true\" data-fade=\"true\" data-pagi-classes=\"u-carousel-indicators-v1 g-absolute-centered--x g-bottom-20\" data-speed=\"5000\">\n\t\t<div class=\"landing-block-card-img js-slide g-bg-img-hero g-min-height-100vh\" style=\"background-image: url(https://cdn.bitrix24.site/bitrix/images/landing/business/1600x1075/img2.jpg);\"></div>\n\t\t<div class=\"landing-block-card-img js-slide g-bg-img-hero g-min-height-100vh\" style=\"background-image: url(https://cdn.bitrix24.site/bitrix/images/landing/business/1600x1075/img1.jpg);\"></div>\n\t</div>\n\n\t<div class=\"g-absolute-centered g-width-80x--md\">\n\t\t<div class=\"container text-center g-max-width-800\">\n\t\t\t<div class=\"landing-block-node-text-container info-v3-4 g-bg-primary-opacity-0_9 g-pa-20 g-pa-60--md js-animation fadeInLeft\">\n\t\t\t\t<div class=\"g-pos-rel g-z-index-3\">\n\t\t\t\t\t<h3 class=\"landing-block-node-small-title text-uppercase g-letter-spacing-3 g-color-white g-mb-10\">We are Company24</h3>\n\t\t\t\t\t<h2 class=\"landing-block-node-title h1 text-uppercase g-color-white g-letter-spacing-5 g-mb-20\">Business &amp; Corporation</h2>\n\t\t\t\t\t<div class=\"landing-block-node-text g-line-height-1_8 g-letter-spacing-3 g-color-white g-mb-20\" data-auto-font-scale>Sed feugiat porttitor nunc, non dignissim\n\t\t\t\t\t\t<br> ipsum vestibulum in. Donec in blandit dolor.</div>\n\t\t\t\t\t<a href=\"#\" class=\"landing-block-node-button btn g-btn-type-outline g-btn-white g-btn-size-md g-btn-px-m text-uppercase rounded-0\">Learn More</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</section>",
    "time": {
        "start": 1774525475,
        "finish": 1774525475.811345,
        "duration": 0.811345100402832,
        "processing": 0,
        "date_start": "2026-03-26T14:44:35+03:00",
        "date_finish": "2026-03-26T14:44:35+03:00",
        "operating_reset_at": 1774526075,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | HTML-содержимое блока.

Для стандартных блоков метод возвращает HTML-шаблон блока с подставленными значениями для текущего языка в Битрикс24.

Для блоков `repo_<ID>` метод возвращает HTML, сохраненный для блока в репозитории приложений.

Для блоков `<code>@<ID>` метод возвращает HTML сохраненного блока или `null`, если такой блок уже удален ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: code"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `code` ||
|| `ACCESS_DENIED` | Доступ к вызову метода запрещен: у пользователя нет доступа к разделу «Сайты и магазины» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-manifest-file.md)
- [{#T}](./landing-block-get-repository.md)
