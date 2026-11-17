# Получить секционные настройки свойства v 3.0 catalog.product.property.section.get

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

Метод `catalog.product.property.section.get` возвращает настройки свойства для умного фильтра всего каталога или одного раздела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`integer`](../../data-types.md) | Идентификатор свойства.

Идентификатор можно получить методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| **sectionId**
[`integer`](../../data-types.md) | Идентификатор раздела каталога. `0` — настройки для всего каталога.

Идентификатор раздела можно получить методом [catalog.section.list](../section/catalog-section-list-rest-v3.md).

По умолчанию: `0` ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть в ответе.

Доступные поля:

- `propertyId` — идентификатор свойства
- `sectionId` — идентификатор раздела
- `iblockId` — идентификатор инфоблока каталога
- `smartFilter` — показывать ли свойство в умном фильтре
- `displayType` — вид свойства в умном фильтре
- `displayExpanded` — показывать ли свойство в умном фильтре развернутым
- `filterHint` — подсказка в умном фильтре

По умолчанию: все поля ||
|#

Если для раздела настроек нет, метод вернет ошибку `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`. Узнать, в каких разделах у свойства есть настройки, можно методом [catalog.product.property.section.list](./catalog-product-property-section-list-rest-v3.md) с фильтром по `propertyId`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.section.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyId":1285,"sectionId":31,"select":["propertyId","sectionId","smartFilter","displayType","displayExpanded","filterHint"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyId":1285,"sectionId":31,"select":["propertyId","sectionId","smartFilter","displayType","displayExpanded","filterHint"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.section.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SectionGetResult = {
      item: {
        propertyId: number
        sectionId: number
        smartFilter: boolean
        displayType: string | null
        displayExpanded: boolean
        filterHint: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SectionGetResult>({
        method: 'catalog.product.property.section.get',
        params: {
            propertyId: 1285,
            sectionId: 31,
            select: ['propertyId', 'sectionId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Section settings:', result.item)
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
      async function getPropertySection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.section.get',
            params: {
                  propertyId: 1285,
                  sectionId: 31,
                  select: ['propertyId', 'sectionId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Section settings:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPropertySection)
    </script>
    ```

- Python

    У методов `catalog.product.property.section.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.section.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "propertyId": 1285,
                "sectionId": 31,
                "select": ["propertyId", "sectionId", "smartFilter", "displayType", "displayExpanded", "filterHint"],
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
                    'catalog.product.property.section.get',
                    [
                        'propertyId' => 1285,
                        'sectionId' => 31,
                        'select' => ['propertyId', 'sectionId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
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
        'catalog.product.property.section.get',
        {
            propertyId: 1285,
            sectionId: 31,
            select: ['propertyId', 'sectionId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
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
        'catalog.product.property.section.get',
        [
            'propertyId' => 1285,
            'sectionId' => 31,
            'select' => ['propertyId', 'sectionId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.property.section.get", b24.Params{
    	"propertyId": 1285,
    	"sectionId":  31,
    	"select":     []string{"propertyId", "sectionId", "smartFilter", "displayType", "displayExpanded", "filterHint"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.section.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	PropertyID      int     `json:"propertyId"`
    	SectionID       int     `json:"sectionId"`
    	SmartFilter     bool    `json:"smartFilter"`
    	DisplayType     *string `json:"displayType"`
    	DisplayExpanded bool    `json:"displayExpanded"`
    	FilterHint      string  `json:"filterHint"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.SectionID, item.SmartFilter, item.FilterHint)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "propertyId": 1285,
            "sectionId": 31,
            "smartFilter": true,
            "displayType": "F",
            "displayExpanded": true,
            "filterHint": "Выберите цвет"
        }
    },
    "time": {
        "start": 1794923726,
        "finish": 1794923726.182027,
        "duration": 0.18202710151672363,
        "processing": 0,
        "date_start": "2026-11-17T16:55:26+03:00",
        "date_finish": "2026-11-17T16:55:26+03:00",
        "operating_reset_at": 1794924300,
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
[`object`](../../data-types.md) | Настройки свойства. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId**
[`integer`](../../data-types.md) | Идентификатор свойства ||
|| **sectionId**
[`integer`](../../data-types.md) | Идентификатор раздела каталога. `0` — настройки для всего каталога ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока каталога, к которому относятся настройки. Обычно это инфоблок свойства, но у свойств вариаций бывает и инфоблок товаров ||
|| **smartFilter**
[`boolean`](../../data-types.md) | Показывать ли свойство в умном фильтре: `true` — показывать, `false` — нет ||
|| **displayType**
[`string`](../../data-types.md) или `null` | Вид свойства в умном фильтре, например `F` — флажки. `null`, если вид не задан ||
|| **displayExpanded**
[`boolean`](../../data-types.md) | Показывать ли свойство в фильтре развернутым: `true` — развернутым, `false` — свернутым ||
|| **filterHint**
[`string`](../../data-types.md) | Подсказка к свойству в умном фильтре. Пустая строка, если подсказка не задана ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `1285` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `propertyId` | Обязательное поле `propertyId` не указано | Передайте в `propertyId` положительное число. Параметра `id` у метода нет ||
|| `sectionId` | Значение поля должно быть не меньше, чем 0 | Передайте в `sectionId` идентификатор раздела или `0` ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `propertyId` | Запись с ID = `#PROPERTY_ID#` не найдена | Свойства нет, оно не относится к торговому каталогу или для раздела нет настроек. В любом из этих случаев сообщение называет идентификатор свойства. Есть ли настройки для свойства и раздела, покажет метод [catalog.product.property.section.list](./catalog-product-property-section-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductPropertySectionDto` | Передайте в `select` только поля из списка параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-set-rest-v3.md)
- [{#T}](./catalog-product-property-section-list-rest-v3.md)
- [{#T}](./catalog-product-property-section-field-list.md)
