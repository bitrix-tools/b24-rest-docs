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

Метод `catalog.product.property.add` добавляет свойство товаров или вариаций в торговый каталог и возвращает поля нового свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового свойства. Обязательные поля — `iblockId`, `name` и `propertyType`. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор торгового каталога. У товаров и вариаций разные каталоги: для свойства товаров передайте идентификатор каталога товаров, для свойства вариаций — идентификатор каталога вариаций.

Оба идентификатора можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md). У каталога вариаций в ответе заполнено поле `productIblockId`.

После создания свойства каталог изменить нельзя ||
|| **name***
[`string`](../../data-types.md) | Название свойства. Пустая строка вызывает ошибку ||
|| **propertyType***
[`string`](../../data-types.md) | Базовый тип свойства.

Возможные значения:

- `N` — число
- `S` — строка
- `L` — список
- `F` — файл
- `E` — привязка к элементам
- `G` — привязка к разделам

Сочетания `propertyType` и `userType`, которые поддерживает карточка товара, возвращает метод [catalog.product.property.type.list](./catalog-product-property-type-list.md) ||
|| **userType**
[`string`](../../data-types.md) | Пользовательский тип свойства. Он уточняет базовый тип `propertyType` и передается вместе с ним. Например, свойство с датой и временем — это `propertyType` = `S` и `userType` = `DateTime`.

Основные значения и базовый тип `propertyType`, с которым их нужно передавать:

- `DateTime` — дата и время, `S`
- `Money` — деньги с валютой, `S`
- `HTML` — текст в формате HTML, `S`
- `employee` — привязка к сотруднику, `S`
- `ECrm` — привязка к элементам CRM, `S`
- `directory` — привязка к справочнику, `S`
- `SKU` — привязка к вариациям, `E`
- `EList` — привязка к элементам в виде списка, `E`
- `SectionAuto` — привязка к разделам с автозаполнением, `G`
- `BoolEnum` — флажок, `L`

`BoolEnum` создает свойство-флажок: список с одним значением `Y` в виде флажка. В ответе тип `BoolEnum` не виден: `userType` равно `null`, а `listType` — `C`. Задать `BoolEnum` можно только при добавлении свойства.

Если `userType` не подходит к `propertyType` или такого типа нет, метод вернет ошибку ||
|| **userTypeSettings**
[`object`](../../data-types.md) | Настройки пользовательского типа. Передавайте только вместе с `userType`, иначе метод вернет ошибку.

Значения могут быть строками, числами, логическими значениями или вложенными объектами с такими значениями. Ключи, которых нет у типа, метод отбрасывает без ошибки: например, у `HTML` сохранится `height`, а неизвестный ключ — нет. Сохраненные настройки возвращаются в ответе в `userTypeSettings` ||
|| **active**
[`boolean`](../../data-types.md) | Активность свойства.

Возможные значения:

- `true` — свойство активно
- `false` — свойство неактивно

По умолчанию: `true` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.

По умолчанию: `100` ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства, например `LINING_MATERIAL`. Код может состоять из латинских букв, цифр и знака подчеркивания и не может начинаться с цифры.

Метод не проверяет, что код уникален: два свойства могут получить один код. Свободен ли код, можно проверить методом [catalog.product.property.list](./catalog-product-property-list-rest-v3.md) с фильтром по `code` ||
|| **defaultValue**
[`string`](../../data-types.md) | Значение свойства по умолчанию ||
|| **rowCount**
[`integer`](../../data-types.md) | Число строк поля ввода.

По умолчанию: `1` ||
|| **colCount**
[`integer`](../../data-types.md) | Число колонок поля ввода.

По умолчанию: `30` ||
|| **listType**
[`string`](../../data-types.md) | Внешний вид свойства типа `L`.

Возможные значения:

- `L` — выпадающий список
- `C` — флажки

По умолчанию: `L` ||
|| **multiple**
[`boolean`](../../data-types.md) | Множественное свойство.

Возможные значения:

- `true` — свойство хранит несколько значений
- `false` — одно значение

По умолчанию: `false` ||
|| **multipleCnt**
[`integer`](../../data-types.md) | Число полей для ввода множественных значений ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор свойства ||
|| **fileType**
[`string`](../../data-types.md) | Список расширений файлов для свойства типа `F`, например `jpg, png` ||
|| **linkIblockId**
[`integer`](../../data-types.md) | Для свойств типа `E` и `G` — идентификатор инфоблока, к элементам или разделам которого привязано свойство ||
|| **withDescription**
[`boolean`](../../data-types.md) | К значению свойства можно добавить описание.

Возможные значения:

- `true` — да
- `false` — нет

По умолчанию: `false` ||
|| **searchable**
[`boolean`](../../data-types.md) | Значения свойства участвуют в поиске.

Возможные значения:

- `true` — да
- `false` — нет

По умолчанию: `false` ||
|| **filtrable**
[`boolean`](../../data-types.md) | Свойство участвует в фильтрации товаров.

Возможные значения:

- `true` — да
- `false` — нет

По умолчанию: `false` ||
|| **isRequired**
[`boolean`](../../data-types.md) | Свойство обязательно для заполнения в карточке товара.

Возможные значения:

- `true` — да
- `false` — нет

По умолчанию: `false` ||
|| **hint**
[`string`](../../data-types.md) | Подсказка к полю свойства ||
|#

Флаги `active`, `multiple`, `withDescription`, `searchable`, `filtrable` и `isRequired` передаются значениями `true` или `false`. Строки `Y` и `N` вызывают ошибку.

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
    -d '{"fields":{"iblockId":25,"name":"Материал подкладки","propertyType":"S","code":"LINING_MATERIAL","sort":500,"filtrable":true,"hint":"Из чего сделана подкладка"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Материал подкладки","propertyType":"S","code":"LINING_MATERIAL","sort":500,"filtrable":true,"hint":"Из чего сделана подкладка"},"auth":"**put_access_token_here**"}' \
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
        iblockId: number
        name: string
        propertyType: string
        userType: string | null
        code: string | null
        sort: number
        active: boolean
        multiple: boolean
        isRequired: boolean
        controlId: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductPropertyAddResult>({
        method: 'catalog.product.property.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Материал подкладки',
            propertyType: 'S',
            code: 'LINING_MATERIAL',
            sort: 500,
            filtrable: true,
            hint: 'Из чего сделана подкладка',
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
                name: 'Материал подкладки',
                propertyType: 'S',
                code: 'LINING_MATERIAL',
                sort: 500,
                filtrable: true,
                hint: 'Из чего сделана подкладка',
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

    У методов `catalog.product.property.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "iblockId": 25,
                    "name": "Материал подкладки",
                    "propertyType": "S",
                    "code": "LINING_MATERIAL",
                    "sort": 500,
                    "filtrable": True,
                    "hint": "Из чего сделана подкладка",
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
                'catalog.product.property.add',
                [
                    'fields' => [
                        'iblockId' => 25,
                        'name' => 'Материал подкладки',
                        'propertyType' => 'S',
                        'code' => 'LINING_MATERIAL',
                        'sort' => 500,
                        'filtrable' => true,
                        'hint' => 'Из чего сделана подкладка',
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
        'catalog.product.property.add',
        {
            fields: {
                iblockId: 25,
                name: 'Материал подкладки',
                propertyType: 'S',
                code: 'LINING_MATERIAL',
                sort: 500,
                filtrable: true,
                hint: 'Из чего сделана подкладка',
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
                'name' => 'Материал подкладки',
                'propertyType' => 'S',
                'code' => 'LINING_MATERIAL',
                'sort' => 500,
                'filtrable' => true,
                'hint' => 'Из чего сделана подкладка',
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
    		"iblockId":     25,
    		"name":         "Материал подкладки",
    		"propertyType": "S",
    		"code":         "LINING_MATERIAL",
    		"sort":         500,
    		"filtrable":    true,
    		"hint":         "Из чего сделана подкладка",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.property.add: %w", err)
    }

    var result struct {
    	Item struct {
    		ID           int    `json:"id"`
    		Name         string `json:"name"`
    		PropertyType string `json:"propertyType"`
    		ControlID    string `json:"controlId"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Name, result.Item.PropertyType, result.Item.ControlID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 1291,
            "timestampX": "2026-11-17T16:40:30+03:00",
            "iblockId": 25,
            "name": "Материал подкладки",
            "active": true,
            "sort": 500,
            "code": "LINING_MATERIAL",
            "defaultValue": null,
            "propertyType": "S",
            "userType": null,
            "userTypeSettings": [],
            "rowCount": 1,
            "colCount": 30,
            "listType": "L",
            "multiple": false,
            "multipleCnt": null,
            "xmlId": null,
            "fileType": null,
            "linkIblockId": null,
            "withDescription": false,
            "searchable": false,
            "filtrable": true,
            "isRequired": false,
            "hint": "Из чего сделана подкладка",
            "controlId": "PROPERTY_1291"
        }
    },
    "time": {
        "start": 1794922830,
        "finish": 1794922830.333162,
        "duration": 0.3331620693206787,
        "processing": 0,
        "date_start": "2026-11-17T16:40:30+03:00",
        "date_finish": "2026-11-17T16:40:30+03:00",
        "operating_reset_at": 1794923400,
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
[`integer`](../../data-types.md) | Идентификатор свойства ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения свойства ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор торгового каталога, к которому относится свойство ||
|| **name**
[`string`](../../data-types.md) | Название свойства ||
|| **active**
[`boolean`](../../data-types.md) | Активность свойства:
- `true` — свойство активно
- `false` — свойство неактивно ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **code**
[`string`](../../data-types.md) или `null` | Символьный код свойства ||
|| **defaultValue**
[`string`](../../data-types.md) или `null` | Значение по умолчанию ||
|| **propertyType**
[`string`](../../data-types.md) | Базовый тип свойства:
- `N` — число
- `S` — строка
- `L` — список
- `F` — файл
- `E` — привязка к элементам
- `G` — привязка к разделам ||
|| **userType**
[`string`](../../data-types.md) или `null` | Пользовательский тип свойства, например `Money` или `DateTime`. У свойства без пользовательского типа и у свойства-флажка — `null` ||
|| **userTypeSettings**
[`object`](../../data-types.md) или [`array`](../../data-types.md) | Настройки пользовательского типа. Если настроек нет — пустой массив `[]` ||
|| **rowCount**
[`integer`](../../data-types.md) | Число строк поля ввода ||
|| **colCount**
[`integer`](../../data-types.md) | Число колонок поля ввода ||
|| **listType**
[`string`](../../data-types.md) | Внешний вид списка:
- `L` — выпадающий список
- `C` — флажки ||
|| **multiple**
[`boolean`](../../data-types.md) | Множественное свойство:
- `true` — свойство хранит несколько значений
- `false` — одно значение ||
|| **multipleCnt**
[`integer`](../../data-types.md) или `null` | Число полей для ввода множественных значений ||
|| **xmlId**
[`string`](../../data-types.md) или `null` | Внешний идентификатор свойства ||
|| **fileType**
[`string`](../../data-types.md) или `null` | Расширения файлов для свойства типа `F` ||
|| **linkIblockId**
[`integer`](../../data-types.md) или `null` | Для свойств типа `E` и `G` — идентификатор инфоблока, к элементам или разделам которого привязано свойство ||
|| **withDescription**
[`boolean`](../../data-types.md) | `true` — к значению свойства можно добавить описание ||
|| **searchable**
[`boolean`](../../data-types.md) | `true` — значения свойства участвуют в поиске ||
|| **filtrable**
[`boolean`](../../data-types.md) | `true` — свойство участвует в фильтрации товаров ||
|| **isRequired**
[`boolean`](../../data-types.md) | `true` — свойство обязательно для заполнения в карточке товара ||
|| **hint**
[`string`](../../data-types.md) или `null` | Подсказка к полю свойства ||
|| **controlId**
[`string`](../../data-types.md) | Имя поля свойства в формах инфоблока в формате `PROPERTY_<id>`, например `PROPERTY_1291` ||
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
                "message": "Не заполнено обязательное поле \"propertyType\"",
                "field": "propertyType"
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
|| `propertyType` | Не заполнено обязательное поле "propertyType" | Передайте `propertyType` в `fields` ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля `id`, `timestampX` и `controlId`: их заполняет система ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Required fields: iblockId | Передайте в `iblockId` идентификатор больше `0` ||
|| `-` | The specified iblock is not a product catalog | Инфоблок не найден или не является торговым каталогом. Проверьте идентификатор методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md) ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Передайте значение нужного типа. Флаги передавайте значениями `true` или `false`, а не строками `Y` и `N` ||
|| `-` | Не введено название. | Передайте непустую строку в `name` ||
|| `-` | Invalid property type specified | Передайте `propertyType` из списка возможных значений, а `userType` — подходящий к нему. Сочетания типов возвращает метод [catalog.product.property.type.list](./catalog-product-property-type-list.md) ||
|| `-` | Custom property type settings are not supported for this property type | Уберите `userTypeSettings` или передайте вместе с ними `userType` ||
|| `-` | Invalid custom property type settings specified | Передайте в `userTypeSettings` объект, значения которого — строки, числа, логические значения или вложенные объекты с такими значениями ||
|| `-` | Код свойства не может начинаться с цифры.: `#CODE#` | Начните `code` с латинской буквы или знака подчеркивания ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyDto` | Передайте в `fields` только поля из описания параметра `fields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» и право на изменение инфоблока каталога ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-update-rest-v3.md)
- [{#T}](./catalog-product-property-get-rest-v3.md)
- [{#T}](./catalog-product-property-list-rest-v3.md)
- [{#T}](./catalog-product-property-delete-rest-v3.md)
- [{#T}](./catalog-product-property-field-list.md)
- [{#T}](./catalog-product-property-type-list.md)
