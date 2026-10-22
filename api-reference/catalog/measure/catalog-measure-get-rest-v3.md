# Получить информацию о единице измерения по идентификатору v 3.0 catalog.measure.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения каталога или просмотра складов

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.measure.get` возвращает данные единицы измерения по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор единицы измерения.

Идентификатор можно получить методом [catalog.measure.list](./catalog-measure-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей единицы измерения, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор единицы измерения
- `code` — код единицы измерения
- `measureTitle` — название
- `symbol` — условное обозначение
- `symbolIntl` — международное условное обозначение
- `symbolLetterIntl` — международное кодовое буквенное обозначение
- `isDefault` — признак единицы по умолчанию

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля, значение `["*"]` не поддерживается ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.measure.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9,"select":["id","code","measureTitle","symbol","isDefault"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9,"select":["id","code","measureTitle","symbol","isDefault"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.measure.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MeasureGetResult = {
      item: {
        id: number
        code: number
        measureTitle: string
        symbol: string
        isDefault: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<MeasureGetResult>({
        method: 'catalog.measure.get',
        params: {
          id: 9,
          select: [
            'id',
            'code',
            'measureTitle',
            'symbol',
            'isDefault',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Measure:', result.item.code, result.item.isDefault)
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
      async function getMeasure() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.measure.get',
            params: {
              id: 9,
              select: [
                'id',
                'code',
                'measureTitle',
                'symbol',
                'isDefault',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Measure:', result.item.code, result.item.isDefault)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMeasure)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.measure.get(
            bitrix_id=9,
            select=["id", "code", "measureTitle", "symbol", "isDefault"],
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
                'catalog.measure.get',
                [
                    'id' => 9,
                    'select' => ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
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
        'catalog.measure.get',
        {
            id: 9,
            select: ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
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
        'catalog.measure.get',
        [
            'id' => 9,
            'select' => ['id', 'code', 'measureTitle', 'symbol', 'isDefault'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.measure.get", b24.Params{
    	"id":     9,
    	"select": []string{"id", "code", "measureTitle", "symbol", "isDefault"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.measure.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           int    `json:"id"`
    	Code         int    `json:"code"`
    	MeasureTitle string `json:"measureTitle"`
    	Symbol       string `json:"symbol"`
    	IsDefault    bool   `json:"isDefault"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Code, item.IsDefault)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 9,
            "code": 796,
            "measureTitle": "",
            "symbol": "",
            "isDefault": true
        }
    },
    "time": {
        "start": 1792665512,
        "finish": 1792665513.004024,
        "duration": 1.0040240287780762,
        "processing": 1,
        "date_start": "2026-10-22T13:38:32+03:00",
        "date_finish": "2026-10-22T13:38:33+03:00",
        "operating_reset_at": 1792666080,
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
[`object`](../../data-types.md) | Данные единицы измерения. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор единицы измерения ||
|| **code**
[`integer`](../../data-types.md) | Код единицы измерения ||
|| **measureTitle**
[`string`](../../data-types.md) | Название единицы измерения. Пустая строка, если значение не задано ||
|| **symbol**
[`string`](../../data-types.md) | Условное обозначение. Пустая строка, если значение не задано ||
|| **symbolIntl**
[`string`](../../data-types.md) | Международное условное обозначение. Пустая строка, если значение не задано ||
|| **symbolLetterIntl**
[`string`](../../data-types.md) | Международное кодовое буквенное обозначение. Пустая строка, если значение не задано ||
|| **isDefault**
[`boolean`](../../data-types.md) | `true` — единица измерения по умолчанию, `false` — обычная единица ||
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` положительным целым числом. Та же ошибка возвращается для `0`, отрицательного и нечислового значения ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.measure.list](./catalog-measure-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `MeasureDto` | Укажите в `select` только поля из [описания объекта item](#item) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права чтения каталога или просмотра складов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-measure-add-rest-v3.md)
- [{#T}](./catalog-measure-update-rest-v3.md)
- [{#T}](./catalog-measure-list-rest-v3.md)
- [{#T}](./catalog-measure-delete-rest-v3.md)
- [{#T}](./catalog-measure-field-list.md)
