# Добавить торговый каталог catalog.catalog.add

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

Метод `catalog.catalog.add` делает существующий инфоблок торговым каталогом.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового торгового каталога. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор инфоблока, который нужно сделать торговым каталогом. Инфоблок должен существовать и не должен быть торговым каталогом.

Идентификатор торгового каталога совпадает с идентификатором инфоблока. Изменить `iblockId` после создания нельзя ||
|| **vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС каталога.

Идентификатор можно получить методом [catalog.vat.list](../vat/catalog-vat-list-rest-v3.md).

По умолчанию: `0` — ставка не задана ||
|| **yandexExport**
[`string`](../../data-types.md) | Признак выгрузки товаров каталога в Яндекс Маркет.

Возможные значения:

- `Y` — выгружать
- `N` — не выгружать

Любое значение, кроме `Y`, сохраняется как `N`.

По умолчанию: `N` ||
|| **subscription**
[`string`](../../data-types.md) | Признак продажи контента. Используется только в коробочной версии.

Возможные значения:

- `Y` — да
- `N` — нет

Любое значение, кроме `Y`, сохраняется как `N`.

По умолчанию: `N` ||
|| **productIblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока товаров. Передайте, если создаете каталог вариаций для этого инфоблока. Значение не может совпадать с `iblockId`.

Передавайте вместе с `skuPropertyId`.

Идентификатор можно получить методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md).

По умолчанию: `0` — каталог товаров ||
|| **skuPropertyId**
[`integer`](../../data-types.md) | Идентификатор активного свойства инфоблока `iblockId` типа «Привязка к элементам», которое ссылается на инфоблок `productIblockId`. В этом свойстве вариация хранит идентификатор головного товара.

Передавайте вместе с `productIblockId`.

Идентификатор можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md).

По умолчанию: `0` ||
|#

Поля `id`, `iblockTypeId`, `lid` и `name` только для чтения. Если передать их в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.catalog.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":87,"vatId":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":87,"vatId":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.catalog.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CatalogAddResult = {
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
      const response = await $b24.actions.v3.call.make<CatalogAddResult>({
        method: 'catalog.catalog.add',
        params: {
          fields: {
            iblockId: 87,
            vatId: 3,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Catalog added:', result.item.id)
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
      async function addCatalog() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.catalog.add',
            params: {
              fields: {
                iblockId: 87,
                vatId: 3,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Catalog added:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCatalog)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "iblockId": 87,
        "vatId": 3,
    }

    try:
        bitrix_response = client.catalog.catalog.add(
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
                'catalog.catalog.add',
                [
                    'fields' => [
                        'iblockId' => 87,
                        'vatId' => 3,
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
        'catalog.catalog.add',
        {
            fields: {
                iblockId: 87,
                vatId: 3,
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
        'catalog.catalog.add',
        [
            'fields' => [
                'iblockId' => 87,
                'vatId' => 3,
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
    res, err := client.Core().Call(ctx, "catalog.catalog.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId": 87,
    		"vatId":    3,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.catalog.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID    int    `json:"id"`
    	VatID int    `json:"vatId"`
    	Name  string `json:"name"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает созданный торговый каталог со всеми полями.

```json
{
    "result": {
        "item": {
            "id": 87,
            "iblockId": 87,
            "yandexExport": "N",
            "subscription": "N",
            "vatId": 3,
            "productIblockId": 0,
            "skuPropertyId": 0,
            "iblockTypeId": "lists",
            "lid": "s1",
            "name": "ТестовыйСписок"
        }
    },
    "time": {
        "start": 1792667012,
        "finish": 1792667012.061191,
        "duration": 0.06119108200073242,
        "processing": 0,
        "date_start": "2026-10-22T14:03:32+03:00",
        "date_finish": "2026-10-22T14:03:32+03:00",
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
[`object`](../../data-types.md) | Объект с полями созданного торгового каталога ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION",
        "message": "Запись с идентификатором 87 уже существует."
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `iblockId` | В поле `iblockId` требуется тип данных `int` для такого запроса | Убедитесь, что значение — число, а не строка ||
|| `-` | Указанный инфоблок не существует | Передайте идентификатор существующего инфоблока ||
|| `-` | Указанный инфоблок товаров не существует | Проверьте значение `productIblockId` ||
|| `-` | Нельзя сделать торговый каталог инфоблоком торговых предложений для самого себя | Передайте в `productIblockId` идентификатор другого инфоблока. Если в запросе несколько ошибок, их тексты приходят одной строкой через пробел ||
|| `-` | Указан ID инфоблока товаров, но не указан ID свойства привязки к инфоблоку товаров | Передайте `skuPropertyId` вместе с `productIblockId` ||
|| `-` | Указан ID свойства привязки к инфоблоку товаров, но не указан ID инфоблока товаров | Передайте `productIblockId` вместе с `skuPropertyId` ||
|| `-` | Указанное свойство привязки не существует либо неактивно | Укажите активное свойство инфоблока `iblockId` ||
|| `-` | Internal error adding catalog. Try adding again. | Повторите запрос ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `iblockId` | Не заполнено обязательное поле "iblockId" | Добавьте `iblockId` в `fields` ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `iblockTypeId`, `lid`, `name` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `CatalogDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка повторного создания

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `iblockId` | Запись с идентификатором `#ID#` уже существует. | Инфоблок уже является торговым каталогом. Измените его методом [catalog.catalog.update](./catalog-catalog-update.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав на изменение настроек торгового каталога. Вызовите метод от имени администратора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-update.md)
- [{#T}](./catalog-catalog-get-rest-v3.md)
- [{#T}](./catalog-catalog-list-rest-v3.md)
- [{#T}](./catalog-catalog-delete.md)
- [{#T}](./catalog-catalog-field-list.md)
