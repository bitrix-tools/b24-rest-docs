# Получить манифест блока `landing.block.getmanifest`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» страниц

Метод `landing.block.getmanifest` возвращает подготовленный манифест блока, размещенного на странице.

Он возвращает не исходный файл, а подготовленные данные для конкретного блока. Например, локализованные названия, поля `code`, `preview`, `assets`, `timestamp`, `callbacks`. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getlist](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока. Блок должен принадлежать странице `lid` в выбранной версии страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры чтения манифеста [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit_mode**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод читает черновик страницы вместо опубликованной версии. По умолчанию — `false`.

Без этого параметра метод ищет блок только в опубликованной версии страницы||
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
        "block": 39556,
        "params": {
          "edit_mode": true
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getmanifest.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 4858,
        "block": 39556,
        "params": {
          "edit_mode": true
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getmanifest.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getmanifest',
    		{
    			lid: 4858,
    			block: 39556,
    			params: {
    				edit_mode: true
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
                'landing.block.getmanifest',
                [
                    'lid' => 4858,
                    'block' => 39556,
                    'params' => [
                        'edit_mode' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block manifest: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getmanifest',
        {
            lid: 4858,
            block: 39556,
            params: {
                edit_mode: true
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
        'landing.block.getmanifest',
        [
            'lid' => 4858,
            'block' => 39556,
            'params' => [
                'edit_mode' => true,
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
        "block": {
            "name": "Форма на светлом фоне по центру",
            "section": [
                "forms"
            ],
            "dynamic": false,
            "subtype": "form",
            "attrsFormDescription": "<a href=\"/crm/webform/\" target=\"_blank\">Настроить CRM-формы</a>"
        },
        "nodes": {
            "#wrapper": {
                "type": "styleimg",
                "code": "#wrapper"
            }
        },
        "style": {
            "block": {
                "type": [
                    "block-default",
                    "block-border"
                ]
            },
            "nodes": {
                ".bitrix24forms": {
                    "type": "crm-form"
                }
            }
        },
        "assets": {
            "css": [],
            "js": [],
            "ext": [
                "landing_form"
            ],
            "class": [],
            "callbacks": []
        },
        "timestamp": 1751467642,
        "callbacks": {
            "afteradd": {}
        },
        "attrs": {
            ".bitrix24forms": [
                {
                    "name": "Embed form flag",
                    "attribute": "data-b24form-embed",
                    "type": "string",
                    "hidden": true
                },
                {
                    "name": "Form design",
                    "attribute": "data-b24form-design",
                    "type": "string",
                    "hidden": true
                },
                {
                    "name": "Form from connector flag",
                    "attribute": "data-b24form-connector",
                    "type": "string",
                    "hidden": true
                },
                {
                    "name": "CRM-форма",
                    "attribute": "data-b24form",
                    "items": [
                        {
                            "name": "Форма обратной связи",
                            "value": "#crmFormInline3"
                        },
                        {
                            "name": "Контактные данные с комментарием",
                            "value": "#crmFormInline39"
                        }
                    ],
                    "type": "list"
                },
                {
                    "name": "Дизайн формы",
                    "attribute": "data-b24form-use-style",
                    "type": "list",
                    "items": [
                        {
                            "name": "Использовать дизайн блока",
                            "value": "Y"
                        },
                        {
                            "name": "Использовать дизайн CRM-формы",
                            "value": "N"
                        }
                    ]
                }
            ]
        },
        "cards": [],
        "menu": [],
        "namespace": "bitrix",
        "code": "33.13.form_2_light_no_text",
        "preview": "/bitrix/blocks/bitrix/33.13.form_2_light_no_text/preview.jpg"
    },
    "time": {
        "start": 1774521323,
        "finish": 1774521323.212432,
        "duration": 0.2124319076538086,
        "processing": 0,
        "date_start": "2026-03-26T13:35:23+03:00",
        "date_finish": "2026-03-26T13:35:23+03:00",
        "operating_reset_at": 1774521923,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Подготовленный манифест блока [(подробное описание)](#result). Общий формат манифеста описан в статье [Файл манифеста](../manifest.md).

Пустые разделы манифеста могут вернуться как пустые массивы `[]`, даже если обычно содержат объект с ключами ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **block**
[`object`](../../../data-types.md) | Основные свойства блока из манифеста [(подробное описание)](#block) ||
|| **cards**
[`object`](../../../data-types.md) | Описание карточек блока, если они есть.

Если карточек нет, может вернуться пустой массив `[]` ||
|| **nodes**
[`object`](../../../data-types.md) | Описание редактируемых узлов блока.

Для каждого узла метод дополнительно добавляет ключ `code` с селектором узла.

Для узлов с отдельным обработчиком в редакторе метод также добавляет ключ `handler` с именем этого обработчика. Если узлов нет, может вернуться пустой массив `[]` ||
|| **attrs**
[`object`](../../../data-types.md) | Описание настраиваемых атрибутов блока, если они есть.

Если атрибутов нет, может вернуться пустой массив `[]` ||
|| **menu**
[`object`](../../../data-types.md) | Описание меню блока, если оно есть.

Если меню нет, может вернуться пустой массив `[]` ||
|| **style**
[`object`](../../../data-types.md) | Описание доступных настроек стилей блока.

Если в исходном манифесте стили не разделены на `style.block` и `style.nodes`, метод сам разложит их по этим разделам ||
|| **namespace**
[`string`](../../../data-types.md) | Пространство имен блока.

Для встроенных блоков Битрикс24 обычно это `bitrix`. Для блоков из приложений значение задает приложение, поэтому оно может отличаться или быть пустым ||
|| **code**
[`string`](../../../data-types.md) | Код блока ||
|| **preview**
[`string`](../../../data-types.md) | Относительный путь к файлу предпросмотра `preview.jpg`.

Если файл предпросмотра отсутствует, вернется пустая строка. Для блоков, зарегистрированных через REST API или приложение, это поле возвращает пустую строку ||
|| **assets**
[`object`](../../../data-types.md) | Ресурсы блока [(подробное описание)](#assets) ||
|| **timestamp**
[`integer`](../../../data-types.md) | Время обновления базового манифеста в формате Unix Timestamp.

Для локального блока это время изменения файла `block.php`. Для блока из приложения это время последнего обновления блока в приложении ||
|| **callbacks**
[`object`](../../../data-types.md) | Callback-обработчики из манифеста блока.

Названия обработчиков метод приводит к нижнему регистру ||
|#

В `result` могут быть и другие ключи исходного манифеста. Их состав зависит от конкретного блока.

### Объект block {#block}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название блока ||
|| **section**
[`string[]`](../../../data-types.md) | Разделы, к которым относится блок ||
|| **dynamic**
[`boolean`](../../../data-types.md) | Признак динамического блока ||
|| **subtype**
[`string`](../../../data-types.md) \| [`string[]`](../../../data-types.md) | Подтип блока, если он задан ||
|#

В объекте `block` могут быть и другие поля манифеста. Их набор зависит от конкретного блока.

### Объект assets {#assets}

#|
|| **Название**
`тип` | **Описание** ||
|| **css**
[`string[]`](../../../data-types.md) | Список CSS-ресурсов блока.

Сюда попадают пути из манифеста и автоматически найденный локальный `style.css`, если он есть.

Для дизайнерских локальных блоков вместо `style.css` автоматически подключается `design_style.css` ||
|| **js**
[`string[]`](../../../data-types.md) | Список JS-ресурсов блока.

Сюда попадают пути из манифеста и автоматически найденный локальный `script.js`, если он есть ||
|| **ext**
[`string[]`](../../../data-types.md) | Список клиентских расширений блока.

Для REST-блоков метод возвращает только расширения из разрешенного списка ||
|| **class**
[`string[]`](../../../data-types.md) | Служебные пути к PHP-классам блока на сервере.

Для большинства обычных вызовов массив пуст или не нужен клиентскому коду ||
|| **callbacks**
[`array`](../../../data-types.md) | Список callback-функций из секции `assets` манифеста, если они объявлены.

В отличие от `result.callbacks`, это поле относится к ресурсам блока, а не к обработчикам самого блока ||
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
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` или `block` ||
|| `ACCESS_DENIED` | У пользователя нет права на просмотр страницы ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена, удалена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице в выбранной версии  ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-by-id.md)
- [{#T}](./landing-block-get-manifest-file.md)
