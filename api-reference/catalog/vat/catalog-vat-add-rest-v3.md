# Добавить ставку НДС v 3.0 catalog.vat.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление ставками НДС»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.vat.add` создает ставку НДС и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями новой ставки НДС. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название ставки НДС. Пустая строка вызывает ошибку валидации ||
|| **rate***
[`double`](../../data-types.md) | Величина ставки НДС в процентах, например `13` или `7.5`.

Допустимы значения от `0` и больше. Отрицательное значение и `null` вызывают ошибку валидации ||
|| **active**
[`boolean`](../../data-types.md) | Активность ставки НДС.

Возможные значения:

- `true` — ставка активна
- `false` — ставка неактивна

Строки `Y` и `N` не принимаются, `null` вызывает ошибку валидации.

По умолчанию: `true` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка. Ноль и отрицательное значение заменяются на `100`, `null` вызывает ошибку валидации.

По умолчанию: `100` ||
|#

Поля `id` и `timestampX` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.vat.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"НДС 13%","rate":13,"sort":10,"active":true}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"НДС 13%","rate":13,"sort":10,"active":true},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.vat.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type VatAddResult = {
      item: {
        id: number
        timestampX: ISODate
        active: boolean
        sort: number
        name: string
        rate: number | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<VatAddResult>({
        method: 'catalog.vat.add',
        params: {
          fields: {
            name: 'НДС 13%',
            rate: 13,
            sort: 10,
            active: true,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('VAT rate created:', result.item.id)
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
      async function addVat() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.vat.add',
            params: {
              fields: {
                name: 'НДС 13%',
                rate: 13,
                sort: 10,
                active: true,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('VAT rate created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addVat)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.vat.add(
            fields={
                "name": "НДС 13%",
                "rate": 13,
                "sort": 10,
                "active": True,
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
                'catalog.vat.add',
                [
                    'fields' => [
                        'name' => 'НДС 13%',
                        'rate' => 13,
                        'sort' => 10,
                        'active' => true,
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
        'catalog.vat.add',
        {
            fields: {
                name: 'НДС 13%',
                rate: 13,
                sort: 10,
                active: true,
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
        'catalog.vat.add',
        [
            'fields' => [
                'name' => 'НДС 13%',
                'rate' => 13,
                'sort' => 10,
                'active' => true,
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
    res, err := client.Core().Call(ctx, "catalog.vat.add", b24.Params{
    	"fields": b24.Params{
    		"name":   "НДС 13%",
    		"rate":   13,
    		"sort":   10,
    		"active": true,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.vat.add: %w", err)
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
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 27,
            "timestampX": "2026-10-22T13:39:08+03:00",
            "active": true,
            "sort": 10,
            "name": "НДС 13%",
            "rate": 13
        }
    },
    "time": {
        "start": 1792665548,
        "finish": 1792665548.462168,
        "duration": 0.46216797828674316,
        "processing": 0,
        "date_start": "2026-10-22T13:39:08+03:00",
        "date_finish": "2026-10-22T13:39:08+03:00",
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
[`object`](../../data-types.md) | Поля созданной ставки НДС. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"rate\"",
                "field": "rate"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `rate` | Не заполнено обязательное поле "rate" | Передайте `rate` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|| `timestampX` | Поле "timestampX" не доступно к заполнению | Уберите `timestampX` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `rate` | В поле `rate` требуется тип данных `float` для такого запроса | Передайте число ||
|| `active` | В поле `active` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|| `active` | The field active must be true or false | Не передавайте `null` в `active` ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте целое число ||
|| `sort` | The field sort must be an integer | Не передавайте `null` в `sort` ||
|| `-` | Неверная величина ставки НДС`<br>` | Передайте в `rate` число от `0` и больше. Значение `null` не поддерживается ||
|| `-` | Не указано название ставки НДС`<br>` | Передайте непустую строку в `name` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `VatDto` | Передайте в `fields` только `name`, `rate`, `active`, `sort` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Управление ставками НДС» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-update-rest-v3.md)
- [{#T}](./catalog-vat-get-rest-v3.md)
- [{#T}](./catalog-vat-list-rest-v3.md)
- [{#T}](./catalog-vat-delete-rest-v3.md)
- [{#T}](./catalog-vat-field-list.md)
