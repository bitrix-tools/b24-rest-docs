# Получить список зарегистрированных шаблонов landing.demos.getList

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.demos.getList` получает список зарегистрированных шаблонов.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params**
[`object`](../../data-types.md) | Объект формата:

```
{
    select: value_1,
    filter: value_2,
    order: value_3,
    group: value_4,
    limit: value_5,
    offset: value_6
}
```

где:
- `value_n` — значение соответствующего параметра выборки

Подробнее о каждом параметре смотрите в разделе [Параметр params](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Массив формата:

```
[
    field_1,
    field_2,
    ...,
    field_n
]
```

где:
- `field_n` — поле выборки

Список доступных полей для выборки смотрите в разделе [Тип элемента result](#result-template).

Элементы `select` со знаком `.` игнорируются ||
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
- `field_n` — поле фильтрации
- `value_n` — значение фильтра

Список доступных полей для фильтрации смотрите в разделе [Тип элемента result](#result-template).

Если `filter` не передан или передан не в формате `object`, метод использует пустой фильтр `{}` ||
|| **order**
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
- `field_n` — поле сортировки
- `value_n` — направление сортировки: `ASC` или `DESC`

Список доступных полей для сортировки смотрите в разделе [Тип элемента result](#result-template) ||
|| **group**
[`array`](../../data-types.md) | Массив полей для группировки результата.

Формат:

```
[
    field_1,
    field_2,
    ...,
    field_n
]
```

где:
- `field_n` — поле группировки

Примеры:
- `["TYPE"]`
- `["ACTIVE", "TYPE"]`

Список доступных полей смотрите в разделе [Тип элемента result](#result-template) ||
|| **limit**
[`integer`](../../data-types.md) | Лимит записей в выборке ||
|| **offset**
[`integer`](../../data-types.md) | Смещение записей в выборке ||
|#

{% note info %}

Если метод вызван в контексте приложения, сервер дополнительно добавляет фильтр текущего приложения.

В этом случае в ответ попадут только шаблоны, созданные этим же приложением.

При вызове не из контекста приложения этот фильтр не добавляется.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения списка шаблонов, где:
- `params.select` — поля, которые нужно вернуть в ответе
- `params.filter` — условия фильтрации записей
- `params.order` — сортировка результата
- `params.group` — поля группировки

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": ["ID", "XML_ID", "TITLE", "TYPE", "DATE_MODIFY"],
          "filter": {"ACTIVE": "Y"},
          "order": {"ID": "DESC"},
          "group": ["TYPE"]
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.demos.getList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": ["ID", "XML_ID", "TITLE", "TYPE", "DATE_MODIFY"],
          "filter": {"ACTIVE": "Y"},
          "order": {"ID": "DESC"},
          "group": ["TYPE"]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.demos.getList.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.demos.getList',
    		{
    			params: {
    				select: ['ID', 'XML_ID', 'TITLE', 'TYPE', 'DATE_MODIFY'],
    				filter: { ACTIVE: 'Y' },
    				order: { ID: 'DESC' },
    				group: ['TYPE']
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
                'landing.demos.getList',
                [
                    'params' => [
                        'select' => ['ID', 'XML_ID', 'TITLE', 'TYPE', 'DATE_MODIFY'],
                        'filter' => ['ACTIVE' => 'Y'],
                        'order' => ['ID' => 'DESC'],
                        'group' => ['TYPE'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting demo list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.getList',
        {
            params: {
                select: ['ID', 'XML_ID', 'TITLE', 'TYPE', 'DATE_MODIFY'],
                filter: { ACTIVE: 'Y' },
                order: { ID: 'DESC' },
                group: ['TYPE']
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
        'landing.demos.getList',
        [
            'params' => [
                'select' => ['ID', 'XML_ID', 'TITLE', 'TYPE', 'DATE_MODIFY'],
                'filter' => ['ACTIVE' => 'Y'],
                'order' => ['ID' => 'DESC'],
                'group' => ['TYPE'],
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
    "result": [
        {
            "ID": "9",
            "XML_ID": "ftmlt/biznes",
            "TITLE": "Бизнес",
            "TYPE": "page",
            "DATE_MODIFY": "27.03.2026 14:18:15",
            "MANIFEST": false
        }
    ],
    "time": {
        "start": 1774621455,
        "finish": 1774621455.226454,
        "duration": 0.2264540195465088,
        "processing": 0,
        "date_start": "2026-03-27T17:24:15+03:00",
        "date_finish": "2026-03-27T17:24:15+03:00",
        "operating_reset_at": 1774622055,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список зарегистрированных шаблонов [подробнее](#result-template).

Если подходящих записей нет, метод возвращает `result: []` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип элемента result {#result-template}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор шаблона ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код шаблона ||
|| **APP_CODE**
[`string`](../../data-types.md) | Код приложения ||
|| **ACTIVE**
[`string`](../../data-types.md) | Признак активности (`Y`/`N`) ||
|| **TITLE**
[`string`](../../data-types.md) | Название шаблона ||
|| **DESCRIPTION**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Описание шаблона ||
|| **TYPE**
[`string`](../../data-types.md) | Тип шаблона.

Возможные значения:
- `page` — шаблоны для страниц/сайтов
- `store` — шаблоны для магазинов
- `knowledge` — шаблоны для баз знаний
- `group` — шаблоны для групп
- `mainpage` — шаблоны для главных страниц ||
|| **TPL_TYPE**
[`string`](../../data-types.md) | Тип мастера.

Возможные значения:
- `S` — шаблон сайта
- `P` — шаблон страницы ||
|| **SHOW_IN_LIST**
[`string`](../../data-types.md) | Признак показа в списке (`Y`/`N`) ||
|| **PREVIEW_URL**
[`string`](../../data-types.md) | Ссылка на предпросмотр ||
|| **PREVIEW**
[`string`](../../data-types.md) | Preview 1x ||
|| **PREVIEW2X**
[`string`](../../data-types.md) | Preview 2x ||
|| **PREVIEW3X**
[`string`](../../data-types.md) | Preview 3x ||
|| **MANIFEST**
[`object`](../../data-types.md) \| [`boolean`](../../data-types.md) | Манифест шаблона.

В исходных данных хранится сериализованно, в ответе метода возвращается как объект после `unserialize`.

Если манифест не задан, может возвращаться `false` ||
|| **LANG**
[`object`](../../data-types.md) \| [`null`](../../data-types.md) | Локализация шаблона.

Если поле заполнено, в ответе возвращается после `unserialize`.

Состав и ключи локализации зависят от шаблона. Подробнее: [Локализация шаблона](./localization.md) ||
|| **SITE_TEMPLATE_ID**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор шаблона сайта главного модуля ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего шаблон ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего шаблон ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата создания.

Метод приводит значение к строке ||
|| **DATE_MODIFY**
[`string`](../../data-types.md) | Дата изменения.

Метод приводит значение к строке ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'params' has an invalid type",
    "argument": "params"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | The value of an argument 'params' has an invalid type | Параметр `params` передан в неверном типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|| `TYPE_ERROR` | Ошибка типа данных | Вызов метода с некорректным типом параметров ||
|| `SYSTEM_ERROR` | Внутренняя ошибка | Ошибка при выполнении метода на стороне сервера ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-demos-register.md)
- [{#T}](./landing-demos-get-site-list.md)
- [{#T}](./landing-demos-get-page-list.md)
- [{#T}](./landing-demos-unregister.md)
- [{#T}](./localization.md)
- [{#T}](./index.md)

