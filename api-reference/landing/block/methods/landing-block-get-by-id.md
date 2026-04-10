# Получить блок по идентификатору `landing.block.getbyid`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайтов

Метод `landing.block.getbyid` возвращает один блок страницы по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры чтения блока [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit_mode**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод читает черновик страницы вместо опубликованной версии.

По умолчанию — `false` ||
|| **deleted**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод ищет блоки, помеченные как удаленные.

По умолчанию — `false`. Чтобы получить удаленный блок, нужно передать `deleted: true` вместе с `edit_mode: true` ||
|| **get_content**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в `result` дополнительно возвращаются поля `content`, `css` и `js`.

По умолчанию — `false`. Поле `content` содержит уже подготовленный HTML блока вместе с системным контейнером блока, а не исходное сохраненное содержимое ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "params": {
          "edit_mode": true,
          "get_content": true
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getbyid.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "params": {
          "edit_mode": true,
          "get_content": true
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getbyid.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getbyid',
    		{
    			block: 39556,
    			params: {
    				edit_mode: true,
    				get_content: true
    			}
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
                'landing.block.getbyid',
                [
                    'block' => 39556,
                    'params' => [
                        'edit_mode' => true,
                        'get_content' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block by ID: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getbyid',
        {
            block: 39556,
            params: {
                edit_mode: true,
                get_content: true
            }
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
        'landing.block.getbyid',
        [
            'block' => 39556,
            'params' => [
                'edit_mode' => true,
                'get_content' => true,
            ],
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
        "id": 39556,
        "lid": 4858,
        "code": "01.big_with_text",
        "name": "Блок с текстом и изображением",
        "active": true,
        "meta": {
            "LID": "2215",
            "FAVORITE_META": "Array",
            "CREATED_BY_ID": "1295",
            "DATE_CREATE": "03/26/2026 11:27:24 am",
            "MODIFIED_BY_ID": "1295",
            "DATE_MODIFY": "03/26/2026 12:23:02 pm",
            "SITE_TYPE": "PAGE",
            "LANDING_TITLE": "",
            "LANDING_TPL_CODE": "bitrix.krayt_otdykh_na_prirode",
            "SITE_TPL_CODE": "empty",
            "XML_ID": "",
            "DESIGNER_MODE": ""
        },
        "content": "<div id=\"b28853\" class=\"block-wrapper block-18-2-two-cols-fix-img-text-button-with-cards\"><section class=\"landing-block g-pt-30 g-pb-30 g-bg-transparent\">...</section></div>",
        "css": [],
        "js": []
    },
    "time": {
        "start": 1774521156,
        "finish": 1774521157.330784,
        "duration": 1.3307840824127197,
        "processing": 1,
        "date_start": "2026-03-26T13:32:36+03:00",
        "date_finish": "2026-03-26T13:32:37+03:00",
        "operating_reset_at": 1774521756,
        "operating": 0.3684520721435547
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные найденного блока [(подробное описание)](#result)

Метод не возвращает `result: []`. Если блок не найден в выбранной версии страницы, метод завершается ошибкой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор блока ||
|| **lid**
[`integer`](../../../data-types.md) | Идентификатор страницы, к которой относится блок ||
|| **code**
[`string`](../../../data-types.md) | Символьный код блока из библиотеки, например `01.big_with_text` ||
|| **name**
[`string`](../../../data-types.md) | Название блока из его манифеста ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока.

Активный блок отображается на странице. Неактивный блок скрыт ||
|| **meta**
[`object`](../../../data-types.md) | Служебные данные блока и страницы [(подробное описание)](#meta).

Все значения внутри `meta` метод возвращает строками. Формат строковых дат зависит от языковых настроек Битрикс24 ||
|| **content**
[`string`](../../../data-types.md) | Подготовленный HTML блока. Поле возвращается только если включен `params.get_content` ||
|| **css**
[`string[]`](../../../data-types.md) | Пути к CSS-файлам блока, которые нужны для его отображения.

Поле возвращается только если включен `params.get_content`. Если отдельных CSS-ресурсов нет, вернется пустой массив ||
|| **js**
[`string[]`](../../../data-types.md) | Пути к JS-файлам блока, которые нужны для его работы. Поле возвращается только если включен `params.get_content`.

Если отдельных JS-ресурсов нет, вернется пустой массив ||
|#

### Объект meta {#meta}

#|
|| **Название**
`тип` | **Описание** ||
|| **LID**
[`string`](../../../data-types.md) | Идентификатор страницы блока в строковом виде.

Дублирует поле `lid` ||
|| **CREATED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который создал блок ||
|| **DATE_CREATE**
[`string`](../../../data-types.md) | Дата создания блока ||
|| **MODIFIED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который последним изменил блок ||
|| **DATE_MODIFY**
[`string`](../../../data-types.md) | Дата последнего изменения блока ||
|| **SITE_TYPE**
[`string`](../../../data-types.md) | Тип сайта, которому принадлежит страница, например `PAGE` или `STORE` ||
|| **LANDING_TITLE**
[`string`](../../../data-types.md) | Название страницы, которой принадлежит блок.

Если название не заполнено, вернется пустая строка ||
|| **LANDING_TPL_CODE**
[`string`](../../../data-types.md) | Код шаблона страницы ||
|| **SITE_TPL_CODE**
[`string`](../../../data-types.md) | Код шаблона сайта ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор блока.

Если он не задан, вернется пустая строка ||
|| **DESIGNER_MODE**
[`string`](../../../data-types.md) | Служебное поле режима дизайнера.

В методе `landing.block.getbyid` возвращается пустой строкой ||
|| **FAVORITE_META**
[`string`](../../../data-types.md) | Служебные данные о сохранении блока в избранные шаблоны пользователя.

Если таких данных нет, вернется пустая строка. Если данные есть, в этом методе значение может прийти как строка `"Array"` ||
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
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: `block` ||
|| `ACCESS_DENIED` | У пользователя нет доступа к разделу «Сайты и магазины» ||
|| `BLOCK_NOT_FOUND` | Блок не найден в выбранной версии страницы, недоступен текущему пользователю или удален ||
|| `TYPE_ERROR` | Внутренняя ошибка несоответствия типов при вызове метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-manifest-file.md)
