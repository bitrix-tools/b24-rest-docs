# Получить поле единицы измерения catalog.measure.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.measure.field.get` возвращает описание поля единицы измерения по имени.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя поля, описание которого нужно получить.

Доступные поля:

- `id` — идентификатор единицы измерения
- `code` — код единицы измерения
- `measureTitle` — название
- `symbol` — условное обозначение
- `symbolIntl` — международное условное обозначение
- `symbolLetterIntl` — международное кодовое буквенное обозначение
- `isDefault` — признак единицы по умолчанию ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть в ответе.

По умолчанию: все свойства описания. Значение `["*"]` не поддерживается.

Доступные поля:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `editableGroups` — группы операций, в которых поле редактируется
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.measure.field.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"code","select":["name","type","title","requiredGroups","editableGroups"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"code","select":["name","type","title","requiredGroups","editableGroups"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.measure.field.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MeasureFieldGetResult = {
      item: {
        name?: string
        type?: string
        title?: string
        requiredGroups?: string[] | null
        editableGroups?: string[] | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<MeasureFieldGetResult>({
        method: 'catalog.measure.field.get',
        params: {
          name: 'code',
          select: ['name', 'type', 'title', 'requiredGroups', 'editableGroups'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field description:', result.item)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getMeasureField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.measure.field.get',
            params: {
              name: 'code',
              select: ['name', 'type', 'title', 'requiredGroups', 'editableGroups'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Field description:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMeasureField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.measure.field.get(
            name="code",
            select=["name", "type", "title", "requiredGroups", "editableGroups"],
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.measure.field.get',
                [
                    'name' => 'code',
                    'select' => ['name', 'type', 'title', 'requiredGroups', 'editableGroups'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.measure.field.get',
        {
            name: 'code',
            select: ['name', 'type', 'title', 'requiredGroups', 'editableGroups'],
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.measure.field.get',
        [
            'name' => 'code',
            'select' => ['name', 'type', 'title', 'requiredGroups', 'editableGroups'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.measure.field.get", b24.Params{
    	"name":   "code",
    	"select": []string{"name", "type", "title", "requiredGroups", "editableGroups"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.measure.field.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	Name           string   `json:"name"`
    	Type           string   `json:"type"`
    	RequiredGroups []string `json:"requiredGroups"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Name, item.Type, item.RequiredGroups)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "name": "code",
            "type": "int",
            "title": "code",
            "requiredGroups": ["add"],
            "editableGroups": ["update"]
        }
    },
    "time": {
        "start": 1792665869,
        "finish": 1792665869.850842,
        "duration": 0.8508419990539551,
        "processing": 0,
        "date_start": "2026-10-22T13:44:29+03:00",
        "date_finish": "2026-10-22T13:44:29+03:00",
        "operating_reset_at": 1792666440,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Описание поля. [Свойства объекта](#item) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Состав описания зависит от `select`. Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля ||
|| **type**
[`string`](../../data-types.md) | Тип в метаданных: `int` для `id` и `code`, `bool` для `isDefault`, `string` для остальных полей ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Массив правил валидации. Для полей этого объекта — `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле обязательно. Для `code` и `measureTitle` — `["add"]`, для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации, `false` — недоступно. Для всех полей — `true` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. Для всех полей — `true` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя. Для `id` — `false`, для остальных полей — `true` ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле можно задавать. Для `symbol`, `symbolIntl`, `symbolLetterIntl`, `isDefault` — `["add", "update"]`, для `id` — `null`.

Для `code` и `measureTitle` возвращается `["update"]`, но эти поля обязательны в [catalog.measure.add](./catalog-measure-add-rest-v3.md) и передаются при создании единицы ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного значения: `true` — множественное, `false` — одиночное. Для всех полей — `false` ||
|| **elementType**
[`string`](../../data-types.md) или `null` | Тип элемента составного поля. Для всех полей — `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `name` не указано",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `catalog` ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Поле `#FIELD#` не найдено | Укажите имя поля из списка параметра `name` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Обязательное поле `name` не указано | Передайте параметр `name` с существующим именем поля ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только поля из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-measure-field-list.md)
- [{#T}](./catalog-measure-get-rest-v3.md)
- [{#T}](./index.md)
