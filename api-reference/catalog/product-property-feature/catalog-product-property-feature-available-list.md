# Получить доступные параметры свойства v 3.0 catalog.product.property.feature.available.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.property.feature.available.list` возвращает параметры, которые можно назначить свойству. Набор зависит от типа свойства и каталога: например, `OFFER_TREE` доступен только свойствам вариаций.

Метод не показывает, какие параметры у свойства уже есть и включены ли они. Их возвращает метод [catalog.product.property.feature.list](./catalog-product-property-feature-list-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Одно условие по идентификатору свойства `propertyId`: `[["propertyId", "=", 907]]`. Другие поля и операторы `in`, `>`, `!=` не поддерживаются.

Идентификатор свойства можно получить методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть в ответе.

Доступные поля:

- `moduleId` — идентификатор модуля
- `featureId` — код параметра
- `featureName` — название параметра

По умолчанию: все поля ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. Без него метод вернет до 50 параметров.

- `limit` — количество параметров на странице, по умолчанию `50`
- `page` — номер страницы, начиная с `1`
- `offset` — количество параметров, которые нужно пропустить ||
|#

Сортировка `order` не поддерживается.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.feature.available.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["propertyId","=",907]]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.feature.available.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["propertyId","=",907]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.feature.available.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AvailableFeatureListResult = {
      items: Array<{
        moduleId: string
        featureId: string
        featureName: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<AvailableFeatureListResult>({
        method: 'catalog.product.property.feature.available.list',
        params: {
            filter: [
              ['propertyId', '=', 907],
            ],
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Available features:', result.items.map((feature) => feature.featureId))
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
      async function listAvailableFeatures() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.feature.available.list',
            params: {
                  filter: [
                    ['propertyId', '=', 907],
                  ],
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Available features:', result.items.map((feature) => feature.featureId))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listAvailableFeatures)
    </script>
    ```

- Python

    У методов `catalog.product.property.feature.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.feature.available.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["propertyId", "=", 907],
                ],
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
                    'catalog.product.property.feature.available.list',
                    [
                        'filter' => [
                            ['propertyId', '=', 907],
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
        'catalog.product.property.feature.available.list',
        {
            filter: [
                ['propertyId', '=', 907],
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
        'catalog.product.property.feature.available.list',
        [
            'filter' => [
                ['propertyId', '=', 907],
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
    res, err := client.Core().Call(ctx, "catalog.product.property.feature.available.list", b24.Params{
    	"filter": []any{
    		[]any{"propertyId", "=", 907},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.feature.available.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ModuleID    string `json:"moduleId"`
    		FeatureID   string `json:"featureId"`
    		FeatureName string `json:"featureName"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ModuleID, item.FeatureID, item.FeatureName)
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
                "moduleId": "iblock",
                "featureId": "LIST_PAGE_SHOW",
                "featureName": "Показывать на странице списка элементов"
            },
            {
                "moduleId": "iblock",
                "featureId": "DETAIL_PAGE_SHOW",
                "featureName": "Показывать на детальной странице элемента"
            },
            {
                "moduleId": "catalog",
                "featureId": "IN_BASKET",
                "featureName": "Значение добавляется в корзину"
            },
            {
                "moduleId": "catalog",
                "featureId": "OFFER_TREE",
                "featureName": "Используется для выбора торговых предложений"
            }
        ]
    },
    "time": {
        "start": 1794923353,
        "finish": 1794923353.848634,
        "duration": 0.8486340045928955,
        "processing": 0,
        "date_start": "2026-11-17T16:49:13+03:00",
        "date_finish": "2026-11-17T16:49:13+03:00",
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
|| **result.items**
[`array`](../../data-types.md) | Массив доступных параметров. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит параметр: `iblock` или `catalog` ||
|| **featureId**
[`string`](../../data-types.md) | Код параметра ||
|| **featureName**
[`string`](../../data-types.md) | Название параметра на языке Битрикс24 ||
|#

Возможные сочетания `moduleId` и `featureId`:

- `iblock` и `LIST_PAGE_SHOW` — показывать свойство в списке товаров
- `iblock` и `DETAIL_PAGE_SHOW` — показывать свойство на детальной странице товара
- `catalog` и `IN_BASKET` — добавлять значение свойства в корзину
- `catalog` и `OFFER_TREE` — выбирать вариации по свойству

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `propertyId`",
                "field": "filter.propertyId"
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
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием по `propertyId` ||
|| `#FIELD#` | В DTO `ProductPropertyAvailableFeatureDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `propertyId` ||
|| `#FIELD#` | В DTO `ProductPropertyAvailableFeatureDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Уберите `order` из запроса ||
|#

#### Ошибка фильтра по свойству

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.propertyId` | Требуется указать фильтр по обязательному полю `propertyId` | Передайте одно условие `["propertyId", "=", <id>]` без `in` и операторов сравнения ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `propertyId` | Запись с ID = `#ID#` не найдена | Свойства нет или оно не относится к торговому каталогу. Проверьте идентификатор методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyAvailableFeatureDto` | Передайте в `select` только поля из списка параметра `select` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-feature-add-rest-v3.md)
- [{#T}](./catalog-product-property-feature-list-rest-v3.md)
- [{#T}](./catalog-product-property-feature-available-field-list.md)
