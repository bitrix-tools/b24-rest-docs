# Добавить раздел торгового каталога v 3.0 catalog.section.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога», правом «Создание товара» и правом на изменение разделов инфоблока

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.section.add` создает раздел торгового каталога и возвращает его поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового раздела. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор инфоблока торгового каталога, в котором создается раздел. После создания инфоблок раздела изменить нельзя.

Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md) ||
|| **name***
[`string`](../../data-types.md) | Название раздела. Пустая строка вызывает ошибку валидации ||
|| **iblockSectionId**
[`integer`](../../data-types.md) | Идентификатор родительского раздела. Раздел должен находиться в том же инфоблоке.

Идентификатор можно получить методом [catalog.section.list](./catalog-section-list-rest-v3.md).

По умолчанию: `0` — раздел верхнего уровня ||
|| **active**
[`string`](../../data-types.md) | Активность раздела.

Возможные значения:

- `Y` — раздел активен
- `N` — раздел неактивен

Любое значение, кроме `Y`, сохраняется как `N`.

По умолчанию: `Y` ||
|| **code**
[`string`](../../data-types.md) | Символьный код раздела. Если в настройках инфоблока включена уникальность символьного кода разделов, код должен быть уникальным в инфоблоке ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор раздела, например для синхронизации с учетной системой ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки.

По умолчанию: `500` ||
|| **description**
[`string`](../../data-types.md) | Описание раздела ||
|| **descriptionType**
[`string`](../../data-types.md) | Формат описания.

Возможные значения:

- `text` — обычный текст
- `html` — HTML-разметка

Другие значения сохраняются как `text`.

По умолчанию: `text` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.section.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Сумки","iblockSectionId":385,"code":"bags","xmlId":"bags-001","sort":100}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Сумки","iblockSectionId":385,"code":"bags","xmlId":"bags-001","sort":100},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.section.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SectionAddResult = {
      item: {
        id: number
        iblockId: number
        name: string
        iblockSectionId: number
        active: 'Y' | 'N'
        code: string
        xmlId: string
        sort: number
        description: string
        descriptionType: 'text' | 'html'
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SectionAddResult>({
        method: 'catalog.section.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Сумки',
            iblockSectionId: 385,
            code: 'bags',
            xmlId: 'bags-001',
            sort: 100,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Section created:', result.item.id)
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
      async function addSection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.section.add',
            params: {
              fields: {
                iblockId: 25,
                name: 'Сумки',
                iblockSectionId: 385,
                code: 'bags',
                xmlId: 'bags-001',
                sort: 100,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Section created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addSection)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.section.add(
            fields={
                "iblockId": 25,
                "name": "Сумки",
                "iblockSectionId": 385,
                "code": "bags",
                "xmlId": "bags-001",
                "sort": 100,
            },
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
                'catalog.section.add',
                [
                    'fields' => [
                        'iblockId' => 25,
                        'name' => 'Сумки',
                        'iblockSectionId' => 385,
                        'code' => 'bags',
                        'xmlId' => 'bags-001',
                        'sort' => 100,
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
        'catalog.section.add',
        {
            fields: {
                iblockId: 25,
                name: 'Сумки',
                iblockSectionId: 385,
                code: 'bags',
                xmlId: 'bags-001',
                sort: 100,
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
        'catalog.section.add',
        [
            'fields' => [
                'iblockId' => 25,
                'name' => 'Сумки',
                'iblockSectionId' => 385,
                'code' => 'bags',
                'xmlId' => 'bags-001',
                'sort' => 100,
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
    res, err := client.Core().Call(ctx, "catalog.section.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId":        25,
    		"name":            "Сумки",
    		"iblockSectionId": 385,
    		"code":            "bags",
    		"xmlId":           "bags-001",
    		"sort":            100,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.section.add: %w", err)
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
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 387,
            "iblockId": 25,
            "name": "Сумки",
            "iblockSectionId": 385,
            "active": "Y",
            "code": "bags",
            "xmlId": "bags-001",
            "sort": 100,
            "description": "",
            "descriptionType": "text"
        }
    },
    "time": {
        "start": 1792665527,
        "finish": 1792665527.384296,
        "duration": 0.3842959403991699,
        "processing": 0,
        "date_start": "2026-10-22T13:38:47+03:00",
        "date_finish": "2026-10-22T13:38:47+03:00",
        "operating_reset_at": 1792666080,
        "operating": 0.12565898895263672
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
[`object`](../../data-types.md) | Поля созданного раздела. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

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

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"name\"",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации полей раздела

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `iblockId` | Не заполнено обязательное поле "iblockId" | Передайте `iblockId` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: идентификатор присваивается автоматически ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` в тело запроса ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте число ||
|| `-` | Не введено название раздела. | Передайте непустое значение `name` ||
|| `-` | Duplicate entry for key [code] | Раздел с таким `code` уже есть в инфоблоке, но у пользователя нет доступа к нему. Укажите другой символьный код ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `SectionDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка дубля символьного кода

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с идентификатором `#ID#` уже существует. | В инфоблоке включена уникальность символьного кода разделов, и раздел `#ID#` уже использует этот `code`. Укажите другой символьный код ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и разделы инфоблока. Ошибку также возвращает несуществующий `iblockId` или `iblockSectionId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-update-rest-v3.md)
- [{#T}](./catalog-section-get-rest-v3.md)
- [{#T}](./catalog-section-list-rest-v3.md)
- [{#T}](./catalog-section-delete-rest-v3.md)
- [{#T}](./catalog-section-field-list.md)
