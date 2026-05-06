# Экспортировать сайт landing.site.fullExport

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «экспорт» сайтов

Метод `landing.site.fullExport` экспортирует сайт и его страницы в массив для последующего импорта, например через [landing.demos.register](../demos/landing-demos-register.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры экспорта [(подробное описание)](#params) ||
|#

Страницы внутри экспорта выбираются в порядке `ID ASC` и возвращаются одним ответом.

### Параметр params {#params}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit_mode**
[`string`](../../data-types.md) | Режим экспорта хуков. При значении `Y` включается режим редактирования. По умолчанию используется обычный режим ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` или `landing_cloud` в названии метода. 

Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` значение `scope` должно соответствовать типу экспортируемого сайта ||
|| **hooks_disable**
[`string[]`](../../data-types.md) | Коды дополнительных полей, которые нужно исключить из `ADDITIONAL_FIELDS` на уровне сайта и страниц. 

Если параметр не передан, используется пустой массив. Независимо от входных данных метод всегда дополнительно исключает `B24BUTTON_CODE` и `FAVICON_PICTURE` ||
|| **code**
[`string`](../../data-types.md) | Код экспортируемого сайта. Если не передан, используется текущий код сайта без крайних `/`. 

Допустимы только латинские буквы и цифры (`[a-z0-9]`, без разделителей) ||
|| **name**
[`string`](../../data-types.md) | Название сайта в экспорте. Если не передано, используется текущее название сайта ||
|| **description**
[`string`](../../data-types.md) | Описание сайта в экспорте. Если не передано, используется текущее описание сайта ||
|| **preview**
[`string`](../../data-types.md) | URL основной превью-картинки. По умолчанию пустая строка ||
|| **preview2x**
[`string`](../../data-types.md) | URL увеличенной превью-картинки. По умолчанию пустая строка ||
|| **preview3x**
[`string`](../../data-types.md) | URL retina-превью. По умолчанию пустая строка ||
|| **preview_url**
[`string`](../../data-types.md) | URL предпросмотра шаблона. По умолчанию пустая строка ||
|#

Параметры `name`, `description`, `preview`, `preview2x`, `preview3x` и `preview_url` применяются к данным страницы только если сайт содержит одну страницу. Если страниц несколько, эти параметры задают верхний уровень экспорта сайта, а данные страниц берутся из текущих значений каждой страницы.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 326,
        "params": {
          "edit_mode": "Y",
          "code": "myfirstsite2026",
          "name": "Сайт автомастерской",
          "description": "Сайт для автосервиса",
          "preview_url": "https://example.com/previews/myfirstsite2026"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.fullExport.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 326,
        "params": {
          "edit_mode": "Y",
          "code": "myfirstsite2026",
          "name": "Сайт автомастерской",
          "description": "Сайт для автосервиса",
          "preview_url": "https://example.com/previews/myfirstsite2026"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.fullExport.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.fullExport',
    		{
    			id: 326,
    			params: {
    				edit_mode: 'Y',
    				code: 'myfirstsite2026',
    				name: 'Сайт автомастерской',
    				description: 'Сайт для автосервиса',
    				preview_url: 'https://example.com/previews/myfirstsite2026'
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
                'landing.site.fullExport',
                [
                    'id' => 326,
                    'params' => [
                        'edit_mode' => 'Y',
                        'code' => 'myfirstsite2026',
                        'name' => 'Сайт автомастерской',
                        'description' => 'Сайт для автосервиса',
                        'preview_url' => 'https://example.com/previews/myfirstsite2026',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error exporting site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.fullExport',
        {
            id: 326,
            params: {
                edit_mode: 'Y',
                code: 'myfirstsite2026',
                name: 'Сайт автомастерской',
                description: 'Сайт для автосервиса',
                preview_url: 'https://example.com/previews/myfirstsite2026'
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
        'landing.site.fullExport',
        [
            'id' => 326,
            'params' => [
                'edit_mode' => 'Y',
                'code' => 'myfirstsite2026',
                'name' => 'Сайт автомастерской',
                'description' => 'Сайт для автосервиса',
                'preview_url' => 'https://example.com/previews/myfirstsite2026',
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
        "charset": "UTF-8",
        "code": "myfirstsite2026",
        "site_code": "/dgiy8z1opr/",
        "name": "Сайт автомастерской",
        "description": "Сайт для автосервиса",
        "preview": "",
        "preview2x": "",
        "preview3x": "",
        "preview_url": "https://example.com/previews/myfirstsite2026",
        "show_in_list": "Y",
        "type": "page",
        "version": 3,
        "fields": {
            "ADDITIONAL_FIELDS": {
                "COOKIES_USE": "N",
                "B24BUTTON_COLOR": "site",
                "BACKGROUND_PICTURE": "https://cdn-ru.bitrix24.ru/.../15_1x.jpg",
                "THEME_USE": "Y"
            },
            "TITLE": "Сайт автомастерской",
            "LANDING_ID_INDEX": "myfirstsite2026",
            "LANDING_ID_404": "0"
        },
        "layout": [],
        "folders": [],
        "syspages": [],
        "items": {
            "myfirstsite2026": {
                "old_id": "2213",
                "code": "myfirstsite2026",
                "name": "Сайт автомастерской",
                "description": "Сайт для автосервиса",
                "preview": "",
                "preview2x": "",
                "preview3x": "",
                "preview_url": "https://example.com/previews/myfirstsite2026",
                "show_in_list": "Y",
                "type": "page",
                "version": 3,
                "fields": {
                    "TITLE": "Сайт автомастерской",
                    "RULE": null,
                    "ADDITIONAL_FIELDS": {
                        "B24BUTTON_USE": "N",
                        "METAOG_TITLE": "База отдыха в Карелии Вилла Ранду",
                        "THEME_USE": "N"
                    }
                },
                "layout": [],
                "items": {
                    "#block28175": {
                        "old_id": 28175,
                        "code": "0.menu_02",
                        "access": "X",
                        "anchor": "b2884",
                        "nodes": {
                            ".landing-block-node-menu-list-item-link": [
                                {
                                    "href": "#kotteges",
                                    "target": "_self",
                                    "text": "Виллы"
                                }
                            ]
                        },
                        "style": {
                            ".navbar": [
                                "navbar navbar-expand-lg p-0 g-px-15 u-navbar-align-right"
                            ]
                        },
                        "attrs": {
                            ".navbar-collapse": [
                                {
                                    "id": "navBar2884"
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    "time": {
        "start": 1773161828.471138,
        "finish": 1773161828.871144,
        "duration": 0.4000060558319092,
        "processing": 0.10344195365905762,
        "date_start": "2026-03-10T19:57:08+03:00",
        "date_finish": "2026-03-10T19:57:08+03:00",
        "operating_reset_at": 1773162428,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Поля экспортированного сайта. Если сайт не найден в выборке или нет доступных страниц для экспорта, возвращается пустой массив `[]` [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **charset**
[`string`](../../data-types.md) | Кодировка экспортируемого набора, обычно `UTF-8` ||
|| **code**
[`string`](../../data-types.md) | Код сайта в экспорте ||
|| **site_code**
[`string`](../../data-types.md) | Исходный код сайта ||
|| **name**
[`string`](../../data-types.md) | Название сайта ||
|| **description**
[`string`](../../data-types.md) | Описание сайта ||
|| **preview**
[`string`](../../data-types.md) | URL основной превью-картинки ||
|| **preview2x**
[`string`](../../data-types.md) | URL увеличенной превью-картинки ||
|| **preview3x**
[`string`](../../data-types.md) | URL retina-превью ||
|| **preview_url**
[`string`](../../data-types.md) | URL предпросмотра ||
|| **show_in_list**
[`string`](../../data-types.md) | Флаг отображения в списке шаблонов `Y/N` ||
|| **type**
[`string`](../../data-types.md) | Тип сайта в нижнем регистре ||
|| **version**
[`integer`](../../data-types.md) | Версия формата экспорта. Метод возвращает `3` ||
|| **fields**
[`object`](../../data-types.md) | Поля сайта [(подробное описание)](#result-fields) ||
|| **layout**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Данные шаблона сайта. Если шаблон не привязан, возвращается пустой массив `[]` [(подробное описание)](#result-layout) ||
|| **folders**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Группы страниц по папкам в формате `{"<код_страницы_папки>": ["<код_страницы_1>", "..."]}`. 

Если папок нет, возвращается `[]` ||
|| **syspages**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Системные страницы в формате `{"<тип_системной_страницы>": "<код_страницы>"}`. 

Если системные страницы не определены, возвращается `[]` ||
|| **items**
[`object`](../../data-types.md) | Экспорт страниц сайта, где ключ объекта — код страницы [(подробное описание)](#result-items) ||
|#

### Объект fields {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDITIONAL_FIELDS**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Дополнительные поля сайта после фильтрации по `hooks_disable` ||
|| **TITLE**
[`string`](../../data-types.md) | Заголовок сайта ||
|| **LANDING_ID_INDEX**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Код или идентификатор главной страницы ||
|| **LANDING_ID_404**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Код или идентификатор страницы `404` ||
|#

### Объект layout {#result-layout}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | XML_ID шаблона сайта ||
|| **ref**
[`string[]`](../../data-types.md) | Коды страниц, связанных с шаблоном сайта ||
|#

### Объект items {#result-items}

#|
|| **Название**
`тип` | **Описание** ||
|| **`<код_страницы>`**
[`object`](../../data-types.md) | Экспорт отдельной страницы [(подробное описание)](#page-item) ||
|#

### Объект страницы {#page-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **old_id**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Исходный идентификатор страницы ||
|| **code**
[`string`](../../data-types.md) | Код страницы в экспорте ||
|| **name**
[`string`](../../data-types.md) | Название страницы ||
|| **description**
[`string`](../../data-types.md) | Описание страницы ||
|| **preview**
[`string`](../../data-types.md) | URL основной превью-картинки страницы ||
|| **preview2x**
[`string`](../../data-types.md) | URL увеличенной превью-картинки страницы ||
|| **preview3x**
[`string`](../../data-types.md) | URL retina-превью страницы ||
|| **preview_url**
[`string`](../../data-types.md) | URL предпросмотра страницы ||
|| **show_in_list**
[`string`](../../data-types.md) | Флаг показа страницы `Y/N` ||
|| **type**
[`string`](../../data-types.md) | Тип сайта страницы в нижнем регистре ||
|| **version**
[`integer`](../../data-types.md) | Версия формата экспорта страницы ||
|| **fields**
[`object`](../../data-types.md) | Поля страницы [(подробное описание)](#page-fields) ||
|| **layout**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Данные шаблона страницы. 

Если шаблон не привязан, возвращается `[]` [(подробное описание)](#page-layout) ||
|| **items**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Блоки страницы [(подробное описание)](#page-blocks) ||
|#

### Объект fields страницы {#page-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Заголовок страницы ||
|| **RULE**
[`string`](../../data-types.md) \| `null` | Правило маршрутизации страницы ||
|| **ADDITIONAL_FIELDS**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Дополнительные поля страницы после фильтрации по `hooks_disable` ||
|#

### Объект layout страницы {#page-layout}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | XML_ID шаблона страницы ||
|| **ref**
[`string[]`](../../data-types.md) | Коды страниц, связанных с шаблоном страницы ||
|#

### Объект блоков страницы {#page-blocks}

#|
|| **Название**
`тип` | **Описание** ||
|| **`#block<id>`**
[`object`](../../data-types.md) | Экспорт блока страницы [(подробное описание)](#block-item) ||
|#

### Объект блока {#block-item}

Поля блока, которые не содержат данных, удаляются из результата и могут отсутствовать в объекте

#|
|| **Название**
`тип` | **Описание** ||
|| **old_id**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Исходный идентификатор блока ||
|| **code**
[`string`](../../data-types.md) | Код блока ||
|| **access**
[`string`](../../data-types.md) | Уровень доступа блока ||
|| **anchor**
[`string`](../../data-types.md) | Локальный якорь блока ||
|| **repo_block**
[`object`](../../data-types.md) | Данные блока из репозитория [(подробное описание)](#repo-block) ||
|| **cards**
[`object`](../../data-types.md) | Экспорт карточек блока ||
|| **nodes**
[`object`](../../data-types.md) | Экспорт узлов блока ||
|| **menu**
[`object`](../../data-types.md) | Экспорт меню блока ||
|| **style**
[`object`](../../data-types.md) | Экспорт стилей блока ||
|| **attrs**
[`object`](../../data-types.md) | Экспорт атрибутов блока ||
|| **dynamic**
[`object`](../../data-types.md) | Экспорт динамических параметров блока ||
|#

### Объект repo_block {#repo-block}

#|
|| **Название**
`тип` | **Описание** ||
|| **app_code**
[`string`](../../data-types.md) | Код приложения-источника блока ||
|| **xml_id**
[`string`](../../data-types.md) | XML_ID блока в репозитории ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SYSTEM_ERROR",
    "error_description": "Параметр code может состоять только из латинских букв и цифр."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Недостаточно прав для доступа к сайтам ||
|| `TYPE_ERROR` | Передан параметр неверного типа ||
|| `SYSTEM_ERROR` | Внутренняя ошибка выполнения, например `params.code` содержит символы, отличные от латинских букв и цифр ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-delete.md)
- [{#T}](../demos/landing-demos-register.md)
