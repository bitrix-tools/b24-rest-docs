# Получить значения полей раздела торгового каталога v 3.0 catalog.section.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение раздела в инфоблоке

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.section.get` возвращает поля раздела торгового каталога по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор раздела.

Идентификатор можно получить методом [catalog.section.list](./catalog-section-list-rest-v3.md) или при создании раздела методом [catalog.section.add](./catalog-section-add-rest-v3.md).

Для несуществующего раздела метод возвращает ошибку доступа ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами полей раздела, которые нужно вернуть в ответе, например `["id","name","iblockSectionId","active"]`.

Доступные поля:

- `id` — идентификатор раздела
- `iblockId` — идентификатор инфоблока
- `name` — название
- `iblockSectionId` — идентификатор родительского раздела
- `active` — активность
- `code` — символьный код
- `xmlId` — внешний идентификатор
- `sort` — индекс сортировки
- `description` — описание
- `descriptionType` — формат описания

Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.section.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":387,"select":["id","name","iblockSectionId","active"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":387,"select":["id","name","iblockSectionId","active"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.section.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SectionGetResult = {
      item: {
        id?: number
        name?: string
        iblockSectionId?: number
        active?: 'Y' | 'N'
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SectionGetResult>({
        method: 'catalog.section.get',
        params: {
          id: 387,
          select: [
            'id',
            'name',
            'iblockSectionId',
            'active',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Section:', result.item.id, result.item.name)
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
      async function getSection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.section.get',
            params: {
              id: 387,
              select: [
                'id',
                'name',
                'iblockSectionId',
                'active',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Section:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSection)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "id",
        "name",
        "iblockSectionId",
        "active",
    ]

    try:
        bitrix_response = client.catalog.section.get(
            bitrix_id=387,
            select=select,
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
                'catalog.section.get',
                [
                    'id' => 387,
                    'select' => [
                        'id',
                        'name',
                        'iblockSectionId',
                        'active',
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
        'catalog.section.get',
        {
            id: 387,
            select: [
                'id',
                'name',
                'iblockSectionId',
                'active',
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
        'catalog.section.get',
        [
            'id' => 387,
            'select' => [
                'id',
                'name',
                'iblockSectionId',
                'active',
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
    res, err := client.Core().Call(ctx, "catalog.section.get", b24.Params{
    	"id":     387,
    	"select": []string{"id", "name", "iblockSectionId", "active"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.section.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID              int    `json:"id"`
    	Name            string `json:"name"`
    	IblockSectionID int    `json:"iblockSectionId"`
    	Active          string `json:"active"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.IblockSectionID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 387,
            "name": "Сумки и рюкзаки",
            "iblockSectionId": 385,
            "active": "N"
        }
    },
    "time": {
        "start": 1792665608,
        "finish": 1792665608.633603,
        "duration": 0.6336030960083008,
        "processing": 0,
        "date_start": "2026-10-22T13:40:08+03:00",
        "date_finish": "2026-10-22T13:40:08+03:00",
        "operating_reset_at": 1792666200,
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
[`object`](../../data-types.md) | Поля раздела. Состав зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Таблица содержит все поля, которые можно запросить в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор раздела ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока торгового каталога ||
|| **name**
[`string`](../../data-types.md) | Название раздела ||
|| **iblockSectionId**
[`integer`](../../data-types.md) | Идентификатор родительского раздела. `0` — раздел верхнего уровня ||
|| **active**
[`string`](../../data-types.md) | Активность раздела: `Y` — активен, `N` — неактивен ||
|| **code**
[`string`](../../data-types.md) | Символьный код раздела. Пустая строка, если код не задан ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор раздела. Пустая строка, если идентификатор не задан ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **description**
[`string`](../../data-types.md) | Описание раздела. Пустая строка, если описание не задано ||
|| **descriptionType**
[`string`](../../data-types.md) | Формат описания: `text` или `html` ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION",
        "message": "Доступ запрещен"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` — положительное число. Строковое значение тоже вызывает эту ошибку ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `SectionDto` | Передайте в `select` только поля из таблицы [Объект item](#item) ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["id","name"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и раздел. Ошибку также возвращает несуществующий `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-add-rest-v3.md)
- [{#T}](./catalog-section-update-rest-v3.md)
- [{#T}](./catalog-section-list-rest-v3.md)
- [{#T}](./catalog-section-delete-rest-v3.md)
- [{#T}](./catalog-section-field-get.md)
