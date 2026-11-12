# Обновить комментарий crm.timeline.comment.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: автор комментария с правом изменения связанного элемента CRM

Метод `crm.timeline.comment.update` обновляет комментарий в таймлайне.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Целочисленный идентификатор комментария (например, `1`). Получить идентификаторы можно методом [`crm.timeline.comment.list`](./crm-timeline-comment-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления комментария. Пример тела запроса:

```json
{
    "id": 999,
    "fields": {
        "COMMENT": "Обновленный комментарий",
        "FILES": [
            [
                "1.gif",
                "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            ]
        ]
    }
}
```

{% note warning %}

С версии CRM 23.100.0 метод принимает параметр `fields` только с именем в нижнем регистре. Другие недокументированные варианты (`Fields`, `FIELDS`, `arFields`) не принимаются.

{% endnote %}

||
|| **ownerTypeId**
[`integer`](../../../data-types.md) | [Целочисленный идентификатор типа объекта CRM](../../data-types.md#object_type), к которому привязан комментарий (например, `2` для сделки) ||
|| **ownerId**
[`integer`](../../../data-types.md) | Целочисленный идентификатор элемента CRM, к которому привязан комментарий (например, `1`). Получить список идентификаторов можно методом [`crm.timeline.bindings.list`](../bindings/crm-timeline-bindings-list.md) (поле `ENTITY_ID`) ||
|#


Передавайте `ownerTypeId` и `ownerId` вместе. Если хотя бы один из параметров не передан, метод определит оба по привязкам комментария и выберет первую привязку, для которой у пользователя есть право изменения элемента CRM. Если доступной привязки нет, метод вернет ошибку `ACCESS_DENIED`.

{% note warning %}

Если комментарий привязан к нескольким элементам CRM, метод не меняет исходный комментарий. Он создает новый комментарий с тем же автором и датой создания, привязывает его только к выбранному элементу и снимает с исходного комментария привязку к этому элементу. У остальных элементов остается исходный текст. Метод возвращает идентификатор нового комментария, а в обработчики приходят события [onCrmTimelineCommentAdd](./events/on-Crm-Timeline-Comment-Add.md) и [onCrmTimelineCommentUpdate](./events/on-Crm-Timeline-Comment-Update.md) с этим идентификатором.

{% endnote %}

### Параметр fields {#parametr-fields}

Полный справочник полей доступен в описании метода [`crm.timeline.comment.fields`](./crm-timeline-comment-fields.md). При обновлении учитывайте следующие требования.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMENT***
[`string`](../../../data-types.md) | Текст комментария. Не должен быть пустым после удаления пробелов, табуляций и переводов строк в начале и в конце. Передавайте при каждом обновлении, в том числе при изменении файлов ||
|| **FILES**
[`attached_diskfile`](../../data-types.md#attached_diskfile) | Список файлов. Массив значений, описанный по [правилам](../../../files/how-to-update-files.md). При обновлении только `COMMENT` текущие файлы сохраняются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"COMMENT":"Comment was changed","FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.comment.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"COMMENT":"Comment was changed","FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.timeline.comment.update',
        params: {
          id: 999,
          fields: {
            COMMENT: 'Comment was changed',
            FILES: [
              ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
              ['2.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated comment id:', result)
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
      async function updateTimelineComment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.comment.update',
            params: {
              id: 999,
              fields: {
                COMMENT: 'Comment was changed',
                FILES: [
                  ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                  ['2.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                ],
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated comment id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTimelineComment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.timeline.comment.update(
            bitrix_id=999,
            fields={
                "COMMENT": "Comment was changed",
                "FILES": [
                    [
                        "1.gif",
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                    ],
                    [
                        "2.gif",
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
                    ],
                ],
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.comment.update',
                [
                    'id'     => 999,
                    'fields' => [
                        'COMMENT' => 'Comment was changed',
                        'FILES'  => [
                            ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                            ['2.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating timeline comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.update",
        {
            id: 999,
            fields:
            {
                "COMMENT": "Comment was changed",
                "FILES": [
                    [
                        "1.gif", 
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    ],
                    [
                        "2.gif",
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    ],
                ]
            }
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.update',
        [
            'id' => 999,
            'fields' => [
                'COMMENT' => 'Comment was changed',
                'FILES' => [
                    ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],
                    ["2.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.timeline.comment.update", b24.Params{
    	"id": 999,
    	"fields": b24.Params{
    		"COMMENT": "Comment was changed",
    		"FILES": []any{
    			[]string{"1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},
    			[]string{"2.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.timeline.comment.update: %w", err)
    }

    var value b24.ID
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 999,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-07T17:19:01+03:00",
        "date_finish": "2024-05-07T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор обновленного комментария. Если комментарий был привязан к нескольким элементам CRM, возвращается идентификатор нового комментария ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `OWNER_NOT_FOUND` | Owner was not found | `ownerId` меньше или равен нулю либо передан неизвестный `ownerTypeId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Пользователь не является автором комментария или не имеет права изменять связанный элемент CRM ||
|| `400` | `NOT_FOUND` | Элемент не найден | Комментарий не найден, у него нет привязок или указанный элемент CRM не связан с комментарием ||
|| `400` | `ADDING_DISABLED` | Could not create comment | Комментарий привязан к нескольким элементам CRM, и создать новый комментарий для выбранного элемента не удалось ||
|| `400` | `INVALID_ARG_VALUE` | Empty comment message | Текст комментария не передан или пуст после удаления пробелов, табуляций и переводов строк в начале и в конце ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-comment-add.md)
- [{#T}](./crm-timeline-comment-get.md)
- [{#T}](./crm-timeline-comment-list.md)
- [{#T}](./crm-timeline-comment-delete.md)
- [{#T}](./crm-timeline-comment-fields.md)

