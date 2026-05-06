# Получить список шаблонов для создания сайтов landing.demos.getSiteList

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.demos.getSiteList` получает список файловых демо-шаблонов сайтов.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**^*^
[`string`](../../data-types.md) | Тип шаблона.

Возможные значения:
- `page` — шаблоны для страниц
- `store` — шаблоны для магазинов
- `knowledge` — шаблоны для баз знаний
- `group` — шаблоны для групп
- `mainpage` — шаблоны для главных страниц ||
|| **filter**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — поле фильтра
- `value_n` — значение фильтра

Фильтрация применяется к полям верхнего уровня объекта шаблона.

Фильтровать можно по полям из раздела [Тип шаблона сайта](#site-template). Вложенные поля (например, `DATA.*`) в фильтре не учитываются ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения списка шаблонов сайтов, где:
- `type` — код набора шаблонов
- `filter` — фильтр по полям шаблона сайта

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "type": "page",
        "filter": {
          "TYPE": "page"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.demos.getSiteList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "type": "page",
        "filter": {
          "TYPE": "page"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.demos.getSiteList.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.demos.getSiteList',
    		{
    			type: 'page',
    			filter: {
    				TYPE: 'page'
    			}
    		}
    	);

    	console.info(response.getData().result);
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
                'landing.demos.getSiteList',
                [
                    'type' => 'page',
                    'filter' => [
                        'TYPE' => 'page',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site demo list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.getSiteList',
        {
            type: 'page',
            filter: {
                TYPE: 'page'
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
        'landing.demos.getSiteList',
        [
            'type' => 'page',
            'filter' => [
                'TYPE' => 'page',
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "empty": {
            "ID": "empty",
            "XML_ID": "empty",
            "TYPE": ["KNOWLEDGE", "GROUP", "PAGE", "MAINPAGE"],
            "TITLE": "Пустой шаблон",
            "ACTIVE": true,
            "PUBLICATION": false,
            "LOCK_DELETE": false,
            "AVAILABLE": true,
            "SINGLETON": false,
            "SECTION": [],
            "DESCRIPTION": "Создайте собственный сайт с чистого листа и привлекайте клиентов!",
            "PREVIEW": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/site/empty/preview.jpg",
            "PREVIEW2X": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/site/empty/preview@2x.jpg",
            "PREVIEW3X": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/site/empty/preview@3x.jpg",
            "APP_CODE": "",
            "REST": 0,
            "DATA": {
                "name": "Пустой шаблон",
                "items": [],
                "encoded": true,
                "charset": "UTF-8"
            }
        }
    },
    "time": {
        "start": 1774623040,
        "finish": 1774623040.337361,
        "duration": 0.33736109733581543,
        "processing": 0,
        "date_start": "2026-03-27T17:50:40+03:00",
        "date_finish": "2026-03-27T17:50:40+03:00",
        "operating_reset_at": 1774623640,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Карта демо-шаблонов сайтов в формате:

```
{
    "template_code": site_template
}
```

где:
- `template_code` — код шаблона
- `site_template` — объект шаблона [подробнее](#site-template)

Если подходящих шаблонов нет, метод возвращает пустой массив `result: []`.

Состав полей шаблонов может отличаться и зависит от конкретного шаблона ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип шаблона сайта {#site-template}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код шаблона ||
|| **TYPE**
[`string[]`](../../data-types.md) \| [`string`](../../data-types.md) | Типы, для которых доступен шаблон.

Для файловых шаблонов обычно возвращается массив, для зарегистрированных шаблонов приложения — строка ||
|| **TITLE**
[`string`](../../data-types.md) | Название шаблона ||
|| **ACTIVE**
[`boolean`](../../data-types.md) | Признак активности ||
|| **PUBLICATION**
[`boolean`](../../data-types.md) | Признак доступности публикации ||
|| **LOCK_DELETE**
[`boolean`](../../data-types.md) | Признак запрета удаления ||
|| **AVAILABLE**
[`boolean`](../../data-types.md) | Признак доступности шаблона ||
|| **SINGLETON**
[`boolean`](../../data-types.md) | Признак одиночного шаблона ||
|| **SECTION**
[`string[]`](../../data-types.md) | Разделы шаблона ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание шаблона ||
|| **PREVIEW**
[`string`](../../data-types.md) | Preview 1x ||
|| **PREVIEW2X**
[`string`](../../data-types.md) | Preview 2x ||
|| **PREVIEW3X**
[`string`](../../data-types.md) | Preview 3x ||
|| **APP_CODE**
[`string`](../../data-types.md) | Код приложения ||
|| **REST**
[`integer`](../../data-types.md) | Признак REST-шаблона ||
|| **DATA**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Данные шаблона из файлового источника [подробнее](#site-template-data).

Для зарегистрированных шаблонов приложения может приходить пустой массив ||
|#

### Тип данных шаблона DATA {#site-template-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | Код шаблона в данных экспорта ||
|| **name**
[`string`](../../data-types.md) | Название шаблона в данных экспорта ||
|| **type**
[`string[]`](../../data-types.md) | Типы шаблона.

Возможные значения:
- `page` — шаблоны для страниц
- `store` — шаблоны для магазинов
- `knowledge` — шаблоны для баз знаний
- `group` — шаблоны для групп
- `mainpage` — шаблоны для главных страниц ||
|| **description**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Описание шаблона ||
|| **active**
[`boolean`](../../data-types.md) | Признак активности шаблона в данных экспорта ||
|| **singleton**
[`boolean`](../../data-types.md) | Признак одиночного шаблона в данных экспорта ||
|| **lock_delete**
[`boolean`](../../data-types.md) | Признак запрета удаления в данных экспорта ||
|| **preview**
[`string`](../../data-types.md) | Preview 1x в данных экспорта ||
|| **preview2x**
[`string`](../../data-types.md) | Preview 2x в данных экспорта ||
|| **preview3x**
[`string`](../../data-types.md) | Preview 3x в данных экспорта ||
|| **preview_url**
[`string`](../../data-types.md) | Ссылка на предпросмотр в данных экспорта ||
|| **show_in_list**
[`string`](../../data-types.md) | Признак показа в списке (`Y`/`N`) ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки шаблона ||
|| **fields**
[`object`](../../data-types.md) | Поля шаблона [подробнее](../site/landing-site-full-export.md#result-fields).

Коды `fields.ADDITIONAL_FIELDS` смотрите в разделе [Дополнительные поля сайта](../site/additional-fields.md) ||
|| **items**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Состав шаблона [подробнее](../site/landing-site-full-export.md#result-items) ||
|| **layout**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Данные layout шаблона [подробнее](../site/landing-site-full-export.md#result-layout) ||
|| **folders**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Папки шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **syspages**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Системные страницы шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **master_pages**
[`array`](../../data-types.md) | Список мастер-страниц шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **version**
[`integer`](../../data-types.md) | Версия формата данных ||
|| **old_id**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Исходный идентификатор ||
|| **encoded**
[`boolean`](../../data-types.md) | Добавляется методом со значением `true`, если в `DATA` есть поле `items` ||
|| **charset**
[`string`](../../data-types.md) | Добавляется методом со значением `UTF-8`, если в `DATA` есть поле `items` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'filter' has an invalid type",
    "argument": "filter"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | The value of an argument 'filter' has an invalid type | Параметр `filter` передан в неверном типе ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова | Не передан обязательный параметр `type` ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа модуля Landing ||
|| `TYPE_ERROR` | Ошибка типа данных | Вызов метода с некорректным типом параметров ||
|| `SYSTEM_ERROR` | Внутренняя ошибка | Ошибка при выполнении метода на стороне сервера ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-demos-register.md)
- [{#T}](./landing-demos-get-page-list.md)
- [{#T}](./landing-demos-get-list.md)
- [{#T}](./landing-demos-unregister.md)
- [{#T}](./localization.md)
- [{#T}](./index.md)

