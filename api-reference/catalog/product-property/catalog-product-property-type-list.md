# Получить список типов свойств товаров catalog.product.property.type.list

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

Метод `catalog.product.property.type.list` возвращает типы свойств товаров и вариаций, которые поддерживает торговый каталог.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей типа свойства, которые нужно вернуть в ответе.

Доступные поля:

- `id` — код типа свойства
- `propertyType` — базовый тип свойства
- `userType` — пользовательский тип свойства

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля ||
|#

Метод возвращает весь список сразу. Параметры `filter`, `order` и `pagination` не поддерживаются.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.product.property.type.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","propertyType","userType"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.type.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","propertyType","userType"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.type.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductPropertyTypeListResult = {
      items: Array<{
        id: string
        propertyType: string
        userType: string | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductPropertyTypeListResult>({
        method: 'catalog.product.property.type.list',
        params: {
          select: [
            'id',
            'propertyType',
            'userType',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(type => console.info(type.id, type.propertyType, type.userType))
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
      async function listProductPropertyTypes() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.type.list',
            params: {
              select: [
                'id',
                'propertyType',
                'userType',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(type => console.info(type.id, type.propertyType, type.userType))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductPropertyTypes)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.property.type.list(
            select=["id", "propertyType", "userType"],
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
                'catalog.product.property.type.list',
                [
                    'select' => ['id', 'propertyType', 'userType'],
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
        'catalog.product.property.type.list',
        {
            select: ['id', 'propertyType', 'userType'],
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
        'catalog.product.property.type.list',
        [
            'select' => ['id', 'propertyType', 'userType'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.property.type.list", b24.Params{
    	"select": []string{"id", "propertyType", "userType"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.type.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID           string  `json:"id"`
    		PropertyType string  `json:"propertyType"`
    		UserType     *string `json:"userType"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, t := range result.Items {
    	fmt.Println(t.ID, t.PropertyType)
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
                "id": "NUMBER",
                "propertyType": "N",
                "userType": null
            },
            {
                "id": "STRING",
                "propertyType": "S",
                "userType": null
            },
            {
                "id": "LIST",
                "propertyType": "L",
                "userType": null
            },
            {
                "id": "BOOL_ENUM",
                "propertyType": "L",
                "userType": "BoolEnum"
            },
            {
                "id": "DATETIME",
                "propertyType": "S",
                "userType": "DateTime"
            },
            {
                "id": "MONEY",
                "propertyType": "S",
                "userType": "Money"
            },
            {
                "id": "SKU",
                "propertyType": "E",
                "userType": "SKU"
            }
        ]
    },
    "time": {
        "start": 1792660566,
        "finish": 1792660566.778289,
        "duration": 0.7782890796661377,
        "processing": 0,
        "date_start": "2026-10-22T12:16:06+03:00",
        "date_finish": "2026-10-22T12:16:06+03:00",
        "operating_reset_at": 1792661160,
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
|| **result.items**
[`array`](../../data-types.md) | Массив типов свойств. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Код типа свойства.

Возможные значения:

- `NUMBER` — число
- `STRING` — строка
- `LIST` — список
- `BOOL_ENUM` — флажок «Да/Нет»
- `DATETIME` — дата и время
- `MONEY` — деньги
- `SKU` — привязка вариации к товару ||
|| **propertyType**
[`string`](../../data-types.md) | Базовый тип свойства инфоблока.

Возможные значения:

- `N` — число
- `S` — строка
- `L` — список
- `E` — привязка к элементам ||
|| **userType**
[`string`](../../data-types.md) или `null` | Пользовательский тип свойства, который уточняет базовый тип: `BoolEnum`, `DateTime`, `Money`, `SKU`. `null` — свойство базового типа ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":2}`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | В DTO `ProductPropertyTypeDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Уберите `filter` из запроса: метод возвращает весь список ||
|| `#FIELD#` | В DTO `ProductPropertyTypeDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Уберите `order` из запроса ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Уберите `pagination` из запроса: метод возвращает весь список ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyTypeDto` | Укажите в `select` только поля из описания параметра `select`. Значение `["*"]` не поддерживается ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-type-field-list.md)
- [{#T}](./catalog-product-property-add-rest-v3.md)
- [{#T}](./catalog-product-property-field-list.md)
