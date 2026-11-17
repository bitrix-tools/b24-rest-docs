# Получить значения полей свойства товара или вариации v 3.0 catalog.product.property.get

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

Метод `catalog.product.property.get` возвращает по идентификатору поля свойства товаров или вариаций, например название, тип и символьный код.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор свойства.

Идентификатор можно получить методом [catalog.product.property.list](./catalog-product-property-list-rest-v3.md) или из ответа [catalog.product.property.add](./catalog-product-property-add-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей свойства, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор свойства
- `timestampX` — дата и время последнего изменения
- `iblockId` — идентификатор торгового каталога
- `name` — название
- `active` — активность
- `sort` — сортировка
- `code` — символьный код
- `defaultValue` — значение по умолчанию
- `propertyType` — базовый тип
- `userType` — пользовательский тип
- `userTypeSettings` — настройки пользовательского типа
- `rowCount` — число строк поля ввода
- `colCount` — число колонок поля ввода
- `listType` — внешний вид списка
- `multiple` — множественное свойство
- `multipleCnt` — число полей для множественных значений
- `xmlId` — внешний идентификатор
- `fileType` — расширения файлов
- `linkIblockId` — идентификатор связанного инфоблока
- `withDescription` — можно ли добавить описание к значению
- `searchable` — участие в поиске
- `filtrable` — участие в фильтрации
- `isRequired` — обязательно ли для заполнения
- `hint` — подсказка
- `controlId` — имя поля свойства в формах инфоблока

По умолчанию: все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":295,"select":["id","iblockId","name","code","propertyType","listType","multiple","controlId"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":295,"select":["id","iblockId","name","code","propertyType","listType","multiple","controlId"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductPropertyGetResult = {
      item: {
        id: number
        iblockId: number
        name: string
        code: string | null
        propertyType: string
        listType: string
        multiple: boolean
        controlId: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductPropertyGetResult>({
        method: 'catalog.product.property.get',
        params: {
          id: 295,
          select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'listType', 'multiple', 'controlId'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Property:', result.item.id, result.item.name, result.item.propertyType)
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
      async function getProductProperty() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.get',
            params: {
              id: 295,
              select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'listType', 'multiple', 'controlId'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Property:', result.item.id, result.item.name, result.item.propertyType)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductProperty)
    </script>
    ```

- Python

    У методов `catalog.product.property.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 295,
                "select": ["id", "iblockId", "name", "code", "propertyType", "listType", "multiple", "controlId"],
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
                'catalog.product.property.get',
                [
                    'id' => 295,
                    'select' => ['id', 'iblockId', 'name', 'code', 'propertyType', 'listType', 'multiple', 'controlId'],
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
        'catalog.product.property.get',
        {
            id: 295,
            select: ['id', 'iblockId', 'name', 'code', 'propertyType', 'listType', 'multiple', 'controlId'],
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
        'catalog.product.property.get',
        [
            'id' => 295,
            'select' => ['id', 'iblockId', 'name', 'code', 'propertyType', 'listType', 'multiple', 'controlId'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.property.get", b24.Params{
    	"id":     295,
    	"select": []string{"id", "iblockId", "name", "code", "propertyType", "listType", "multiple", "controlId"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.get: %w", err)
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
            "id": 295,
            "iblockId": 25,
            "name": "Новинка",
            "code": "NEWPRODUCT",
            "propertyType": "L",
            "listType": "C",
            "multiple": false,
            "controlId": "PROPERTY_295"
        }
    },
    "time": {
        "start": 1794924748,
        "finish": 1794924748.634806,
        "duration": 0.6348059177398682,
        "processing": 0,
        "date_start": "2026-11-17T17:12:28+03:00",
        "date_finish": "2026-11-17T17:12:28+03:00",
        "operating_reset_at": 1794925320,
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
[`object`](../../data-types.md) | Поля свойства. Состав зависит от `select`. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` — целое число больше `0` ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Свойство не найдено или не относится к торговому каталогу. Проверьте идентификатор методом [catalog.product.property.list](./catalog-product-property-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyDto` | Укажите в `select` только поля из описания параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add-rest-v3.md)
- [{#T}](./catalog-product-property-update-rest-v3.md)
- [{#T}](./catalog-product-property-list-rest-v3.md)
- [{#T}](./catalog-product-property-delete-rest-v3.md)
- [{#T}](./catalog-product-property-field-list.md)
