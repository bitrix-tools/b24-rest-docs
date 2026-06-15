# Получить список шаблонов документов crm.documentgenerator.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Template = {
      id: string
      name: string
      region: string
      download: string
      users: string[]
      entityTypeId: string[]
      downloadMachine: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplatesResult = {
      templates: Record<string, Template>
    }

    try {
      // crm.documentgenerator.template.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TemplatesResult>({
        method: 'crm.documentgenerator.template.list',
        params: {
          select: ['id', 'name', 'region', 'entityTypeId', 'users'],
          order: { id: 'desc' },
          filter: { region: 'ru', active: 'Y' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Templates on this page:', Object.keys(result.templates).length)
        console.info(result.templates)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function fetchTemplateList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.documentgenerator.template.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.template.list',
            params: {
              select: ['id', 'name', 'region', 'entityTypeId', 'users'],
              order: { id: 'desc' },
              filter: { region: 'ru', active: 'Y' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Templates on this page:', Object.keys(result.templates).length)
          console.info(result.templates)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTemplateList)
    </script>
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
