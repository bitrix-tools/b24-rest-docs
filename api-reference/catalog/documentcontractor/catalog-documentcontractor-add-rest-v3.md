# Добавить поставщика к документу складского учета v 3.0 catalog.document.contractor.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» для документов типа «Приход» и правами «Просмотр» для этих документов, «Просмотр и выбор склада» и «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.contractor.add` привязывает контакт или компанию CRM как поставщика к документу прихода и возвращает привязку.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями новой привязки. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentId***
[`integer`](../../data-types.md) | Идентификатор документа прихода с типом `A`. Документ не должен быть проведен.

Идентификатор можно получить методом [catalog.document.list](../document/catalog-document-list-rest-v3.md) или из ответа [catalog.document.add](../document/catalog-document-add-rest-v3.md) ||
|| **entityTypeId***
[`integer`](../../data-types.md) | Тип объекта CRM.

Возможные значения:

- `3` — контакт
- `4` — компания ||
|| **entityId***
[`integer`](../../data-types.md) | Идентификатор контакта или компании.

Идентификатор можно получить методами [crm.contact.list](../../crm/contacts/crm-contact-list.md) и [crm.company.list](../../crm/companies/crm-company-list.md).

К документу можно привязать несколько контактов и только одну компанию. Метод не проверяет, что объект CRM существует ||
|#

Поле `id` заполняется автоматически. Если передать его в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.contractor.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":325,"entityTypeId":3,"entityId":1}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.contractor.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":325,"entityTypeId":3,"entityId":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.contractor.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentContractorAddResult = {
      item: {
        id: number
        documentId: number
        entityTypeId: number
        entityId: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentContractorAddResult>({
        method: 'catalog.document.contractor.add',
        params: {
          fields: {
            documentId: 325,
            entityTypeId: 3,
            entityId: 1,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contractor bound:', result.item.id)
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
      async function documentContractorAdd() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.contractor.add',
            params: {
              fields: {
                documentId: 325,
                entityTypeId: 3,
                entityId: 1,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contractor bound:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentContractorAdd)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.contractor.add(
            fields={
                "documentId": 325,
                "entityTypeId": 3,
                "entityId": 1,
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
                'catalog.document.contractor.add',
                [
                    'fields' => [
                        'documentId' => 325,
                        'entityTypeId' => 3,
                        'entityId' => 1,
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
        'catalog.document.contractor.add',
        {
            fields: {
                documentId: 325,
                entityTypeId: 3,
                entityId: 1,
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
        'catalog.document.contractor.add',
        [
            'fields' => [
                'documentId' => 325,
                'entityTypeId' => 3,
                'entityId' => 1,
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
    res, err := client.Core().Call(ctx, "catalog.document.contractor.add", b24.Params{
    	"fields": b24.Params{
    		"documentId":   325,
    		"entityTypeId": 3,
    		"entityId":     1,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.contractor.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           int `json:"id"`
    	DocumentID   int `json:"documentId"`
    	EntityTypeID int `json:"entityTypeId"`
    	EntityID     int `json:"entityId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.EntityID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 29,
            "documentId": 325,
            "entityTypeId": 3,
            "entityId": 1
        }
    },
    "time": {
        "start": 1792665375,
        "finish": 1792665375.827902,
        "duration": 0.82790207862854,
        "processing": 0,
        "date_start": "2026-10-22T13:36:15+03:00",
        "date_finish": "2026-10-22T13:36:15+03:00",
        "operating_reset_at": 1792665960,
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
[`object`](../../data-types.md) | Поля созданной привязки. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор привязки ||
|| **documentId**
[`integer`](../../data-types.md) | Идентификатор документа складского учета ||
|| **entityTypeId**
[`integer`](../../data-types.md) | Тип объекта CRM: `3` — контакт, `4` — компания ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор контакта или компании ||
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
                "message": "This document already has a Company contractor"
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
|| `documentId` | Не заполнено обязательное поле "documentId" | Передайте `documentId` в `fields` ||
|| `entityTypeId` | Не заполнено обязательное поле "entityTypeId" | Передайте `entityTypeId` в `fields` ||
|| `entityId` | Не заполнено обязательное поле "entityId" | Передайте `entityId` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

Несколько ошибок проверки полей могут прийти одним ответом в массиве `validation`.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `documentId` | В поле `documentId` требуется тип данных `int` для такого запроса | Передайте целое число ||
|| `-` | Store document was not found | Документа с таким идентификатором нет или он недоступен пользователю. Проверьте идентификатор методом [catalog.document.list](../document/catalog-document-list-rest-v3.md) ||
|| `-` | Type of store document is wrong | Поставщика можно привязать только к документу прихода с типом `A` ||
|| `-` | Unable to edit conducted document | Документ проведен. Отмените проведение методом [catalog.document.cancel](../document/catalog-document-cancel-rest-v3.md) ||
|| `-` | Wrong entity type id | Передайте в `entityTypeId` значение `3` или `4` ||
|| `-` | Wrong entity id | Передайте в `entityId` положительное число ||
|| `-` | This contractor has been already bound to this document | Этот контакт или компания уже привязаны к документу ||
|| `-` | This document already has a Company contractor | К документу уже привязана компания. Удалите прежнюю привязку методом [catalog.document.contractor.delete](./catalog-documentcontractor-delete-rest-v3.md) ||
|| `-` | Contractors should be provided by CRM | Поставщики документов берутся не из CRM. Методы работают, только если поставщиков документов складского учета ведет CRM ||
|| `-` | CRM module is required for document contractors | Методы работают только при установленном модуле CRM ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `DocumentContractorDto` | Передайте в `fields` только `documentId`, `entityTypeId`, `entityId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на документы прихода, склады и каталог ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-documentcontractor-list-rest-v3.md)
- [{#T}](./catalog-documentcontractor-delete-rest-v3.md)
- [{#T}](./catalog-documentcontractor-field-list.md)
- [{#T}](./index.md)
