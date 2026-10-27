# Изменить значения пользовательских полей документов складского учета v 3.0 catalog.document.userfield.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» для документов этого типа и правами «Просмотр» для этих документов, «Просмотр каталога товаров» и «Просмотр раздела Складской учет»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.userfield.update` изменяет значения пользовательских полей документа складского учета и возвращает их.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа складского учета.

Идентификатор можно получить методом [catalog.document.list](../document/catalog-document-list-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями пользовательских полей документа, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **docType***
[`string`](../../data-types.md) | Тип документа. Должен совпадать с типом документа `id`, иначе метод вернет ошибку ||
|| **userFields**
[`object`](../../data-types.md) | Значения пользовательских полей. Ключ — `FIELD_{id}`, где `{id}` — идентификатор пользовательского поля, или код поля вида `UF_*`.

Идентификаторы и коды пользовательских полей можно получить методом [userfieldconfig.list](../../crm/universal/userfieldconfig/userfieldconfig-list.md).

Ключи, которых нет у документов этого типа, метод пропускает без ошибки ||
|#

Метод изменяет значения и у проведенного документа.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.document.userfield.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325,"fields":{"docType":"A","userFields":{"FIELD_7097":"1"}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325,"fields":{"docType":"A","userFields":{"FIELD_7097":"1"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.userfield.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentUserfieldUpdateResult = {
      item: {
        id: number
        docType: string
        userFields: Record<string, unknown>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentUserfieldUpdateResult>({
        method: 'catalog.document.userfield.update',
        params: {
          id: 325,
          fields: {
            docType: 'A',
            userFields: {
              FIELD_7097: '1',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User fields:', result.item.userFields)
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
      async function documentUserfieldUpdate() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.userfield.update',
            params: {
              id: 325,
              fields: {
                docType: 'A',
                userFields: {
                  FIELD_7097: '1',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User fields:', result.item.userFields)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', documentUserfieldUpdate)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.userfield.update(
            bitrix_id=325,
            fields={
                "docType": "A",
                "userFields": {
                    "FIELD_7097": "1",
                },
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
                'catalog.document.userfield.update',
                [
                    'id' => 325,
                    'fields' => [
                        'docType' => 'A',
                        'userFields' => [
                            'FIELD_7097' => '1',
                        ],
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
        'catalog.document.userfield.update',
        {
            id: 325,
            fields: {
                docType: 'A',
                userFields: {
                    FIELD_7097: '1',
                },
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
        'catalog.document.userfield.update',
        [
            'id' => 325,
            'fields' => [
                'docType' => 'A',
                'userFields' => [
                    'FIELD_7097' => '1',
                ],
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
    res, err := client.Core().Call(ctx, "catalog.document.userfield.update", b24.Params{
    	"id":     325,
    	"fields": b24.Params{
    		"docType":    "A",
    		"userFields": b24.Params{
    			"FIELD_7097": "1",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.userfield.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID         int                        `json:"id"`
    	DocType    string                     `json:"docType"`
    	UserFields map[string]json.RawMessage `json:"userFields"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, len(item.UserFields))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 325,
            "docType": "A",
            "userFields": {
                "FIELD_7097": "1"
            }
        }
    },
    "time": {
        "start": 1792665382,
        "finish": 1792665382.27269,
        "duration": 0.2726900577545166,
        "processing": 0,
        "date_start": "2026-10-22T13:36:22+03:00",
        "date_finish": "2026-10-22T13:36:22+03:00",
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
[`object`](../../data-types.md) | Значения пользовательских полей документа после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **docType**
[`string`](../../data-types.md) | Тип документа ||
|| **userFields**
[`object`](../../data-types.md) | Значения всех пользовательских полей документа. Ключи — `FIELD_{id}`, а не коды `UF_*`, как в ответе [catalog.document.userfield.list](./catalog-userfield-document-list-rest-v3.md) ||
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
                "message": "The docType field does not match the document"
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
|| `docType` | Не заполнено обязательное поле "docType" | Передайте `docType` в `fields` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` документа. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | The docType field does not match the document | Передайте в `docType` тип документа `id` ||
|| `userFields` | В поле `userFields` требуется тип данных `array` для такого запроса | Передайте `userFields` объектом ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` документа ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Документа с таким идентификатором нет. Проверьте идентификатор методом [catalog.document.list](../document/catalog-document-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `UserfieldDocumentDto` | Передайте в `fields` только `docType` и `userFields` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на документы этого типа и на раздел Складской учет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-list-rest-v3.md)
- [{#T}](./catalog-userfield-document-field-list.md)
- [{#T}](./index.md)
