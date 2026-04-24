# Получить список шаблонов документов crm.documentgenerator.template.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.template.list` возвращает список шаблонов документов.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть у шаблонов.

При выборке можно использовать:
- `'*'` — для выборки всех стандартных полей шаблона
- явный список полей, например `["id","name","region","active"]`

Дополнительно поддерживаются:
- `entityTypeId` — массив привязок шаблона к CRM-объектам
- `users` — массив кодов прав доступа

Основные поля для `select`: `id`, `name`, `region`, `code`, `active`, `moduleId`, `numeratorId`, `withStamps`, `isDeleted`, `sort`, `createTime`, `updateTime`

Список полей шаблона смотрите в разделе [`Тип template`](#template). По умолчанию используется `["*"]` ||
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
- `field_n` — название поля для фильтрации
- `value_n` — значение фильтра

К ключам `field_n` можно добавлять префиксы:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в значении передается массив
- `!@` — NOT IN, в значении передается массив
- `=` — равно (по умолчанию)
- `!=` или `!` — не равно

Особенности:
- если `isDeleted` не передан, применяется фильтр `isDeleted = "N"`
- фильтр `moduleId` принудительно ограничивается значением `crm`
- можно фильтровать по `entityTypeId`, например `["2","2_category_37"]`

Основные поля для `filter`: `id`, `name`, `region`, `code`, `active`, `moduleId`, `numeratorId`, `withStamps`, `isDeleted`, `sort`, `createTime`, `updateTime`, `entityTypeId` ||
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
- `field_n` — название поля сортировки
- `value_n` — направление сортировки: `ASC` или `DESC`

Основные поля для `order`: `id`, `name`, `region`, `code`, `active`, `moduleId`, `numeratorId`, `withStamps`, `isDeleted`, `sort`, `createTime`, `updateTime`

Пример: `{"id":"DESC","sort":"ASC"}` ||
|| **start**
[`integer`](../../data-types.md) | Параметр постраничной навигации.

Размер страницы фиксирован: `50` записей.

Формула для получения N-й страницы:
`start = (N - 1) * 50`

Подробнее в статье [Особенности списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения списка шаблонов, где:
- выбираются поля `id`, `name`, `region`, `entityTypeId`, `users`
- сортировка по `id` по убыванию
- фильтр по региону `ru` и активности `Y`
- стартовое смещение — `0`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","region","entityTypeId","users"],"order":{"id":"desc"},"filter":{"region":"ru","active":"Y"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","region","entityTypeId","users"],"order":{"id":"desc"},"filter":{"region":"ru","active":"Y"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.list
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.template.list',
    		{
    			select: ['id', 'name', 'region', 'entityTypeId', 'users'],
    			order: { id: 'desc' },
    			filter: { region: 'ru', active: 'Y' },
    			start: 0,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.template.list',
                [
                    'select' => ['id', 'name', 'region', 'entityTypeId', 'users'],
                    'order' => ['id' => 'desc'],
                    'filter' => ['region' => 'ru', 'active' => 'Y'],
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting templates list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.list',
        {
            select: ['id', 'name', 'region', 'entityTypeId', 'users'],
            order: { id: 'desc' },
            filter: { region: 'ru', active: 'Y' },
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info(result.data());

            if (result.more()) {
                result.next();
            }
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.template.list',
        [
            'select' => ['id', 'name', 'region', 'entityTypeId', 'users'],
            'order' => ['id' => 'desc'],
            'filter' => ['region' => 'ru', 'active' => 'Y'],
            'start' => 0,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "templates": {
            "39": {
                "id": "39",
                "name": "Демонстрационная реализация товара",
                "region": "ru",
                "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=39",
                "users": [
                    "UA"
                ],
                "entityTypeId": [
                    "2_category_0",
                    "2_category_32"
                ],
                "downloadMachine": "https://mysite.ru/rest/crm.documentgenerator.template.download.json?auth=***&token=***"
            },
            "37": {
                "id": "37",
                "name": "Акт о списании товаров (Россия)",
                "region": "ru",
                "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.template.download&SITE_ID=s1&id=37",
                "users": [
                    "UA"
                ],
                "entityTypeId": [
                    "2_category_37",
                    "bitrix\\crm\\integration\\documentgenerator\\dataprovider\\storedocumentdeduct"
                ],
                "downloadMachine": "https://mysite.ru/rest/crm.documentgenerator.template.download.json?auth=***&token=***"
            }
        }
    },
    "total": 20,
    "time": {
        "start": 1773845479,
        "finish": 1773845479.829607,
        "duration": 0.8296070098876953,
        "processing": 0,
        "date_start": "2026-03-18T17:51:19+03:00",
        "date_finish": "2026-03-18T17:51:19+03:00",
        "operating_reset_at": 1773846079,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`templates`](#templates) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество шаблонов, подходящих под фильтр ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект templates {#templates}

[`object`](../../data-types.md), где ключ — строковый идентификатор шаблона, а значение — объект [`template`](#template)

#### Тип template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка для скачивания шаблона ||
|| **users**
[`array`](../../data-types.md) | Массив кодов пользователей или групп доступа ||
|| **entityTypeId**
[`array`](../../data-types.md) | Массив привязок к типам объектов ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка для машинного скачивания шаблона ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона. Может быть `null` ||
|| **active**
[`char`](../../data-types.md) | Признак активности (`Y`/`N`) ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля владельца шаблона ||
|| **numeratorId**
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Признак использования печатей (`Y`/`N`) ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления (`Y`/`N`) ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Время создания шаблона ||
|| **updateTime**
[`datetime`](../../data-types.md) | Время последнего обновления шаблона ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOCGEN_ACCESS_ERROR",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к шаблонам ||
|| `Пустое значение` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-add.md)
- [{#T}](./crm-document-generator-template-update.md)
- [{#T}](./crm-document-generator-template-get.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [Получить поля шаблона документа crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
