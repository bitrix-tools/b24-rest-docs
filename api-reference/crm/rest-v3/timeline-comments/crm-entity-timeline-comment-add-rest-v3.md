# Добавить комментарий в таймлайн v 3.0 crm.<тип>.timeline.comment.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элемента CRM, для моей компании — с правом на изменение моих компаний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.timeline.comment.add` добавляет текстовый комментарий в таймлайн элемента CRM. Тип элемента задает сегмент `<тип>` в имени метода, элемент — поле `ownerId`. Автором комментария становится пользователь, от имени которого вызван метод.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.timeline.comment.add` ||
|| Лид | `crm.lead.timeline.comment.add` ||
|| Контакт | `crm.contact.timeline.comment.add` ||
|| Компания | `crm.company.timeline.comment.add` ||
|| Моя компания | `crm.mycompany.timeline.comment.add` ||
|| Предложение | `crm.quote.timeline.comment.add` ||
|| Счет | `crm.smartinvoice.timeline.comment.add` ||
|| Документ CRM | `crm.smartdocument.timeline.comment.add` ||
|| Документ КЭДО | `crm.smartb2edocument.timeline.comment.add` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.timeline.comment.add`, например `crm.smartprocess1038.timeline.comment.add` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Компания и моя компания — разные типы: метод `crm.company.timeline.comment.add` не находит мою компанию, а `crm.mycompany.timeline.comment.add` — обычную компанию.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.timeline.comment.add`, а не `crm.smartInvoice.timeline.comment.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Поля комментария. Обязательные поля — `ownerId` и `text`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, в таймлайн которого добавляется комментарий. Положительное число, не строка.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **text***
[`string`](../../../data-types.md) | Текст комментария. Пробелы в начале и в конце текста удаляются. Пустая строка и строка из одних пробелов вызывают ошибку.

Текст сохраняется как есть: BB-коды, например `[b]оплату[/b]`, и HTML-теги метод не обрабатывает и возвращает в том же виде. Теги вложений `[DISK FILE ID=…]`, `[FILE ID=…]` и `[DOCUMENT ID=…]` вызывают ошибку ||
|#

Другие поля, например `authorId` или `files`, метод не принимает и отвечает ошибкой. Прикрепить файл к комментарию методами REST 3.0 нельзя, для этого используйте метод прошлой версии [crm.timeline.comment.add](../../timeline/comments/crm-timeline-comment-add.md) с полем `FILES`.

{% note warning "" %}

Длина текста ограничена 65 535 байтами. Более длинный текст метод обрезает без ошибки: из 70 000 латинских букв сохраняется 65 535, из 70 000 кириллических — 32 767.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.timeline.comment.add`

{% endnote %}

Примеры добавляют комментарий в таймлайн сделки. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ownerId":741,"text":"Отправили коммерческое предложение, ждем ответа до 1 декабря"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.timeline.comment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ownerId":741,"text":"Отправили коммерческое предложение, ждем ответа до 1 декабря"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.timeline.comment.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CommentAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CommentAddResult>(
        'crm.deal.timeline.comment.add',
        {
          fields: {
            ownerId: 741,
            text: 'Отправили коммерческое предложение, ждем ответа до 1 декабря',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comment ID:', result.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addComment() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.deal.timeline.comment.add',
            {
              fields: {
                ownerId: 741,
                text: 'Отправили коммерческое предложение, ждем ответа до 1 декабря',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Comment ID:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addComment)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.deal.timeline.comment.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "ownerId": 741,
                    "text": "Отправили коммерческое предложение, ждем ответа до 1 декабря",
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["id"])
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
                'crm.deal.timeline.comment.add',
                [
                    'fields' => [
                        'ownerId' => 741,
                        'text' => 'Отправили коммерческое предложение, ждем ответа до 1 декабря',
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
        'crm.deal.timeline.comment.add',
        {
            fields: {
                ownerId: 741,
                text: 'Отправили коммерческое предложение, ждем ответа до 1 декабря',
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
        'crm.deal.timeline.comment.add',
        [
            'fields' => [
                'ownerId' => 741,
                'text' => 'Отправили коммерческое предложение, ждем ответа до 1 декабря',
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
    res, err := client.Core().Call(ctx, "crm.deal.timeline.comment.add", b24.Params{
    	"fields": b24.Params{
    		"ownerId": 741,
    		"text":    "Отправили коммерческое предложение, ждем ответа до 1 декабря",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.deal.timeline.comment.add: %w", err)
    }

    var created struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(created.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 77161
    },
    "time": {
        "start": 1795772405,
        "finish": 1795772405.695934,
        "duration": 0.6959340572357178,
        "processing": 0,
        "date_start": "2026-11-27T12:40:05+03:00",
        "date_finish": "2026-11-27T12:40:05+03:00",
        "operating_reset_at": 1795772760,
        "operating": 0.9805641174316406
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.id**
[`integer`](../../../data-types.md) | Идентификатор созданного комментария. Комментарий можно получить методом [crm.<тип>.timeline.comment.get](./crm-entity-timeline-comment-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

После добавления комментария Битрикс24 отправляет событие [onCrmTimelineCommentAdd](../../timeline/comments/events/on-Crm-Timeline-Comment-Add.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Введите текст комментария",
                "field": "fields.text"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с полями `ownerId` и `text` ||
|| `fields.text` | Введите текст комментария | Передайте непустой текст. Строка из одних пробелов тоже считается пустой ||
|| `fields.text` | Удалите из текста комментария теги вложений | Уберите из текста теги `[DISK FILE ID=…]`, `[FILE ID=…]` и `[DOCUMENT ID=…]`. Файл прикрепляет метод прошлой версии [crm.timeline.comment.add](../../timeline/comments/crm-timeline-comment-add.md) ||
|| `fields.ownerId` | В поле `fields.ownerId` требуется тип данных `int` для такого запроса | Передайте идентификатор элемента положительным числом, а не строкой ||
|| `text` | В поле `text` требуется тип данных `string` для такого запроса | Передайте текст строкой ||
|| `fields.authorId` | В DTO `CommentDto` в поле `fields.authorId` требуется наличие атрибута `Editable` для такого запроса | Передавайте в `fields` только `ownerId` и `text`. Автором становится пользователь, от имени которого вызван метод ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `ownerId` | Не заполнено обязательное поле "ownerId" | Передайте `ownerId` в `fields` ||
|| `text` | Не заполнено обязательное поле "text" | Передайте `text` в `fields` ||
|#

#### Элемент не найден {#entity-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `99999999` не найдена | Элемента из `ownerId` нет у этого типа объекта, он удален или у вас нет права на его изменение. Проверьте `ownerId` и имя метода: моя компания и обычная компания — разные типы ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `files` для сущности `CommentDto` | Передавайте в `fields` только `ownerId` и `text`. Файл прикрепляет метод прошлой версии [crm.timeline.comment.add](../../timeline/comments/crm-timeline-comment-add.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Лиды выключены в настройках CRM. Ошибка приходит только у метода лида. Включите лиды ||
|#

#### Функция недоступна на тарифе

Код ошибки: `FEATURE_NOT_AVAILABLE_ON_CURRENT_PLAN`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Функция недоступна на текущем тарифе. | Тариф Битрикс24 не включает лиды. Ошибка приходит только у метода лида ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartInvoice.timeline.comment.add` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.timeline.comment.add`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-timeline-comment-get-rest-v3.md)
- [{#T}](./crm-entity-timeline-comment-list-rest-v3.md)
- [{#T}](../../timeline/comments/crm-timeline-comment-add.md)
