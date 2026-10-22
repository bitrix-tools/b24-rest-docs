# Получить поле цены catalog.price.field.get

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

Метод `catalog.price.field.get` возвращает описание поля цены по имени.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя поля, описание которого нужно получить.

Доступные поля:

- `id` — идентификатор цены
- `productId` — идентификатор товара или вариации
- `catalogGroupId` — идентификатор типа цены
- `price` — цена
- `currency` — код валюты
- `extraId` — идентификатор наценки
- `quantityFrom` — нижняя граница диапазона количества
- `quantityTo` — верхняя граница диапазона количества
- `priceScale` — цена в базовой валюте
- `timestampX` — дата и время последнего изменения ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть в ответе.

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

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.price.field.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"price","select":["name","type","requiredGroups","editableGroups"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.price.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"price","select":["name","type","requiredGroups","editableGroups"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.price.field.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceFieldGetResult = {
      item: {
        name?: string
        type?: string
        requiredGroups?: string[] | null
        editableGroups?: string[] | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceFieldGetResult>({
        method: 'catalog.price.field.get',
        params: {
          name: 'price',
          select: [
            'name',
            'type',
            'requiredGroups',
            'editableGroups',
          ],
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
      async function getPriceField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.price.field.get',
            params: {
              name: 'price',
              select: [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
              ],
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

      document.addEventListener('DOMContentLoaded', getPriceField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price.field.get(
            name="price",
            select=[
                "name",
                "type",
                "requiredGroups",
                "editableGroups",
            ],
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
                'catalog.price.field.get',
                [
                    'name' => 'price',
                    'select' => [
                        'name',
                        'type',
                        'requiredGroups',
                        'editableGroups',
                    ],
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
        'catalog.price.field.get',
        {
            name: 'price',
            select: [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
            ],
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
        'catalog.price.field.get',
        [
            'name' => 'price',
            'select' => [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.price.field.get", b24.Params{
    	"name":   "price",
    	"select": []string{"name", "type", "requiredGroups", "editableGroups"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.price.field.get: %w", err)
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
    	EditableGroups []string `json:"editableGroups"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Name, item.Type)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "name": "price",
            "type": "float",
            "requiredGroups": [
                "add"
            ],
            "editableGroups": [
                "add",
                "update"
            ]
        }
    },
    "time": {
        "start": 1792668102,
        "finish": 1792668102.97455,
        "duration": 0.9745500087738037,
        "processing": 0,
        "date_start": "2026-10-22T14:21:42+03:00",
        "date_finish": "2026-10-22T14:21:42+03:00",
        "operating_reset_at": 1792668660,
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
[`string`](../../data-types.md) | Тип в метаданных: `int`, `float`, `string`, `object`. Для `timestampX` возвращается `object`, хотя в ответах методов значение передается строкой ISO 8601 ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей цены — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Массив объектов с правилами валидации. Для `currency` возвращается `[{}]` — ограничение длины в три символа, параметры правила не сериализуются. Для остальных полей — `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Массив операций, в которых поле обязательно. Для `productId`, `catalogGroupId`, `price` и `currency` — `["add"]`, для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации. Для всех полей цены — `true` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки. Для всех полей цены — `true` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Массив операций, в которых поле можно задавать. Для `price`, `currency`, `extraId`, `quantityFrom` и `quantityTo` — `["add", "update"]`, для остальных полей — `null`.

Поля `productId` и `catalogGroupId` метод [catalog.price.add](./catalog-price-add-rest-v3.md) принимает и требует, хотя `editableGroups` для них равно `null` ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного значения. Для всех полей цены — `false` ||
|| **elementType**
[`string`](../../data-types.md) или `null` | Тип элемента составного поля. Для всех полей цены — `null` ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION",
        "message": "Поле `foo` не найдено"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

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
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте в `select` массив строк только из списка параметра `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["name","type"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `catalog` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-field-list.md)
- [{#T}](./catalog-price-get-rest-v3.md)
- [{#T}](./catalog-price-add-rest-v3.md)
