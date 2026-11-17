# Добавить параметр свойства товаров или вариаций v 3.0 catalog.product.property.feature.add

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

Метод `catalog.product.property.feature.add` добавляет параметр свойству товаров или вариаций и возвращает его поля. Параметр определяет, как свойство используется в каталоге: например, показывается ли оно в списке товаров и попадает ли его значение в корзину.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового параметра. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`integer`](../../data-types.md) | Идентификатор свойства торгового каталога.

Идентификатор можно получить методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| **moduleId***
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит параметр: `iblock` или `catalog` ||
|| **featureId***
[`string`](../../data-types.md) | Код параметра.

Метод [catalog.product.property.feature.available.list](./catalog-product-property-feature-available-list.md) возвращает сочетания `moduleId` и `featureId`, доступные свойству. Возможные сочетания:

- `iblock` и `LIST_PAGE_SHOW` — показывать свойство в списке товаров
- `iblock` и `DETAIL_PAGE_SHOW` — показывать свойство на детальной странице товара
- `catalog` и `IN_BASKET` — добавлять значение свойства в корзину
- `catalog` и `OFFER_TREE` — выбирать вариации по свойству ||
|| **isEnabled***
[`boolean`](../../data-types.md) | Признак активности параметра.

Возможные значения:

- `true` — параметр включен
- `false` — параметр выключен

Строки `Y` и `N` не принимаются ||
|#

Каждое сочетание `moduleId` и `featureId` можно добавить свойству только один раз. Поле `id` Битрикс24 заполнит сам, передавать его нельзя.

{% note warning "" %}

Перед добавлением проверьте методом [catalog.product.property.feature.available.list](./catalog-product-property-feature-available-list.md), что параметр доступен свойству. Метод `catalog.product.property.feature.add` этого не проверяет и сохранит любые `moduleId` и `featureId`, даже несуществующие. Удалить такой параметр нельзя.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.feature.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"propertyId":1285,"moduleId":"iblock","featureId":"DETAIL_PAGE_SHOW","isEnabled":true}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.feature.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"propertyId":1285,"moduleId":"iblock","featureId":"DETAIL_PAGE_SHOW","isEnabled":true},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.feature.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FeatureAddResult = {
      item: {
        id: number
        propertyId: number
        moduleId: string
        featureId: string
        isEnabled: boolean
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FeatureAddResult>({
        method: 'catalog.product.property.feature.add',
        params: {
            fields: {
              propertyId: 1285,
              moduleId: 'iblock',
              featureId: 'DETAIL_PAGE_SHOW',
              isEnabled: true,
            },
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Feature created:', result.item.id)
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
      async function addPropertyFeature() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.feature.add',
            params: {
                  fields: {
                    propertyId: 1285,
                    moduleId: 'iblock',
                    featureId: 'DETAIL_PAGE_SHOW',
                    isEnabled: true,
                  },
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Feature created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPropertyFeature)
    </script>
    ```

- Python

    У методов `catalog.product.property.feature.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.feature.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "propertyId": 1285,
                    "moduleId": "iblock",
                    "featureId": "DETAIL_PAGE_SHOW",
                    "isEnabled": True,
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
                    'catalog.product.property.feature.add',
                    [
                        'fields' => [
                            'propertyId' => 1285,
                            'moduleId' => 'iblock',
                            'featureId' => 'DETAIL_PAGE_SHOW',
                            'isEnabled' => true,
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
        'catalog.product.property.feature.add',
        {
            fields: {
                propertyId: 1285,
                moduleId: 'iblock',
                featureId: 'DETAIL_PAGE_SHOW',
                isEnabled: true,
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
        'catalog.product.property.feature.add',
        [
            'fields' => [
                'propertyId' => 1285,
                'moduleId' => 'iblock',
                'featureId' => 'DETAIL_PAGE_SHOW',
                'isEnabled' => true,
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
    res, err := client.Core().Call(ctx, "catalog.product.property.feature.add", b24.Params{
    	"fields": b24.Params{
    		"propertyId": 1285,
    		"moduleId":   "iblock",
    		"featureId":  "DETAIL_PAGE_SHOW",
    		"isEnabled":  true,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.property.feature.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID         int    `json:"id"`
    	PropertyID int    `json:"propertyId"`
    	ModuleID   string `json:"moduleId"`
    	FeatureID  string `json:"featureId"`
    	IsEnabled  bool   `json:"isEnabled"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.FeatureID, item.IsEnabled)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 221,
            "propertyId": 1285,
            "moduleId": "iblock",
            "featureId": "DETAIL_PAGE_SHOW",
            "isEnabled": true
        }
    },
    "time": {
        "start": 1794923346,
        "finish": 1794923346.936147,
        "duration": 0.9361469745635986,
        "processing": 0,
        "date_start": "2026-11-17T16:49:06+03:00",
        "date_finish": "2026-11-17T16:49:06+03:00",
        "operating_reset_at": 1794923940,
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
[`object`](../../data-types.md) | Поля созданного параметра. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор параметра свойства ||
|| **propertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, к которому относится параметр ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит параметр: `iblock` или `catalog` ||
|| **featureId**
[`string`](../../data-types.md) | Код параметра, например `LIST_PAGE_SHOW` или `IN_BASKET` ||
|| **isEnabled**
[`boolean`](../../data-types.md) | Признак активности параметра: `true` — параметр включен, `false` — выключен ||
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
                "message": "The feature is already assigned to the property"
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
|| `#FIELD#` | Не заполнено обязательное поле "#FIELD#" | Передайте в `fields` поля `propertyId`, `moduleId`, `featureId` и `isEnabled` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | The feature is already assigned to the property | Параметр у свойства уже есть. Найдите его методом [catalog.product.property.feature.list](./catalog-product-property-feature-list-rest-v3.md) и измените методом [catalog.product.property.feature.update](./catalog-product-property-feature-update-rest-v3.md) ||
|| `-` | Property #ID# does not exist | Проверьте `propertyId` методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| `-` | The specified property does not belong to a product catalog | Укажите свойство торгового каталога. Свойства каталога возвращает метод [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| `isEnabled` | В поле `isEnabled` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyFeatureDto` | Передайте в `fields` только поля из таблицы параметра `fields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» и право на изменение инфоблока свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-feature-update-rest-v3.md)
- [{#T}](./catalog-product-property-feature-get-rest-v3.md)
- [{#T}](./catalog-product-property-feature-list-rest-v3.md)
- [{#T}](./catalog-product-property-feature-available-list.md)
- [{#T}](./catalog-product-property-feature-field-list.md)
