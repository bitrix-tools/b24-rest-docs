# Обновить единицу измерения v 3.0 catalog.measure.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения каталога или просмотра складов и правом изменения единиц измерения

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.measure.update` изменяет единицу измерения и возвращает ее данные после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор единицы измерения.

Идентификатор можно получить методом [catalog.measure.list](./catalog-measure-list-rest-v3.md) или из ответа [catalog.measure.add](./catalog-measure-add-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями единицы измерения, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` возвращает данные единицы без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`integer`](../../data-types.md) | Код единицы измерения. Значение должно быть уникальным: если код занят другой единицей, метод вернет ошибку ||
|| **measureTitle**
[`string`](../../data-types.md) | Название единицы измерения ||
|| **symbol**
[`string`](../../data-types.md) | Условное обозначение ||
|| **symbolIntl**
[`string`](../../data-types.md) | Международное условное обозначение ||
|| **symbolLetterIntl**
[`string`](../../data-types.md) | Международное кодовое буквенное обозначение ||
|| **isDefault**
[`boolean`](../../data-types.md) | Признак единицы измерения по умолчанию. Такая единица автоматически выбирается в карточке нового товара.

Возможные значения:

- `true` — единица по умолчанию
- `false` — обычная единица

Единица по умолчанию может быть только одна, и метод не снимает признак с текущей единицы автоматически. Чтобы назначить другую единицу по умолчанию, сделайте два вызова: передайте `false` текущей единице, затем `true` новой. Текущую единицу по умолчанию можно найти методом [catalog.measure.list](./catalog-measure-list-rest-v3.md) с фильтром `[["isDefault","=",true]]` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.measure.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":21,"fields":{"measureTitle":"Упаковка 10 шт.","symbol":"уп"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":21,"fields":{"measureTitle":"Упаковка 10 шт.","symbol":"уп"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.measure.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MeasureUpdateResult = {
      item: {
        id: number
        code: number
        measureTitle: string
        symbol: string
        symbolIntl: string
        symbolLetterIntl: string
        isDefault: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<MeasureUpdateResult>({
        method: 'catalog.measure.update',
        params: {
          id: 21,
          fields: {
            measureTitle: 'Упаковка 10 шт.',
            symbol: 'уп',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Measure updated:', result.item)
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
      async function updateMeasure() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.measure.update',
            params: {
              id: 21,
              fields: {
                measureTitle: 'Упаковка 10 шт.',
                symbol: 'уп',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Measure updated:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateMeasure)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.measure.update(
            bitrix_id=21,
            fields={
                "measureTitle": "Упаковка 10 шт.",
                "symbol": "уп",
            },
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
                'catalog.measure.update',
                [
                    'id' => 21,
                    'fields' => [
                        'measureTitle' => 'Упаковка 10 шт.',
                        'symbol' => 'уп',
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
        'catalog.measure.update',
        {
            id: 21,
            fields: {
                measureTitle: 'Упаковка 10 шт.',
                symbol: 'уп',
            },
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
        'catalog.measure.update',
        [
            'id' => 21,
            'fields' => [
                'measureTitle' => 'Упаковка 10 шт.',
                'symbol' => 'уп',
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
    res, err := client.Core().Call(ctx, "catalog.measure.update", b24.Params{
    	"id": 21,
    	"fields": b24.Params{
    		"measureTitle": "Упаковка 10 шт.",
    		"symbol":       "уп",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.measure.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           int    `json:"id"`
    	MeasureTitle string `json:"measureTitle"`
    	Symbol       string `json:"symbol"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.MeasureTitle, item.Symbol)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 21,
            "code": 778,
            "measureTitle": "Упаковка 10 шт.",
            "symbol": "уп",
            "symbolIntl": "pack",
            "symbolLetterIntl": "NMP",
            "isDefault": false
        }
    },
    "time": {
        "start": 1792665567,
        "finish": 1792665567.517781,
        "duration": 0.5177810192108154,
        "processing": 0,
        "date_start": "2026-10-22T13:39:27+03:00",
        "date_finish": "2026-10-22T13:39:27+03:00",
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
[`object`](../../data-types.md) | Единица измерения после изменения. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "default value can be set once [isDefault]"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` единицы измерения ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с изменяемыми полями ||
|| `code` | В поле `code` требуется тип данных `int` для такого запроса | Передайте код числом ||
|| `isDefault` | В поле `isDefault` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|| `-` | Duplicate entry for key [code] | Код занят другой единицей. Укажите другой `code` ||
|| `-` | default value can be set once [isDefault] | Сначала передайте `false` в `isDefault` текущей единице по умолчанию ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` и передайте его на верхнем уровне запроса ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не принимает `filter`. Передайте `id` единицы измерения ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `MeasureDto` | Передайте в `fields` только поля из [таблицы параметра fields](#fields) ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.measure.list](./catalog-measure-list-rest-v3.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права чтения каталога или просмотра складов либо права изменения единиц измерения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-measure-add-rest-v3.md)
- [{#T}](./catalog-measure-get-rest-v3.md)
- [{#T}](./catalog-measure-list-rest-v3.md)
- [{#T}](./catalog-measure-delete-rest-v3.md)
- [{#T}](./catalog-measure-field-list.md)
