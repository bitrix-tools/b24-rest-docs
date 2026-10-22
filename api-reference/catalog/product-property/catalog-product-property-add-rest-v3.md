# Добавить свойство товара или вариации v 3.0 catalog.product.property.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока каталога

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.property.add` добавляет строковое свойство товара или вариации в торговый каталог.

{% note warning "" %}

В ответе заполнены только `id` и `controlId`, остальные поля приходят со значением `null`. Сохраненные значения свойства можно получить методом [catalog.productProperty.get](./catalog-product-property-get.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового свойства. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор торгового каталога, в который нужно добавить свойство. Для свойства товара передайте каталог товаров, для свойства вариации — каталог вариаций.

Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md).

Метод не проверяет, что инфоблок является торговым каталогом, и добавит свойство в любой существующий инфоблок ||
|| **name***
[`string`](../../data-types.md) | Название свойства. Пустая строка вызывает ошибку валидации ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства, например `MATERIAL`. Метод не проверяет уникальность кода ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.

По умолчанию: `100` ||
|| **multiple**
[`string`](../../data-types.md) | Множественное свойство.

Возможные значения:

- `Y` — свойство множественное
- `N` — свойство одиночное

Любое другое строковое значение сохраняется как `N`.

По умолчанию: `N` ||
|| **isRequired**
[`string`](../../data-types.md) | Обязательное свойство.

Возможные значения:

- `Y` — свойство обязательно для заполнения в карточке товара
- `N` — свойство необязательно

По умолчанию: `N` ||
|#

Тип свойства задать нельзя: метод всегда создает строковое свойство.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Материал","code":"MATERIAL","sort":500,"multiple":"N","isRequired":"N"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Материал","code":"MATERIAL","sort":500,"multiple":"N","isRequired":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductPropertyAddResult = {
      item: {
        id: number
        iblockId: number | null
        name: string | null
        sort: number | null
        code: string | null
        multiple: string | null
        isRequired: string | null
        controlId: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductPropertyAddResult>({
        method: 'catalog.product.property.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Материал',
            code: 'MATERIAL',
            sort: 500,
            multiple: 'N',
            isRequired: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Property created:', result.item.id, result.item.controlId)
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
      async function addProductProperty() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.add',
            params: {
              fields: {
                iblockId: 25,
                name: 'Материал',
                code: 'MATERIAL',
                sort: 500,
                multiple: 'N',
                isRequired: 'N',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Property created:', result.item.id, result.item.controlId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProductProperty)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.property.add(
            fields={
                "iblockId": 25,
                "name": "Материал",
                "code": "MATERIAL",
                "sort": 500,
                "multiple": "N",
                "isRequired": "N",
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
                'catalog.product.property.add',
                [
                    'fields' => [
                        'iblockId' => 25,
                        'name' => 'Материал',
                        'code' => 'MATERIAL',
                        'sort' => 500,
                        'multiple' => 'N',
                        'isRequired' => 'N',
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
        'catalog.product.property.add',
        {
            fields: {
                iblockId: 25,
                name: 'Материал',
                code: 'MATERIAL',
                sort: 500,
                multiple: 'N',
                isRequired: 'N',
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
        'catalog.product.property.add',
        [
            'fields' => [
                'iblockId' => 25,
                'name' => 'Материал',
                'code' => 'MATERIAL',
                'sort' => 500,
                'multiple' => 'N',
                'isRequired' => 'N',
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
    res, err := client.Core().Call(ctx, "catalog.product.property.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId":   25,
    		"name":       "Материал",
    		"code":       "MATERIAL",
    		"sort":       500,
    		"multiple":   "N",
    		"isRequired": "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.property.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int    `json:"id"`
    	ControlID string `json:"controlId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.ControlID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 1231,
            "iblockId": null,
            "name": null,
            "sort": null,
            "code": null,
            "multiple": null,
            "isRequired": null,
            "controlId": "PROPERTY_1231"
        }
    },
    "time": {
        "start": 1792660313,
        "finish": 1792660313.118533,
        "duration": 0.11853289604187012,
        "processing": 0,
        "date_start": "2026-10-22T12:11:53+03:00",
        "date_finish": "2026-10-22T12:11:53+03:00",
        "operating_reset_at": 1792660860,
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
[`object`](../../data-types.md) | Поля созданного свойства. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор созданного свойства ||
|| **iblockId**
`null` | Идентификатор инфоблока. В ответе метода всегда `null` ||
|| **name**
`null` | Название свойства. В ответе метода всегда `null` ||
|| **sort**
`null` | Сортировка. В ответе метода всегда `null` ||
|| **code**
`null` | Символьный код. В ответе метода всегда `null` ||
|| **multiple**
`null` | Признак множественного свойства. В ответе метода всегда `null` ||
|| **isRequired**
`null` | Признак обязательного свойства. В ответе метода всегда `null` ||
|| **controlId**
[`string`](../../data-types.md) | Имя поля свойства в формах инфоблока в формате `PROPERTY_<id>`, например `PROPERTY_1231` ||
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
                "message": "Не заполнено обязательное поле \"name\"",
                "field": "name"
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
|| `iblockId` | Не заполнено обязательное поле "iblockId" | Передайте `iblockId` в `fields` ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|| `controlId` | Поле "controlId" не доступно к заполнению | Уберите `controlId` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `iblockId` | В поле `iblockId` требуется тип данных `int` для такого запроса | Передайте число ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте целое число ||
|| `multiple` | В поле `multiple` требуется тип данных `string` для такого запроса | Передайте строку `Y` или `N`, а не `true` или `false` ||
|| `isRequired` | В поле `isRequired` требуется тип данных `string` для такого запроса | Передайте строку `Y` или `N`, а не `true` или `false` ||
|| `-` | Не введено название.`<br>` | Передайте непустую строку в `name` ||
|| `200040300000` | Iblock Not Found | Инфоблок не найден. Проверьте идентификатор методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyDto` | Передайте в `fields` только `iblockId`, `name`, `code`, `sort`, `multiple`, `isRequired`. Поле `propertyType` метод не принимает ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» и право на изменение инфоблока каталога ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-field-list.md)
- [{#T}](./catalog-product-property-type-list.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-list.md)
