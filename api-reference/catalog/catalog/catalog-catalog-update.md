# Изменить торговый каталог catalog.catalog.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.catalog.update` изменяет поля торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор торгового каталога.

Идентификатор можно получить методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями торгового каталога, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС каталога. Значение `0` снимает ставку.

Идентификатор можно получить методом [catalog.vat.list](../vat/catalog-vat-list-rest-v3.md) ||
|| **yandexExport**
[`string`](../../data-types.md) | Признак выгрузки товаров каталога в Яндекс Маркет.

Возможные значения:

- `Y` — выгружать
- `N` — не выгружать

Любое значение, кроме `Y`, сохраняется как `N` ||
|| **subscription**
[`string`](../../data-types.md) | Признак продажи контента. Используется только в коробочной версии.

Возможные значения:

- `Y` — да
- `N` — нет

Любое значение, кроме `Y`, сохраняется как `N` ||
|| **productIblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока товаров для каталога вариаций. Значение не может совпадать с идентификатором каталога.

Передавайте вместе с `skuPropertyId`.

Идентификатор можно получить методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md) ||
|| **skuPropertyId**
[`integer`](../../data-types.md) | Идентификатор активного свойства инфоблока каталога типа «Привязка к элементам», которое ссылается на инфоблок `productIblockId`.

Передавайте вместе с `productIblockId`.

Идентификатор можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|#

Поле `iblockId` после создания каталога изменить нельзя. Поля `id`, `iblockTypeId`, `lid` и `name` только для чтения.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.catalog.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":87,"fields":{"vatId":7,"yandexExport":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":87,"fields":{"vatId":7,"yandexExport":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.catalog.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CatalogUpdateResult = {
      item: {
        id: number
        iblockId: number
        yandexExport: 'Y' | 'N'
        subscription: 'Y' | 'N'
        vatId: number
        productIblockId: number
        skuPropertyId: number
        iblockTypeId: string
        lid: string
        name: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<CatalogUpdateResult>({
        method: 'catalog.catalog.update',
        params: {
          id: 87,
          fields: {
            vatId: 7,
            yandexExport: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Catalog updated:', result.item.id, result.item.vatId)
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
      async function updateCatalog() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.catalog.update',
            params: {
              id: 87,
              fields: {
                vatId: 7,
                yandexExport: 'Y',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Catalog updated:', result.item.id, result.item.vatId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCatalog)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "vatId": 7,
        "yandexExport": "Y",
    }

    try:
        bitrix_response = client.catalog.catalog.update(
            bitrix_id=87,
            fields=fields,
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
                'catalog.catalog.update',
                [
                    'id' => 87,
                    'fields' => [
                        'vatId' => 7,
                        'yandexExport' => 'Y',
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
        'catalog.catalog.update',
        {
            id: 87,
            fields: {
                vatId: 7,
                yandexExport: 'Y',
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
        'catalog.catalog.update',
        [
            'id' => 87,
            'fields' => [
                'vatId' => 7,
                'yandexExport' => 'Y',
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
    res, err := client.Core().Call(ctx, "catalog.catalog.update", b24.Params{
    	"id": 87,
    	"fields": b24.Params{
    		"vatId":        7,
    		"yandexExport": "Y",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.catalog.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           int    `json:"id"`
    	VatID        int    `json:"vatId"`
    	YandexExport string `json:"yandexExport"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.VatID, item.YandexExport)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает торговый каталог со всеми полями после изменения.

```json
{
    "result": {
        "item": {
            "id": 87,
            "iblockId": 87,
            "yandexExport": "Y",
            "subscription": "N",
            "vatId": 7,
            "productIblockId": 0,
            "skuPropertyId": 0,
            "iblockTypeId": "lists",
            "lid": "s1",
            "name": "ТестовыйСписок"
        }
    },
    "time": {
        "start": 1792667019,
        "finish": 1792667019.279532,
        "duration": 0.27953195571899414,
        "processing": 0,
        "date_start": "2026-10-22T14:03:39+03:00",
        "date_finish": "2026-10-22T14:03:39+03:00",
        "operating_reset_at": 1792667580,
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
[`object`](../../data-types.md) | Объект с полями торгового каталога после изменения ||
|| **result.item.id**
[`integer`](../../data-types.md) | Идентификатор торгового каталога. Совпадает с `iblockId` ||
|| **result.item.iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока, который зарегистрирован как торговый каталог ||
|| **result.item.yandexExport**
[`string`](../../data-types.md) | Признак выгрузки товаров каталога в Яндекс Маркет: `Y` — да, `N` — нет ||
|| **result.item.subscription**
[`string`](../../data-types.md) | Признак продажи контента: `Y` — да, `N` — нет. Используется только в коробочной версии ||
|| **result.item.vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС каталога. `0` — ставка не задана ||
|| **result.item.productIblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока товаров, к которому привязан каталог вариаций. `0` — каталог не является каталогом вариаций ||
|| **result.item.skuPropertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, в котором вариация хранит идентификатор головного товара. `0` — каталог не является каталогом вариаций ||
|| **result.item.iblockTypeId**
[`string`](../../data-types.md) | Тип инфоблока. Для торговых каталогов CRM — `CRM_PRODUCT_CATALOG`, для каталога на основе универсального списка — `lists` ||
|| **result.item.lid**
[`string`](../../data-types.md) | Идентификатор сайта, к которому привязан инфоблок, например `s1` ||
|| **result.item.name**
[`string`](../../data-types.md) | Название инфоблока торгового каталога ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` торгового каталога. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `iblockId` | Field iblockId cannot be changed | Уберите `iblockId` из `fields` ||
|| `-` | ID торгового каталога и ID свойства привязки к нему необходимо указывать вместе | Передайте `productIblockId` и `skuPropertyId` в одном запросе ||
|| `-` | Указанный инфоблок товаров не существует | Проверьте значение `productIblockId` ||
|| `-` | Нельзя сделать торговый каталог инфоблоком торговых предложений для самого себя | Передайте в `productIblockId` идентификатор другого инфоблока ||
|| `-` | Указан ID инфоблока товаров, но не указан ID свойства привязки к инфоблоку товаров | Передайте `skuPropertyId` вместе с `productIblockId` ||
|| `-` | Указан ID свойства привязки к инфоблоку товаров, но не указан ID инфоблока товаров | Передайте `productIblockId` вместе с `skuPropertyId` ||
|| `-` | Указанное свойство привязки не существует либо неактивно | Укажите активное свойство инфоблока каталога ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `iblockTypeId`, `lid`, `name` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` торгового каталога ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Торгового каталога с таким идентификатором нет. Проверьте идентификатор методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `CatalogDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав на изменение настроек торгового каталога. Вызовите метод от имени администратора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-add.md)
- [{#T}](./catalog-catalog-get-rest-v3.md)
- [{#T}](./catalog-catalog-list-rest-v3.md)
- [{#T}](./catalog-catalog-delete.md)
- [{#T}](./catalog-catalog-field-list.md)
