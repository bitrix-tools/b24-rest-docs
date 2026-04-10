# Получить список пользовательских блоков landing.repo.getList

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.getList` получает список пользовательских блоков.

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
- `["ACTIVE"]`
- `["APP_CODE", "ACTIVE"]`

Список доступных полей смотрите в разделе [Тип элемента result](#result-template) ||
|| **limit**
[`integer`](../../data-types.md) | Лимит записей ||
|| **offset**
[`integer`](../../data-types.md) | Смещение записей ||
|#

{% note info %}

Если метод вызван в контексте приложения, сервер дополнительно добавляет фильтр текущего приложения.

В этом случае в ответ попадут только блоки, созданные этим же приложением.

{% endnote %}


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения списка блоков, где:
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
          "select": ["ID", "NAME", "DATE_MODIFY"],
          "filter": {"ACTIVE": "Y"},
          "order": {"ID": "DESC"},
          "group": ["ACTIVE"]
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.repo.getList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": ["ID", "NAME", "DATE_MODIFY"],
          "filter": {"ACTIVE": "Y"},
          "order": {"ID": "DESC"},
          "group": ["ACTIVE"]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.repo.getList.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.getList',
    		{
    			params: {
    				select: ['ID', 'NAME', 'DATE_MODIFY'],
    				filter: { ACTIVE: 'Y' },
    				order: { ID: 'DESC' },
    				group: ['ACTIVE']
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
                'landing.repo.getList',
                [
                    'params' => [
                        'select' => ['ID', 'NAME', 'DATE_MODIFY'],
                        'filter' => ['ACTIVE' => 'Y'],
                        'order' => ['ID' => 'DESC'],
                        'group' => ['ACTIVE'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting landing repository list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.getList',
        {
            params: {
                select: ['ID', 'NAME', 'DATE_MODIFY'],
                filter: { ACTIVE: 'Y' },
                order: { ID: 'DESC' },
                group: ['ACTIVE']
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
        'landing.repo.getList',
        [
            'params' => [
                'select' => ['ID', 'NAME', 'DATE_MODIFY'],
                'filter' => ['ACTIVE' => 'Y'],
                'order' => ['ID' => 'DESC'],
                'group' => ['ACTIVE'],
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
            "ID": "5",
            "XML_ID": "ctx_full_1774873150158",
            "APP_CODE": "bitrix.restapi",
            "ACTIVE": "Y",
            "NAME": "Context full test block",
            "DESCRIPTION": "Check full fields from getList",
            "SECTIONS": "cover,about",
            "SITE_TEMPLATE_ID": null,
            "PREVIEW": "https://www.bitrix24.ru/images/b24_screen.png",
            "MANIFEST": {
                "block": {
                    "name": "Context full test block"
                },
                "nodes": {
                    ".landing-block-node-text": {
                        "name": "Text",
                        "type": "text"
                    }
                }
            },
            "CONTENT": "<section class=\"landing-block\"><div class=\"container\">Test</div></section>",
            "CREATED_BY_ID": "577",
            "MODIFIED_BY_ID": "577",
            "DATE_CREATE": "30.03.2026 14:19:11",
            "DATE_MODIFY": "30.03.2026 14:19:11"
        }
    ],
    "time": {
        "start": 1774873153,
        "finish": 1774873153.634216,
        "duration": 0.6342160701751709,
        "processing": 0,
        "date_start": "2026-03-30T15:19:13+03:00",
        "date_finish": "2026-03-30T15:19:13+03:00",
        "operating_reset_at": 1774873753,
        "operating": 0.11733078956604004
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список блоков [подробнее](#result-template) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип элемента result {#result-template}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор блока ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код блока ||
|| **APP_CODE**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Код приложения ||
|| **ACTIVE**
[`string`](../../data-types.md) | Признак активности (`Y`/`N`) ||
|| **NAME**
[`string`](../../data-types.md) | Название блока ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание блока ||
|| **SECTIONS**
[`string`](../../data-types.md) | Разделы блока ||
|| **SITE_TEMPLATE_ID**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор шаблона сайта ||
|| **PREVIEW**
[`string`](../../data-types.md) | Ссылка на preview ||
|| **MANIFEST**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) \| [`boolean`](../../data-types.md) | Манифест блока.

Подробнее о структуре манифеста: [Описание формата манифеста](../block/manifest.md).

Пример манифеста в ответе метода: [landing.block.getManifestFile](../block/methods/landing-block-get-manifest-file.md) ||
|| **CONTENT**
[`string`](../../data-types.md) | HTML блока ||
|| **CREATED_BY_ID**
[`string`](../../data-types.md) | Идентификатор автора ||
|| **MODIFIED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, изменившего запись ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата создания в формате `DD.MM.YYYY HH:MI:SS` ||
|| **DATE_MODIFY**
[`string`](../../data-types.md) | Дата изменения в формате `DD.MM.YYYY HH:MI:SS` ||
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

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|| `ERROR_ARGUMENT` | The value of an argument 'params' has an invalid type | Передан аргумент `params` в неверном типе ||
|| `SYSTEM_ERROR` | Внутренняя ошибка | Ошибка при выполнении метода на стороне сервера ||
|| `insufficient_scope` | Недостаточно scope у токена | Токен не содержит scope `landing` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repo-register.md)
- [{#T}](./landing-repo-check-content.md)
- [{#T}](./landing-repo-unregister.md)
- [{#T}](./index.md)
