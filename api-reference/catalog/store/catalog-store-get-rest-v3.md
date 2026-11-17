# Получить значения полей склада v 3.0 catalog.store.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.store.get` возвращает данные склада по идентификатору.

Метод возвращает склад, если он доступен пользователю по праву «Просмотр и выбор склада». Пользователь с правом «Редактирование складов» также получает склады, которые создал сам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор склада.

Идентификатор можно получить методом [catalog.store.list](./catalog-store-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей склада, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор склада
- `title` — название склада
- `active` — активность склада
- `address` — адрес склада
- `description` — описание склада
- `gpsN` — широта склада
- `gpsS` — долгота склада
- `imageId` — идентификатор файла изображения склада
- `imageUrl` — ссылка на изображение склада
- `dateModify` — дата последнего изменения склада
- `dateCreate` — дата создания склада
- `userId` — идентификатор пользователя, который создал склад
- `modifiedBy` — идентификатор пользователя, который последним изменил склад
- `phone` — телефон склада
- `schedule` — график работы склада
- `xmlId` — внешний код склада
- `sort` — порядок сортировки склада в списках
- `email` — e-mail склада
- `issuingCenter` — признак пункта выдачи
- `code` — символьный код склада

Идентификатор `id` возвращается всегда. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.store.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"select":["id","title","active","address","phone","schedule","issuingCenter","imageUrl"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"select":["id","title","active","address","phone","schedule","issuingCenter","imageUrl"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.store.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StoreGetResult = {
      item: {
        id: number
        title: string
        active: boolean
        address: string
        phone: string
        schedule: string
        issuingCenter: boolean
        imageUrl: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<StoreGetResult>({
        method: 'catalog.store.get',
        params: {
          id: 51,
          select: ['id', 'title', 'active', 'address', 'phone', 'schedule', 'issuingCenter', 'imageUrl'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.title, result.item.address)
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
      async function getStore() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.store.get',
            params: {
              id: 51,
              select: ['id', 'title', 'active', 'address', 'phone', 'schedule', 'issuingCenter', 'imageUrl'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.title, result.item.address)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getStore)
    </script>
    ```

- Python

    У методов `catalog.store.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.store.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 51,
                "select": ["id", "title", "active", "address", "phone", "schedule", "issuingCenter", "imageUrl"],
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
                'catalog.store.get',
                [
                    'id' => 51,
                    'select' => ['id', 'title', 'active', 'address', 'phone', 'schedule', 'issuingCenter', 'imageUrl'],
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
        'catalog.store.get',
        {
            id: 51,
            select: ['id', 'title', 'active', 'address', 'phone', 'schedule', 'issuingCenter', 'imageUrl'],
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
        'catalog.store.get',
        [
            'id' => 51,
            'select' => ['id', 'title', 'active', 'address', 'phone', 'schedule', 'issuingCenter', 'imageUrl'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.store.get", b24.Params{
    	"id":     51,
    	"select": []string{"id", "title", "active", "address", "phone", "schedule", "issuingCenter", "imageUrl"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.store.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID            int    `json:"id"`
    	Title         string `json:"title"`
    	Active        bool   `json:"active"`
    	Address       string `json:"address"`
    	IssuingCenter bool   `json:"issuingCenter"`
    	ImageURL      string `json:"imageUrl"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Title, item.Address)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 51,
            "title": "Склад на Московском проспекте",
            "active": true,
            "address": "Калининград, Московский проспект, 51",
            "imageUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/fee/fee4295e698466f04b617988b6f415ff/508cb2bfea465e513a642ec8849f1023.png",
            "phone": "+7 4012 11-11-11",
            "schedule": "Пн–Сб 9:00–20:00",
            "issuingCenter": true
        }
    },
    "time": {
        "start": 1794922633,
        "finish": 1794922633.508727,
        "duration": 0.5087270736694336,
        "processing": 0,
        "date_start": "2026-11-17T16:37:13+03:00",
        "date_finish": "2026-11-17T16:37:13+03:00",
        "operating_reset_at": 1794923220,
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
[`object`](../../data-types.md) | Данные склада. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор склада ||
|| **title**
[`string`](../../data-types.md) | Название склада. Пустая строка, если название не задано ||
|| **active**
[`boolean`](../../data-types.md) | Активность склада: `true` — склад активен, `false` — неактивен ||
|| **address**
[`string`](../../data-types.md) | Адрес склада ||
|| **description**
[`string`](../../data-types.md) | Описание склада. Пустая строка, если описание не задано ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **imageId**
[`integer`](../../data-types.md) | Идентификатор файла изображения склада. `0`, если изображения нет ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение склада. Пустая строка, если изображения нет ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата последнего изменения склада ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания склада. У складов, которые Битрикс24 создал сам, может быть `null` ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал склад. `0` у складов, которые Битрикс24 создал сам ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил склад ||
|| **phone**
[`string`](../../data-types.md) | Телефон склада. Пустая строка, если телефон не задан ||
|| **schedule**
[`string`](../../data-types.md) | График работы склада. Пустая строка, если график не задан ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Пустая строка, если код не задан ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках ||
|| **email**
[`string`](../../data-types.md) | E-mail склада. Пустая строка, если адрес не задан ||
|| **issuingCenter**
[`boolean`](../../data-types.md) | Признак пункта выдачи: `true` — склад работает как пункт выдачи, `false` — обычный склад ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада. Пустая строка, если код не задан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` склада положительным числом ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Склада с таким `id` нет или он удален. Проверьте идентификатор методом [catalog.store.list](./catalog-store-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `StoreDto` | Укажите в `select` только поля из [описания объекта item](#item) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права «Просмотр каталога товаров» или «Просмотр и выбор склада», либо склад ему недоступен ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-add-rest-v3.md)
- [{#T}](./catalog-store-update-rest-v3.md)
- [{#T}](./catalog-store-list-rest-v3.md)
- [{#T}](./catalog-store-delete-rest-v3.md)
- [{#T}](./catalog-store-field-list.md)
