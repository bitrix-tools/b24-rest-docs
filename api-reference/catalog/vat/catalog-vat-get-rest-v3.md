# Получить значения полей ставки НДС v 3.0 catalog.vat.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление ставками НДС»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.vat.get` возвращает поля ставки НДС по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор ставки НДС.

Идентификатор можно получить методом [catalog.vat.list](./catalog-vat-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей ставки, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор ставки НДС
- `timestampX` — дата и время последнего изменения
- `active` — активность ставки
- `sort` — сортировка
- `name` — название ставки
- `rate` — величина ставки

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.vat.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"select":["id","name","rate","active"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"select":["id","name","rate","active"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.vat.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type VatGetResult = {
      item: {
        id: number
        name?: string
        rate?: number | null
        active?: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<VatGetResult>({
        method: 'catalog.vat.get',
        params: {
          id: 27,
          select: [
            'id',
            'name',
            'rate',
            'active',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('VAT rate:', result.item)
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
      async function getVat() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.vat.get',
            params: {
              id: 27,
              select: [
                'id',
                'name',
                'rate',
                'active',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('VAT rate:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getVat)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "id",
        "name",
        "rate",
        "active",
    ]

    try:
        bitrix_response = client.catalog.vat.get(
            bitrix_id=27,
            select=select,
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
                'catalog.vat.get',
                [
                    'id' => 27,
                    'select' => [
                        'id',
                        'name',
                        'rate',
                        'active',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.vat.get',
        {
            id: 27,
            select: [
                'id',
                'name',
                'rate',
                'active',
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
        'catalog.vat.get',
        [
            'id' => 27,
            'select' => [
                'id',
                'name',
                'rate',
                'active',
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
    res, err := client.Core().Call(ctx, "catalog.vat.get", b24.Params{
    	"id":     27,
    	"select": []string{"id", "name", "rate", "active"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.vat.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID     int      `json:"id"`
    	Name   string   `json:"name"`
    	Rate   *float64 `json:"rate"`
    	Active bool     `json:"active"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.Active)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 27,
            "active": false,
            "name": "НДС 10%",
            "rate": 10
        }
    },
    "time": {
        "start": 1792665596,
        "finish": 1792665596.07112,
        "duration": 0.07112002372741699,
        "processing": 0,
        "date_start": "2026-10-22T13:39:56+03:00",
        "date_finish": "2026-10-22T13:39:56+03:00",
        "operating_reset_at": 1792666140,
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
[`object`](../../data-types.md) | Поля ставки НДС. Состав зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Таблица содержит все поля, которые можно запросить в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ставки НДС ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ставки ||
|| **active**
[`boolean`](../../data-types.md) | Активность ставки: `true` — активна, `false` — неактивна ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **name**
[`string`](../../data-types.md) | Название ставки НДС ||
|| **rate**
[`double`](../../data-types.md) или `null` | Величина ставки НДС в процентах. `null` у системной ставки «Без НДС» ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` — положительное целое число. Ошибка возникает и для `0`, и для строки ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.vat.list](./catalog-vat-list-rest-v3.md) ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `VatDto` | Передайте только поля из списка: `id`, `timestampX`, `active`, `sort`, `name`, `rate` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","name"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление ставками НДС» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-add-rest-v3.md)
- [{#T}](./catalog-vat-update-rest-v3.md)
- [{#T}](./catalog-vat-list-rest-v3.md)
- [{#T}](./catalog-vat-delete-rest-v3.md)
- [{#T}](./catalog-vat-field-list.md)
