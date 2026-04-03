# Получить список шаблонов для создания страниц landing.demos.getPageList

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.demos.getPageList` получает список файловых демо-шаблонов страниц.

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

Фильтровать можно по полям из раздела [Тип шаблона страницы](#page-template). Вложенные поля (например, `DATA.*`) в фильтре не учитываются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения списка шаблонов страниц, где:
- `type` — код набора шаблонов
- `filter` — фильтр по полям шаблона страницы

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "type": "page",
        "filter": {
          "TYPE": "PAGE"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.demos.getPageList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "type": "page",
        "filter": {
          "TYPE": "PAGE"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.demos.getPageList.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.demos.getPageList',
    		{
    			type: 'page',
    			filter: {
    				TYPE: 'PAGE'
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
                'landing.demos.getPageList',
                [
                    'type' => 'page',
                    'filter' => [
                        'TYPE' => 'PAGE',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting page demo list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.getPageList',
        {
            type: 'page',
            filter: {
                TYPE: 'PAGE'
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
        'landing.demos.getPageList',
        [
            'type' => 'page',
            'filter' => [
                'TYPE' => 'PAGE',
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
            "TYPE": ["PAGE", "KNOWLEDGE", "GROUP", "MAINPAGE"],
            "TITLE": "Пустая страница",
            "ACTIVE": true,
            "PUBLICATION": false,
            "LOCK_DELETE": false,
            "AVAILABLE": true,
            "SINGLETON": false,
            "SECTION": [],
            "DESCRIPTION": "Создайте собственный сайт с чистого листа и привлекайте клиентов!",
            "PREVIEW": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/page/empty/preview.jpg",
            "PREVIEW2X": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/page/empty/preview@2x.jpg",
            "PREVIEW3X": "//bitrix24.ru/bitrix/components/bitrix/landing.demo/data/page/empty/preview@3x.jpg",
            "APP_CODE": "",
            "REST": 0,
            "DATA": {
                "name": "Пустая страница",
                "active": true,
                "type": ["PAGE", "KNOWLEDGE", "GROUP", "MAINPAGE"],
                "items": [],
                "version": 1,
                "old_id": 402,
                "encoded": true,
                "charset": "UTF-8"
            }
        },
        "search-result": {
            "ID": "search-result",
            "XML_ID": "search-result",
            "TYPE": ["PAGE", "KNOWLEDGE", "GROUP"],
            "TITLE": "Результаты поиска",
            "ACTIVE": false,
            "PUBLICATION": true,
            "SECTION": ["dynamic"],
            "DATA": {
                "code": "search-result",
                "section": ["dynamic"],
                "publication": true,
                "layout": [],
                "items": {
                    "#block3430": {
                        "code": "59.1.search"
                    }
                },
                "encoded": true,
                "charset": "UTF-8"
            }
        }
    },
    "time": {
        "start": 1774625365,
        "finish": 1774625365.92986,
        "duration": 0.9298601150512695,
        "processing": 0,
        "date_start": "2026-03-27T18:29:25+03:00",
        "date_finish": "2026-03-27T18:29:25+03:00",
        "operating_reset_at": 1774625965,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Карта демо-шаблонов страниц в формате:

```
{
    "template_code": page_template
}
```

где:
- `template_code` — код шаблона
- `page_template` — объект шаблона страницы [подробнее](#page-template)

Если подходящих шаблонов нет, метод возвращает пустой массив `result: []` без ошибки.

Состав полей шаблонов может отличаться и зависит от конкретного шаблона ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип шаблона страницы {#page-template}

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
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Данные шаблона из файлового источника [подробнее](#page-template-data).

Для зарегистрированных шаблонов приложения может приходить пустой массив ||
|#

### Тип данных шаблона DATA {#page-template-data}

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
|| **publication**
[`boolean`](../../data-types.md) | Признак публикации шаблона в данных экспорта ||
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
|| **section**
[`string[]`](../../data-types.md) | Разделы шаблона в данных экспорта ||
|| **parent**
[`string`](../../data-types.md) | Код родительского шаблона/сайта ||
|| **disable_import**
[`string`](../../data-types.md) | Флаг запрета импорта в данных шаблона (например `Y`) ||
|| **is_webform_page**
[`string`](../../data-types.md) | Флаг страницы с CRM-формой (например `Y`) ||
|| **fields**
[`object`](../../data-types.md) | Поля шаблона [подробнее](../site/landing-site-full-export.md#page-fields).

Коды `fields.ADDITIONAL_FIELDS` смотрите в разделе [Дополнительные поля страницы](../page/additional-fields.md) ||
|| **items**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Состав шаблона [подробнее](../site/landing-site-full-export.md#page-blocks) ||
|| **layout**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Данные layout шаблона [подробнее](../site/landing-site-full-export.md#page-layout) ||
|| **folders**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Папки шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **syspages**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Системные страницы шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **master_pages**
[`array`](../../data-types.md) | Список мастер-страниц шаблона [подробнее](../site/landing-site-full-export.md#result) ||
|| **version**
[`integer`](../../data-types.md) | Версия формата данных ||
|| **old_id**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Исходный идентификатор (в зависимости от шаблона может приходить числом или строкой) ||
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
- [{#T}](./landing-demos-get-site-list.md)
- [{#T}](./landing-demos-get-list.md)
- [{#T}](./landing-demos-unregister.md)
- [{#T}](./localization.md)
- [{#T}](./index.md)




