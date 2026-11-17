# Добавить значение списочного свойства v 3.0 catalog.product.property.enum.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.property.enum.add` добавляет значение в свойство товаров или вариаций типа «Список» и возвращает поля нового значения. Свойство типа «Список» хранит готовый набор значений: например, у свойства «Цвет» — «Красный» и «Желтый».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового значения. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`integer`](../../data-types.md) | Идентификатор свойства типа «Список» из торгового каталога.

Идентификатор можно получить методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md). Чтобы получить только списочные свойства, передайте в фильтре `propertyType` со значением `L` ||
|| **value***
[`string`](../../data-types.md) | Текст значения, до 255 символов. Пустая строка вызывает ошибку ||
|| **xmlId***
[`string`](../../data-types.md) | Внешний код значения, до 200 символов. Код должен быть уникальным среди значений всех списочных свойств Битрикс24: если код `Y` уже есть у значения другого свойства, использовать его нельзя ||
|| **def**
[`boolean`](../../data-types.md) | Признак значения по умолчанию.

Возможные значения:

- `true` — значение по умолчанию
- `false` — обычное значение

Строки `Y` и `N` не принимаются. Метод не снимает признак с других значений свойства, поэтому значений по умолчанию может оказаться несколько. Чтобы оставить одно, передайте прежнему значению `def: false` методом [catalog.product.property.enum.update](./catalog-product-property-enum-update-rest-v3.md).

По умолчанию: `false` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки.

По умолчанию: `500` ||
|#

Поле `id` Битрикс24 заполнит сам. Если передать его в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.enum.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"propertyId":1285,"value":"Желтый","xmlId":"color-yellow","sort":300}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.enum.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"propertyId":1285,"value":"Желтый","xmlId":"color-yellow","sort":300},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.enum.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumAddResult = {
      item: {
        id: number
        propertyId: number
        value: string
        def: boolean
        sort: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<EnumAddResult>({
        method: 'catalog.product.property.enum.add',
        params: {
            fields: {
              propertyId: 1285,
              value: 'Желтый',
              xmlId: 'color-yellow',
              sort: 300,
            },
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Value created:', result.item.id)
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
      async function addEnumValue() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.enum.add',
            params: {
                  fields: {
                    propertyId: 1285,
                    value: 'Желтый',
                    xmlId: 'color-yellow',
                    sort: 300,
                  },
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Value created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEnumValue)
    </script>
    ```

- Python

    У методов `catalog.product.property.enum.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.enum.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "propertyId": 1285,
                    "value": "Желтый",
                    "xmlId": "color-yellow",
                    "sort": 300,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
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
                    'catalog.product.property.enum.add',
                    [
                        'fields' => [
                            'propertyId' => 1285,
                            'value' => 'Желтый',
                            'xmlId' => 'color-yellow',
                            'sort' => 300,
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
        'catalog.product.property.enum.add',
        {
            fields: {
                propertyId: 1285,
                value: 'Желтый',
                xmlId: 'color-yellow',
                sort: 300,
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
        'catalog.product.property.enum.add',
        [
            'fields' => [
                'propertyId' => 1285,
                'value' => 'Желтый',
                'xmlId' => 'color-yellow',
                'sort' => 300,
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
    res, err := client.Core().Call(ctx, "catalog.product.property.enum.add", b24.Params{
    	"fields": b24.Params{
    		"propertyId": 1285,
    		"value":      "Желтый",
    		"xmlId":      "color-yellow",
    		"sort":       300,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.property.enum.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID         int    `json:"id"`
    	PropertyID int    `json:"propertyId"`
    	Value      string `json:"value"`
    	Def        bool   `json:"def"`
    	Sort       int    `json:"sort"`
    	XMLID      string `json:"xmlId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 1789,
            "propertyId": 1285,
            "value": "Желтый",
            "def": false,
            "sort": 300,
            "xmlId": "color-yellow"
        }
    },
    "time": {
        "start": 1794922609,
        "finish": 1794922609.767199,
        "duration": 0.7671990394592285,
        "processing": 0,
        "date_start": "2026-11-17T16:36:49+03:00",
        "date_finish": "2026-11-17T16:36:49+03:00",
        "operating_reset_at": 1794922860,
        "operating": 0.11009812355041504
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
[`object`](../../data-types.md) | Поля созданного значения. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор значения ||
|| **propertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, к которому относится значение ||
|| **value**
[`string`](../../data-types.md) | Текст значения ||
|| **def**
[`boolean`](../../data-types.md) | Признак значения по умолчанию: `true` — значение по умолчанию, `false` — обычное значение ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код значения ||
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
                "message": "Запись со значением \"Внешний код\", равным \"blue\", уже есть в базе данных",
                "field": "BX_INVALID_VALUE"
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
|| `propertyId` | Не заполнено обязательное поле "propertyId" | Передайте `propertyId` в `fields` ||
|| `value` | Не заполнено обязательное поле "value" | Передайте `value` в `fields` ||
|| `xmlId` | Не заполнено обязательное поле "xmlId" | Передайте `xmlId` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Property #ID# does not exist | Проверьте `propertyId` методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| `-` | The specified property does not belong to a product catalog | Укажите свойство торгового каталога ||
|| `-` | Only list properties are supported | Укажите свойство типа «Список» ||
|| `BX_INVALID_VALUE` | Запись со значением "Внешний код", равным "#XML_ID#", уже есть в базе данных | Передайте другой `xmlId`. Код должен быть уникальным среди значений всех списочных свойств ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "Значение" | Передайте в `value` непустую строку ||
|| `BX_INVALID_VALUE` | Для значения поля "Значение" превышена максимальная длина: 255. | Сократите `value` до 255 символов ||
|| `def` | В поле `def` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyEnumDto` | Передайте в `fields` только поля из таблицы параметра `fields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» и право на изменение инфоблока свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-update-rest-v3.md)
- [{#T}](./catalog-product-property-enum-get-rest-v3.md)
- [{#T}](./catalog-product-property-enum-list-rest-v3.md)
- [{#T}](./catalog-product-property-enum-delete-rest-v3.md)
- [{#T}](./catalog-product-property-enum-field-list.md)
