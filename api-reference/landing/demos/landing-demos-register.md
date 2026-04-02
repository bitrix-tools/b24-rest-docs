# Зарегистрировать шаблон в мастере создания сайта landing.demos.register

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.demos.register` регистрирует пользовательский шаблон в мастере создания сайта и страниц.

Метод обновляет шаблон, если он уже существует с этим же кодом для текущего приложения. Если не существует — создает новый.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **data**^*^
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Данные шаблона.

Обычно передается результат метода [landing.site.fullExport](../site/landing-site-full-export.md).

Метод принимает как экспорт сайта с `items`, так и массив отдельных элементов шаблона [подробнее](#data) ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры регистрации [подробнее](#params) ||
|#

### Тип data {#data}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **charset**
[`string`](../../data-types.md) | Кодировка экспортируемого шаблона ||
|| **code**^*^
[`string`](../../data-types.md) | Внешний код шаблона ||
|| **site_code**
[`string`](../../data-types.md) | Код сайта (путь) ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **description**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Описание шаблона ||
|| **type**
[`string`](../../data-types.md) | Тип шаблона.

Возможные значения:
- `page` — шаблоны для страниц
- `store` — шаблоны для магазинов
- `knowledge` — шаблоны для баз знаний
- `group` — шаблоны для групп
- `mainpage` — шаблоны для главных страниц ||
|| **tpl_type**
[`string`](../../data-types.md) | Тип использования шаблона в мастере.

Возможные значения:
- `S` — шаблон сайта
- `P` — шаблон страницы ||
|| **fields**
[`object`](../../data-types.md) | Поля сайта из экспорта [подробнее](../site/landing-site-full-export.md#result-fields) ||
|| **folders**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Папки из экспорта [подробнее](../site/landing-site-full-export.md#result) ||
|| **items**
[`object`](../../data-types.md) | Карта страниц шаблона в формате `{ "код_страницы": items }` [подробнее](#data-items-element) ||
|| **layout**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Данные layout из экспорта [подробнее](../site/landing-site-full-export.md#result-layout) ||
|| **preview**
[`string`](../../data-types.md) | Ссылка на preview 1x ||
|| **preview2x**
[`string`](../../data-types.md) | Ссылка на preview 2x ||
|| **preview3x**
[`string`](../../data-types.md) | Ссылка на preview 3x ||
|| **preview_url**
[`string`](../../data-types.md) | Ссылка на предпросмотр ||
|| **show_in_list**
[`string`](../../data-types.md) | Признак показа в списке (`Y`/`N`) ||
|| **syspages**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Системные страницы из экспорта [подробнее](../site/landing-site-full-export.md#result) ||
|| **version**
[`integer`](../../data-types.md) | Версия формата экспорта ||
|#

### Тип элемента data.items {#data-items-element}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **old_id**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Исходный идентификатор страницы ||
|| **code**^*^
[`string`](../../data-types.md) | Внешний код страницы ||
|| **name**
[`string`](../../data-types.md) | Название страницы ||
|| **description**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Описание страницы ||
|| **type**
[`string`](../../data-types.md) | Тип страницы.

Возможные значения:
- `page` — шаблоны для страниц
- `store` — шаблоны для магазинов
- `knowledge` — шаблоны для баз знаний
- `group` — шаблоны для групп
- `mainpage` — шаблоны для главных страниц ||
|| **tpl_type**
[`string`](../../data-types.md) | Тип использования шаблона в мастере.

Возможные значения:
- `S` — шаблон сайта
- `P` — шаблон страницы ||
|| **version**
[`integer`](../../data-types.md) | Версия формата страницы ||
|| **fields**
[`object`](../../data-types.md) | Поля страницы из экспорта [подробнее](../site/landing-site-full-export.md#page-fields).

Коды `fields.ADDITIONAL_FIELDS` смотрите в разделе [Дополнительные поля страницы](../page/additional-fields.md) ||
|| **layout**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Layout страницы из экспорта [подробнее](../site/landing-site-full-export.md#page-layout) ||
|| **items**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Блоки страницы [подробнее](#data-items-items-element) ||
|| **preview**
[`string`](../../data-types.md) | Ссылка на preview 1x ||
|| **preview2x**
[`string`](../../data-types.md) | Ссылка на preview 2x ||
|| **preview3x**
[`string`](../../data-types.md) | Ссылка на preview 3x ||
|| **preview_url**
[`string`](../../data-types.md) | Ссылка на предпросмотр ||
|| **show_in_list**
[`string`](../../data-types.md) | Признак показа в списке (`Y`/`N`) ||
|#

### Тип элемента data.items.items {#data-items-items-element}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | Код блока ||
|| **access**
[`string`](../../data-types.md) | Уровень доступа к блоку ||
|| **anchor**
[`string`](../../data-types.md) | Якорь блока ||
|| **old_id**
[`integer`](../../data-types.md) | Исходный идентификатор блока ||
|| **cards**
[`object`](../../data-types.md) | Карточки блока ||
|| **nodes**
[`object`](../../data-types.md) | Узлы блока ||
|| **style**
[`object`](../../data-types.md) | Стили блока ||
|| **attrs**
[`object`](../../data-types.md) | Атрибуты блока ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **site_template_id**
[`string`](../../data-types.md) | Идентификатор шаблона сайта главного модуля.

Используется в коробочных версиях ||
|| **lang**
[`object`](../../data-types.md) | Локализация основных фраз шаблона.

Подробности в статье [Локализация шаблона](./localization.md) ||
|| **lang_original**
[`string`](../../data-types.md) | Код исходного языка для массива `lang` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример регистрации шаблона, где:
- `data` — структура шаблона для регистрации
- `data` в примерах предварительно получен методом [landing.site.fullExport](../site/landing-site-full-export.md)

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "data": {
          "charset": "UTF-8",
          "code": "ftmlt",
          "site_code": "/ftmlt/",
          "name": "Бизнес",
          "description": null,
          "type": "page",
          "fields": {
            "TITLE": "Бизнес",
            "LANDING_ID_INDEX": "0",
            "LANDING_ID_404": "0",
            "ADDITIONAL_FIELDS": {}
          },
          "folders": [],
          "items": {
            "ftmlt": {
              "old_id": "16",
              "code": "ftmlt",
              "name": "Бизнес",
              "description": null,
              "preview": "",
              "preview2x": "",
              "preview3x": "",
              "preview_url": "",
              "show_in_list": "Y",
              "type": "page",
              "version": 3,
              "fields": {
                "TITLE": "Бизнес"
              },
              "layout": [],
              "items": {}
            }
          },
          "layout": [],
          "preview": "",
          "preview2x": "",
          "preview3x": "",
          "preview_url": "",
          "show_in_list": "Y",
          "syspages": [],
          "version": 3
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.demos.register.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "data": {
          "charset": "UTF-8",
          "code": "ftmlt",
          "site_code": "/ftmlt/",
          "name": "Бизнес",
          "description": null,
          "type": "page",
          "fields": {
            "TITLE": "Бизнес",
            "LANDING_ID_INDEX": "0",
            "LANDING_ID_404": "0",
            "ADDITIONAL_FIELDS": {}
          },
          "folders": [],
          "items": {
            "ftmlt": {
              "old_id": "16",
              "code": "ftmlt",
              "name": "Бизнес",
              "description": null,
              "preview": "",
              "preview2x": "",
              "preview3x": "",
              "preview_url": "",
              "show_in_list": "Y",
              "type": "page",
              "version": 3,
              "fields": {
                "TITLE": "Бизнес"
              },
              "layout": [],
              "items": {}
            }
          },
          "layout": [],
          "preview": "",
          "preview2x": "",
          "preview3x": "",
          "preview_url": "",
          "show_in_list": "Y",
          "syspages": [],
          "version": 3
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.demos.register.json"
    ```

- JS

    ```js
    try
    {
    	const data = {
    		charset: 'UTF-8',
    		code: 'ftmlt',
    		site_code: '/ftmlt/',
    		name: 'Бизнес',
    		description: null,
    		type: 'page',
    		fields: {
    			TITLE: 'Бизнес',
    			LANDING_ID_INDEX: '0',
    			LANDING_ID_404: '0',
    			ADDITIONAL_FIELDS: {}
    		},
    		folders: [],
    		items: {
    			ftmlt: {
    				old_id: '16',
    				code: 'ftmlt',
    				name: 'Бизнес',
    				description: null,
    				preview: '',
    				preview2x: '',
    				preview3x: '',
    				preview_url: '',
    				show_in_list: 'Y',
    				type: 'page',
    				version: 3,
    				fields: {
    					TITLE: 'Бизнес'
    				},
    				layout: [],
    				items: {}
    			}
    		},
    		layout: [],
    		preview: '',
    		preview2x: '',
    		preview3x: '',
    		preview_url: '',
    		show_in_list: 'Y',
    		syspages: [],
    		version: 3
    	};

    	const response = await $b24.callMethod(
    		'landing.demos.register',
    		{
    			data
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
        $data = [
            'charset' => 'UTF-8',
            'code' => 'ftmlt',
            'site_code' => '/ftmlt/',
            'name' => 'Бизнес',
            'description' => null,
            'type' => 'page',
            'fields' => [
                'TITLE' => 'Бизнес',
                'LANDING_ID_INDEX' => '0',
                'LANDING_ID_404' => '0',
                'ADDITIONAL_FIELDS' => [],
            ],
            'folders' => [],
            'items' => [
                'ftmlt' => [
                    'old_id' => '16',
                    'code' => 'ftmlt',
                    'name' => 'Бизнес',
                    'description' => null,
                    'preview' => '',
                    'preview2x' => '',
                    'preview3x' => '',
                    'preview_url' => '',
                    'show_in_list' => 'Y',
                    'type' => 'page',
                    'version' => 3,
                    'fields' => [
                        'TITLE' => 'Бизнес',
                    ],
                    'layout' => [],
                    'items' => [],
                ],
            ],
            'layout' => [],
            'preview' => '',
            'preview2x' => '',
            'preview3x' => '',
            'preview_url' => '',
            'show_in_list' => 'Y',
            'syspages' => [],
            'version' => 3,
        ];

        $response = $b24Service
            ->core
            ->call(
                'landing.demos.register',
                [
                    'data' => $data,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering demo: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.register',
        {
            data: {
                charset: 'UTF-8',
                code: 'ftmlt',
                site_code: '/ftmlt/',
                name: 'Бизнес',
                description: null,
                type: 'page',
                fields: {
                    TITLE: 'Бизнес',
                    LANDING_ID_INDEX: '0',
                    LANDING_ID_404: '0',
                    ADDITIONAL_FIELDS: {}
                },
                folders: [],
                items: {
                    ftmlt: {
                        old_id: '16',
                        code: 'ftmlt',
                        name: 'Бизнес',
                        description: null,
                        preview: '',
                        preview2x: '',
                        preview3x: '',
                        preview_url: '',
                        show_in_list: 'Y',
                        type: 'page',
                        version: 3,
                        fields: {
                            TITLE: 'Бизнес'
                        },
                        layout: [],
                        items: {}
                    }
                },
                layout: [],
                preview: '',
                preview2x: '',
                preview3x: '',
                preview_url: '',
                show_in_list: 'Y',
                syspages: [],
                version: 3
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

    $data = [
        'charset' => 'UTF-8',
        'code' => 'ftmlt',
        'site_code' => '/ftmlt/',
        'name' => 'Бизнес',
        'description' => null,
        'type' => 'page',
        'fields' => [
            'TITLE' => 'Бизнес',
            'LANDING_ID_INDEX' => '0',
            'LANDING_ID_404' => '0',
            'ADDITIONAL_FIELDS' => [],
        ],
        'folders' => [],
        'items' => [
            'ftmlt' => [
                'old_id' => '16',
                'code' => 'ftmlt',
                'name' => 'Бизнес',
                'description' => null,
                'preview' => '',
                'preview2x' => '',
                'preview3x' => '',
                'preview_url' => '',
                'show_in_list' => 'Y',
                'type' => 'page',
                'version' => 3,
                'fields' => [
                    'TITLE' => 'Бизнес',
                ],
                'layout' => [],
                'items' => [],
            ],
        ],
        'layout' => [],
        'preview' => '',
        'preview2x' => '',
        'preview3x' => '',
        'preview_url' => '',
        'show_in_list' => 'Y',
        'syspages' => [],
        'version' => 3,
    ];

    $result = CRest::call(
        'landing.demos.register',
        [
            'data' => $data,
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
    "result": [5, 7],
    "time": {
        "start": 1774611129,
        "finish": 1774611129.843163,
        "duration": 0.843163013458252,
        "processing": 0,
        "date_start": "2026-03-27T14:32:09+03:00",
        "date_finish": "2026-03-27T14:32:09+03:00",
        "operating_reset_at": 1774611729,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer[]`](../../data-types.md) | Массив идентификаторов шаблонов, которые были созданы или обновлены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'data' has an invalid type",
    "argument": "data"
}
```

```json
{
    "error": "REGISTER_ERROR_DATA",
    "error_description": "Данные пусты или некорректны"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | The value of an argument 'data' has an invalid type | Параметр `data` передан в неверном типе ||
|| `REGISTER_ERROR_DATA` | Данные пусты или некорректны | Параметр `data` пустой или невалидный ||
|| `CONTENT_IS_BAD` | Содержимое определено как небезопасное. Определить небезопасные части можно через метод `landing.repo.checkcontent` | В переданном шаблоне найден небезопасный контент ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "Внешний код" | В `data` не заполнен `code` (внешний код) у шаблона/элемента ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для вызова метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-demos-get-site-list.md)
- [{#T}](./landing-demos-get-page-list.md)
- [{#T}](./landing-demos-get-list.md)
- [{#T}](./landing-demos-unregister.md)
- [{#T}](./localization.md)
- [{#T}](./index.md)

