# Получить список блоков страницы `landing.block.getlist`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайтов

Метод `landing.block.getlist` возвращает список блоков выбранной страницы.


## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) \| [`integer[]`](../../../data-types.md) | Идентификатор страницы или массив идентификаторов страниц.

Идентификаторы страниц можно получить методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md)

Если `lid` передан массивом, метод объединяет блоки всех указанных страниц в один список. В каждом элементе ответа есть поле `lid`, по которому можно определить страницу-источник.

Если передан массив и хотя бы одна страница не найдена или недоступна, весь вызов завершается ошибкой ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры чтения списка [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit_mode**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод читает черновик страницы вместо опубликованной версии.

По умолчанию — `false`. Без этого параметра метод читает только опубликованные блоки ||
|| **deleted**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод возвращает только блоки, помеченные как удаленные.

По умолчанию — `false`. Параметр влияет только на выборку блоков. Поиск удаленной страницы он не включает, поэтому для страницы из корзины метод вернет ошибку.

Чтобы получить удаленные блоки, передайте `deleted: true` вместе с `edit_mode: true`. Параметр `deleted` сам по себе не переключает метод на черновик. 

Если не указать `edit_mode`, метод будет искать блоки только в опубликованной версии страницы ||
|| **get_content**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если передать `true`, метод добавит в каждый элемент результата поля `content`, `css` и `js`. По умолчанию — `false`.

Поле `content` содержит уже подготовленный HTML блока вместе с системным контейнером блока, а не исходное сохраненное содержимое. 

Если `edit_mode` выключен, метод вернет HTML опубликованной версии блока. 
Если `edit_mode` включен, метод вернет HTML черновика ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 4858,
        "params": {
          "edit_mode": true,
          "get_content": true
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getlist.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 4858,
        "params": {
          "edit_mode": true,
          "get_content": true
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getlist.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getlist',
    		{
    			lid: 4858,
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
                'landing.block.getlist',
                [
                    'lid' => 4858,
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
        echo 'Error getting block list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getlist',
        {
            lid: 4858,
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
        'landing.block.getlist',
        [
            'lid' => 4858,
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
    "result": [
        {
            "id": 28181,
            "lid": 2215,
            "code": "0.menu_02",
            "name": "Меню с логотипом слева и пунктами меню справа",
            "active": true,
            "meta": {
                "LID": "2215",
                "FAVORITE_META": "Array",
                "CREATED_BY_ID": "779",
                "DATE_CREATE": "09/13/2024 10:28:08 am",
                "MODIFIED_BY_ID": "1295",
                "DATE_MODIFY": "03/26/2026 12:21:48 pm",
                "SITE_TYPE": "PAGE",
                "LANDING_TITLE": "",
                "LANDING_TPL_CODE": "bitrix.krayt_otdykh_na_prirode",
                "SITE_TPL_CODE": "empty",
                "XML_ID": "",
                "DESIGNER_MODE": ""
            },
            "content": "<div id=\"b2884\" class=\"block-wrapper block-0-menu-02\"><header class=\"landing-block u-header u-header--float u-header--sticky\">...</header></div>",
            "css": [],
            "js": []
        }
    ],
    "time": {
        "start": 1774521039,
        "finish": 1774521039.570632,
        "duration": 0.5706319808959961,
        "processing": 0,
        "date_start": "2026-03-26T13:30:39+03:00",
        "date_finish": "2026-03-26T13:30:39+03:00",
        "operating_reset_at": 1774521639,
        "operating": 0.48987889289855957
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список блоков [(подробное описание)](#block).

Метод может вернуть `result: []` без ошибки в трех случаях.

- На странице нет блоков для выбранного режима чтения.
- Страница еще не публиковалась и `params.edit_mode` не включен.
- Фильтр `deleted` не нашел подходящих блоков ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект block {#block}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор блока ||
|| **lid**
[`integer`](../../../data-types.md) | Идентификатор страницы, к которой относится блок ||
|| **code**
[`string`](../../../data-types.md) | Символьный код блока из библиотеки, например `0.menu_02` ||
|| **name**
[`string`](../../../data-types.md) | Название блока из его манифеста ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока.

Активный блок отображается на странице. Неактивный блок скрыт ||
|| **meta**
[`object`](../../../data-types.md) | Служебные данные блока и страницы [(подробное описание)](#meta).

Все значения внутри `meta` метод возвращает строками. Формат строковых дат зависит от языковых настроек Битрикс24 ||
|| **content**
[`string`](../../../data-types.md) | Подготовленный HTML блока. Поле возвращается только если включен `params.get_content`.

Если `params.edit_mode = false`, метод вернет HTML опубликованной версии блока. 
Если `params.edit_mode = true`, метод вернет HTML черновика ||
|| **css**
[`string[]`](../../../data-types.md) | Пути к CSS-файлам блока, которые нужны для его отображения.

Поле возвращается только если включен `params.get_content`. Если отдельных CSS-ресурсов нет, вернется пустой массив ||
|| **js**
[`string[]`](../../../data-types.md) | Пути к JS-файлам блока, которые нужны для его работы. 

Поле возвращается только если включен `params.get_content`. Если отдельных JS-ресурсов нет, вернется пустой массив ||
|#

#### Объект meta {#meta}

#|
|| **Название**
`тип` | **Описание** ||
|| **LID**
[`string`](../../../data-types.md) | Идентификатор страницы блока в строковом виде.

Дублирует верхнеуровневое поле `lid` ||
|| **CREATED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который создал блок ||
|| **DATE_CREATE**
[`string`](../../../data-types.md) | Дата создания блока.

Формат зависит от языковых настроек портала ||
|| **MODIFIED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который последним изменил блок ||
|| **DATE_MODIFY**
[`string`](../../../data-types.md) | Дата последнего изменения блока.

Формат зависит от языковых настроек портала ||
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
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный верхнеуровневый параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена, удалена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | У пользователя нет права на просмотр сайтов ||
|| `TYPE_ERROR` | Внутренняя ошибка несоответствия типов при вызове метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-get-by-id.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-manifest-file.md)
