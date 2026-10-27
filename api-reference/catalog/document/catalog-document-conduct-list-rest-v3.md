# Провести несколько документов складского учета v 3.0 catalog.document.conductlist

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Проведение документа» для типа документа и правами «Просмотр каталога товаров» и «Просмотр раздела Складской учет»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.document.conductlist` проводит несколько документов складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentIds***
[`array`](../../data-types.md) | Массив идентификаторов документов складского учета, например `[321, 323]`.

Идентификаторы можно получить методом [catalog.document.list](./catalog-document-list-rest-v3.md).

Тот же результат дает метод [catalog.document.conduct](./catalog-document-conduct-rest-v3.md) с параметром `documentIds` ||
|#

{% note warning "" %}

Документы обрабатываются по очереди, общий откат при ошибке не выполняется. Если хотя бы один документ провести не удалось, метод вернет ошибку, но остальные документы из списка будут проведены. Проверьте состояние документов полем `status` методом [catalog.document.list](./catalog-document-list-rest-v3.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.document.conductlist`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[321,323]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.conductlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[321,323],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.document.conductlist
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentConductListResult = {
      result: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentConductListResult>({
        method: 'catalog.document.conductlist',
        params: {
          documentIds: [321, 323],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents conducted:', result.result)
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
      async function conductDocuments() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.document.conductlist',
            params: {
              documentIds: [321, 323],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents conducted:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', conductDocuments)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.conductlist(
            document_ids=[321, 323],
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
                'catalog.document.conductlist',
                [
                    'documentIds' => [321, 323],
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
        'catalog.document.conductlist',
        {
            documentIds: [321, 323],
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
        'catalog.document.conductlist',
        [
            'documentIds' => [321, 323],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.conductlist", b24.Params{
    	"documentIds": []int{321, 323},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.conductlist: %w", err)
    }

    var result struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1792665206,
        "finish": 1792665206.921692,
        "duration": 0.92169189453125,
        "processing": 0,
        "date_start": "2026-10-22T13:33:26+03:00",
        "date_finish": "2026-10-22T13:33:26+03:00",
        "operating_reset_at": 1792665660,
        "operating": 0.3451039791107178
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если все документы проведены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "При проведении документа \"Приход от поставщика\" произошла ошибка: Документ уже проведен"
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
|| `documentIds` | Обязательное поле `documentIds` не указано | Передайте непустой массив положительных идентификаторов. Нули и отрицательные значения не учитываются ||
|| `documentIds` | В поле `documentIds` требуется тип данных `array` для такого запроса | Передайте `documentIds` массивом, например `[321, 323]` ||
|| `-` | При проведении документа "#DOC_TITLE#" произошла ошибка: #ERROR# | Исправьте указанный документ по тексту ошибки. Остальные документы из списка проведены ||
|| `-` | При проведении документа "#DOC_TITLE#" произошла ошибка | Такого документа нет или он недоступен пользователю. Плейсхолдер `#DOC_TITLE#` в тексте не заменяется. Проверьте идентификаторы методом [catalog.document.list](./catalog-document-list-rest-v3.md) ||
|| `-` | Ошибка проведения документа: Недостаточно прав для сохранения документа | У пользователя нет права «Проведение документа» для типа этого документа ||
|| `-` | Складской учет недоступен на вашем тарифе | Складской учет не входит в тариф Битрикс24. Методы работы с документами недоступны ||
|| `-` | Для проведения документа необходимо включить складской учет | Включите складской учет. Без него проведение нескольких документов недоступно ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть права «Просмотр каталога товаров», «Просмотр раздела Складской учет» и «Проведение документа» для типа документа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-conduct-rest-v3.md)
- [{#T}](./catalog-document-cancel-list-rest-v3.md)
- [{#T}](./catalog-document-list-rest-v3.md)
