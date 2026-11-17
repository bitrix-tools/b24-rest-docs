# Установить секционные настройки свойства v 3.0 catalog.product.property.section.set

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

Метод `catalog.product.property.section.set` задает, как свойство товаров или вариаций показывается в умном фильтре каталога или его раздела, и возвращает сохраненные настройки. В умном фильтре покупатель отбирает товары по значениям свойств. Например, в разделе «Одежда» свойство «Цвет» можно показать флажками, а в разделе «Обувь» скрыть.

Если настроек для пары «свойство — раздел» еще нет, метод их создаст, если есть — изменит. Настройки для всего каталога, `sectionId: 0`, появляются вместе со свойством.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`integer`](../../data-types.md) | Идентификатор свойства торгового каталога.

Идентификатор можно получить методом [catalog.product.property.list](../product-property/catalog-product-property-list-rest-v3.md) ||
|| **sectionId**
[`integer`](../../data-types.md) | Идентификатор раздела каталога. `0` — настройки для всего каталога.

Раздел должен относиться к инфоблоку свойства, поэтому раздел товаров свойству вариаций не подойдет. Идентификатор раздела можно получить методом [catalog.section.list](../section/catalog-section-list-rest-v3.md).

По умолчанию: `0` ||
|| **fields***
[`object`](../../data-types.md) | Объект с настройками. Передайте только поля, которые нужно изменить: остальные сохранят текущие значения. Пустой объект `{}` ничего не меняет. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **smartFilter**
[`boolean`](../../data-types.md) | Показывать ли свойство в умном фильтре.

Возможные значения:

- `true` — показывать
- `false` — не показывать

Значения `Y`, `N` и `null` не принимаются ||
|| **displayType**
[`string`](../../data-types.md) | Вид свойства в умном фильтре. Набор видов зависит от типа свойства:

- `F` — флажки
- `K` — радиокнопки
- `P` — выпадающий список
- `G` — флажки с картинками, для свойства-справочника
- `H` — флажки с названиями и картинками, для свойства-справочника
- `R` — выпадающий список с названиями и картинками, для свойства-справочника
- `U` — календарь, для свойства типа «Дата/Время»
- `A` — число от-до с ползунком, для свойства типа «Число»
- `B` — число от-до, для свойства типа «Число»

Передавайте букву из списка: метод не проверяет значение и сохранит любую другую без ошибки ||
|| **displayExpanded**
[`boolean`](../../data-types.md) | Показывать ли свойство в фильтре развернутым.

Возможные значения:

- `true` — развернутым
- `false` — свернутым

Значения `Y`, `N` и `null` не принимаются ||
|| **filterHint**
[`string`](../../data-types.md) | Подсказка к свойству в умном фильтре ||
|#

Поля `propertyId`, `sectionId` и `iblockId` в `fields` передавать нельзя: свойство и раздел задают параметры метода, а инфоблок определяется по свойству.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.section.set`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyId":1285,"sectionId":31,"fields":{"smartFilter":true,"displayType":"F","displayExpanded":true,"filterHint":"Выберите цвет"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.section.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"propertyId":1285,"sectionId":31,"fields":{"smartFilter":true,"displayType":"F","displayExpanded":true,"filterHint":"Выберите цвет"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.section.set
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SectionSetResult = {
      item: {
        propertyId: number
        sectionId: number
        iblockId: number
        smartFilter: boolean
        displayType: string | null
        displayExpanded: boolean
        filterHint: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SectionSetResult>({
        method: 'catalog.product.property.section.set',
        params: {
            propertyId: 1285,
            sectionId: 31,
            fields: {
              smartFilter: true,
              displayType: 'F',
              displayExpanded: true,
              filterHint: 'Выберите цвет',
            },
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Smart filter:', result.item.smartFilter)
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
      async function setPropertySection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.section.set',
            params: {
                  propertyId: 1285,
                  sectionId: 31,
                  fields: {
                    smartFilter: true,
                    displayType: 'F',
                    displayExpanded: true,
                    filterHint: 'Выберите цвет',
                  },
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Smart filter:', result.item.smartFilter)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setPropertySection)
    </script>
    ```

- Python

    У методов `catalog.product.property.section.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.section.set"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "propertyId": 1285,
                "sectionId": 31,
                "fields": {
                    "smartFilter": True,
                    "displayType": "F",
                    "displayExpanded": True,
                    "filterHint": "Выберите цвет",
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
                    'catalog.product.property.section.set',
                    [
                        'propertyId' => 1285,
                        'sectionId' => 31,
                        'fields' => [
                            'smartFilter' => true,
                            'displayType' => 'F',
                            'displayExpanded' => true,
                            'filterHint' => 'Выберите цвет',
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
        'catalog.product.property.section.set',
        {
            propertyId: 1285,
            sectionId: 31,
            fields: {
                smartFilter: true,
                displayType: 'F',
                displayExpanded: true,
                filterHint: 'Выберите цвет',
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
        'catalog.product.property.section.set',
        [
            'propertyId' => 1285,
            'sectionId' => 31,
            'fields' => [
                'smartFilter' => true,
                'displayType' => 'F',
                'displayExpanded' => true,
                'filterHint' => 'Выберите цвет',
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
    res, err := client.Core().Call(ctx, "catalog.product.property.section.set", b24.Params{
    	"propertyId": 1285,
    	"sectionId":  31,
    	"fields": b24.Params{
    		"smartFilter":     true,
    		"displayType":     "F",
    		"displayExpanded": true,
    		"filterHint":      "Выберите цвет",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.property.section.set: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	PropertyID      int     `json:"propertyId"`
    	SectionID       int     `json:"sectionId"`
    	IblockID        int     `json:"iblockId"`
    	SmartFilter     bool    `json:"smartFilter"`
    	DisplayType     *string `json:"displayType"`
    	DisplayExpanded bool    `json:"displayExpanded"`
    	FilterHint      string  `json:"filterHint"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.PropertyID, item.SectionID, item.SmartFilter)
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
            "iblockId": 25,
            "smartFilter": true,
            "displayType": "F",
            "displayExpanded": true,
            "filterHint": "Выберите цвет"
        }
    },
    "time": {
        "start": 1794923724,
        "finish": 1794923724.832547,
        "duration": 0.8325469493865967,
        "processing": 0,
        "date_start": "2026-11-17T16:55:24+03:00",
        "date_finish": "2026-11-17T16:55:24+03:00",
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
[`object`](../../data-types.md) | Сохраненные настройки. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Section 999999 does not belong to the iblock of property 1285"
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
|| `propertyId` | Обязательное поле `propertyId` не указано | Передайте в `propertyId` положительное число ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `sectionId` | Значение поля должно быть не меньше, чем 0 | Передайте в `sectionId` идентификатор раздела или `0` ||
|| `-` | Section #SECTION_ID# does not belong to the iblock of property #PROPERTY_ID# | Укажите раздел из инфоблока свойства. Разделы можно получить методом [catalog.section.list](../section/catalog-section-list-rest-v3.md) ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `bool` для такого запроса | Передайте в `smartFilter` и `displayExpanded` значение `true` или `false` ||
|| `-` | Field `#FIELD#` must be a boolean | Не передавайте `null` в `smartFilter` и `displayExpanded` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля `propertyId`, `sectionId` и `iblockId` ||
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
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductPropertySectionDto` | Передайте в `fields` только поля из таблицы параметра `fields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» и право на изменение инфоблока свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-get-rest-v3.md)
- [{#T}](./catalog-product-property-section-list-rest-v3.md)
- [{#T}](./catalog-product-property-section-field-list.md)
