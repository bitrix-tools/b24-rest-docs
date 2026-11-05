# Провести несколько документов складского учета catalog.document.conductList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Просмотр каталога товаров» и «Просмотр раздела Складской учет» и правом «Проведение документа» на документы нужного типа. Документ должен быть доступен пользователю по праву «Просмотр»

Метод `catalog.document.conductList` проводит несколько документов складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentIds***
[`catalog_document.id[]`](../data-types.md#catalog_document) | Массив идентификаторов документов, например `[142, 143, 144]`.

Получить идентификаторы документов можно методом [catalog.document.list](./catalog-document-list.md). Пустой массив метод принимает без ошибки и возвращает `true` ||
|#

Метод проводит документы по очереди, как [catalog.document.conduct](./catalog-document-conduct.md). Если документ провести не удалось, метод переходит к следующему: документы, которые удалось провести, остаются проведенными, а в ответе приходит ошибка.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[142,143,144]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.conductList
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[142,143,144],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.conductList
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'catalog.document.conductList',
        params: {
          documentIds: [142, 143, 144],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents conducted:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function conductDocumentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.conductList',
            params: {
              documentIds: [142, 143, 144],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents conducted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', conductDocumentList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.conduct_list(
            document_ids=[
                142,
                143,
                144,
            ],
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.conductList',
                [
                    'documentIds' => [142, 143, 144],
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

    ```js
    BX24.callMethod(
        'catalog.document.conductList',
        { documentIds: [142, 143, 144] },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.document.conductList',
        [
            'documentIds' => [142, 143, 144],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.conductList", b24.Params{
    	"documentIds": []int{142, 143, 144},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.conductList: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1793883405,
        "finish": 1793883406.059175,
        "duration": 1.0591750144958496,
        "processing": 1,
        "date_start": "2026-11-05T15:56:45+03:00",
        "date_finish": "2026-11-05T15:56:46+03:00",
        "operating_reset_at": 1793883960,
        "operating": 0.12781405448913574
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа. Содержит `true`, если проведены все документы. Если хотя бы один документ провести не удалось, метод возвращает ошибку, при этом остальные документы проводятся ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "При проведении документа \"Поступление от поставщика\" произошла ошибка: Не указан поставщик."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Недостаточно прав для сохранения документа | У пользователя нет права «Просмотр каталога товаров» или «Просмотр раздела Складской учет» ||
|| `400` | `0` | Ошибка проведения документа: Недостаточно прав для сохранения документа | У пользователя нет права «Проведение документа» на документы этого типа ||
|| `400` | `100` | Could not find value for parameter {documentIds} | Не передан параметр `documentIds` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {documentIds}. Should be value of type array. | В `documentIds` передан не массив ||
|| `400` | `0` | При проведении документа "#DOC_TITLE#" произошла ошибка | Документ не найден или недоступен пользователю. Текст приходит с незаполненным `#DOC_TITLE#` ||
|| `400` | `0` | При проведении документа "Поступление от поставщика" произошла ошибка: Не указан поставщик. | Документ не удалось провести. В тексте — название документа или, если его нет, название типа документа, и причина, например нет поставщика или товаров ||
|| `400` | `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на тарифе портала ||
|| `400` | `0` | Для проведения документа необходимо включить складской учет | Складской учет на портале выключен. Проверить состояние можно методом [catalog.document.mode.status](./catalog-document-mode-status.md) ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-list.md)
- [{#T}](./catalog-document-conduct.md)
- [{#T}](./catalog-document-cancel-list.md)
