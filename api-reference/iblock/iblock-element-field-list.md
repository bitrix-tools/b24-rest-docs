# Получить список полей элемента инфоблока iblock.element.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`iblock`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `iblock.element.field.list` возвращает список доступных полей элемента инфоблока.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть в ответе.

По умолчанию: все свойства описания.

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

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/iblock.element.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","filterable","sortable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/iblock.element.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","filterable","sortable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/iblock.element.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ElementFieldListResult = {
      items: Array<{
        name: string
        type: string
        filterable: boolean
        sortable: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ElementFieldListResult>({
        method: 'iblock.element.field.list',
        params: {
          select: ['name', 'type', 'filterable', 'sortable'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach((field) => console.info(field.name, field.type))
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
      async function getElementFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'iblock.element.field.list',
            params: {
              select: ['name', 'type', 'filterable', 'sortable'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach((field) => console.info(field.name, field.type))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getElementFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.iblock.element.field.list(
            select=["name", "type", "filterable", "sortable"],
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
                'iblock.element.field.list',
                [
                    'select' => ['name', 'type', 'filterable', 'sortable'],
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
        'iblock.element.field.list',
        {
            select: ['name', 'type', 'filterable', 'sortable'],
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
        'iblock.element.field.list',
        [
            'select' => ['name', 'type', 'filterable', 'sortable'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "iblock.element.field.list", b24.Params{
    	"select": []string{"name", "type", "filterable", "sortable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("iblock.element.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name       string `json:"name"`
    		Type       string `json:"type"`
    		Filterable bool   `json:"filterable"`
    		Sortable   bool   `json:"sortable"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range result.Items {
    	fmt.Println(field.Name, field.Type)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "name": "id",
                "type": "int",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "iblockId",
                "type": "int",
                "filterable": true,
                "sortable": false
            },
            {
                "name": "name",
                "type": "string",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "iblockSectionId",
                "type": "int",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "properties",
                "type": "array",
                "filterable": false,
                "sortable": false
            }
        ]
    },
    "time": {
        "start": 1792670785,
        "finish": 1792670785.424705,
        "duration": 0.42470502853393555,
        "processing": 0,
        "date_start": "2026-10-22T15:06:25+03:00",
        "date_finish": "2026-10-22T15:06:25+03:00",
        "operating_reset_at": 1792671360,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../data-types.md) | Массив описаний полей элемента инфоблока. [Свойства элемента](#items) зависят от `select` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Состав описания зависит от `select`. Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../data-types.md) | Имя поля:

- `id` — идентификатор элемента
- `iblockId` — идентификатор инфоблока
- `name` — название элемента
- `iblockSectionId` — идентификатор раздела инфоблока
- `properties` — значения свойств элемента. Ключи объекта — символьные коды свойств ||
|| **type**
[`string`](../data-types.md) | Тип в метаданных: `int`, `string`, `array` ||
|| **title**
[`string`](../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../data-types.md) | Массив правил валидации. Для `iblockId` содержит два правила, для остальных полей — `[]` ||
|| **requiredGroups**
[`array`](../data-types.md) или `null` | Массив строк с именами операций, в которых поле обязательно. Для полей этого объекта — `null` ||
|| **filterable**
[`boolean`](../data-types.md) | `true` — поле доступно для фильтрации, `false` — недоступно. Для `properties` — `false`, для остальных полей — `true` ||
|| **sortable**
[`boolean`](../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. Для `iblockId` и `properties` — `false`, для остальных полей — `true` ||
|| **editable**
[`boolean`](../data-types.md) | `true` — поле редактируемое, `false` — только для чтения. Для всех полей — `false`: методы элементов инфоблока только читают данные ||
|| **editableGroups**
[`array`](../data-types.md) или `null` | Массив строк с именами операций, в которых поле можно задавать. Для всех полей — `null` ||
|| **multiple**
[`boolean`](../data-types.md) | Признак множественного значения: `true` — множественное, `false` — одиночное. Для всех полей — `false` ||
|| **elementType**
[`string`](../data-types.md) или `null` | Тип элемента составного поля. Для всех полей — `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `bad` для сущности `DtoFieldDto`"
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у вебхука или приложения есть scope `iblock` ||
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

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./iblock-element-field-get.md)
- [{#T}](./iblock-element-get.md)
- [{#T}](./iblock-element-list.md)
- [{#T}](./index.md)
